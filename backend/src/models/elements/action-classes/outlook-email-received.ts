import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ServiceTokenService } from '../../servicesTokens/serviceToken.service';
import { BaseAction } from './base-action.service';
import { ActionRegistry } from './action-registry.service';
import { DictEmailsOutlookService } from 'src/models/dictEmailsOutlook/dictEmailsOutlook.service';
import { Event } from '../event';

@Injectable()
export class OutlookActionEmailReceived extends BaseAction {
  constructor(
    serviceId: number,
    private httpService: HttpService,
    private serviceTokenService: ServiceTokenService,
    private dictEmailsOutlookService: DictEmailsOutlookService,
    private actionRegistry: ActionRegistry,
  ) {
    super(
      'Outlook: Email received',
      'a new email is received on your Outlook inbox',
      'action',
      serviceId,
      'https://graph.microsoft.com/v1.0/me/mailFolders/inbox/messages',
      true,
    );
  }

  async registerElement() {
    await this.actionRegistry.registerElement(this);
  }

  getServiceId() {
    return this.serviceId;
  }

  async execAction(userId: number, _parameters: Event) {
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

    const params = {
      $filter: 'isRead eq false',
      $orderby: 'receivedDateTime desc',
      $top: 1,
    };
    const response = await firstValueFrom(
      this.httpService.get(this.url, {
        headers,
        params,
      }),
    );
    const emails = response.data.value;
    const lastEmailId =
      await this.dictEmailsOutlookService.findByUserIdElementName(
        userId,
        this.name,
      );

    if (emails && emails.length > 0) {
      const date = new Date();
      date.setMinutes(date.getMinutes() - 2);
      const date_iso = date.toISOString();
      const receivedDateTime = new Date(emails[0].receivedDateTime);

      if (receivedDateTime > new Date(date_iso)) {
        if (lastEmailId) {
          if (emails[0].id !== lastEmailId.lastEmailId) {
            await this.dictEmailsOutlookService.update(
              userId,
              emails[0].id,
              this.name,
            );
            const event: Event = {
              id: emails[0].id,
              title: emails[0].subject,
              body: emails[0].bodyPreview,
              sender: emails[0].sender.emailAddress.address,
              date: receivedDateTime,
            };
            return event;
          } else {
            return false;
          }
        } else {
          await this.dictEmailsOutlookService.create({
            userId: userId,
            lastEmailId: emails[0].id,
            elementName: this.name,
          });
        }
      } else {
        if (!lastEmailId) {
          await this.dictEmailsOutlookService.create({
            userId: userId,
            lastEmailId: 'No received email yet.',
            elementName: this.name,
          });
        }
      }
      return false;
    }
  }

  deleteAction(_userId: number) {
    return;
  }
}
