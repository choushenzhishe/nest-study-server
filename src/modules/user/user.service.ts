import { Injectable } from '@nestjs/common';
import { User } from './models/user.entity';
import { Repository, DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
}
