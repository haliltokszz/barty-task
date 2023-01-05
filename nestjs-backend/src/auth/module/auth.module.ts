import { JwtStrategy } from './../helper/auth.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from '../controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserSchema } from 'src/users/entity/users.model';
import { UsersService } from 'src/users/service/users.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../service/auth.service';
import { AuthHelper } from '../helper/auth.helper';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_KEY'),
        signOptions: { expiresIn: config.get('JWT_EXPIRES') },
      }),
    }),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
  providers: [AuthService, UsersService, JwtStrategy, AuthHelper],
  controllers: [AuthController],
})
export class AuthModule {}
