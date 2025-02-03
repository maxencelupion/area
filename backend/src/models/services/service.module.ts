import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceManager } from './service-manager.service';
import { ServiceController } from './service.controller';
import { Service } from './entities/service.entity';
import { ElementModule } from '../elements/element.module';
import { ServiceTokenService } from '../servicesTokens/serviceToken.service';
import { ServiceToken } from '../servicesTokens/entities/serviceToken.entity';
import { Element } from '../elements/entities/element.entity';
import { User } from '../users/entities/user.entity';
import { HttpModule } from '@nestjs/axios';
import { ServiceRegistry } from './service-classes/service-registry.service';
import { GoogleService } from './service-classes/google.service';
import { DictEmailsGmail } from '../dictEmailsGmail/entities/dictEmailsGmail.entity';
import { DictEmailsGmailService } from '../dictEmailsGmail/dictEmailsGmail.service';
import { MicrosoftService } from './service-classes/microsoft.service';
import { TwitchService } from './service-classes/twitch.service';
import { DictEmailsOutlookService } from '../dictEmailsOutlook/dictEmailsOutlook.service';
import { DictEmailsOutlook } from '../dictEmailsOutlook/entities/dictEmailsOutlook.entity';
import { ActionRegistryModule } from '../elements/action-classes/action-registry.module';
import { ReactionRegistryModule } from '../elements/reaction-classes/reaction-registry.module';
import { UserModule } from '../users/user.module';
import { GithubService } from './service-classes/github-service.service';
import { SpotifyService } from './service-classes/spotify-service.service';
import { TwitchStreamersService } from '../twitchStreamers/twitchStreamers.service';
import { TwitchFollowService } from '../twitchFollow/twitchFollow.service';
import { TwitchStreamers } from '../twitchStreamers/entities/twitchStreamers.entity';
import { TwitchFollow } from '../twitchFollow/entities/twitchFollow.entity';
import { DictDataGithub } from '../dictDataGithub/entities/dictDataGithub.entity';
import { DictDataGithubService } from '../dictDataGithub/dictDataGithub.service';
import { LinkedinService } from './service-classes/linkedin-service.service';
import { CryptService } from '../../common/crypt.service';
import { AreaModule } from '../areas/area.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Service,
      ServiceToken,
      Element,
      User,
      DictEmailsGmail,
      DictEmailsOutlook,
      TwitchStreamers,
      TwitchFollow,
      DictDataGithub,
    ]),
    ElementModule,
    HttpModule,
    ActionRegistryModule,
    ReactionRegistryModule,
    ElementModule,
    UserModule,
    forwardRef(() => AreaModule),
  ],
  providers: [
    ServiceManager,
    ServiceTokenService,
    ServiceRegistry,
    DictEmailsGmailService,
    DictEmailsOutlookService,
    DictDataGithubService,
    GoogleService,
    MicrosoftService,
    TwitchService,
    TwitchStreamersService,
    TwitchFollowService,
    GithubService,
    SpotifyService,
    LinkedinService,
    CryptService,
  ],
  controllers: [ServiceController],
  exports: [
    ServiceManager,
    ServiceTokenService,
    ServiceRegistry,
    TwitchFollowService,
    TwitchStreamersService,
  ],
})
export class ServiceModule {}
