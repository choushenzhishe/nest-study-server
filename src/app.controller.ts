import { UserService } from './modules/user/user.service';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './modules/user/models/user.entity';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get('/create')
  async create(): Promise<boolean> {
    return await this.userService.create({
      name: '来金',
      desc: '狗狗大兵',
      tel: '8800888',
      password: '123456',
      account: 'admin',
    });
  }

  @Get('/del')
  async del(): Promise<boolean> {
    return await this.userService.del('217366de-d697-4e01-b63f-3c6f266e46ff');
  }

  @Get('/update')
  async update(): Promise<boolean> {
    return await this.userService.update(
      '2000630e-4f1f-4d47-8bdc-bcf5b845a61a',
      {
        name: '摩摩金',
      },
    );
  }

  @Get('/find')
  async find(): Promise<User> {
    return await this.userService.findOne(
      '2000630e-4f1f-4d47-8bdc-bcf5b845a61a',
    );
  }
}
