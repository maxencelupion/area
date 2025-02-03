import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('google.clientID'),
      clientSecret: configService.get<string>('google.clientSecret'),
      callbackURL:
        configService.get<string>('app.back_url') +
        configService.get<string>('google.callbackURL'),
      scope: [
        'profile',
        'email',
        'https://mail.google.com/',
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/gmail.modify',
        'https://www.googleapis.com/auth/gmail.send',
      ],
      access_type: 'offline',
      prompt: 'consent',
      includeGrantedScopes: true,
    });
  }

  authorizationParams() {
    return {
      access_type: 'offline',
      prompt: 'consent',
    };
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;
    const user = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      surname: `${name.givenName}`,
      lastname: `${name.familyName}`,
      picture: photos[0].value,
      accessToken: _accessToken,
      refreshToken: _refreshToken,
    };

    done(null, user);
  }
}
