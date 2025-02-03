import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DictDataGithub {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  lastDataId: string;

  @Column()
  elementName: string;
}
