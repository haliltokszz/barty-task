/* eslint-disable prettier/prettier */
import { IsDateString, IsEmail, IsNotEmpty, IsNumberString, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
  @IsString()
  name: string;
  @IsString()
  surname: string;
  @IsNumberString()
  age: number;
  @IsDateString()
  bornAt: Date;
  location: {
    type: string,
    coordinates: [number, number]
  };
  @IsString()
  about: string;
  image: string;
  @IsEmail()
  email: string;
  @IsNumberString()
  balance: number;
  @IsString()
  phoneNumber: string;
}
