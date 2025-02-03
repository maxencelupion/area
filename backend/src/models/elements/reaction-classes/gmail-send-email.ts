import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ServiceTokenService } from '../../servicesTokens/serviceToken.service';
import { UserService } from '../../users/user.service';
import { BaseReaction } from './base-reaction.service';
import { ReactionRegistry } from './reaction-registry.service';
import { Event } from '../event';

@Injectable()
export class GmailReactionSendEmail extends BaseReaction {
  constructor(
    serviceId: number,
    private httpService: HttpService,
    private serviceTokenService: ServiceTokenService,
    private userService: UserService,
    private reactionRegistry: ReactionRegistry,
  ) {
    super(
      'Gmail: Send an Email',
      'send an email using your Gmail account',
      'reaction',
      serviceId,
      'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
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

    const rawEmail = this.createRawEmail(
      parameters['sender'] ? parameters['sender'] : user.email,
      parameters['title'] ? parameters['title'] : 'Hello from AREA / Default',
      parameters['body'] ? parameters['body'] : 'Hi again from AREA / Default',
    );
    const emailData = {
      raw: rawEmail,
    };
    try {
      const reponse = await firstValueFrom(
        this.httpService.post(this.url, emailData, { headers }),
      );
      const event: Event = {
        id: reponse.data.id,
        title: '',
        body: '',
        sender: '',
        date: new Date(),
      };
      return event;
    } catch (error) {
      console.log('Google error sending email:', error);
    }
    return false;
  }

  private createRawEmail(to: string, subject: string, body: string): string {
    const email = [
      `To: ${to}`,
      `Subject: ${subject}`,
      `Content-Type: text/html; charset="UTF-8"`,
      '',
      body,
    ].join('\n');

    return Buffer.from(email)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
}
