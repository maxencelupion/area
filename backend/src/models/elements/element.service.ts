import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateElementDto } from './dto/create-element.dto';
import { Element } from './entities/element.entity';
import { Service } from '../services/entities/service.entity';

@Injectable()
export class ElementService {
  constructor(
    @InjectRepository(Element)
    private readonly elementsRepository: Repository<Element>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async create(createElementDto: CreateElementDto): Promise<Element> {
    const service = await this.serviceRepository.findOne({
      where: { id: createElementDto.serviceId },
    });
    if (!service) {
      throw new Error('Service not found');
    }

    const element = new Element();
    element.name = createElementDto.name;
    element.description = createElementDto.description;
    element.type = createElementDto.type;
    element.service = service;
    element.url = createElementDto.url;

    return this.elementsRepository.save(element);
  }

  async findAll(): Promise<Element[]> {
    return await this.elementsRepository.find();
  }

  async findOne(id: number): Promise<Element> {
    return await this.elementsRepository.findOneBy({ id: id });
  }

  async findByName(name: string): Promise<Element> {
    return await this.elementsRepository.findOneBy({ name: name });
  }

  async getServiceByName(name: string): Promise<number> {
    const service = await this.serviceRepository.findOne({
      where: { name: name },
    });
    if (!service) {
      throw new Error('Service not found');
    }
    return service.id;
  }

  async remove(id: string): Promise<void> {
    await this.elementsRepository.delete(id);
  }

  async findActionsInServiceById(id: number): Promise<Element[]> {
    return await this.elementsRepository.findBy({
      service: { id: id },
      type: 'action',
    });
  }

  async findReactionsInServiceById(id: number): Promise<Element[]> {
    return await this.elementsRepository.findBy({
      service: { id: id },
      type: 'reaction',
    });
  }

  async findActions() {
    return await this.elementsRepository.findBy({ type: 'action' });
  }

  async findUserActions(userId: number) {
    const monType = 'action';
    return await this.elementsRepository
      .createQueryBuilder('element')
      .innerJoin('element.service', 'service')
      .innerJoin('service.serviceToken', 'serviceToken')
      .where('serviceToken.userId = :userId', { userId })
      .andWhere('element.type = :monType', { monType })
      .getMany();
  }

  async findReactions() {
    return await this.elementsRepository.findBy({ type: 'reaction' });
  }

  async findUserReactions(userId: number) {
    const monType = 'reaction';
    return await this.elementsRepository
      .createQueryBuilder('element')
      .innerJoin('element.service', 'service')
      .innerJoin('service.serviceToken', 'serviceToken')
      .where('serviceToken.userId = :userId', { userId })
      .andWhere('element.type = :monType', { monType })
      .getMany();
  }
}
