import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleLogger, Module } from '@nestjs/common';
import { Temp } from './models/temp.entity';
import { TempService } from './temp.service';
import { TempResolver } from './temp.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Temp])],
  providers: [ConsoleLogger, TempService, TempResolver],
  exports: [TempService],
})
export class UserModule {}
