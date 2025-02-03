import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class TwitchAuthGuard extends AuthGuard('twitch') {
  getAuthenticateOptions(context: ExecutionContext) {
    const request = this.getRequest(context);
    return { state: request.query.state };
  }
}
