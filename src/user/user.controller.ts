import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptors';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './decorator/user.decorator';
import { UserEntity } from '../common/entities/user.entity';

@Serialize(UserDto)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @UseGuards(AuthGuard())
  async findCurrentUser(@User() { email }: UserEntity) {
    return await this.userService.findByEmail(email);
  }
}
