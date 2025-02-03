import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDictDataGithubDto } from './dto/create-dictDataGithub.dto';
import { DictDataGithub } from './entities/dictDataGithub.entity';

@Injectable()
export class DictDataGithubService {
  constructor(
    @InjectRepository(DictDataGithub)
    private dictDataGithubRepository: Repository<DictDataGithub>,
  ) {}

  async create(
    createDictIssuesGithubDto: CreateDictDataGithubDto,
  ): Promise<DictDataGithub> {
    const dictIssuesGithub = new DictDataGithub();
    dictIssuesGithub.userId = createDictIssuesGithubDto.userId;
    dictIssuesGithub.lastDataId = createDictIssuesGithubDto.lastDataId;
    dictIssuesGithub.elementName = createDictIssuesGithubDto.elementName;

    return this.dictDataGithubRepository.save(dictIssuesGithub);
  }

  async findAll(): Promise<DictDataGithub[]> {
    return await this.dictDataGithubRepository.find();
  }

  async findOne(id: number): Promise<DictDataGithub> {
    return await this.dictDataGithubRepository.findOneBy({ id: id });
  }

  async findByUserId(userId: number): Promise<DictDataGithub> {
    return await this.dictDataGithubRepository.findOneBy({ userId: userId });
  }

  async findByUserIdElementName(
    userId: number,
    elementName: string,
  ): Promise<DictDataGithub> {
    return await this.dictDataGithubRepository.findOneBy({
      userId: userId,
      elementName: elementName,
    });
  }

  async remove(id: string): Promise<void> {
    await this.dictDataGithubRepository.delete(id);
  }

  async update(userId: number, lastDataId: string, elementName: string): Promise<void> {
    await this.dictDataGithubRepository.update({ userId, elementName }, { lastDataId });
  }
}
