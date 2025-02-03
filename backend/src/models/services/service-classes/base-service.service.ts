import { Injectable } from '@nestjs/common';
import { ServiceManager } from '../service-manager.service';
import { CreateServiceDto } from '../dto/create-service.dto';
import { BaseAction } from '../../elements/action-classes/base-action.service';
import { BaseReaction } from 'src/models/elements/reaction-classes/base-reaction.service';

@Injectable()
export abstract class BaseService {
  protected serviceId: number;

  protected constructor(
    public name: string,
    public description: string,
    public front_data: string,
    public need_token: boolean,
    protected actions: BaseAction[],
    protected reactions: BaseReaction[],
  ) {}

  async initInDb(services: ServiceManager) {
    const existingService = await services.findByName(this.name);
    if (!existingService) {
      const service = new CreateServiceDto();
      service.name = this.name;
      service.description = this.description;
      service.front_data = this.front_data;
      service.key_url = 'key_url';
      service.need_token = this.need_token;
      const newService = await services.create(service);
      this.serviceId = newService.id;
      return newService;
    } else {
      this.serviceId = existingService.id;
      return existingService;
    }
  }

  abstract storeNewToken(userId: number);
}
