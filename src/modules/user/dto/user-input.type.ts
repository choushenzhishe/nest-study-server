import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  name: string;
  @Field()
  desc: string;
  @Field({ nullable: true })
  id?: string;
  @Field({ nullable: true })
  account?: string;
}
