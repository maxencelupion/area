// dropbox.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-custom';
import axios from 'axios';

@Injectable()
export class LinkedinStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor(private configService: ConfigService) {
    super(async (req, done) => {
      try {
        const authorizationCode = req.query.code;
        if (!authorizationCode) {
          return;
        }

        const response = await axios.post(
          'https://www.linkedin.com/oauth/v2/accessToken',
          new URLSearchParams({
            code: authorizationCode,
            grant_type: 'authorization_code',
            client_id: this.configService.get<string>('linkedin.client_id'),
            client_secret: this.configService.get<string>(
              'linkedin.client_secret',
            ),
            redirect_uri: `${this.configService.get<string>('app.back_url')}/auth/linkedin/callback`,
          }),
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          },
        );

        const { access_token } = response.data;

        const user = {
          provider: 'linkedin',
          accessToken: access_token,
        };
        done(null, user);
      } catch (error) {
        console.error('Failed to authenticate with Linkedin', error);
        done(
          new UnauthorizedException('Failed to authenticate with Linkedin'),
          false,
        );
      }
    });
  }
}
