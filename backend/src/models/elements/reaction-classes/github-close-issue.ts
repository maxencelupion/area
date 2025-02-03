import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ServiceTokenService } from '../../servicesTokens/serviceToken.service';
import { ReactionRegistry } from './reaction-registry.service';
import { BaseReaction } from './base-reaction.service';
import { Event } from '../event';

@Injectable()
export class GithubCloseIssue extends BaseReaction {
  constructor(
    serviceId: number,
    private httpService: HttpService,
    private serviceTokenService: ServiceTokenService,
    private reactionRegistry: ReactionRegistry,
  ) {
    super(
      'Github: close an issue',
      'close an issue using your Github account',
      'reaction',
      serviceId,
      'https://api.github.com/repos/',
    );
  }

  async registerElement() {
    await this.reactionRegistry.registerElement(this);
  }

  getServiceId() {
    return this.serviceId;
  }

  async execReaction(userId: number, parameters: Event) {
    const access_token = await this.serviceTokenService.findOneAction({
      where: {
        user: { id: userId },
        service: { id: this.serviceId },
      },
    });

    if (!access_token) {
      throw new UnauthorizedException();
    }

    const headers = {
      Authorization: `token ${access_token.key}`,
      'Content-Type': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };

    try {
      const url = parameters['body'];
      const response = await firstValueFrom(
        this.httpService.patch(url, { state: 'closed' }, { headers }),
      );
      if (response.status !== 200) {
        return;
      }
      const event: Event = {
        id: response.data.id,
        title: response.data.title,
        body: response.data.url,
        sender: response.data.user.login,
        date: response.data.closed_at,
      };
      return event;
    } catch (error) {
      console.error('Github error closing issue:', error);
    }
  }
}
