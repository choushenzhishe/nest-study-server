import { ObjectType, Field } from '@nestjs/graphql';
import {} from 'type-graphql';

@ObjectType()
export class OrgImageType {
  @Field({ nullable: true })
  id: string;
  @Field({ nullable: true })
  remark: string;
  @Field()
  url: string;
}
