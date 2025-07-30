import { Injectable, Query } from '@nestjs/common';
import { Temp } from './models/temp.entity';
import { Repository, DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { SimpleResult } from '@/common/dto/result.type';
import { CREATE_USER_FAILED, SUCCESS } from '@/common/constants/code';
import { TempType } from './dto/temp.type';
import { TempResults } from './dto/result-temp.output';
import { Args } from 'type-graphql';
import { PageInput } from '@/common/dto/page.input';

@Injectable()
export class TempService {
  constructor(
    @InjectRepository(Temp) private TempRepository: Repository<Temp>,
  ) {}

  // 新增一个用户
  async create(entity: DeepPartial<Temp>): Promise<boolean> {
    const res = await this.TempRepository.insert(entity);
    console.log('res', res);
    return res && res.raw.affectedRows > 0;
  }

  // 删除一个用户
  async del(id: string): Promise<boolean> {
    const res = await this.TempRepository.delete(id);
    console.log('res', res);
    return res && res.affected > 0;
  }

  // 修改一个用户
  async update(id: string, entity: DeepPartial<Temp>): Promise<boolean> {
    const res = await this.TempRepository.update(id, entity);
    console.log('res', res);
    return res && res.affected > 0;
  }

  // 查找一个用户
  async findOne(id: string): Promise<Temp> {
    const res = await this.TempRepository.findOne({ where: { id } });
    console.log('res', res);
    return res;
  }

  // 查找一个用户并返回 TempType
  async findOneAsTempType(id: string): Promise<TempType> {
    const user = await this.TempRepository.findOne({ where: { id } });
    if (!user) {
      return null;
    }
    return this.convertTempToTempType(user);
  }

  // 将 Temp 实体转换为 TempType
  private convertTempToTempType(user: Temp): TempType {
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

  async findByTel(tel: string): Promise<Temp> {
    const res = await this.TempRepository.findOne({ where: { tel } });
    return res;
  }

  async updateCode(id: string, code: string): Promise<boolean> {
    const res = await this.TempRepository.update(id, {
      code,
      codeCreatedTime: new Date(),
    });
    console.log('res', res);
    return res && res.affected > 0;
  }

  // 通过密码创建用户（从Student模块迁移）
  async createByPassword(entity: DeepPartial<Temp>): Promise<SimpleResult> {
    if (entity.password) {
      entity.password = crypto
        .createHash('md5')
        .update(entity.password)
        .digest('hex');
    }
    const res = await this.TempRepository.insert(entity);
    if (res)
      return {
        code: SUCCESS,
        message: '创建用户成功',
      };

    return { code: CREATE_USER_FAILED, message: '创建用户失败' };
  }

  // 通过账号查找用户（从Student模块迁移）
  async findByAccount(account: string): Promise<Temp | null> {
    return await this.TempRepository.findOne({
      where: { account },
    });
  }

  async findTemps({
    start,
    length,
  }: {
    start: number;
    length: number;
  }): Promise<[TempType[], number]> {
    const [users, count] = await this.TempRepository.findAndCount({
      skip: start,
      take: length,
      order: {
        createAt: 'DESC',
      },
    });

    // 手动映射 Temp 到 TempType
    const user_Types: TempType[] = users.map(
      (user): TempType => ({
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
