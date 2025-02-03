import { Injectable } from '@nestjs/common';
import { BaseAction } from './base-action.service';
import { ElementService } from '../element.service';

@Injectable()
export class ActionRegistry {
  constructor(private elementService: ElementService) {}
  private actions = new Map<number, BaseAction>();

  async registerElement(element: BaseAction) {
    const tmp = await element.initInDb(this.elementService);
    if (!tmp) {
      return false;
    }
    this.actions.set(tmp.id, element);
    return true;
  }

  getElement(id: number): BaseAction | undefined {
    return this.actions.get(id);
  }

  unregisterElement(id: number) {
    this.actions.delete(id);
  }
}
