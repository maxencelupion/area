import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { BaseService } from './base-service.service';
import { ServiceTokenService } from '../../servicesTokens/serviceToken.service';
import { ConfigService } from '@nestjs/config';
import { ServiceRegistry } from './service-registry.service';
import { GithubActionIssueAssigned } from '../../elements/action-classes/github-issue-assigned';
import { GithubRepositoryCreated } from '../../elements/action-classes/github-repository-created';
import { GithubCloseIssue } from '../../elements/reaction-classes/github-close-issue';
import { DictDataGithubService } from '../../dictDataGithub/dictDataGithub.service';
import { ActionRegistry } from '../../elements/action-classes/action-registry.service';
import { ReactionRegistry } from '../../elements/reaction-classes/reaction-registry.service';
import { GithubCreatePrivateRepository } from '../../elements/reaction-classes/github-create-private-repository';
@Injectable()
export class GithubService extends BaseService implements OnModuleInit {
  constructor(
    private serviceTokenService: ServiceTokenService,
    private httpService: HttpService,
    private configService: ConfigService,
    private serviceRegistry: ServiceRegistry,
    private dictDataGithubService: DictDataGithubService,
    private actionRegistry: ActionRegistry,
    private reactionRegistry: ReactionRegistry,
  ) {
    super(
      'github',
      'Allow access to your GitHub account',
      '{"icon": "./assets/services/github.png", "color": "#24292e"}',
      true,
      [],
      [],
    );
  }

  async onModuleInit() {
    await this.serviceRegistry.registerService(this);
    const action1 = new GithubActionIssueAssigned(
      this.serviceId,
      this.httpService,
      this.serviceTokenService,
      this.dictDataGithubService,
      this.actionRegistry,
    );
    const action2 = new GithubRepositoryCreated(
      this.serviceId,
      this.httpService,
      this.serviceTokenService,
      this.dictDataGithubService,
      this.actionRegistry,
    );
    const reaction1 = new GithubCloseIssue(
      this.serviceId,
      this.httpService,
      this.serviceTokenService,
      this.reactionRegistry,
    );
    const reaction2 = new GithubCreatePrivateRepository(
      this.serviceId,
      this.httpService,
      this.serviceTokenService,
      this.reactionRegistry,
    );
    await action1.registerElement();
    await action2.registerElement();
    await reaction1.registerElement();
    await reaction2.registerElement();
    this.actions.push(action1);
    this.actions.push(action2);
    this.reactions.push(reaction1);
    this.reactions.push(reaction2);
  }

  async storeNewToken(userId: number) {
    return userId;
  }
}
