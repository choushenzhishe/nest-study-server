import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OSSType {
  @Field()
  policy: string;
  @Field()
  signature: string;
  @Field()
  x_oss_date: string;
  @Field()
  host: string;
  @Field()
  x_oss_signature_version: string;
  @Field()
  x_oss_credential: string;
  @Field({ nullable: true })
  dir: string;
  @Field()
  security_token: string;
}
