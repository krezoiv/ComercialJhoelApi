import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PrismaService } from 'src/shared/database/prisma.service';
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import { CreateUsersSp } from './infrastructure/index-users-infrastructure';
import { USERS_REPOSITORY } from './index-users-domain';
import { PrismaUsersRepository } from './infrastructure/prisma/prisma-users.repository';
import { UsersController } from './presentation/index-users-presentation';
import {
  CreateUsersHandler,
  USersWithRelationsHandler,
} from './application/index-users-application';
import { UsersWithRelationsSp } from './infrastructure/stored-procedures/users-with-relations.sp';

const CommandHandler = [CreateUsersHandler, USersWithRelationsHandler];
const QueryHandler = [USersWithRelationsHandler];
@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [
    PrismaService,
    SpExecutorService,
    CreateUsersSp,
    UsersWithRelationsSp,
    ...CommandHandler,
    ...QueryHandler,

    {
      provide: USERS_REPOSITORY,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class UsersModule {}
