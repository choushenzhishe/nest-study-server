import { CommonType } from '@/common/dto/common.type';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TempType extends CommonType {
  @Field()
  name: string;
  @Field()
  desc: string;
  @Field({ description: '账号信息' })
  account?: string;
  @Field({ description: '手机号', nullable: true })
  tel?: string;
  @Field({ description: '头像', nullable: true })
  avatar?: string;
}
