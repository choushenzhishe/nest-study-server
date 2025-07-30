import { OrgImageType } from '@/modules/orgImage/dto/orgImage.output';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OrganizationInput {
  @Field({ description: '营业执照' })
  businessLicense: string;

  @Field({ description: '法人身份证正面' })
  identityCardFrotImg: string;

  @Field({ description: '法人身份证反面' })
  identityCardBackImg: string;

  @Field({ description: '标签以 , 隔开', nullable: true })
  tags: string;

  @Field({ description: '简介', nullable: true })
  description: string;

  @Field({ description: '机构名', nullable: true })
  name: string;

  @Field({ description: 'logo', nullable: true })
  logo: string;

  @Field({ description: '地址', nullable: true })
  address: string;

  @Field({ description: '经度', nullable: true })
  longitude: string;

  @Field({ description: '纬度', nullable: true })
  latitude: string;

  @Field({ description: '联系电话', nullable: true })
  tel: string;

  @Field(() => [OrgImageType], { nullable: true, description: '机构门面图' })
  orgFrontImg?: OrgImageType;

  @Field(() => [OrgImageType], { nullable: true, description: '机构室内图' })
  orgRoomImg?: OrgImageType;

  @Field(() => [OrgImageType], { nullable: true, description: '机构环境图' })
  orgOtherImg?: OrgImageType;
}
