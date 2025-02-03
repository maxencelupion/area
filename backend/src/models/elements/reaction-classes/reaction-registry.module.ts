import { Module } from '@nestjs/common';
import { ElementModule } from '../element.module';
import { ReactionRegistry } from './reaction-registry.service';

@Module({
  imports: [ElementModule],
  providers: [ReactionRegistry],
  exports: [ReactionRegistry],
})
export class ReactionRegistryModule {}
