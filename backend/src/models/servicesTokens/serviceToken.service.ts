import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceTokenDto } from './dto/create-serviceToken.dto';
import { ServiceToken } from './entities/serviceToken.entity';
import { Service } from '../services/entities/service.entity';
import { User } from '../users/entities/user.entity';
import { CryptService } from '../../common/crypt.service';

@Injectable()
export class ServiceTokenService {
  constructor(
    @InjectRepository(ServiceToken)
    private readonly ServicesTokensRepository: Repository<ServiceToken>,
    @InjectRepository(Service)
    private readonly ServicesRepository: Repository<Service>,
    @InjectRepository(User)
    private readonly UsersRepository: Repository<User>,
    private cryptService: CryptService,
  ) {}

  async create(
    createServiceTokenDto: CreateServiceTokenDto,
  ): Promise<ServiceToken> {
    const service = await this.ServicesRepository.findOne({
      where: { id: createServiceTokenDto.serviceId },
    });
    const user = await this.UsersRepository.findOne({
      where: { id: createServiceTokenDto.userId },
    });
    if (!user) {
      throw new Error('Element not found');
    }

    const serviceToken = new ServiceToken();

    serviceToken.key = await this.cryptService.encrypt(
      createServiceTokenDto.key,
    );
    if (createServiceTokenDto.refresh_key) {
      serviceToken.refresh_key = await this.cryptService.encrypt(
        createServiceTokenDto.refresh_key,
      );
    } else {
      serviceToken.refresh_key = null;
    }
    serviceToken.time_received = createServiceTokenDto.time_received;
    serviceToken.time_expire = createServiceTokenDto.time_expire;
    serviceToken.user = user;
    serviceToken.service = service;
    return this.ServicesTokensRepository.save(serviceToken);
  }

  async getAllConnectedServices(userId: number) {
    const userServices = await this.ServicesTokensRepository.find({
      where: { user: { id: userId } },
      relations: ['service'],
    });

    return userServices.map((token) => token.service);
  }

  async isConnected(userId: number, id: number) {
    return await this.ServicesTokensRepository.existsBy({
      user: { id: userId },
      service: { id: id },
    });
  }

  async disconnectServiceById(userId: number, id: number) {
    const serviceToken = await this.ServicesTokensRepository.findOne({
      where: {
        user: { id: userId },
        service: { id: id },
      },
    });

    if (serviceToken) {
      await this.ServicesTokensRepository.remove(serviceToken);
    }
  }

  async replaceAccessToken(
    userId: number,
    serviceId: number,
    accessToken: string,
  ) {
    const serviceToken = await this.ServicesTokensRepository.findOne({
      where: {
        user: { id: userId },
        service: { id: serviceId },
      },
    });
    serviceToken.key = await this.cryptService.encrypt(accessToken);
    await this.ServicesTokensRepository.save(serviceToken);
  }

  async replaceRefreshToken(
    userId: number,
    serviceId: number,
    refreshToken: string,
  ) {
    const serviceToken = await this.ServicesTokensRepository.findOne({
      where: {
        user: { id: userId },
        service: { id: serviceId },
      },
    });
    serviceToken.refresh_key = await this.cryptService.encrypt(refreshToken);
    await this.ServicesTokensRepository.save(serviceToken);
  }

  async getRefreshTokenServiceUser(userId: number, serviceId: number) {
    const serviceToken = await this.ServicesTokensRepository.findOne({
      where: {
        user: { id: userId },
        service: { id: serviceId },
      },
    });
    if (serviceToken) {
      serviceToken.refresh_key = await this.cryptService.decrypt(
        serviceToken.refresh_key,
      );
    }
    return serviceToken.refresh_key;
  }

  async findOne(options: any): Promise<ServiceToken> {
    const token = await this.ServicesTokensRepository.findOne(options);
    return token;
  }

  async findOneAction(options: any): Promise<ServiceToken> {
    const token = await this.ServicesTokensRepository.findOne(options);
    if (token.key) {
      token.key = await this.cryptService.decrypt(token.key);
    }
    if (token.refresh_key) {
      token.refresh_key = await this.cryptService.decrypt(token.refresh_key);
    }
    return token;
  }

  async update(id: number, token: CreateServiceTokenDto) {
    return await this.ServicesTokensRepository.update(id, {
      key: await this.cryptService.encrypt(token.key),
      refresh_key: await this.cryptService.encrypt(token.refresh_key),
      time_expire: token.time_expire,
      time_received: token.time_received,
    });
  }
}
