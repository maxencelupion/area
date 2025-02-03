import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigsModule } from './config/config.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { OrmModule } from './config/orm.module';
import { JwtService } from '@nestjs/jwt';
import { ServiceModule } from './models/services/service.module';
import { ElementModule } from './models/elements/element.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AreaModule } from './models/areas/area.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigsModule,
    OrmModule,
    ServiceModule,
    ElementModule,
    AuthModule,
    AreaModule,
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      newListener: true,
      removeListener: true,
      maxListeners: 10,
      verboseMemoryLeak: true,
      ignoreErrors: false,
    }),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'documentation'),
      serveRoot: '/docs',
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, JwtService],
})
export class AppModule {}
