import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateAreaDto } from './dto/create-area.dto';
import { Area } from './entities/area.entity';
import { Element } from '../elements/entities/element.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private readonly AreasRepository: Repository<Area>,
    @InjectRepository(Element)
    private readonly ElementRepository: Repository<Element>,
    @InjectRepository(User)
    private readonly UsersRepository: Repository<User>,
  ) {}

  async create(createAreaDto: CreateAreaDto): Promise<Area> {
    const element = await this.ElementRepository.findOne({
      where: { id: createAreaDto.actionId },
    });
    const user = await this.UsersRepository.findOne({
      where: { id: createAreaDto.userId },
    });
    if (!element || !user) {
      throw new Error('Element nor user not found');
    }

    const area = new Area();
    area.name = createAreaDto.name;
    area.description = createAreaDto.description;
    area.parameter = createAreaDto.parameter;
    area.active = createAreaDto.active;
    area.last_executed = createAreaDto.last_executed;
    area.user = user;
    area.action = element;
    area.color = createAreaDto.color;
    return this.AreasRepository.save(area);
  }

  async findAllByUser(userId: number) {
    return await this.AreasRepository.find({
      where: { userId: userId },
      relations: [
        'action',
        'action.service',
        'areaReaction',
        'areaReaction.element',
        'areaReaction.element.service',
      ],
    });
  }

  async findAll(option?: FindManyOptions<Area>) {
    return await this.AreasRepository.find(option);
  }

  async findOne(id: number): Promise<Area> {
    return await this.AreasRepository.findOneBy({ id: id });
  }

  async findOneInfo(id: number): Promise<Area> {
    return await this.AreasRepository.findOne({
      where: { id: id },
      relations: [
        'action',
        'action.service',
        'areaReaction',
        'areaReaction.element',
        'areaReaction.element.service',
      ],
    });
  }

  async update(id: number, newAreaAction: CreateAreaDto) {
    await this.AreasRepository.update(id, newAreaAction);
  }

  async remove(id: number): Promise<void> {
    await this.AreasRepository.delete(id);
  }

  async changeStatus(id: number) {
    const oldArea = await this.AreasRepository.findOneBy({ id: id });
    await this.AreasRepository.update(id, { active: !oldArea.active });
  }

  async updateLastExecuted(id: number) {
    await this.AreasRepository.update(id, { last_executed: new Date() });
  }
}
