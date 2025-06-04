import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleLogger, Module } from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ConsoleLogger, UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
