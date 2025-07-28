import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserInput } from './dto/user-input.type';
import { PasswordUserInput } from './dto/password-user-input.type';
import { UserType } from './dto/user.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/guards/auth.guards';
import { SimpleResult } from '@/common/dto/result.type';
import { SUCCESS, USER_UPDATE_FAILED } from '@/common/constants/code';

@Resolver()
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Boolean)
  async create(@Args('params') params: UserInput): Promise<boolean> {
    return await this.userService.create(params);
  }

  @Mutation(() => SimpleResult)
  async createUserByPassword(
    @Args('params') params: PasswordUserInput,
  ): Promise<SimpleResult> {
    return await this.userService.createByPassword(params);
  }

  @Query(() => UserType, { description: '使用ID查询用户' })
  async find(@Args('id') id: string): Promise<UserType> {
    return await this.userService.findOne(id);
  }

  @Query(() => UserType, { description: '获取用户信息' })
  async getUserInfo(@Context() ctx: any): Promise<UserType> {
    const user = ctx.req.user;
    console.log('🚀 ~ file: user.resolver.ts ~ line 27 ~ ', user);
    if (!user || !user.id) {
      throw new Error('未登录或用户信息不存在');
    }
    const found = await this.userService.findOne(user.id);
    if (!found) {
      throw new Error('用户不存在');
    }
    return found;
  }

  // @Mutation(() => Boolean, { description: '更新用户' })
  // async update(
  //   @Args('id') id: string,
  //   @Args('params') params: UserInput,
  // ): Promise<boolean> {
  //   return await this.userService.update(id, params);
  // }

  @Mutation(() => SimpleResult, { description: '更新用户信息' })
  async updateUser(
    @Args('id') id: string,
    @Args('params') params: UserInput,
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
}
