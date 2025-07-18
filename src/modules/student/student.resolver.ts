import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { studentService } from './student.service';
import { StudentInput } from './dto/student-input.type';
import { SimpleResult } from '@/common/dto/result.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/guards/auth.guards';

@Resolver()
@UseGuards(GqlAuthGuard)
export class StudentResolver {
  constructor(private readonly studentService: studentService) {}
  @Mutation(() => SimpleResult)
  async createUserByPassword(
    @Args('params') params: StudentInput,
  ): Promise<SimpleResult> {
    return await this.studentService.createByPassword(params);
  }
}
