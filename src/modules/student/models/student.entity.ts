import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ comment: '姓名', default: '', nullable: true })
  name: string;
  @Column({ comment: '手机号', default: '', nullable: true })
  tel: string;
  @Column({ comment: '头像', default: '', nullable: true })
  avatar: string;
  @Column({ comment: '密码', default: '' })
  @IsNotEmpty()
  password: string;
  @Column({ comment: '账号', default: '' })
  @IsNotEmpty()
  account: string;
}
