import { Injectable } from '@nestjs/common';
import { AreaReactionService } from 'src/models/areasReactions/areaReaction.service';
import { ActionRegistry } from 'src/models/elements/action-classes/action-registry.service';
import { ReactionRegistry } from 'src/models/elements/reaction-classes/reaction-registry.service';
import { ServiceRegistry } from 'src/models/services/service-classes/service-registry.service';

@Injectable()
export class BaseArea {
  constructor(
    public name: string,
    private description: string,
    private parameter: any,
    private active: boolean,
    private userId: number,
    private actionId: number,
    private readonly areaReactionService: AreaReactionService,
    private readonly reactionRegistry: ReactionRegistry,
    private readonly serviceRegistry: ServiceRegistry,
    private readonly actionRegistry: ActionRegistry,
  ) {}

  async deleteArea() {
    const action = this.actionRegistry.getElement(this.actionId);
    await action.deleteAction(this.userId);
  }

  getActionId() {
    return this.actionId;
  }

  getUserId() {
    return this.userId;
  }

  isActive() {
    return this.active;
  }

  changeStatus() {
    this.active = !this.active;
  }

  needCronjob() {
    const action = this.actionRegistry.getElement(this.actionId);
    return action.needCronjob();
  }

  async storeNewToken() {
    const action = this.actionRegistry.getElement(this.actionId);
    const service = this.serviceRegistry.getElement(action.getServiceId());
    await service.storeNewToken(this.userId);
  }

  async execAction() {
    const action = this.actionRegistry.getElement(this.actionId);
    return await action.execAction(this.userId, this.parameter);
  }

  async execReactions(areaId: number, previousParams: Event) {
    const areaReactions = await this.areaReactionService.findByAction(areaId);
    for (const areaReaction of areaReactions) {
      const reaction = this.reactionRegistry.getElement(areaReaction.elementId);
      const service = this.serviceRegistry.getElement(reaction.getServiceId());
      await service.storeNewToken(this.userId);
      const allParams = {
        ...previousParams,
        ...areaReaction.parameter_reaction,
      };
      previousParams = await reaction.execReaction(this.userId, allParams);
    }
  }
}
