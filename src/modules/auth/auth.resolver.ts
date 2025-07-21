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
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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

    if (user.code === code) {
      const token = this.jwtService.sign({ id: user.id });
      return {
        code: SUCCESS,
        message: '登录成功',
        data: token,
      };
    }

    return { code: LOGIN_FAILED, message: '登录失败,手机号或者验证码不正确' };
  }

  @Mutation(() => SimpleResult, { description: '通过账号密码登录' })
  async loginByAccount(
    @Args('account') account: string,
    @Args('password') password: string,
  ): Promise<SimpleResult> {
    const res = await this.userService.findByAccount(account);
    if (!res) {
      return {
        code: ACCOUNT_NOT_EXIST,
        message: '账号不存在',
      };
    } else {
      const md5Pwd = crypto.createHash('md5').update(password).digest('hex');
      if (res.password === md5Pwd) {
        const token = this.jwtService.sign({ id: res.id });
        console.log('🚀 ~ file: auth.resolver.ts ~ line 76 ~ ', token);
        return {
          code: SUCCESS,
          message: '登录成功',
          data: token,
        };
      } else {
        return {
          code: LOGIN_FAILED,
          message: '密码错误',
        };
      }
    }
  }
}
