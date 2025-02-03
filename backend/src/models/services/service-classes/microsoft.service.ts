import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseService } from './base-service.service';
import { ServiceTokenService } from 'src/models/servicesTokens/serviceToken.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ServiceRegistry } from './service-registry.service';
import { ActionRegistry } from 'src/models/elements/action-classes/action-registry.service';
import { firstValueFrom } from 'rxjs';
import { ReactionRegistry } from 'src/models/elements/reaction-classes/reaction-registry.service';
import { OutlookActionEmailReceived } from 'src/models/elements/action-classes/outlook-email-received';
import { DictEmailsOutlookService } from 'src/models/dictEmailsOutlook/dictEmailsOutlook.service';
import { OutlookReactionSendEmail } from 'src/models/elements/reaction-classes/outlook-send-email';
import { UserService } from 'src/models/users/user.service';
import { OutlookActionEmailSent } from 'src/models/elements/action-classes/outlook-email-sent';
import { OutlookReactionDeleteEmail } from 'src/models/elements/reaction-classes/outlook-delete-email';
import { OutlookReactionFlagEmail } from 'src/models/elements/reaction-classes/outlook-flag-email';

@Injectable()
export class MicrosoftService extends BaseService implements OnModuleInit {
  constructor(
    private serviceTokenService: ServiceTokenService,
    private userService: UserService,
    private httpService: HttpService,
    private configService: ConfigService,
    private dictEmailsOutlookService: DictEmailsOutlookService,
    private serviceRegistry: ServiceRegistry,
    private actionRegistry: ActionRegistry,
    private reactionRegistry: ReactionRegistry,
  ) {
    super(
      'microsoft',
      'Allow access to your Outlook account',
      '{"icon": "./assets/services/microsoft.png", "color": "#7FBA00"}',
      true,
      [],
      [],
    );
  }

  async onModuleInit() {
    await this.serviceRegistry.registerService(this);
    const action1 = new OutlookActionEmailReceived(
      this.serviceId,
      this.httpService,
      this.serviceTokenService,
      this.dictEmailsOutlookService,
      this.actionRegistry,
    );
    const action2 = new OutlookActionEmailSent(
      this.serviceId,
      this.httpService,
      this.serviceTokenService,
      this.dictEmailsOutlookService,
      this.actionRegistry,
    ); //
    const reaction1 = new OutlookReactionSendEmail(
      this.serviceId,
      this.httpService,
      this.serviceTokenService,
      this.userService,
      this.reactionRegistry,
    ); //
    const reaction2 = new OutlookReactionDeleteEmail(
      this.serviceId,
      this.httpService,
      this.serviceTokenService,
      this.reactionRegistry,
    );
    const reaction3 = new OutlookReactionFlagEmail(
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
    const url = 'https://login.microsoftonline.com/common/oauth2/v2.0/token';
    const scopes = [
      'offline_access',
      'Mail.ReadWrite',
      'Mail.Send',
      'User.Read',
    ].join(' ');
    const formData = new URLSearchParams();
    formData.append(
      'client_id',
      this.configService.get<string>('ms.client_id'),
    );
    formData.append(
      'client_secret',
      this.configService.get<string>('ms.client_secret'),
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
