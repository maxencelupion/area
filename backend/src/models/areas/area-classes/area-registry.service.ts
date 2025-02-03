import {
  Injectable,
  OnApplicationBootstrap,
  OnModuleDestroy,
} from '@nestjs/common';
import { BaseArea } from './base-area.service';
import { AreaService } from '../area.service';
import { Area } from '../entities/area.entity';
import { AreaReactionService } from 'src/models/areasReactions/areaReaction.service';
import { ReactionRegistry } from 'src/models/elements/reaction-classes/reaction-registry.service';
import { ActionRegistry } from 'src/models/elements/action-classes/action-registry.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ServiceRegistry } from 'src/models/services/service-classes/service-registry.service';

@Injectable()
export class AreaRegistry implements OnApplicationBootstrap, OnModuleDestroy {
  constructor(
    private readonly areaService: AreaService,
    private readonly areaReactionService: AreaReactionService,
    private readonly reactionRegistry: ReactionRegistry,
    private readonly actionRegistry: ActionRegistry,
    private readonly serviceRegistry: ServiceRegistry,
  ) {}
  private areas = new Map<number, BaseArea>();

  async onApplicationBootstrap() {
    const existingAreas = await this.areaService.findAll();
    for (const area of existingAreas) {
      await this.registerElement(area);
    }
  }

  async onModuleDestroy() {
    for (const area of this.areas) {
      await area[1].deleteArea();
    }
  }

  async registerElement(area: Area) {
    const objArea = new BaseArea(
      area.name,
      area.description,
      area.parameter,
      area.active,
      area.userId,
      area.actionId,
      this.areaReactionService,
      this.reactionRegistry,
      this.serviceRegistry,
      this.actionRegistry,
    );
    if (!objArea.needCronjob()) {
      await objArea.storeNewToken();
      await objArea.execAction();
    }
    this.areas.set(area.id, objArea);
    return true;
  }

  getElement(id: number): BaseArea | undefined {
    return this.areas.get(id);
  }

  async unregisterElement(id: number) {
    await this.areas.get(id).deleteArea();
    this.areas.delete(id);
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async execute() {
    for (const area of this.areas) {
      if (area[1].needCronjob() && area[1].isActive()) {
        await area[1].storeNewToken();
        const res = await area[1].execAction();
        if (res) {
          await this.areaService.updateLastExecuted(area[0]);
          await area[1].execReactions(area[0], res);
        }
      }
    }
  }
}
