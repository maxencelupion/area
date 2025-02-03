import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Element } from '../../elements/entities/element.entity';
import { ServiceToken } from '../../servicesTokens/entities/serviceToken.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The id of the service' })
  id: number;

  @ApiProperty({ example: 'Google', description: 'The name of the service' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({
    example: 'Use Gmail and GoogleCalendar',
    description: 'The description of the service',
  })
  @Column()
  description: string;

  @ApiProperty({ example: 'A definir', description: 'A definir' })
  @Column()
  front_data: string;

  @ApiProperty({ example: true, description: 'The service need an authenticate token' })
  @Column()
  need_token: boolean;

  @ApiProperty({
    example: 'Voir si on utilise',
    description: 'Voir si on utilise',
  })
  @Column({ nullable: true })
  key_url: string;

  @OneToMany(() => Element, (element) => element.service)
  elements: Element[];

  @OneToMany(() => ServiceToken, (serviceToken) => serviceToken.service)
  serviceToken: ServiceToken[];
}
