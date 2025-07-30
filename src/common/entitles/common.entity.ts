import { validateOrReject, IsDate, IsOptional } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

export class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'timestamp',
    comment: '创建时间',
  })
  createAt: Date;

  @Column({
    comment: '创建人',
    nullable: true,
  })
  @IsOptional()
  createdBy: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    comment: '更新时间',
  })
  updatedAt: Date;

  @Column({
    comment: '更新人',
    nullable: true,
  })
  @IsOptional()
  updatedBy: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    comment: '删除时间',
  })
  @DeleteDateColumn()
  @IsDate()
  @IsOptional()
  deletedAt: Date;

  @Column({ nullable: true, comment: '删除人' })
  @IsOptional()
  deletedBy: string;

  @BeforeInsert()
  setCreatedAt() {
    const now = new Date();
    this.createAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }

  @BeforeInsert()
  async validateBeforeInsert() {
    await validateOrReject(this);
  }

  @BeforeUpdate()
  async validateBeforeUpdate() {
    await validateOrReject(this, { skipMissingProperties: true });
  }
}
