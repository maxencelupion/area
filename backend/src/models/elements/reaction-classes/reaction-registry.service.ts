import { Injectable } from '@nestjs/common';
import { ElementService } from '../element.service';
import { BaseReaction } from './base-reaction.service';

@Injectable()
export class ReactionRegistry {
  constructor(private elementService: ElementService) {}
  private actions = new Map<number, BaseReaction>();

  async registerElement(element: BaseReaction) {
    const tmp = await element.initInDb(this.elementService);
    if (!tmp) {
      return false;
    }
    this.actions.set(tmp.id, element);
    return true;
  }

  getElement(id: number): BaseReaction | undefined {
    return this.actions.get(id);
  }

  unregisterElement(id: number) {
    this.actions.delete(id);
  }
}
