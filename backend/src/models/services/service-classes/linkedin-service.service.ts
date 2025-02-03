import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { BaseService } from './base-service.service';
import { ServiceRegistry } from './service-registry.service';
import { ServiceTokenService } from 'src/models/servicesTokens/serviceToken.service';
import { ReactionRegistry } from '../../elements/reaction-classes/reaction-registry.service';
import { LinkedInPostService } from 'src/models/elements/reaction-classes/linkedin-post.service';

@Injectable()
export class LinkedinService extends BaseService implements OnModuleInit {
  constructor(
    private serviceTokenService: ServiceTokenService,
    private httpService: HttpService,
    private reactionRegistry: ReactionRegistry,
    private serviceRegistry: ServiceRegistry,
  ) {
    super(
      'linkedin',
      'Share activity on Linkedin',
      '{"icon": "./assets/services/linkedin.png", "color": "#3d9ae8"}',
      true,
      [],
      [],
    );
  }

  async onModuleInit() {
    await this.serviceRegistry.registerService(this);
    const reaction1 = new LinkedInPostService(
      this.serviceId,
      this.httpService,
      this.serviceTokenService,
      this.reactionRegistry,
    );
    await reaction1.registerElement();
    this.reactions.push(reaction1);
  }

  async storeNewToken(userId: number) {
    return userId;
  }
}
