// element.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElementService } from './element.service';
import { ElementController } from './element.controller';
import { Element } from './entities/element.entity';
import { Service } from '../services/entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Element, Service])],
  providers: [ElementService],
  controllers: [ElementController],
  exports: [ElementService],
})
export class ElementModule {}
