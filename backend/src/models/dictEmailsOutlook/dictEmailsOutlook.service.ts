import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDictEmailsOutlookDto } from './dto/create-dictEmailsOutlook.dto';
import { DictEmailsOutlook } from './entities/dictEmailsOutlook.entity';

@Injectable()
export class DictEmailsOutlookService {
  constructor(
    @InjectRepository(DictEmailsOutlook)
    private dictEmailsOutlookRepository: Repository<DictEmailsOutlook>,
  ) {}

  async create(
    createDictEmailsOutlookDto: CreateDictEmailsOutlookDto,
  ): Promise<DictEmailsOutlook> {
    const dictEmailsOutlook = new DictEmailsOutlook();
    dictEmailsOutlook.userId = createDictEmailsOutlookDto.userId;
    dictEmailsOutlook.lastEmailId = createDictEmailsOutlookDto.lastEmailId;
    dictEmailsOutlook.elementName = createDictEmailsOutlookDto.elementName;

    return this.dictEmailsOutlookRepository.save(dictEmailsOutlook);
  }

  async findAll(): Promise<DictEmailsOutlook[]> {
    return await this.dictEmailsOutlookRepository.find();
  }

  async findOne(id: number): Promise<DictEmailsOutlook> {
    return await this.dictEmailsOutlookRepository.findOneBy({ id: id });
  }

  async findByUserId(userId: number): Promise<DictEmailsOutlook> {
    return await this.dictEmailsOutlookRepository.findOneBy({ userId: userId });
  }

  async findByUserIdElementName(
    userId: number,
    elementName: string,
  ): Promise<DictEmailsOutlook> {
    return await this.dictEmailsOutlookRepository.findOneBy({
      userId: userId,
      elementName: elementName,
    });
  }

  async remove(id: string): Promise<void> {
    await this.dictEmailsOutlookRepository.delete(id);
  }

  async update(
    userId: number,
    lastEmailId: string,
    elementName: string,
  ): Promise<void> {
    await this.dictEmailsOutlookRepository.update(
      { userId, elementName },
      { lastEmailId },
    );
  }
}
