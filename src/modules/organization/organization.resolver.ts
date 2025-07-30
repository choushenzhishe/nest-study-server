import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { OrganizationService } from './organization.service';
import { OrganizationInput } from './dto/organization.input';
import { OrganizationType } from './dto/organization.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/guards/auth.guards';
import { SimpleResult } from '@/common/dto/result.type';
import { ORGANIZATION_NOT_EXIST, SUCCESS, } from '@/common/constants/code';
import { CurUser, CurUserId } from '@/common/decorators/current-user.decorator';
import {
  OrganizationResult,
  OrganizationResults,
} from './dto/result-organization.output';
import { PageInput } from '@/common/dto/page.input';

@Resolver()
@UseGuards(GqlAuthGuard)
export class OrganizationResolver {
  constructor(private readonly organizationService: OrganizationService) {}

  @Query(() => OrganizationResult)
  async getOrganizationInfo(@CurUserId() userId: string) {
    const result = await this.organizationService.findById(userId);
    if (result) return { code: SUCCESS, data: result, message: '获取成功' };
    return { code: ORGANIZATION_NOT_EXIST, message: '用户信息不存在' };
  }

  // @Mutation(() => Boolean)
  // async create(@Args('params') params: OrganizationInput): Promise<boolean> {
  //   return await this.userService.create(params);
  // }

  // @Query(() => OrganizationType, { description: '使用ID查询用户' })
  // async find(@Args('id') id: string): Promise<OrganizationType> {
  //   return await this.userService.findOneAsOrganizationType(id);
  // }

  // @Query(() => OrganizationType, { description: '获取用户信息' })
  // async getOrganizationInfo(@CurUser() user: any): Promise<OrganizationType> {
  //   console.log('🚀 ~ file: user.resolver.ts ~ line 27 ~ ', user);
  //   if (!user || !user.id) {
  //     throw new Error('未登录或用户信息不存在');
  //   }
  //   const found = await this.userService.findOneAsOrganizationType(user.id);
  //   if (!found) {
  //     throw new Error('用户不存在');
  //   }
  //   return found;
  // }

  // @Mutation(() => SimpleResult, { description: '更新用户信息' })
  // async updateOrganization(
  //   @Args('id') id: string,
  //   @Args('params') params: OrganizationInput,
  // ): Promise<SimpleResult> {
  //   const res = await this.userService.update(id, params);
  //   if (res) {
  //     return { code: SUCCESS, message: '更新成功' };
  //   }
  //   return { code: USER_UPDATE_FAILED, message: '更新失败' };
  // }

  // @Mutation(() => Boolean, { description: '删除用户' })
  // async del(@Args('id') id: string): Promise<boolean> {
  //   return await this.userService.del(id);
  // }

  // @Query(() => OrganizationResults)
  // async findOrganizations(@Args('page') page: PageInput): Promise<OrganizationResults> {
  //   const { start, length } = page;
  //   const [results, total] = await this.userService.findOrganizations({
  //     start,
  //     length,
  //   });
  //   if (results) {
  //     return {
  //       code: SUCCESS,
  //       data: results,
  //       message: '获取成功',
  //       page: { length, start, total },
  //     };
  //   }
  // }
}
