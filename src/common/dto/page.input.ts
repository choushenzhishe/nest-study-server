import { Field, InputType } from '@nestjs/graphql';
import { isInt, IsInt, Min } from 'class-validator';

@InputType()
export class PageInput {
  @Field()
  @IsInt()
  @Min(0)
  length: number;

  @Field()
  @IsInt()
  @Min(0)
  start: number;
}
