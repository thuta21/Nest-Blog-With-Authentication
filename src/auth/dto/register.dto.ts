import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MinLength(4)
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
}
