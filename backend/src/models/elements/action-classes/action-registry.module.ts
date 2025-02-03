import { Module } from '@nestjs/common';
import { ActionRegistry } from './action-registry.service';
import { ElementModule } from '../element.module';

@Module({
  imports: [ElementModule],
  providers: [ActionRegistry],
  exports: [ActionRegistry],
})
export class ActionRegistryModule {}
