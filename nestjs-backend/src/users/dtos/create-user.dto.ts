/* eslint-disable prettier/prettier */
import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsString, IsStrongPassword } from 'class-validator';

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
  @IsNumber()
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
  @IsNumber()
  balance: number;
  @IsString()
  phoneNumber: string;
}
