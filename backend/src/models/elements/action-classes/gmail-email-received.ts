import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ServiceTokenService } from '../../servicesTokens/serviceToken.service';
import { DictEmailsGmailService } from 'src/models/dictEmailsGmail/dictEmailsGmail.service';
import { BaseAction } from './base-action.service';
import { ActionRegistry } from './action-registry.service';
import { Event } from '../event';

@Injectable()
export class GmailActionEmailReceived extends BaseAction {
  constructor(
    serviceId: number,
    private httpService: HttpService,
    private serviceTokenService: ServiceTokenService,
    private dictEmailsGmailService: DictEmailsGmailService,
    private actionRegistry: ActionRegistry,
  ) {
    super(
      'Gmail: Email received',
      'a new email is received on your Gmail inbox',
      'action',
      serviceId,
      'https://gmail.googleapis.com/gmail/v1/users/me/messages/',
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
      maxResults: 1,
      q: 'is:unread',
    };

    const responseEmails = await firstValueFrom(
      this.httpService.get(this.url, {
        headers,
        params,
      }),
    );

    const emails = responseEmails.data.messages;
    const emailId = emails[0].id;

    const responseEmail = await firstValueFrom(
      this.httpService.get(this.url + emailId, {
        headers,
      }),
    );

    const lastEmailId =
      await this.dictEmailsGmailService.findByUserIdElementName(
        userId,
        this.name,
      );

    if (emails && emails.length > 0) {
      const date = new Date();
      date.setMinutes(date.getMinutes() - 4);
      const date_iso = date.toISOString();
      const dateHeader = responseEmail.data.payload.headers.find(
        (header: { name: string }) => header.name === 'Date',
      );
      const receivedDateTime = new Date(dateHeader.value);
      if (receivedDateTime > new Date(date_iso)) {
        if (lastEmailId) {
          if (emails[0].id !== lastEmailId.lastEmailId) {
            await this.dictEmailsGmailService.update(
              userId,
              emails[0].id,
              this.name,
            );
            const subjectHeader = responseEmail.data.payload.headers.find(
              (header: { name: string }) => header.name === 'Subject',
            );
            const fromHeader = responseEmail.data.payload.headers.find(
              (header: { name: string }) => header.name === 'From',
            );
            const correspondentHeader = fromHeader.value.substring(
              fromHeader.value.indexOf('<') + 1,
              fromHeader.value.lastIndexOf('>'),
            );
            const event: Event = {
              id: emails[0].id,
              title: subjectHeader.value,
              body: responseEmail.data.snippet,
              sender: correspondentHeader,
              date: receivedDateTime,
            };
            return event;
          } else {
            return false;
          }
        } else {
          await this.dictEmailsGmailService.create({
            userId: userId,
            lastEmailId: emails[0].id,
            elementName: this.name,
          });
          return false;
        }
      } else {
        if (!lastEmailId) {
          await this.dictEmailsGmailService.create({
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
