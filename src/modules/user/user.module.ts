import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleLogger, Module } from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { StudentModule } from '../student/student.module';
import { studentService } from '../student/student.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), StudentModule],
  providers: [ConsoleLogger, UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
