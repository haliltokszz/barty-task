/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
