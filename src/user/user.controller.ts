import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptors';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './decorator/user.decorator';
import { UserEntity } from '../common/entities/user.entity';
import { UpdateDto } from './dto/update.dto';

@Serialize(UserDto)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('current_user')
  @UseGuards(AuthGuard())
  async getAuthUser(@User() { email }: UserEntity) {
    return await this.userService.getCurrentUser(email);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put('update')
  @UseGuards(AuthGuard())
  async update(@User() { email }: UserEntity, @Body() data: UpdateDto) {
    console.log(email, data);
    return await this.userService.updateUser(email, data);
  }
}
