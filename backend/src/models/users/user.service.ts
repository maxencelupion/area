import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.surname = createUserDto.surname;
    user.lastname = createUserDto.lastname;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.createdWithService = createUserDto.createdWithService;
    user.language = createUserDto.language;

    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneId(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async findOneEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email: email });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id: number, user: CreateUserDto) {
    await this.usersRepository.update(id, user);
  }
}
