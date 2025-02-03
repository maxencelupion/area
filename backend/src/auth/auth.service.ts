import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../models/users/user.service';
import { ServiceTokenService } from '../models/servicesTokens/serviceToken.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { User } from '../models/users/entities/user.entity';
import { ServiceManager } from '../models/services/service-manager.service';
import { CreateUserDto } from 'src/models/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private serviceTokenService: ServiceTokenService,
    private serviceManager: ServiceManager,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.usersService.findOneEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (!password) {
      return user;
    }
    const isMatch: boolean = await argon2.verify(user.password, password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }

  createToken(user: any) {
    const payload = { email: user.email, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUserFromRequest(req: any, jwtToken) {
    const user = req.user;
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }
    if (jwtToken) {
      user.email = jwtToken.email;
    }
    return await this.usersService.findOneEmail(user.email);
  }

  async signInService(user, reqUser) {
    let token: { access_token: string };
    if (!user) {
      token = await this.register(reqUser);
    } else {
      token = await this.login(reqUser);
    }
    return token;
  }

  async login(user: { email: string; password: string }) {
    const { email, password } = user;
    const userInfo = await this.validateUser(email, password);
    return this.createToken(userInfo);
  }

  async register(user: any) {
    const existingUser = await this.usersService.findOneEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('email already exists');
    }
    let newUser;
    if (user.password) {
      // Using basic email / password auth
      const hashedPassword = await argon2.hash(user.password);
      newUser = {
        ...user,
        password: hashedPassword,
        surname: user.surname,
        lastname: user.lastname,
        createdWithService: false,
      };
    } else {
      // Using 20auth auth
      const hashedPassword = await argon2.hash(user.email);
      newUser = {
        ...user,
        password: hashedPassword,
        surname: user.surname,
        lastname: user.lastname,
        createdWithService: true,
      };
    }
    const userDb = await this.usersService.create(newUser);
    return this.createToken(userDb);
  }

  async registerServiceToken(user: any) {
    if (!user.provider) {
      return;
    }
    if (!user.accessToken) {
      throw new BadRequestException('No access nor refresh token provided');
    }

    const existingUser = await this.usersService.findOneEmail(user.email);
    if (!existingUser) {
      throw new BadRequestException('User not found');
    }

    const serviceProvider = await this.serviceManager.findByName(user.provider);
    if (!serviceProvider) {
      throw new BadRequestException('Service not found');
    }
    const newToken = {
      key: user.accessToken,
      userId: existingUser.id,
      serviceId: serviceProvider.id,
      refresh_key: user.refreshToken,
      time_received: Date.now(),
      time_expire: Date.now(),
    };

    const existingToken = await this.serviceTokenService.findOne({
      where: {
        user: { id: existingUser.id },
        service: { id: serviceProvider.id },
      },
    });
    if (!existingToken) {
      return this.serviceTokenService.create(newToken);
    } else {
      return this.serviceTokenService.update(existingToken.id, newToken);
    }
  }

  async getProfile(user: any) {
    return await this.usersService.findOneEmail(user.email);
  }

  async updateProfile(user: CreateUserDto) {
    const existingUser = await this.usersService.findOneEmail(user.email);
    if (!existingUser) {
      throw new BadRequestException('User not found');
    }
    const argon2HashRegex = /^\$argon2(id|i|d)\$.+$/;
    const isArgon2Hash = argon2HashRegex.test(user.password);
    if (!isArgon2Hash) {
      user.password = await argon2.hash(user.password);
    }
    await this.usersService.update(existingUser.id, user);
  }
}
