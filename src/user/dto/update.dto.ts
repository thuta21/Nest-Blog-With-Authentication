import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
