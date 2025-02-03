import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ServiceTokenService } from '../../servicesTokens/serviceToken.service';
import { BaseAction } from './base-action.service';
import { ActionRegistry } from './action-registry.service';
import { Event } from '../event';

@Injectable()
export class SpotifyPlayerService extends BaseAction {
  constructor(
    serviceId: number,
    private httpService: HttpService,
    private serviceTokenService: ServiceTokenService,
    private actionRegistry: ActionRegistry,
  ) {
    super(
      'Spotify: Get playback state',
      'you are currently listening to music',
      'action',
      serviceId,
      'https://api.spotify.com/v1/me/player',
      true,
    );
  }

  async registerElement() {
    await this.actionRegistry.registerElement(this);
  }

  getServiceId() {
    return this.serviceId;
  }

  async execAction(userId: number, _parameters: any) {
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
      Authorization: `Bearer ${access_token.key}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await this.httpService.axiosRef.get(this.url, {
        headers,
      });
      const data = response.data;
      if (data) {
        const device_id: number = parseInt(data.device.id);
        const device_type: string = data.device.type;
        const device_name: string = data.device.name;
        const item_artist: string = data.item.artists[0].name;
        const item_name: string = data.item.name;
        const event: Event = {
          id: device_id,
          title: item_name,
          body: `Current user is listening to ${item_name} by ${item_artist} on a ${device_type} called ${device_name}`,
          sender: null,
          date: null,
        };
        console.log(
          `Current user is listening to ${item_name} by ${item_artist} on a ${device_type} called ${device_name}`,
        );
        return event;
      }
      return undefined;
    } catch (error) {
      console.error(
        'Error Spotify Next reaction:',
        error.response?.data || error.message,
      );
      return undefined;
    }
  }

  deleteAction(_userId: number) {
    return;
  }
}
