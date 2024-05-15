import {
  Body, ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtGuard } from './guard/jwt.guard';
import { LocalGuard } from './guard/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.username, body.password);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('status')
  @UseGuards(JwtGuard)
  status(@Req() req: Request) {
    console.log('inside authcontroller status');
    console.log(req);
  }
}
