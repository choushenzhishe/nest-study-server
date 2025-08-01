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

  // 查找一个用户并返回 UserType
  async findOneAsUserType(id: string): Promise<UserType> {
    const user = await this.UserRepository.findOne({ where: { id } });
    if (!user) {
      return null;
    }
    return this.convertUserToUserType(user);
  }

  // 将 User 实体转换为 UserType
  private convertUserToUserType(user: User): UserType {
    return {
      id: parseInt(user.id) || 0,
      name: user.name,
      desc: user.desc,
      account: user.account,
      tel: user.tel,
      avatar: user.avatar,
      createdAt: user.createAt,
      createdBy: user.createBy ? parseInt(user.createBy) : null,
      updatedAt: user.updatedAt,
      updatedBy: user.updatedBy ? parseInt(user.updatedBy) : null,
      deletedAt: user.deletedAt,
      deletedBy: user.deletedBy ? parseInt(user.deletedBy) : null,
    };
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
    const [users, count] = await this.UserRepository.findAndCount({
      skip: start,
      take: length,
      order: {
        createAt: 'DESC',
      },
    });

    // 手动映射 User 到 UserType
    const user_Types: UserType[] = users.map(
      (user): UserType => ({
        id: parseInt(user.id) || 0, // 将 string UUID 转换为 number，如果转换失败则使用 0
        name: user.name,
        desc: user.desc,
        account: user.account,
        tel: user.tel,
        avatar: user.avatar,
        createdAt: user.createAt,
        createdBy: user.createBy ? parseInt(user.createBy) : null,
        updatedAt: user.updatedAt,
        updatedBy: user.updatedBy ? parseInt(user.updatedBy) : null,
        deletedAt: user.deletedAt,
        deletedBy: user.deletedBy ? parseInt(user.deletedBy) : null,
      }),
    );

    return [user_Types, count];
  }
}
