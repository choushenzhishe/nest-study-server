import { CommonType } from '@/common/dto/common.type';
import { OrgImageType } from '@/modules/orgImage/dto/orgImage.output';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrganizationType extends CommonType {
  @Field({ description: '营业执照' })
  businessLicense: string;
  //
  // @Column({ comment: '法人身份证正面' })
  // @IsNotEmpty()
  @Field({ description: '法人身份证正面' })
  identityCardFrotImg: string;

  // @Column({ comment: '法人身份证反面' })
  // @IsNotEmpty()
  @Field({ description: '法人身份证反面' })
  identityCardBackImg: string;

  // @Column({ type: 'text', comment: '标签以 , 隔开', nullable: true })
  @Field({ description: '标签以 , 隔开', nullable: true })
  tags: string;

  // @Column({ type: 'text', comment: '简介', nullable: true })
  @Field({ description: '简介', nullable: true })
  description: string;

  // @Column({ comment: '机构名', nullable: true, default: '' })
  @Field({ description: '机构名', nullable: true })
  name: string;

  // @Column({ comment: 'logo', nullable: true })
  @Field({ description: 'logo', nullable: true })
  logo: string;

  // @Column({ comment: '地址', nullable: true })
  @Field({ description: '地址', nullable: true })
  address: string;

  // @Column({ comment: '经度', nullable: true })
  @Field({ description: '经度', nullable: true })
  longitude: string;

  // @Column({ comment: '纬度', nullable: true })
  @Field({ description: '纬度', nullable: true })
  latitude: string;

  // @Column({ comment: '描述', nullable: true })
  // @Column({ comment: '联系电话', nullable: true })
  @Field({ description: '联系电话', nullable: true })
  tel: string;
  @Field(() => [OrgImageType], { nullable: true,description: '封面图'})
  orgFrontImg?: OrgImageType;

  @Field(() => [OrgImageType], { nullable: true,description: '室内图' })
  orgRoomImg?: OrgImageType;

  @Field(() => [OrgImageType], { nullable: true ,description: '其他图'})
  orgOtherImg?: OrgImageType;
}
