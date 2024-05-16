import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../common/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getCurrentUser(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateUser(email, data) {
    await this.userRepository.update(
      {
        email,
      },
      data,
    );

    return this.getCurrentUser(email);
  }
}
