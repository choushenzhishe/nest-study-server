import { Field } from 'type-graphql';

export class CommonType {
  @Field()
  id: number;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  createdBy: number;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  updatedBy: number;

  @Field({ nullable: true })
  deletedAt: Date;

  @Field({ nullable: true })
  deletedBy: number;
}
