import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ServiceTokenService } from 'src/models/servicesTokens/serviceToken.service';
import { firstValueFrom } from 'rxjs';
import { BaseAction } from './base-action.service';
import { ActionRegistry } from './action-registry.service';
import { ConfigService } from '@nestjs/config';
import { TwitchStreamersService } from 'src/models/twitchStreamers/twitchStreamers.service';
import { TwitchFollowService } from 'src/models/twitchFollow/twitchFollow.service';

@Injectable()
export class TwitchActionNewStreamOffline extends BaseAction {
  constructor(
    serviceId: number,
    private httpService: HttpService,
    private serviceTokenService: ServiceTokenService,
    private actionRegistry: ActionRegistry,
    private configService: ConfigService,
    private streamerService: TwitchStreamersService,
    private followService: TwitchFollowService,
  ) {
    super(
      'Twitch: Streamer offline',
      'a followed streamer cuts a live',
      'action',
      serviceId,
      'https://api.twitch.tv/helix/eventsub/subscriptions',
      true,
    );
  }

  async registerElement() {
    await this.actionRegistry.registerElement(this);
  }

  getServiceId() {
    return this.serviceId;
  }

  async getUserId(accessToken: string) {
    const url = 'https://api.twitch.tv/helix/users';
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Client-Id': this.configService.get<string>('twitch.clientID'),
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { headers }),
      );
      const userId = response.data.data[0].id;
      return userId;
    } catch (error) {
      throw error;
    }
  }

  private async getAllFollowedStreamers(userId: string, accessToken: string) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Client-Id': this.configService.get<string>('twitch.clientID'),
    };
    const url = `https://api.twitch.tv/helix/channels/followed?user_id=${userId}`;
    let cursor: string | null = null;
    let allFollows = [];
    do {
      const response = await firstValueFrom(
        this.httpService.get(url + (cursor ? `&after=${cursor}` : ''), {
          headers,
        }),
      );
      allFollows = allFollows.concat(response.data.data);
      cursor = response.data.pagination?.cursor || null;
    } while (cursor);
    return allFollows;
  }

  private async getStreamerStatus(streamerId: number, access_token: string) {
    const url = `https://api.twitch.tv/helix/streams?user_id=${streamerId}`;
    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: {
          'Client-Id': this.configService.get<string>('twitch.clientID'),
          Authorization: `Bearer ${access_token}`,
        },
      }),
    );
    const info = response.data.data;
    if (Array.isArray(info) && info.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  private async registerStreamers(userId: number, access_token: string) {
    const userTwitchId = await this.getUserId(access_token);
    let savedFollow = await this.followService.findByUser(userId);
    const allFollows = await this.getAllFollowedStreamers(
      userTwitchId,
      access_token,
    );
    for (const elem of allFollows) {
      savedFollow = savedFollow.filter(
        (item) => item.streamer.streamerId != elem.broadcaster_id,
      );
      let existStreamer = await this.streamerService.findByName(
        elem.broadcaster_name,
      );
      if (!existStreamer) {
        existStreamer = await this.streamerService.create({
          streamerId: elem.broadcaster_id,
          streamerName: elem.broadcaster_name,
        });
      }
      let existingFollow = await this.followService.findOne(
        existStreamer.id,
        userId,
      );
      if (!existingFollow) {
        existingFollow = await this.followService.create({
          streamerId: existStreamer.id,
          userId: userId,
        });
      }
      const status = await this.getStreamerStatus(
        existStreamer.streamerId,
        access_token,
      );
      if (status != existStreamer.status) {
        await this.streamerService.updateState(existStreamer.id, status);
      }
      if (!status && !existingFollow.trigger_off) {
        await this.followService.changeTriggerOff(existingFollow.id, true);
        return existStreamer;
      }
      if (status && existingFollow.trigger_off) {
        await this.followService.changeTriggerOff(existingFollow.id, false);
      }
    }
    for (const toDelete of savedFollow) {
      await this.followService.remove(toDelete.id);
    }
  }

  async execAction(userId: number, parameters: any) {
    const access_token = await this.serviceTokenService.findOneAction({
      where: {
        user: { id: userId },
        service: { id: this.serviceId },
      },
    });
    const res = await this.registerStreamers(userId, access_token.key);
    if (res) {
      return {
        streamerId: res.streamerId,
        title: `${res.streamerName} n'est plus en live`,
        body: `Consultez le planning de ${res.streamerName} pour vous tenir au courant du prochain live !`,
      };
    }
  }

  async deleteAction(userId: number) { }
}
