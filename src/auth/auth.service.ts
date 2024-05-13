import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../common/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(body: RegisterDto) {
    try {
      const user = this.userRepository.create(body);
      await user.save();
      const payload = { email: user.email };
      const token = this.jwtService.sign(payload);
      return { user: { ...user, token } };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`${error.detail}`);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async login({ email, password }: LoginDto) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      console.log(user);
      const isValid = await user.comparePassword(password);
      if (!isValid) {
        throw new UnauthorizedException('Invalid Credentials');
      }
      const payload = { email: user.email };
      const token = this.jwtService.sign(payload);
      return { user: { ...user, token } };
    } catch (error) {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }
}
