import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PrismaPersonsRepository } from './infrastructure/prisma/prisma-persons.repository';
import { PersonsController } from './presentation/index-presentation';
import {
  CreatePersonsHandler,
  GetAllPersonsHandler,
  GetPersonByIdHandler,
  SoftDeletePersonsHandler,
  UpdatePersonsHandler,
} from './application/index-application';
import { PERSONS_REPOSITORY } from './domain/index-domain';
import {
  PrismaService,
  SpExecutorService,
} from 'src/shared/database/index-database';
import {
  CreatePersonSp,
  DeletePesonSp,
  GetAllPersonSp,
  GetPersonByIdSp,
  UpdatePersonSp,
} from './infrastructure/index-infrastructure';
import { AuthModule } from '../auth/auth.module';

const CommandHandlers = [
  CreatePersonsHandler,
  UpdatePersonsHandler,
  SoftDeletePersonsHandler,
];

const QueryHandlers = [GetAllPersonsHandler, GetPersonByIdHandler];

@Module({
  imports: [CqrsModule, AuthModule],

  controllers: [PersonsController],

  providers: [
    PrismaService,

    // 🔥 SP infrastructure
    SpExecutorService,
    CreatePersonSp,
    UpdatePersonSp,
    GetAllPersonSp,
    GetPersonByIdSp,
    DeletePesonSp,

    ...CommandHandlers,
    ...QueryHandlers,

    {
      provide: PERSONS_REPOSITORY,
      useClass: PrismaPersonsRepository,
    },
  ],
})
export class PersonsModule {}
