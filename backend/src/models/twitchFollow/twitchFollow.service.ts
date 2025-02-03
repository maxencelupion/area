import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TwitchFollow } from './entities/twitchFollow.entity';
import { CreateFollow } from './dto/twitchFollow.dto';
import { TwitchStreamers } from '../twitchStreamers/entities/twitchStreamers.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TwitchFollowService {
  constructor(
    @InjectRepository(TwitchFollow)
    private readonly followRepository: Repository<TwitchFollow>,
    @InjectRepository(TwitchStreamers)
    private readonly streamerRepository: Repository<TwitchStreamers>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createFollow: CreateFollow) {
    const streamer = await this.streamerRepository.findOne({
      where: { id: createFollow.streamerId },
    });
    const user = await this.usersRepository.findOne({
      where: { id: createFollow.userId },
    });
    if (!user || !streamer) {
      throw new Error('Element not found');
    }
    const newStreamer = new TwitchFollow();
    newStreamer.streamer = streamer;
    newStreamer.user = user;
    return this.followRepository.save(newStreamer);
  }

  async findOne(streamerId: number, userId: number) {
    return await this.followRepository.findOne({
      where: {
        streamer: { id: streamerId },
        user: { id: userId },
      },
    });
  }

  async findByUser(userId: number) {
    return await this.followRepository.find({
      where: { user: { id: userId } },
      relations: ['streamer'],
    });
  }

  async findByStreamer(streamerId: number) {
    return await this.followRepository.find({
      where: { streamer: { id: streamerId } },
      relations: ['user'],
    });
  }

  async changeTriggerOn(id: number, state: boolean) {
    await this.followRepository.update(id, {
      trigger_on: state,
    });
  }

  async changeTriggerOff(id: number, state: boolean) {
    await this.followRepository.update(id, {
      trigger_off: state,
    });
  }

  async remove(id: number) {
    await this.followRepository.delete(id);
  }
}
