import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleLogger, Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { User } from '../user/models/user.entity';
import { UserService } from '../user/user.service';
import { studentService } from '../student/student.service';
// import { StudentModule } from '../student/student.module';
import { Student } from '../student/models/student.entity';
import { JWT_SECRET } from '@/common/constants/aliyun';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '30s' },
    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Student]),
  ],
  providers: [
    JwtStrategy,
    ConsoleLogger,
    AuthResolver,
    AuthService,
    UserService,
    studentService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
