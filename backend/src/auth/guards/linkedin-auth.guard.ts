import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LinkedinAuthGuard extends AuthGuard('linkedin') {
  constructor(private configService: ConfigService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.query.code) {
      const clientId = this.configService.get<string>('linkedin.client_id');
      const redirectUri = `${this.configService.get<string>('app.back_url')}/auth/linkedin/callback`;
      const state = encodeURIComponent(request.query.state);
      const scopes = 'profile openid w_member_social email';
      const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=${encodeURIComponent(scopes)}`;
      context.switchToHttp().getResponse().redirect(authUrl);
      return false;
    }
    return super.canActivate(context) as Promise<boolean>;
  }
}
