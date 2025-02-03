import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TwitchStreamers } from './entities/twitchStreamers.entity';
import { Repository } from 'typeorm';
import { CreateStreamer } from './dto/twitchStreamers.dto';

@Injectable()
export class TwitchStreamersService {
  constructor(
    @InjectRepository(TwitchStreamers)
    private streamerRepository: Repository<TwitchStreamers>,
  ) {}

  create(createStreamer: CreateStreamer) {
    const newStreamer = new TwitchStreamers();
    newStreamer.streamerId = createStreamer.streamerId;
    newStreamer.streamerName = createStreamer.streamerName;
    return this.streamerRepository.save(newStreamer);
  }

  async findByName(name: string) {
    return await this.streamerRepository.findOneBy({ streamerName: name });
  }

  async updateState(streamerId: number, state: boolean) {
    await this.streamerRepository.update(streamerId, { status: state });
  }
}
