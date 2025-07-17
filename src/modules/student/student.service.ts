import { Injectable } from '@nestjs/common';
import { Student } from './models/student.entity';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { SimpleResult, createResult, IResult } from '@/common/dto/result.type';
import { CREATE_USER_FAILED, SUCCESS } from '@/common/constants/code';

@Injectable()
export class studentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async createByPassword(entity: DeepPartial<Student>): Promise<SimpleResult> {
    if (entity.password) {
      entity.password = crypto
        .createHash('md5')
        .update(entity.password)
        .digest('hex');
    }
    const res = await this.studentRepository.insert(entity);
    if (res)
      return {
        code: SUCCESS,
        message: '创建用户成功',
      };

    return { code: CREATE_USER_FAILED, message: '创建用户失败' };
  }

  async findByAccount(account: string): Promise<Student | null> {
    return await this.studentRepository.findOne({
      where: { account },
    });
  }
}
