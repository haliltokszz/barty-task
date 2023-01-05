import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entity/users.model';
import { UsersService } from 'src/users/service/users.service';
import { LoginDto } from '../dtos/login.dto';
import { AuthHelper } from '../helper/auth.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly helper: AuthHelper,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUser({ email: email });
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  public async login(body: LoginDto): Promise<string | never> {
    const { email, password }: LoginDto = body;
    const user: User = await this.usersService.getUser({ email: email });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.helper.generateToken(user);
  }
}
