import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitch-new';

@Injectable()
export class TwitchStrategy extends PassportStrategy(Strategy, 'twitch') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('twitch.clientID'),
      clientSecret: configService.get<string>('twitch.clientSecret'),
      callbackURL:
        configService.get<string>('app.back_url') +
        configService.get<string>('twitch.callbackURL'),
      scope: [
        'user:read:email',
        'user:read:follows',
        'user:read:subscriptions',
        'user:write:chat',
      ],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
  ): Promise<any> {
    const { id, display_name, email, profile_image_url } = profile;
    return {
      provider: 'twitch',
      id: id,
      email: email,
      surname: `${display_name}`,
      lastname: `${display_name}`,
      picture: profile_image_url,
      accessToken: _accessToken,
      refreshToken: _refreshToken,
    };
  }
}
