import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleLogger, Module } from '@nestjs/common';
import { OSSResolver } from './oss.resolver';
import { OSSService } from './oss.service';

@Module({
  imports: [TypeOrmModule.forFeature()],
  providers: [ConsoleLogger,OSSResolver,OSSService],
  exports: [],
})
export class OssModule {}
