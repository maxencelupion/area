import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Profile, Strategy, VerifyCallback } from 'passport-spotify';

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy, 'spotify') {
  constructor(configService: ConfigService) {
    super(
      {
        clientID: configService.get<string>('spotify.client_id'),
        clientSecret: configService.get<string>('spotify.client_secret'),
        callbackURL:
          configService.get<string>('app.back_url') +
          configService.get<string>('spotify.redirect_uri'),
        scope:
          'user-read-private user-read-email user-read-playback-state user-modify-playback-state',
      },
      (
        _accessToken: string,
        _refreshToken: string,
        profile: Profile,
        done: VerifyCallback,
      ): void => {
        const { id, provider } = profile;
        const user = {
          provider: provider,
          spotifyId: id,
          accessToken: _accessToken,
          refreshToken: _refreshToken,
        };
        done(null, user);
      },
    );
  }
}
