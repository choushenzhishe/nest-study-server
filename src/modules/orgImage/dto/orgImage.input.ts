import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class OrgImageInput {
  @Field({ nullable: true })
  id: string;
  @Field({ nullable: true })
  remark: string;
  @Field()
  url: string;
}
