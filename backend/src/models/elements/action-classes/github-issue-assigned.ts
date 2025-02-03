import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ServiceTokenService } from '../../servicesTokens/serviceToken.service';
import { DictDataGithubService } from '../../dictDataGithub/dictDataGithub.service';
import { ActionRegistry } from './action-registry.service';
import { BaseAction } from './base-action.service';
import { Event } from '../event';

@Injectable()
export class GithubActionIssueAssigned extends BaseAction {
  constructor(
    serviceId: number,
    private httpService: HttpService,
    private serviceTokenService: ServiceTokenService,
    private dictDataGithubService: DictDataGithubService,
    private actionRegistry: ActionRegistry,
  ) {
    super(
      'Github: issue assigned',
      'a new issue is assigned to you',
      'action',
      serviceId,
      'https://api.github.com/issues',
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
      throw new UnauthorizedException();
    }

    const headers = {
      Authorization: `token ${access_token.key}`,
      'Content-Type': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };

    const date = new Date();
    date.setMinutes(date.getMinutes() - 2);
    const date_iso = date.toISOString();

    const params = {
      sort: 'created',
      state: 'open',
      direction: 'asc',
      per_page: 1,
      since: date_iso,
    };

    const response = await firstValueFrom(
      this.httpService.get(this.url, {
        headers,
        params,
      }),
    );
    const issues = response.data;
    const lastIssueId =
      await this.dictDataGithubService.findByUserIdElementName(
        userId,
        this.name,
      );

    if (issues && issues.length > 0) {
      const issueAssignedId: string = issues[0].id.toString();
      if (lastIssueId) {
        if (issueAssignedId !== lastIssueId.lastDataId) {
          await this.dictDataGithubService.update(
            userId,
            issueAssignedId,
            this.name,
          );
          const event: Event = {
            id: parseInt(issueAssignedId),
            title: issues[0].title,
            body: issues[0].url,
            sender: issues[0].user.login,
            date: date,
          };
          return event;
        } else {
          return false;
        }
      } else {
        await this.dictDataGithubService.create({
          userId: userId,
          lastDataId: issueAssignedId,
          elementName: this.name,
        });
      }
    } else {
      if (!lastIssueId) {
        await this.dictDataGithubService.create({
          userId: userId,
          lastDataId: 'No issue assigned yet.',
          elementName: this.name,
        });
      }
    }
    return false;
  }

  deleteAction(_userId: number) {
    return;
  }
}
