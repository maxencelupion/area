import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ServiceTokenService } from '../../servicesTokens/serviceToken.service';
import { BaseReaction } from './base-reaction.service';
import { UserService } from '../../users/user.service';
import { ReactionRegistry } from './reaction-registry.service';
import { Event } from '../event';

@Injectable()
export class SpotifyNextService extends BaseReaction {
  constructor(
    serviceId: number,
    private httpService: HttpService,
    private serviceTokenService: ServiceTokenService,
    private reactionRegistry: ReactionRegistry,
    private userService: UserService,
  ) {
    super(
      'Spotify: Skip to next',
      'skip to next music',
      'reaction',
      serviceId,
      'https://api.spotify.com/v1/me/player/next',
    );
  }

  async registerElement() {
    await this.reactionRegistry.registerElement(this);
  }

  getServiceId() {
    return this.serviceId;
  }

  async execReaction(userId: number, parameters: Event) {
    const user = await this.userService.findOneId(userId);
    const access_token = await this.serviceTokenService.findOneAction({
      where: {
        user: { id: userId },
        service: { id: this.serviceId },
      },
    });
    if (!access_token) {
      throw UnauthorizedException;
    }

    const headers = {
      Authorization: `Bearer ${access_token.key} `,
      'Content-Type': 'application/json',
    };
    try {
      let url: string = this.url;
      if (parameters.id) {
        const device_id: string = parameters.id.toString();
        url = `?device_id=${device_id}`;
        await this.httpService.axiosRef.post(url, null, {
          headers,
        });
        return {
          id: null,
          title: 'Spotify action',
          body: `Spotify API Skip to Next on your device ${device_id}`,
          sender: user.email,
          date: new Date(),
        };
      }
    } catch {
      try {
        await this.httpService.axiosRef.post(this.url, null, {
          headers,
        });
        return {
          id: null,
          title: 'Spotify action',
          body: `Spotify API Skip to Next on your device`,
          sender: user.email,
          date: new Date(),
        };
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
  }
}
