import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  ClassSerializerInterceptor,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entity/users.model';
import { LoginDto } from '../dtos/login.dto';
import { JwtAuthGuard } from '../guards/auth.guard';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  private login(@Body() body: LoginDto): Promise<string | never> {
    return this.authService.login(body);
  }
}
