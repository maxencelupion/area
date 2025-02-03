import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../models/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt.guard';
import { GoogleStrategy } from './strategies/google.strategy';
import { ServiceModule } from '../models/services/service.module';
import { MsStrategy } from './strategies/ms.strategy';
import { ServiceTokenService } from '../models/servicesTokens/serviceToken.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceToken } from '../models/servicesTokens/entities/serviceToken.entity';
import { Service } from '../models/services/entities/service.entity';
import { User } from '../models/users/entities/user.entity';
import { TwitchStrategy } from './strategies/twitch.strategy';
import { ElementService } from '../models/elements/element.service';
import { Element } from '../models/elements/entities/element.entity';
import { GithubStrategy } from './strategies/github.strategy';
import { SpotifyStrategy } from './strategies/spotify.strategy';
import { CryptService } from '../common/crypt.service';
import { LinkedinStrategy } from './strategies/linkedin.strategy';

@Module({
  imports: [
    UserModule,
    ServiceModule,
    PassportModule,
    TypeOrmModule.forFeature([ServiceToken, Service, User, Element]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('app.secret'),
        signOptions: { expiresIn: '3h' },
        global: true,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useValue: JwtAuthGuard,
    },
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    MsStrategy,
    TwitchStrategy,
    GithubStrategy,
    SpotifyStrategy,
    LinkedinStrategy,
    ServiceTokenService,
    ElementService,
    CryptService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
