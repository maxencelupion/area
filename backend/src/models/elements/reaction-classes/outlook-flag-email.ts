import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ServiceTokenService } from '../../servicesTokens/serviceToken.service';
import { BaseReaction } from './base-reaction.service';
import { ReactionRegistry } from './reaction-registry.service';
import { Event } from '../event';

@Injectable()
export class OutlookReactionFlagEmail extends BaseReaction {
  constructor(
    serviceId: number,
    private httpService: HttpService,
    private serviceTokenService: ServiceTokenService,
    private reactionRegistry: ReactionRegistry,
  ) {
    super(
      'Outlook: Flag an Email',
      'flag your last received email in your inbox folder using your Outlook account',
      'reaction',
      serviceId,
      'https://graph.microsoft.com/v1.0/me/messages/',
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

    if (!accessToken) throw new UnauthorizedException('Access token not found');

    const headers = {
      Authorization: `Bearer ${accessToken.key}`,
      'Content-Type': 'application/json',
    };

    const response = await firstValueFrom(
      this.httpService.get(
        'https://graph.microsoft.com/v1.0/me/mailFolders/inbox/messages',
        {
          headers,
          params: { $orderby: 'receivedDateTime desc', $top: 1 },
        },
      ),
    );

    const [latestEmail] = response.data.value || [];
    if (!latestEmail) {
      return false;
    }

    const data = { flag: { flagStatus: 'flagged' } };
    const flagEmail = async (emailId: string) => {
      const response = await firstValueFrom(
        this.httpService.patch(`${this.url}${emailId}`, data, { headers }),
      );
      return {
        id: response.data.id,
        title: response.data.subject,
        body: response.data.bodyPreview,
        sender: response.data.sender.emailAddress.address,
        date: new Date(),
      };
    };

    try {
      return await flagEmail(parameters['id'].toString());
    } catch {
      return await flagEmail(latestEmail.id);
    }
  }
}
