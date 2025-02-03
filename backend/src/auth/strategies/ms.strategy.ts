import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-microsoft';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MsStrategy extends PassportStrategy(Strategy, 'microsoft') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('ms.client_id'),
      clientSecret: configService.get<string>('ms.client_secret'),
      callbackURL:
        configService.get<string>('app.back_url') +
        configService.get<string>('ms.redirect_uri'),
      scope: ['offline_access', 'Mail.ReadWrite', 'Mail.Send', 'User.Read'],
      authority: 'https://login.microsoftonline.com/common',
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, displayName, userPrincipalName } = profile;

    const user = {
      provider: 'microsoft',
      providerId: id,
      email: userPrincipalName,
      surname: displayName.split(' ')[0],
      lastname: displayName.split(' ')[1],
      accessToken: _accessToken,
      refreshToken: _refreshToken,
    };

    done(null, user);
  }
}
