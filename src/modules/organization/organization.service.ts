import { Injectable, Query } from '@nestjs/common';
import { Organization } from './models/organization.entity';
import { Repository, DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { SimpleResult } from '@/common/dto/result.type';
import { CREATE_USER_FAILED, SUCCESS } from '@/common/constants/code';
import { OrganizationType } from './dto/organization.type';
import { OrganizationResults } from './dto/result-organization.output';
import { Args } from 'type-graphql';
import { PageInput } from '@/common/dto/page.input';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private OrganizationRepository: Repository<Organization>,
  ) {}
  // 新增
  async create(entity: DeepPartial<Organization>): Promise<boolean> {
    const res = await this.OrganizationRepository.insert(entity);
    console.log('res', res);
    return res && res.raw.affectedRows > 0;
  }

  async findById(id: string): Promise<Organization> {
    return this.OrganizationRepository.findOne({ where: { id } });
  }

  async updateById(
    id: string,
    entity: DeepPartial<Organization>,
  ): Promise<boolean> {
    const existEntity = await this.OrganizationRepository.findOne({
      where: { id },
    });
    if (!existEntity) return false;
    Object.assign(existEntity, entity);
    const res = await this.OrganizationRepository.save(existEntity);

    return !!res;
  }

  async findOrganizations(
    start: number,
    length: number,
  ): Promise<[Organization[], number]> {
    return this.OrganizationRepository.findAndCount({
      take: length,
      skip: start,
      order: { createAt: 'DESC' },
    });
  }

  async deleteById(id: string, userId: string): Promise<boolean> {
    const result = await this.OrganizationRepository.update(id, {
      deletedBy: userId,
    });
    if (result) {
      const res = await this.OrganizationRepository.softDelete(id);
      if (res.affected > 0) return true;
    }
    return false;
  }

  
}
