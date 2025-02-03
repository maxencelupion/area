import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseService } from './base-service.service';
import { ServiceTokenService } from 'src/models/servicesTokens/serviceToken.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { DictEmailsGmailService } from 'src/models/dictEmailsGmail/dictEmailsGmail.service';
import { ServiceRegistry } from './service-registry.service';
import { ActionRegistry } from 'src/models/elements/action-classes/action-registry.service';
import { firstValueFrom } from 'rxjs';
import { GmailActionEmailReceived } from 'src/models/elements/action-classes/gmail-email-received';
import { GmailReactionSendEmail } from 'src/models/elements/reaction-classes/gmail-send-email';
import { UserService } from 'src/models/users/user.service';
import { ReactionRegistry } from 'src/models/elements/reaction-classes/reaction-registry.service';
import { GmailActionEmailSent } from 'src/models/elements/action-classes/gmail-email-sent';
import { GmailReactionDeleteEmail } from 'src/models/elements/reaction-classes/gmail-delete-email';
import { GmailReactionFlagEmail } from 'src/models/elements/reaction-classes/gmail-flag-email';

@Injectable()
export class GoogleService extends BaseService implements OnModuleInit {
  constructor(
    private userService: UserService,
    private serviceTokenService: ServiceTokenService,
    private httpService: HttpService,
    private configService: ConfigService,
    private dictEmailsGmailService: DictEmailsGmailService,
    private serviceRegistry: ServiceRegistry,
    private actionRegistry: ActionRegistry,
    private reactionRegistry: ReactionRegistry,
  ) {
    super(
      'google',
      'Allow access to your Gmail account',
      '{"icon": "./assets/services/google.png", "color": "#FBBC04"}',
      true,
      [],
      [],
    );
  }

  async onModuleInit() {
    await this.serviceRegistry.registerService(this);
    const action1 = new GmailActionEmailReceived(
      this.serviceId,
      this.httpService,
      this.serviceTokenService,
      this.dictEmailsGmailService,
      this.actionRegistry,
    );
    const action2 = new GmailActionEmailSent(
      this.serviceId,
      this.httpService,
      this.serviceTokenService,
      this.dictEmailsGmailService,
      this.actionRegistry,
    );
    const reaction1 = new GmailReactionSendEmail(
      this.serviceId,
      this.httpService,
      this.serviceTokenService,
      this.userService,
      this.reactionRegistry,
    );
    const reaction2 = new GmailReactionDeleteEmail(
      this.serviceId,
      this.httpService,
      this.serviceTokenService,
      this.reactionRegistry,
    );
    const reaction3 = new GmailReactionFlagEmail(
      this.serviceId,
      this.httpService,
      this.serviceTokenService,
      this.reactionRegistry,
    );
    await action1.registerElement();
    await action2.registerElement();
    await reaction1.registerElement();
    await reaction2.registerElement();
    await reaction3.registerElement();
    this.actions.push(action1);
    this.actions.push(action2);
    this.reactions.push(reaction1);
    this.reactions.push(reaction2);
    this.reactions.push(reaction3);
  }

  async storeNewToken(userId: number) {
    const refresh_token =
      await this.serviceTokenService.getRefreshTokenServiceUser(
        userId,
        this.serviceId,
      );
    const url = 'https://oauth2.googleapis.com/token';
    const scopes = [
      'profile',
      'email',
      'https://mail.google.com/',
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.modify',
      'https://www.googleapis.com/auth/gmail.send',
    ].join(' ');
    const formData = new URLSearchParams();
    formData.append(
      'client_id',
      this.configService.get<string>('google.clientID'),
    );
    formData.append(
      'client_secret',
      this.configService.get<string>('google.clientSecret'),
    );
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', refresh_token);
    formData.append('scope', scopes);

    const response = await firstValueFrom(
      this.httpService.post(url, formData.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }),
    );
    await this.serviceTokenService.replaceAccessToken(
      userId,
      this.serviceId,
      response.data.access_token,
    );
  }
}
