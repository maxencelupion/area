import { TwitchStreamers } from 'src/models/twitchStreamers/entities/twitchStreamers.entity';
import { User } from 'src/models/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity()
export class TwitchFollow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.follows)
  user: User;

  @ManyToOne(() => TwitchStreamers, (streamer) => streamer.followers)
  streamer: TwitchStreamers;

  @Column({ default: false })
  trigger_on: boolean;

  @Column({ default: false })
  trigger_off: boolean;
}
