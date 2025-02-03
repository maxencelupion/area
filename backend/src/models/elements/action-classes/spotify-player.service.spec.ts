import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyPlayerService } from './spotify-player.service';
import { HttpService } from '@nestjs/axios';
import { ServiceTokenService } from '../../servicesTokens/serviceToken.service';
import { ActionRegistry } from './action-registry.service';
import { of } from 'rxjs';
import { ServiceToken } from '../../servicesTokens/entities/serviceToken.entity';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { UnauthorizedException } from '@nestjs/common';

describe('SpotifyPlayerService', () => {
  let service: SpotifyPlayerService;
  let httpService: HttpService;
  let serviceTokenService: ServiceTokenService;
  let actionRegistry: ActionRegistry;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpotifyPlayerService,
        {
          provide: Number,
          useValue: 1,
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            axiosRef: {
              post: jest.fn().mockResolvedValue({
                data: 'mocked_token',
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {},
              }),
              get: jest.fn().mockResolvedValue({
                data: 'mocked_token',
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {},
              }),
            },
          },
        },
        {
          provide: ServiceTokenService,
          useValue: { findOne: jest.fn() },
        },
        {
          provide: ActionRegistry,
          useValue: { registerElement: jest.fn() },
        },
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('mocked_token') },
        },
      ],
    }).compile();

    service = module.get<SpotifyPlayerService>(SpotifyPlayerService);
    httpService = module.get<HttpService>(HttpService);
    serviceTokenService = module.get<ServiceTokenService>(ServiceTokenService);
    actionRegistry = module.get<ActionRegistry>(ActionRegistry);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('execAction should return true when access token is valid', async () => {
    const userId = 1;
    const parameters = {};
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const params = {
      grant_type: 'client_credentials',
      client_id: configService.get<string>('spotify.clientId'),
      client_secret: configService.get<string>('spotify.clientSecret'),
    };
    const response = await httpService.axiosRef.post(
      'https://accounts.spotify.com/api/token',
      null,
      {
        headers,
        params,
      },
    );
    const token = response.data;

    const serviceToken: ServiceToken = {
      key: token,
      refresh_key: '',
      service: undefined,
      time_expire: 0,
      time_received: 0,
      user: undefined,
      id: 1,
    };

    jest.spyOn(serviceTokenService, 'findOne').mockResolvedValue(serviceToken);
    jest.spyOn(httpService, 'get').mockReturnValue(
      of({
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as AxiosResponse),
    );

    const result = await service.execAction(userId, parameters);

    expect(result).toBe(true);
  });

  it('execAction should throw UnauthorizedException when access token is invalid', async () => {
    const userId = 1;
    const parameters = {};

    const serviceToken: ServiceToken = {
      key: null,
      refresh_key: '',
      service: undefined,
      time_expire: 0,
      time_received: 0,
      user: undefined,
      id: 1,
    };

    jest.spyOn(serviceTokenService, 'findOne').mockResolvedValue(serviceToken);

    await expect(service.execAction(userId, parameters)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('registerElement should call actionRegistry.registerElement', async () => {
    await service.registerElement();

    expect(actionRegistry.registerElement).toHaveBeenCalledWith(service);
  });
});
