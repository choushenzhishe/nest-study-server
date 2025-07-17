import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { IsNotEmpty } from 'class-validator';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    comment: '昵称',
    default: '',
  })
  @IsNotEmpty()
  name: string;

  @Column({ comment: '描述信息', default: '' })
  desc: string;

  @Column({ comment: '手机号', nullable: true })
  tel: string;

  @Column({ comment: '密码', nullable: true })
  password: string;

  @Column({ comment: '账号', nullable: true })
  account?: string;

  @Column({ comment: '验证码', nullable: true })
  code?: string;
  @Column({ comment: '验证码创建时间', nullable: true })
  codeCreatedTime?: Date;
}
