import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ServiceTokenService } from '../../servicesTokens/serviceToken.service';
import { UserService } from '../../users/user.service';
import { BaseReaction } from './base-reaction.service';
import { ReactionRegistry } from './reaction-registry.service';
import { Event } from '../event';

@Injectable()
export class OutlookReactionSendEmail extends BaseReaction {
  constructor(
    serviceId: number,
    private httpService: HttpService,
    private serviceTokenService: ServiceTokenService,
    private userService: UserService,
    private reactionRegistry: ReactionRegistry,
  ) {
    super(
      'Outlook: Send an Email',
      'send an email using your Outlook account',
      'reaction',
      serviceId,
      'https://graph.microsoft.com/v1.0/me/sendMail',
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
      Authorization: `Bearer ${access_token.key}`,
      'Content-Type': 'application/json',
    };
    const emailData = {
      message: {
        subject: parameters['title']
          ? parameters['title']
          : 'Hello from AREA / Default',
        body: {
          contentType: 'HTML',
          content: parameters['body']
            ? parameters['body']
            : 'Hi again from AREA / Default',
        },
        toRecipients: [
          {
            emailAddress: {
              address: parameters['sender'] ? parameters['sender'] : user.email,
            },
          },
        ],
      },
      saveToSentItems: 'true',
    };
    try {
      await firstValueFrom(
        this.httpService.post(this.url, emailData, { headers }),
      );
      const event: Event = {
        id: 0,
        title: emailData.message.subject,
        body: emailData.message.body.content,
        sender: emailData.message.toRecipients[0].emailAddress.address,
        date: new Date(),
      };
      return event;
    } catch (error) {
      console.log('Microsoft error sending email:', error);
    }
    return false;
  }
}
