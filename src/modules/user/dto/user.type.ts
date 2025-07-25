import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field()
  name: string;
  @Field()
  desc: string;
  @Field()
  id?: string;
  @Field({ description: '账号信息' })
  account?: string;
  @Field({ description: '手机号', nullable: true })
  tel?: string;
  @Field({ description: '头像', nullable: true })
  avatar?: string;
}
