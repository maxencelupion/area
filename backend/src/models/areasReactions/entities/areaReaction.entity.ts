import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Element } from '../../elements/entities/element.entity';
import { Area } from '../../areas/entities/area.entity';

@Entity()
export class AreaReaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  parameter_reaction: any;

  @Column()
  order: number;

  @ManyToOne(() => Element, (element) => element.id)
  element: Element;

  @Column()
  elementId: number;

  @ManyToOne(() => Area, (area) => area.id)
  area: Area;
}
