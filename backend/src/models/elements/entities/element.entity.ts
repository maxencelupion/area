import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Service } from '../../services/entities/service.entity';
import { AreaReaction } from '../../areasReactions/entities/areaReaction.entity';
import { Area } from '../../areas/entities/area.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Element {
  @ApiProperty({ example: 1, description: 'The id of the element' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Send an Email',
    description: 'The name of the element',
  })
  @Column({ unique: true })
  name: string;

  @ApiProperty({
    example: 'Send an Email with Gmail',
    description: 'The description of the element',
  })
  @Column()
  description: string;

  @ManyToOne(() => Service, (service) => service.id)
  service: Service;

  @ApiProperty({ example: 1, description: 'The id of the linked service' })
  @Column()
  serviceId: number;

  @OneToMany(() => AreaReaction, (areaReaction) => areaReaction.element)
  area_reaction: AreaReaction[];

  @OneToMany(() => Area, (area) => area.action)
  area: Area[];

  @ApiProperty({
    example: 'reaction',
    description: 'The type of the element (action/reaction)',
  })
  @Column()
  type: string;

  @ApiProperty({
    example: 'https://google/send_mail',
    description: 'The url needed to run the element',
  })
  @Column()
  url: string;
}
