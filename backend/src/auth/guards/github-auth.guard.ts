import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GithubAuthGuard extends AuthGuard('github') {
  getAuthenticateOptions(context: ExecutionContext) {
    const request = this.getRequest(context);
    return { state: request.query.state };
  }
}
