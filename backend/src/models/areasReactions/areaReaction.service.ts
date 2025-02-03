import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAreaReactionDto } from './dto/create-areaReaction.dto';
import { AreaReaction } from './entities/areaReaction.entity';
import { Element } from '../elements/entities/element.entity';
import { Area } from '../areas/entities/area.entity';

@Injectable()
export class AreaReactionService {
  constructor(
    @InjectRepository(AreaReaction)
    private readonly AreasReactionsRepository: Repository<AreaReaction>,
    @InjectRepository(Element)
    private readonly ElementRepository: Repository<Element>,
    @InjectRepository(Area)
    private readonly AreaRepository: Repository<Area>,
  ) {}

  async create(
    createAreaReactionDto: CreateAreaReactionDto,
  ): Promise<AreaReaction> {
    const element = await this.ElementRepository.findOne({
      where: { id: createAreaReactionDto.elementId },
    });
    const area = await this.AreaRepository.findOne({
      where: { id: createAreaReactionDto.areaId },
    });
    if (!element || !area) {
      throw new Error('Element nor area not found');
    }

    const area_reaction = new AreaReaction();
    area_reaction.parameter_reaction = createAreaReactionDto.parameter_reaction;
    area_reaction.order = createAreaReactionDto.order;
    area_reaction.element = element;
    area_reaction.area = area;

    return this.AreasReactionsRepository.save(area_reaction);
  }

  async findByAction(id: number) {
    return await this.AreasReactionsRepository.find({
      where: { area: { id: id } },
      order: { order: 'ASC' },
    });
  }

  async findByActionInfo(id: number) {
    return await this.AreasReactionsRepository.find({
      where: { area: { id: id } },
      order: { order: 'ASC' },
      relations: ['element', 'element.service'],
    });
  }

  async removeByAction(id: number) {
    await this.AreasReactionsRepository.delete({ area: { id: id } });
  }
}
