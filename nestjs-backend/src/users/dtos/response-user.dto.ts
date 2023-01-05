/* eslint-disable prettier/prettier */
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResponseUserDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @Expose()
  name: string;
  @Expose()
  @IsString()
  surname: string;
  @Expose()
  age: number;
  @Expose()
  bornAt: Date;
  @Expose()
  location: {
    type: string,
    coordinates: [number, number]
  };
  @IsString()
  @Expose()
  about: string;
  @Expose()
  image: string;
  @IsEmail()
  @Expose()
  email: string;
  @Expose()
  balance: number;
  @Expose()
  @IsString()
  phoneNumber: string;
}
