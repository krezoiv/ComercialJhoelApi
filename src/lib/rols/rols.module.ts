import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaRolsRepository } from './infrastructure/prisma/prisma-rols.repository';
import {
  PrismaService,
  SpExecutorService,
} from 'src/shared/database/index-database';
import {
  CreateRolsSp,
  GetAllRolsSp,
} from './infrastructure/index-rols-infrastructure';
import { ROLS_REPOSITORY } from './domain/index-rols-domain';
import { RolsController } from './presentation/index-rols-presentation';
import {
  CreateRolsHandler,
  GetAllRolsHandler,
} from './application/index-rols-application';

const CommandHandler = [CreateRolsHandler, GetAllRolsHandler];
const QueryHandler = [GetAllRolsHandler];
@Module({
  imports: [CqrsModule],
  controllers: [RolsController],
  providers: [
    PrismaService,
    SpExecutorService,
    CreateRolsSp,
    GetAllRolsSp,

    ...CommandHandler,
    ...QueryHandler,

    {
      provide: ROLS_REPOSITORY,
      useClass: PrismaRolsRepository,
    },
  ],
})
export class RolsModule {}
