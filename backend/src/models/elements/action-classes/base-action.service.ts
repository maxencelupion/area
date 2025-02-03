import { Injectable } from '@nestjs/common';
import { ElementService } from '../element.service';
import { CreateElementDto } from '../dto/create-element.dto';

@Injectable()
export abstract class BaseAction {
  constructor(
    protected name: string,
    protected description: string,
    protected type: string,
    protected serviceId: number,
    protected url: string,
    protected cronjob: boolean,
  ) {}

  async initInDb(elementService: ElementService) {
    const existingElements = await elementService.findByName(this.name);
    if (!existingElements) {
      const element = new CreateElementDto();
      element.name = this.name;
      element.description = this.description;
      element.type = this.type;
      element.serviceId = this.serviceId;
      element.url = this.url;
      return await elementService.create(element);
    }
    return existingElements;
  }

  needCronjob() {
    return this.cronjob;
  }

  abstract registerElement();
  abstract getServiceId();
  abstract execAction(userId: number, parameters: any);
  abstract deleteAction(userId: number);
}
