import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ServiceToken } from '../../servicesTokens/entities/serviceToken.entity';
import { Area } from '../../areas/entities/area.entity';
import { ApiProperty } from '@nestjs/swagger';
import { TwitchFollow } from 'src/models/twitchFollow/entities/twitchFollow.entity';

@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'The id of the user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Nathan', description: 'The surname of the user' })
  @Column()
  surname: string;

  @ApiProperty({ example: 'Baudelin', description: 'The lastname of the user' })
  @Column()
  lastname: string;

  @ApiProperty({
    example: 'nathan@test.com',
    description: 'The email of the user',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: 'en',
    description: 'The preferred language of the user',
  })
  @Column({ default: 'en' })
  language: string;

  @ApiProperty({ description: 'The hashed password of the user' })
  @Column({ nullable: true })
  password: string;

  @ApiProperty({ description: 'Was the account created using a service' })
  @Column()
  createdWithService: boolean;

  @OneToMany(() => ServiceToken, (serviceToken) => serviceToken.user)
  serviceTokens: ServiceToken[];

  @OneToMany(() => Area, (area) => area.user)
  area: Area[];

  @OneToMany(() => TwitchFollow, (twitchFollow) => twitchFollow.user)
  follows: TwitchFollow[];
}
