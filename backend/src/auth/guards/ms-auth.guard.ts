import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MsAuthGuard extends AuthGuard('microsoft') {
  getAuthenticateOptions(context: ExecutionContext) {
    const request = this.getRequest(context);
    return { state: request.query.state };
  }
}
