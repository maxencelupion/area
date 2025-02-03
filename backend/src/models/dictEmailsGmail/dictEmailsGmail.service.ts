import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDictEmailsGmailDto } from './dto/create-dictEmailsGmail.dto';
import { DictEmailsGmail } from './entities/dictEmailsGmail.entity';

@Injectable()
export class DictEmailsGmailService {
  constructor(
    @InjectRepository(DictEmailsGmail)
    private dictEmailsGmailRepository: Repository<DictEmailsGmail>,
  ) {}

  async create(
    createDictEmailsGmailDto: CreateDictEmailsGmailDto,
  ): Promise<DictEmailsGmail> {
    const dictEmailsGmail = new DictEmailsGmail();
    dictEmailsGmail.userId = createDictEmailsGmailDto.userId;
    dictEmailsGmail.lastEmailId = createDictEmailsGmailDto.lastEmailId;
    dictEmailsGmail.elementName = createDictEmailsGmailDto.elementName;

    return this.dictEmailsGmailRepository.save(dictEmailsGmail);
  }

  async findAll(): Promise<DictEmailsGmail[]> {
    return await this.dictEmailsGmailRepository.find();
  }

  async findOne(id: number): Promise<DictEmailsGmail> {
    return await this.dictEmailsGmailRepository.findOneBy({ id: id });
  }

  async findByUserId(userId: number): Promise<DictEmailsGmail> {
    return await this.dictEmailsGmailRepository.findOneBy({ userId: userId });
  }

  async findByUserIdElementName(
    userId: number,
    elementName: string,
  ): Promise<DictEmailsGmail> {
    return await this.dictEmailsGmailRepository.findOneBy({
      userId: userId,
      elementName: elementName,
    });
  }

  async remove(id: string): Promise<void> {
    await this.dictEmailsGmailRepository.delete(id);
  }

  async update(
    userId: number,
    lastEmailId: string,
    elementName: string,
  ): Promise<void> {
    await this.dictEmailsGmailRepository.update(
      { userId, elementName },
      { lastEmailId },
    );
  }
}
