import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from '../users/user.schema';
import { UsersService } from '../users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([UserSchema])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
