import { Injectable } from '@nestjs/common';
import { BaseReaction } from './base-reaction.service';
import { HttpService } from '@nestjs/axios';
import { ReactionRegistry } from './reaction-registry.service';
import { TwitchFollowService } from 'src/models/twitchFollow/twitchFollow.service';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { ServiceTokenService } from 'src/models/servicesTokens/serviceToken.service';

@Injectable()
export class TwitchReactionSendMessage extends BaseReaction {
  constructor(
    serviceId: number,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly serviceTokenService: ServiceTokenService,
    private readonly followService: TwitchFollowService,
    private readonly reactionRegistry: ReactionRegistry,
  ) {
    super(
      'Twitch: Send a message',
      'send a message in a chat with your twitch account',
      'reaction',
      serviceId,
      'https://api.twitch.tv/helix/chat/messages',
    );
  }

  async registerElement() {
    await this.reactionRegistry.registerElement(this);
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

  async execReaction(userId: number, parameters: any) {
    const access_token = await this.serviceTokenService.findOneAction({
      where: {
        user: { id: userId },
        service: { id: this.serviceId },
      },
    });
    const userTwitch = await this.getUserId(access_token.key);
    const streamers = await this.followService.findByUser(userId);
    const myParam = {
      streamerId: streamers[0].streamer.streamerId,
      ...parameters,
    };
    const headers = {
      Authorization: `Bearer ${access_token.key}`,
      'Client-Id': this.configService.get<string>('twitch.clientID'),
      'Content-Type': 'application/json',
    };
    console.log({ myParam: myParam });
    try {
      await firstValueFrom(
        this.httpService.post(
          this.url,
          {
            broadcaster_id: myParam.streamerId,
            sender_id: userTwitch,
            message: 'Salut !',
          },
          { headers },
        ),
      );
      return {
        streamerId: myParam.streamerId,
        title: myParam.title,
        body: myParam.body + '\n Msg sent in the chat: Salut !',
      };
    } catch (error) {
      console.error(error);
    }
  }
}
