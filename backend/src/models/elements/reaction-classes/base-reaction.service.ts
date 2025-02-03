import { Injectable } from '@nestjs/common';
import { ElementService } from '../element.service';
import { CreateElementDto } from '../dto/create-element.dto';

@Injectable()
export abstract class BaseReaction {
  constructor(
    protected name: string,
    protected description: string,
    protected type: string,
    protected serviceId: number,
    protected url: string,
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

  abstract registerElement();
  abstract getServiceId();
  abstract execReaction(userId: number, parameters: any);
}
