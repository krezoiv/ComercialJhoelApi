import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PersonsController } from './presentation/controller/persons.controller';
import { CreatePersonsHandler } from './application/commands/create-persons.handler';
import { GetAllPersonsHandler } from './application/queries/get-all-persons.handler';
import { UpdatePersonsHandler } from './application/commands/update-persons.handler';
import { SoftDeletePersonsHandler } from './application/commands/soft-delete-persons.handler';
import { PrismaPersonsRepository } from './infrastructure/prisma/prisma-persons.repository';
import { PERSONS_REPOSITORY } from './domain/repository/persons.repository.token';
import { PrismaService } from 'src/shared/database/prisma.service';
import { GetPersonByIdHandler } from './application/queries/get-byId-persons.handler';

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

    ...CommandHandlers,
    ...QueryHandlers,

    {
      provide: PERSONS_REPOSITORY,
      useClass: PrismaPersonsRepository,
    },
  ],
})
export class PersonsModule {}
