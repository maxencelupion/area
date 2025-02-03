import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ServiceTokenService } from '../../servicesTokens/serviceToken.service';
import { BaseReaction } from './base-reaction.service';
import { ReactionRegistry } from './reaction-registry.service';
import { Event } from '../event';

@Injectable()
export class OutlookReactionDeleteEmail extends BaseReaction {
  constructor(
    serviceId: number,
    private httpService: HttpService,
    private serviceTokenService: ServiceTokenService,
    private reactionRegistry: ReactionRegistry,
  ) {
    super(
      'Outlook: Delete an Email',
      'delete an email using your Outlook account',
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

    if (!accessToken) {
      throw new UnauthorizedException('Access token not found');
    }

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

    const deleteEmail = async (emailId: string) => {
      const deleteResponse = await firstValueFrom(
        this.httpService.delete(`${this.url}${emailId}`, { headers }),
      );
      if (deleteResponse.status !== 204) {
        throw new Error(
          `Failed to delete email with status: ${deleteResponse.status}`,
        );
      }
      return {
        id: deleteResponse.data.id,
        title: deleteResponse.data.subject,
        body: deleteResponse.data.bodyPreview,
        sender: deleteResponse.data.sender.emailAddress.address,
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
