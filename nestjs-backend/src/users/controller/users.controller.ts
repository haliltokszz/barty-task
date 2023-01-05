import { ResponseUserDto } from './../dtos/response-user.dto';
import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/create-user.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from '../../auth/dtos/login.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() userDto: CreateUserDto): Promise<ResponseUserDto> {
    const user = await this.usersService.createUser(userDto);
    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(): Promise<ResponseUserDto[]> {
    const users = await this.usersService.getUsers();
    return plainToInstance(ResponseUserDto, users, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<ResponseUserDto> {
    const user = await this.usersService.getUser({ _id: id });
    return plainToClass(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Get('/pagination/:page/:limit')
  async getUsersWithPagination(
    @Param('page') page: number,
    @Param('limit') limit: number,
  ): Promise<ResponseUserDto[]> {
    const users = await this.usersService.getUsersWithPagination(
      {},
      page,
      limit,
    );
    return plainToInstance(ResponseUserDto, users, {
      excludeExtraneousValues: true,
    });
  }
}
