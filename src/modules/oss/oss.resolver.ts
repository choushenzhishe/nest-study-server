import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { OSSType } from './dto/oss.type';
import { OSSService } from './oss.service';

@Resolver()
export class OSSResolver {
  //   constructor(private readonly ossService: OSSService);
  constructor(private readonly ossService: OSSService){};

  @Query(() => OSSType, { description: '获取oss信息' })
  async getOSSInfo(): Promise<OSSType> {
    return await this.ossService.getSignature();
  }
}
