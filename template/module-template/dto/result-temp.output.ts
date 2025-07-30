import { createResults } from '@/common/dto/result.type';
import { ObjectType } from '@nestjs/graphql';
import { TempType } from './temp.type';

@ObjectType()
export class TempResults extends createResults(TempType) {}
