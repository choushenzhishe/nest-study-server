import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { IsNotEmpty } from 'class-validator';
import { CommonEntity } from '@/common/entitles/common.entity';
import { OrgImage } from '@/modules/orgImage/models/orgImage.entity';

@Entity('organization')
export class Organization extends CommonEntity {
  @Column({
    comment: '营业执照',
  })
  @IsNotEmpty()
  businessLicense: string;

  @Column({ comment: '法人身份证正面' })
  @IsNotEmpty()
  identityCardFrotImg: string;

  @Column({ comment: '法人身份证反面' })
  @IsNotEmpty()
  identityCardBackImg: string;

  @Column({ type: 'text', comment: '标签以 , 隔开', nullable: true })
  tags: string;

  @Column({ type: 'text', comment: '简介', nullable: true })
  description: string;

  @Column({ comment: '机构名', nullable: true, default: '' })
  name: string;

  @Column({ comment: 'logo', nullable: true })
  logo: string;

  @Column({ comment: '地址', nullable: true })
  address: string;

  @Column({ comment: '经度', nullable: true })
  longitude: string;

  @Column({ comment: '纬度', nullable: true })
  latitude: string;

  @Column({ comment: '联系电话', nullable: true })
  tel: string;

  @OneToMany(() => OrgImage, (orgImage) => orgImage.orgIdForFront)
  orgFrontImg?: OrgImage[];

  @OneToMany(() => OrgImage, (orgImage) => orgImage.orgIdForRoom)
  orgRoomImg?: OrgImage[];

  @OneToMany(() => OrgImage, (orgImage) => orgImage.orgIdForOther)
  orgOtherImg?: OrgImage[];
}
