import { ConsoleLogger, Module } from '@nestjs/common';
import { studentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './models/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [ConsoleLogger, studentService, StudentResolver],
  exports: [studentService],
})
export class StudentModule {}
