import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseService } from './base-service.service';
import { ServiceTokenService } from 'src/models/servicesTokens/serviceToken.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ServiceRegistry } from './service-registry.service';
import { ActionRegistry } from 'src/models/elements/action-classes/action-registry.service';
import { firstValueFrom } from 'rxjs';
import { ReactionRegistry } from 'src/models/elements/reaction-classes/reaction-registry.service';
import { TwitchActionNewStreamOnline } from 'src/models/elements/action-classes/twitch-stream-online';
import { TwitchStreamersService } from 'src/models/twitchStreamers/twitchStreamers.service';
import { TwitchFollowService } from 'src/models/twitchFollow/twitchFollow.service';
import { TwitchActionNewStreamOffline } from 'src/models/elements/action-classes/twitch-stream-offline';
import { TwitchReactionSendMessage } from 'src/models/elements/reaction-classes/twitch-send-message';

@Injectable()
export class TwitchService extends BaseService implements OnModuleInit {
  constructor(
    private serviceTokenService: ServiceTokenService,
    private httpService: HttpService,
    private configService: ConfigService,
    private serviceRegistry: ServiceRegistry,
    private actionRegistry: ActionRegistry,
    private streamerService: TwitchStreamersService,
    private followService: TwitchFollowService,
    private reactionRegistry: ReactionRegistry,
  ) {
    super(
      'twitch',
      'Allow access to your Twitch account',
      '{"icon": "./assets/services/twitch.png", "color": "#6441a5"}',
      true,
      [],
      [],
    );
  }

  async onModuleInit() {
    await this.serviceRegistry.registerService(this);
    const action1 = new TwitchActionNewStreamOnline(
      this.serviceId,
      this.httpService,
      this.serviceTokenService,
      this.actionRegistry,
      this.configService,
      this.streamerService,
      this.followService,
    );
    const action2 = new TwitchActionNewStreamOffline(
      this.serviceId,
      this.httpService,
      this.serviceTokenService,
      this.actionRegistry,
      this.configService,
      this.streamerService,
      this.followService,
    );
    const reaction1 = new TwitchReactionSendMessage(
      this.serviceId,
      this.httpService,
      this.configService,
      this.serviceTokenService,
      this.followService,
      this.reactionRegistry,
    );
    await action1.registerElement();
    await action2.registerElement();
    await reaction1.registerElement();
    this.actions.push(action1);
    this.actions.push(action2);
    this.reactions.push(reaction1);
  }

  async storeNewToken(userId: number) {
    const refresh_token =
      await this.serviceTokenService.getRefreshTokenServiceUser(
        userId,
        this.serviceId,
      );
    const url = 'https://id.twitch.tv/oauth2/token';
    const formData = new URLSearchParams();
    formData.append(
      'client_id',
      this.configService.get<string>('twitch.clientID'),
    );
    formData.append(
      'client_secret',
      this.configService.get<string>('twitch.clientSecret'),
    );
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', refresh_token);

    const response = await firstValueFrom(
      this.httpService.post(url, formData.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }),
    );
    await this.serviceTokenService.replaceAccessToken(
      userId,
      this.serviceId,
      response.data.access_token,
    );
  }
}
