import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class StudentInput {
  @Field()
  account: string;
  @Field()
  password: string;
}
