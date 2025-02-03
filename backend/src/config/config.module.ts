import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import base_config from './base.config';
import database_config from './database.config';
import google_config from './google.config';
import ms_config from './ms_config';
import twitch_config from './twitch.config';
import githubConfig from './github.config';
import spotifyConfig from './spotify.config';
import linkedinConfig from './linkedin.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        base_config,
        database_config,
        google_config,
        ms_config,
        twitch_config,
        githubConfig,
        spotifyConfig,
        linkedinConfig,
      ],
      isGlobal: true,
    }),
  ],
})
export class ConfigsModule { }
