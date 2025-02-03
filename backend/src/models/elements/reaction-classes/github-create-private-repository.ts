import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ServiceTokenService } from '../../servicesTokens/serviceToken.service';
import { ReactionRegistry } from './reaction-registry.service';
import { BaseReaction } from './base-reaction.service';
import { Event } from '../event';

@Injectable()
export class GithubCreatePrivateRepository extends BaseReaction {
  constructor(
    serviceId: number,
    private httpService: HttpService,
    private serviceTokenService: ServiceTokenService,
    private reactionRegistry: ReactionRegistry,
  ) {
    super(
      'Github: create a private repository',
      'create a private repository using your Github account',
      'reaction',
      serviceId,
      'https://api.github.com/user/repos',
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

    const data = {
      name: parameters['title'],
      description: parameters['body'],
      private: true,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(this.url, data, { headers }),
      );
      if (response.status !== 201) {
        return;
      }
      const event: Event = {
        id: response.data.id,
        title: response.data.name,
        body: response.data.description,
        sender: response.data.owner.login,
        date: response.data.created_at,
      };
      return event;
    } catch (error) {
      console.error('Github error creating a new private repository:', error);
      throw error;
    }
  }
}
