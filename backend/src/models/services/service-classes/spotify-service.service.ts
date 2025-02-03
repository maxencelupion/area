import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { BaseService } from './base-service.service';
import { ServiceRegistry } from './service-registry.service';
import { ServiceTokenService } from 'src/models/servicesTokens/serviceToken.service';
import { ActionRegistry } from '../../elements/action-classes/action-registry.service';
import { SpotifyPlayerService } from '../../elements/action-classes/spotify-player.service';
import { ConfigService } from '@nestjs/config';
import { SpotifyNextService } from '../../elements/reaction-classes/spotify-next.service';
import { ReactionRegistry } from '../../elements/reaction-classes/reaction-registry.service';
import { UserService } from 'src/models/users/user.service';

@Injectable()
export class SpotifyService extends BaseService implements OnModuleInit {
  constructor(
    private serviceTokenService: ServiceTokenService,
    private httpService: HttpService,
    private actionRegistry: ActionRegistry,
    private reactionRegistry: ReactionRegistry,
    private serviceRegistry: ServiceRegistry,
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super(
      'spotify',
      'Allow access to your Spotify account',
      '{"icon": "./assets/services/spotify.png", "color": "#1DB954"}',
      true,
      [],
      [],
    );
  }

  async onModuleInit() {
    await this.serviceRegistry.registerService(this);
    const action1 = new SpotifyPlayerService(
      this.serviceId,
      this.httpService,
      this.serviceTokenService,
      this.actionRegistry,
    );
    const reaction1 = new SpotifyNextService(
      this.serviceId,
      this.httpService,
      this.serviceTokenService,
      this.reactionRegistry,
      this.userService,
    );
    await action1.registerElement();
    await reaction1.registerElement();
    this.actions.push(action1);
    this.reactions.push(reaction1);
  }

  async storeNewToken(userId: number) {
    const refresh_token =
      await this.serviceTokenService.getRefreshTokenServiceUser(
        userId,
        this.serviceId,
      );
    const client_id = this.configService.get<string>('spotify.client_id');
    const client_secret = this.configService.get<string>(
      'spotify.client_secret',
    );
    const url = 'https://accounts.spotify.com/api/token';
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
      client_id: this.configService.get<string>('spotify.client_id'),
    });
    const authHeader = Buffer.from(`${client_id}:${client_secret}`).toString(
      'base64',
    );
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${authHeader}`,
    };
    try {
      const response = await this.httpService.axiosRef.post(
        url,
        body.toString(),
        { headers },
      );

      if (response.status === 200) {
        await this.serviceTokenService.replaceAccessToken(
          userId,
          this.serviceId,
          response.data.access_token,
        );
      } else {
        console.error(
          `Unexpected response status: ${response.status}`,
          response.data,
        );
      }
    } catch (error) {
      console.error(
        'Error refreshing token:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }
}
