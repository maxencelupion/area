import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('github.client_id'),
      clientSecret: configService.get<string>('github.client_secret'),
      callbackURL:
        configService.get<string>('app.back_url') +
        configService.get<string>('github.redirect_uri'),
      scope: [
        'repo',
        'user:email',
        'read:org',
        'read:user',
        'user:follow',
        'administration',
        'issues',
      ],
      prompt: 'select_account',
    });
  }

  async validate(_accessToken: string, profile: any): Promise<any> {
    return {
      provider: 'github',
      accessToken: _accessToken,
      profile,
    };
  }
}
