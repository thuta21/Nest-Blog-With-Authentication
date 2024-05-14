import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SerializeInterceptor } from '../interceptors/serialize.interceptors';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(SerializeInterceptor)
  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @UseInterceptors(SerializeInterceptor)
  @Post('login')
  async login(@Body() body: LoginDto) {
    console.log(body);
    return this.authService.login(body);
  }
}
