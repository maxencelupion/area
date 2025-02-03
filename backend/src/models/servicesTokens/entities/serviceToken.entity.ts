import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Service } from '../../services/entities/service.entity';

@Entity()
export class ServiceToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column({ nullable: true })
  refresh_key: string;

  @Column({ type: 'bigint' })
  time_received: number;

  @Column({ type: 'bigint' })
  time_expire: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Service, (service) => service.id)
  service: Service;
}
