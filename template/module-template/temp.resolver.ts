import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { TempService } from './temp.service';
import { TempInput } from './dto/temp.input';
import { TempType } from './dto/temp.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/guards/auth.guards';
import { SimpleResult } from '@/common/dto/result.type';
import { SUCCESS, USER_UPDATE_FAILED } from '@/common/constants/code';
import { CurUser } from '@/common/decorators/current-user.decorator';
import {  TempResults } from './dto/result-temp.output';
import { PageInput } from '@/common/dto/page.input';

@Resolver()
@UseGuards(GqlAuthGuard)
export class TempResolver {
  constructor(private readonly userService: TempService) {}

  @Mutation(() => Boolean)
  async create(@Args('params') params: TempInput): Promise<boolean> {
    return await this.userService.create(params);
  }

 
  @Query(() => TempType, { description: '使用ID查询用户' })
  async find(@Args('id') id: string): Promise<TempType> {
    return await this.userService.findOneAsTempType(id);
  }

  @Query(() => TempType, { description: '获取用户信息' })
  async getTempInfo(@CurUser() user: any): Promise<TempType> {
    console.log('🚀 ~ file: user.resolver.ts ~ line 27 ~ ', user);
    if (!user || !user.id) {
      throw new Error('未登录或用户信息不存在');
    }
    const found = await this.userService.findOneAsTempType(user.id);
    if (!found) {
      throw new Error('用户不存在');
    }
    return found;
  }

  @Mutation(() => SimpleResult, { description: '更新用户信息' })
  async updateTemp(
    @Args('id') id: string,
    @Args('params') params: TempInput,
  ): Promise<SimpleResult> {
    const res = await this.userService.update(id, params);
    if (res) {
      return { code: SUCCESS, message: '更新成功' };
    }
    return { code: USER_UPDATE_FAILED, message: '更新失败' };
  }

  @Mutation(() => Boolean, { description: '删除用户' })
  async del(@Args('id') id: string): Promise<boolean> {
    return await this.userService.del(id);
  }

  @Query(() => TempResults)
  async findTemps(@Args('page') page: PageInput): Promise<TempResults> {
    const { start, length } = page;
    const [results, total] = await this.userService.findTemps({
      start,
      length,
    });
    if (results) {
      return {
        code: SUCCESS,
        data: results,
        message: '获取成功',
        page: { length, start, total },
      };
    }
  }
}
