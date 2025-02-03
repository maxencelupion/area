import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ServiceTokenService } from '../../servicesTokens/serviceToken.service';
import { ReactionRegistry } from './reaction-registry.service';
import { BaseReaction } from './base-reaction.service';
import { Event } from '../event';

@Injectable()
export class GmailReactionDeleteEmail extends BaseReaction {
  constructor(
    serviceId: number,
    private httpService: HttpService,
    private serviceTokenService: ServiceTokenService,
    private reactionRegistry: ReactionRegistry,
  ) {
    super(
      'Gmail: Delete Email',
      'delete email from your inbox folder in your Gmail account',
      'reaction',
      serviceId,
      'https://gmail.googleapis.com/gmail/v1/users/me/messages/',
    );
  }

  async registerElement() {
    await this.reactionRegistry.registerElement(this);
  }

  getServiceId() {
    return this.serviceId;
  }

  async execReaction(userId: number, parameters: Event) {
    const accessToken = await this.serviceTokenService.findOneAction({
      where: { user: { id: userId }, service: { id: this.serviceId } },
    });

    if (!accessToken) throw new UnauthorizedException();

    const headers = {
      Authorization: `Bearer ${accessToken.key}`,
      'Content-Type': 'application/json',
    };

    const response = await firstValueFrom(
      this.httpService.get(this.url, {
        headers,
        params: { maxResults: 1, q: 'in:inbox' },
      }),
    );

    const [latestEmail] = response.data.messages || [];
    if (!latestEmail) {
      return false;
    }

    const deleteEmail = async (emailId: string) => {
      const deleteResponse = await firstValueFrom(
        this.httpService.delete(`${this.url}${emailId}`, { headers }),
      );
      return {
        id: deleteResponse.data.id,
        title: '',
        body: '',
        sender: '',
        date: new Date(),
      };
    };

    try {
      return await deleteEmail(parameters['id'].toString());
    } catch {
      return await deleteEmail(latestEmail.id);
    }
  }
}
