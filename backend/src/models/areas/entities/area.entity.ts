import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Element } from '../../elements/entities/element.entity';
import { AreaReaction } from '../../areasReactions/entities/areaReaction.entity';

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'json' })
  parameter: any;

  @Column()
  active: boolean;

  @Column({ type: 'timestamp' })
  last_executed: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  userId: number;

  @Column()
  actionId: number;

  @ManyToOne(() => Element, (element) => element.id)
  action: Element;

  @OneToMany(() => AreaReaction, (areaReaction) => areaReaction.area)
  areaReaction: AreaReaction[];

  @Column({ default: '#000000' })
  color: string;
}
