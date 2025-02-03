import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServiceManager } from './models/services/service-manager.service';
import { ElementService } from './models/elements/element.service';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private serviceManager: ServiceManager,
    private elementService: ElementService,
  ) {}

  async getServices() {
    const services = await this.serviceManager.findAll();
    const results = [];
    for (const service of services) {
      results.push({
        name: service.name,
        description: service.description,
        need_token: service.need_token,
        actions: await this.getActions(service.id),
        reactions: await this.getReactions(service.id),
      });
    }
    return results;
  }

  async getActions(serviceId: number) {
    const actions =
      await this.elementService.findActionsInServiceById(serviceId);
    const results = [];
    for (const action of actions) {
      results.push({
        name: action.name,
        description: action.description,
      });
    }
    return results;
  }

  async getReactions(serviceId: number) {
    const reactions =
      await this.elementService.findReactionsInServiceById(serviceId);
    const results = [];
    for (const reaction of reactions) {
      results.push({
        name: reaction.name,
        description: reaction.description,
      });
    }
    return results;
  }
}
