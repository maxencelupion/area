import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ServiceTokenService } from '../../servicesTokens/serviceToken.service';
import { DictDataGithubService } from '../../dictDataGithub/dictDataGithub.service';
import { ActionRegistry } from './action-registry.service';
import { BaseAction } from './base-action.service';
import { Event } from '../event';

@Injectable()
export class GithubRepositoryCreated extends BaseAction {
  constructor(
    serviceId: number,
    private httpService: HttpService,
    private serviceTokenService: ServiceTokenService,
    private dictDataGithubService: DictDataGithubService,
    private actionRegistry: ActionRegistry,
  ) {
    super(
      'Github: repository created',
      'a new repository is created',
      'action',
      serviceId,
      'https://api.github.com/user/repos',
      true,
    );
  }

  async registerElement() {
    await this.actionRegistry.registerElement(this);
  }

  getServiceId() {
    return this.serviceId;
  }

  async execAction(userId: number, _parameters: any) {
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
      visibility: 'all',
      affiliation: 'owner',
      sort: 'created',
      direction: 'desc',
      per_page: 1,
      since: date_iso,
    };

    const response = await firstValueFrom(
      this.httpService.get(this.url, {
        headers,
        params,
      }),
    );
    const createdRepository = response.data;
    const lastCreatedRepositoryId =
      await this.dictDataGithubService.findByUserIdElementName(
        userId,
        this.name,
      );

    if (createdRepository && createdRepository.length > 0) {
      const createdRepositoryId: string = createdRepository[0].id.toString();
      if (lastCreatedRepositoryId) {
        if (createdRepositoryId !== lastCreatedRepositoryId.lastDataId) {
          await this.dictDataGithubService.update(
            userId,
            createdRepositoryId,
            this.name,
          );
          console.log('Github repository created:', createdRepository);
          const event: Event = {
            id: parseInt(createdRepositoryId),
            title: createdRepository[0].name,
            body: createdRepository[0].description,
            sender: createdRepository[0].owner.login,
            date: new Date(createdRepository[0].created_at),
          };
          return event;
        } else {
          return false;
        }
      } else {
        await this.dictDataGithubService.create({
          userId: userId,
          lastDataId: createdRepositoryId,
          elementName: this.name,
        });
      }
    } else {
      if (!lastCreatedRepositoryId) {
        await this.dictDataGithubService.create({
          userId: userId,
          lastDataId: 'No public repository created yet.',
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
