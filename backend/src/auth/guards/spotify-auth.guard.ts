import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SpotifyAuthGuard extends AuthGuard('spotify') {
  getAuthenticateOptions(context: ExecutionContext) {
    const request = this.getRequest(context);
    return { state: request.query.state, showDialog: true };
  }
}
