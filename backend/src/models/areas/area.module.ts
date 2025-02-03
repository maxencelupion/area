import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { Area } from './entities/area.entity';
import { Element } from '../elements/entities/element.entity';
import { User } from '../users/entities/user.entity';
import { AreaReactionService } from '../areasReactions/areaReaction.service';
import { AreaReaction } from '../areasReactions/entities/areaReaction.entity';
import { Service } from '../services/entities/service.entity';
import { ServiceModule } from '../services/service.module';
import { ElementModule } from '../elements/element.module';
import { AreaRegistry } from './area-classes/area-registry.service';
import { ActionRegistryModule } from '../elements/action-classes/action-registry.module';
import { ReactionRegistryModule } from '../elements/reaction-classes/reaction-registry.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Area, Element, User, AreaReaction, Service]),
    forwardRef(() => ServiceModule),
    ElementModule,
    ActionRegistryModule,
    ReactionRegistryModule,
  ],
  providers: [AreaService, AreaReactionService, AreaRegistry],
  controllers: [AreaController],
  exports: [AreaService, AreaReactionService, AreaRegistry],
})
export class AreaModule {}
