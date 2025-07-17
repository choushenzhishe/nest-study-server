import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleLogger, Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { User } from '../user/models/user.entity';
import { UserService } from '../user/user.service';
import { studentService } from '../student/student.service';
// import { StudentModule } from '../student/student.module';
import { Student } from '../student/models/student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Student]),
  ],
  providers: [
    ConsoleLogger,
    AuthResolver,
    AuthService,
    UserService,
    studentService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
