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
import {
  CreatePersonsCommand,
  CreatePersonsDto,
  GetAllPersonsQuery,
  GetByIdPersonsQuery,
  GetPersonByIdDto,
  SoftDeletePersonsCommand,
  SoftDeletePersonsDto,
  UpdatePersonDto,
  UpdatePersonsCommand,
} from '../../application/index-application';
import { Persons } from '../../domain/index-domain';

@Controller('persons')
export class PersonsController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() dto: CreatePersonsDto): Promise<Persons> {
    return this._commandBus.execute(
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
    return this._queryBus.execute(new GetAllPersonsQuery());
  }

  @Get(':id')
  async findById(@Param() dto: GetPersonByIdDto): Promise<Persons> {
    return this._queryBus.execute(new GetByIdPersonsQuery(dto.id));
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdatePersonDto,
  ): Promise<Persons> {
    return this._commandBus.execute(
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
    return this._commandBus.execute(new SoftDeletePersonsCommand(dto.id));
  }
}
