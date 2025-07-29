import { Injectable, Query } from '@nestjs/common';
import { User } from './models/user.entity';
import { Repository, DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { SimpleResult } from '@/common/dto/result.type';
import { CREATE_USER_FAILED, SUCCESS } from '@/common/constants/code';
import { UserType } from './dto/user.type';
import { UserResults } from './dto/result-user.output';
import { Args } from 'type-graphql';
import { PageInput } from '@/common/dto/page.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  // 新增一个用户
  async create(entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.UserRepository.insert(entity);
    console.log('res', res);
    return res && res.raw.affectedRows > 0;
  }

  // 删除一个用户
  async del(id: string): Promise<boolean> {
    const res = await this.UserRepository.delete(id);
    console.log('res', res);
    return res && res.affected > 0;
  }

  // 修改一个用户
  async update(id: string, entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.UserRepository.update(id, entity);
    console.log('res', res);
    return res && res.affected > 0;
  }

  // 查找一个用户
  async findOne(id: string): Promise<User> {
    const res = await this.UserRepository.findOne({ where: { id } });
    console.log('res', res);
    return res;
  }

  async findByTel(tel: string): Promise<User> {
    const res = await this.UserRepository.findOne({ where: { tel } });
    return res;
  }

  async updateCode(id: string, code: string): Promise<boolean> {
    const res = await this.UserRepository.update(id, {
      code,
      codeCreatedTime: new Date(),
    });
    console.log('res', res);
    return res && res.affected > 0;
  }

  // 通过密码创建用户（从Student模块迁移）
  async createByPassword(entity: DeepPartial<User>): Promise<SimpleResult> {
    if (entity.password) {
      entity.password = crypto
        .createHash('md5')
        .update(entity.password)
        .digest('hex');
    }
    const res = await this.UserRepository.insert(entity);
    if (res)
      return {
        code: SUCCESS,
        message: '创建用户成功',
      };

    return { code: CREATE_USER_FAILED, message: '创建用户失败' };
  }

  // 通过账号查找用户（从Student模块迁移）
  async findByAccount(account: string): Promise<User | null> {
    return await this.UserRepository.findOne({
      where: { account },
    });
  }

  async findUsers({
    start,
    length,
  }: {
    start: number;
    length: number;
  }): Promise<[UserType[], number]> {
    return this.UserRepository.findAndCount({
      skip: start,
      take: length,
    });
  }
}
