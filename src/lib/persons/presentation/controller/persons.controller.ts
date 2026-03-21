import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreatePersonsCommand } from '../../application/commands/create-persons.command';
import { UpdatePersonsCommand } from '../../application/commands/update-persons.command';
import { SoftDeletePersonsCommand } from '../../application/commands/soft-delete-persons.command';

import { CreatePersonDto } from '../../application/dtos/create-persons.dto';
import { UpdatePersonDto } from '../../application/dtos/update-persons.dto';
import { GetAllPersonsQuery } from '../../application/queries/get-all-persons.query';
import { GetByIdPersonsQuery } from '../../application/queries/get-byId-persons.query';

@Controller('persons')
export class PersonsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() dto: CreatePersonDto) {
    return this.commandBus.execute(
      new CreatePersonsCommand(
        dto.firstName,
        dto.lastName,
        dto.phoneNumber,
        dto.email,
      ),
    );
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetAllPersonsQuery());
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.queryBus.execute(new GetByIdPersonsQuery(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePersonDto) {
    return this.commandBus.execute(
      new UpdatePersonsCommand(
        id,
        dto.firstName,
        dto.lastName,
        dto.phoneNumber,
        dto.email,
      ),
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.commandBus.execute(new SoftDeletePersonsCommand(id));
  }
}
