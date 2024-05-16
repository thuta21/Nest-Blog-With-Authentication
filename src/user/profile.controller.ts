import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './decorator/user.decorator';
import { UserEntity } from '../common/entities/user.entity';

@Controller('profile')
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('my-profile')
  @UseGuards(AuthGuard())
  async myProfile(@User() { email }: UserEntity) {
    const user = await this.userService.getCurrentUser(email);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return {
      profile: user,
    };
  }
}
