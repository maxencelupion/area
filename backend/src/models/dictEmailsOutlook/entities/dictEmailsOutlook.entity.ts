import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DictEmailsOutlook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  lastEmailId: string;

  @Column()
  elementName: string;
}
