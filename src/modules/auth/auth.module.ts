import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleLogger, Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { User } from '../user/models/user.entity';
import { UserService } from '../user/user.service';
import { JWT_SECRET } from '@/common/constants/aliyun';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '120h' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    JwtStrategy,
    ConsoleLogger,
    AuthResolver,
    AuthService,
    UserService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
