import { TwitchFollow } from 'src/models/twitchFollow/entities/twitchFollow.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class TwitchStreamers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  streamerId: number;

  @Column()
  streamerName: string;

  @OneToMany(() => TwitchFollow, (twitchFollow) => twitchFollow.streamer)
  followers: TwitchFollow[];

  @Column({ default: false })
  status: boolean;

  @Column({ default: true })
  last_status: boolean;
}
