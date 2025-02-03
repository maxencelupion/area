import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServiceManager {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const service = new Service();
    service.name = createServiceDto.name;
    service.description = createServiceDto.description;
    service.front_data = createServiceDto.front_data;
    service.key_url = createServiceDto.key_url;
    service.need_token = createServiceDto.need_token;

    return await this.servicesRepository.save(service);
  }

  async updateToken(token: string, id: number): Promise<UpdateResult> {
    return await this.servicesRepository.update(id, { key_url: token });
  }

  async findAll(): Promise<Service[]> {
    return await this.servicesRepository.find();
  }

  async findOne(id: number): Promise<Service> {
    return await this.servicesRepository.findOneBy({ id: id });
  }

  async findByName(name: string): Promise<Service> {
    return await this.servicesRepository.findOneBy({ name: name });
  }

  async remove(id: string): Promise<void> {
    await this.servicesRepository.delete(id);
  }
}
