import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PersonsController } from './presentation/controller/persons.controller';

import { CreatePersonsHandler } from './application/commands/create-persons.handler';
import { UpdatePersonsHandler } from './application/commands/update-persons.handler';
import { SoftDeletePersonsHandler } from './application/commands/soft-delete-persons.handler';

import { GetAllPersonsHandler } from './application/queries/get-all-persons.handler';
import { GetPersonByIdHandler } from './application/queries/get-byId-persons.handler';

import { PrismaPersonsRepository } from './infrastructure/prisma/prisma-persons.repository';
import { PERSONS_REPOSITORY } from './domain/repository/persons.repository.token';

import { PrismaService } from 'src/shared/database/prisma.service';

// 🔥 NUEVOS IMPORTS
import { SpExecutorService } from 'src/shared/database/sp-executor.service';
import { CreatePersonSp } from './infrastructure/stored-procedures/create-person.sp';
import { UpdatePersonSp } from './infrastructure/stored-procedures/update-person.sp';
import { GetAllPersonSp } from './infrastructure/stored-procedures/get-all-person.sp';
import { GetPersonByIdSp } from './infrastructure/stored-procedures/get-person-by-id.sp';
import { DeletePesonSp } from './infrastructure/stored-procedures/delete -person.sp';

const CommandHandlers = [
  CreatePersonsHandler,
  UpdatePersonsHandler,
  SoftDeletePersonsHandler,
];

const QueryHandlers = [GetAllPersonsHandler, GetPersonByIdHandler];

@Module({
  imports: [CqrsModule],

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
