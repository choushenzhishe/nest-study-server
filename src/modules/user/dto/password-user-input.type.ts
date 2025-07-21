import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PasswordUserInput {
  @Field()
  account: string;
  @Field()
  password: string;
}