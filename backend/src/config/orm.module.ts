import { Module } from '@nestjs/common';
import { Area } from '../models/areas/entities/area.entity';
import { AreaReaction } from '../models/areasReactions/entities/areaReaction.entity';
import { Element } from '../models/elements/entities/element.entity';
import { Service } from '../models/services/entities/service.entity';
import { ServiceToken } from '../models/servicesTokens/entities/serviceToken.entity';
import { User } from '../models/users/entities/user.entity';
import { DictEmailsOutlook } from '../models/dictEmailsOutlook/entities/dictEmailsOutlook.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DictEmailsGmail } from 'src/models/dictEmailsGmail/entities/dictEmailsGmail.entity';
import { TwitchFollow } from 'src/models/twitchFollow/entities/twitchFollow.entity';
import { TwitchStreamers } from 'src/models/twitchStreamers/entities/twitchStreamers.entity';
import { DictDataGithub } from '../models/dictDataGithub/entities/dictDataGithub.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('db.host'),
        port: configService.get<number>('db.port'),
        username: configService.get<string>('db.username'),
        password: configService.get<string>('db.password'),
        database: configService.get<string>('db.database'),
        entities: [
          Area,
          AreaReaction,
          Element,
          Service,
          ServiceToken,
          User,
          DictEmailsOutlook,
          DictEmailsGmail,
          TwitchStreamers,
          TwitchFollow,
          DictDataGithub,
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class OrmModule {}
