import * as dayjs from 'dayjs';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { SimpleResult } from '@/common/dto/result.type';
import {
  ACCOUNT_NOT_EXIST,
  CODE_EXPIRED,
  CODE_NOT_EXIST,
  LOGIN_FAILED,
  SUCCESS,
} from '@/common/constants/code';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => SimpleResult, { description: '发送验证码' })
  async sendCodeMsg(@Args('tel') tel: string): Promise<SimpleResult> {
    return await this.authService.sendCodeMsg(tel);
  }

  @Mutation(() => SimpleResult, { description: '登录' })
  async login(
    @Args('tel') tel: string,
    @Args('code') code: string,
  ): Promise<SimpleResult> {
    const user = await this.userService.findByTel(tel);
    if (!user)
      return {
        code: ACCOUNT_NOT_EXIST,
        message: '用户不存在',
      };

    if (!user.code || !user.codeCreatedTime)
      return { code: CODE_NOT_EXIST, message: '验证码不存在' };

    if (dayjs().diff(dayjs(user.codeCreatedTime)) > 60 * 60 * 1000)
      return { code: CODE_EXPIRED, message: '验证码已过期' };

    if (user.code === code)
      return {
        code: SUCCESS,
        message: '登录成功',
      };
    return { code: LOGIN_FAILED, message: '登录失败,手机号或者验证码不正确' };
    // return await this.authService.login(tel, code);
  }
}
