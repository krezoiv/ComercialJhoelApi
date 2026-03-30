import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreatePersonsCommand } from '../../application/commands/create-persons.command';
import { UpdatePersonsCommand } from '../../application/commands/update-persons.command';
import { SoftDeletePersonsCommand } from '../../application/commands/soft-delete-persons.command';

import { CreatePersonsDto } from '../../application/dtos/create-persons.dto';
import { UpdatePersonDto } from '../../application/dtos/update-persons.dto';
import { GetAllPersonsQuery } from '../../application/queries/get-all-persons.query';
import { GetByIdPersonsQuery } from '../../application/queries/get-byId-persons.query';
import { Persons } from '../../domain/entity/persons.entity';
import { GetPersonByIdDto } from '../../application/dtos/get-byId-persons.dto';
import { SoftDeletePersonsDto } from '../../application/dtos/soft-delete-persons.dto';

@Controller('persons')
export class PersonsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() dto: CreatePersonsDto): Promise<Persons> {
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
  async findAll(): Promise<Persons> {
    return this.queryBus.execute(new GetAllPersonsQuery());
  }

  @Get(':id')
  async findById(@Param() dto: GetPersonByIdDto): Promise<Persons> {
    return this.queryBus.execute(new GetByIdPersonsQuery(dto.id));
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdatePersonDto,
  ): Promise<Persons> {
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
  async delete(@Param() dto: SoftDeletePersonsDto): Promise<void> {
    return this.commandBus.execute(new SoftDeletePersonsCommand(dto.id));
  }
}
