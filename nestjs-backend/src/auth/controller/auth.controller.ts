import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  private login(@Body() body: LoginDto): Promise<string | never> {
    return this.authService.login(body);
  }
}
