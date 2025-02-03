import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DictEmailsGmail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  lastEmailId: string;

  @Column()
  elementName: string;
}
