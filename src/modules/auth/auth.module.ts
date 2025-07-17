import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleLogger, Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { User } from '../user/models/user.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ConsoleLogger, AuthResolver, AuthService,UserService],
  exports: [AuthService],
})
export class AuthModule {}
