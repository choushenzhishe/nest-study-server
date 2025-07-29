import { createResults } from '@/common/dto/result.type';
import { ObjectType } from '@nestjs/graphql';
import { UserType } from './user.type';

@ObjectType()
export class UserResults extends createResults(UserType) {}
