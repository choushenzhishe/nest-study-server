import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleLogger, Module } from '@nestjs/common';
import { Organization } from './models/organization.entity';
import { OrganizationService } from './organization.service';
import { OrganizationResolver } from './organization.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
  providers: [ConsoleLogger, OrganizationService, OrganizationResolver],
  exports: [OrganizationService],
})
export class UserModule {}
