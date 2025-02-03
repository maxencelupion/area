import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigsService {
  constructor(private configService: ConfigService) {}

  get test(): string {
    return this.configService.get<string>('app.test');
  }
}
