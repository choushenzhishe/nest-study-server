import { Injectable } from '@nestjs/common';
// import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
// import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
// import Util, * as $Util from '@alicloud/tea-util';
// import Credential from '@alicloud/credentials';
import { getRandomCode } from '@/shared/utils';
import { UserService } from '../user/user.service';
import * as dayjs from 'dayjs';
import { SimpleResult } from '@/common/dto/result.type';
import {
  CODE_NOT_EXPIRED,
  SUCCESS,
  UPDATE_FAILED,
} from '@/common/constants/code';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  // 发送验证码
  async sendCodeMsg(tel: string): Promise<SimpleResult> {
    const user = await this.userService.findByTel(tel);
    if (user) {
      const diffTime = dayjs().diff(dayjs(user.codeCreatedTime));
      if (diffTime < 60 * 1000) {
        return {
          code: CODE_NOT_EXPIRED, // CODE_NOT_EXPIRED
          message: '验证码未过期，请稍后再试',
        };
      }
    }

    const code = getRandomCode();

    // const user = await this.userService.findByTel(tel);
    if (user) {
      const result = await this.userService.updateCode(user.id, code);
      if (result) {
        return {
          code,
          message: '获取验证码成功',
        };
      }
      return { code: UPDATE_FAILED, message: '更新验证码失败' };
    } else {
      const result = await this.userService.create({
        tel,
        code,
        codeCreatedTime: new Date(),
      });
      if (result) {
        return {
          code,
          message: '获取验证码成功',
        };
      }
      return {
        code: UPDATE_FAILED,
        message: '创建用户失败',
      };
    }

    // let credential = new Credential();
    // let config = new $OpenApi.Config({
    //   credential: credential,
    // });
    // // Endpoint 请参考 https://api.aliyun.com/product/Dysmsapi
    // config.endpoint = `dysmsapi.aliyuncs.com`;
    // let client = new Dysmsapi20170525(config);
    // let sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
    //   signName: '阿里云通信',
    //   templateCode: 'SMS_320145872',
    //   phoneNumbers: tel,
    //   templateParam: `{ code:${code} }`,
    // });
    // let runtime = new $Util.RuntimeOptions({});
    // try {
    //   // 复制代码运行请自行打印 API 的返回值
    //   await client.sendSmsWithOptions(sendSmsRequest, runtime);
    // } catch (error) {
    //   // 此处仅做打印展示，请谨慎对待异常处理，在工程项目中切勿直接忽略异常。
    //   // 错误 message
    //   console.log(error.message);
    //   // 诊断地址
    //   console.log(error.data['Recommend']);
    // }
    // return '';
  }
}
