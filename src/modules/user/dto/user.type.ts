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
}
