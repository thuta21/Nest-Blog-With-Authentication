import { Controller } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptors';
import { UserDto } from './dto/user.dto';

@Serialize(UserDto)
@Controller('user')
export class UserController {}
