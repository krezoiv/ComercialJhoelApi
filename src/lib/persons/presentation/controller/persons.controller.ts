import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseUUIDPipe,
  UseGuards, // 🔥 IMPORTANTE
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport'; // 🔥 JWT
import { Rols } from 'src/shared/auth/decorators/rol-decorator';
import { CheckPolicies } from 'src/shared/auth/decorators/policies.decorator';

import { PoliciesGuard } from 'src/shared/auth/guards/policies.guard';

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
import { RolsList } from 'src/shared/auth/types/rols.enum';
import {
  Actions,
  RolesGuard,
  Subjects,
} from 'src/shared/auth/index-shared -auth';
// 🔥 OJO: sin espacio

// 🔥 AQUÍ ESTÁ LA CLAVE
@UseGuards(AuthGuard('jwt'), RolesGuard, PoliciesGuard)
@Controller('persons')
export class PersonsController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  // 🔓 SOLO ADMIN puede crear
  @Post()
  @Rols(RolsList.ADMIN)
  @CheckPolicies((ability) => ability.can(Actions.Create, Subjects.Persons))
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

  // 🔓 ADMIN y USER pueden leer
  @Get()
  @Rols(RolsList.ADMIN, RolsList.USER)
  @CheckPolicies((ability) => ability.can(Actions.Read, Subjects.Persons))
  async findAll(): Promise<Persons> {
    return this._queryBus.execute(new GetAllPersonsQuery());
  }

  // 🔓 ADMIN y USER pueden ver por id
  @Get(':id')
  @Rols(RolsList.ADMIN, RolsList.USER)
  @CheckPolicies((ability) => ability.can(Actions.Read, Subjects.Persons))
  async findById(@Param() dto: GetPersonByIdDto): Promise<Persons> {
    return this._queryBus.execute(new GetByIdPersonsQuery(dto.id));
  }

  // 🔓 SOLO ADMIN puede actualizar
  @Patch(':id')
  @Rols(RolsList.ADMIN)
  @CheckPolicies((ability) => ability.can(Actions.Update, Subjects.Persons))
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

  // 🔓 SOLO ADMIN puede eliminar
  @Delete(':id')
  @Rols(RolsList.ADMIN)
  @CheckPolicies((ability) => ability.can(Actions.Delete, Subjects.Persons))
  async delete(@Param() dto: SoftDeletePersonsDto): Promise<void> {
    return this._commandBus.execute(new SoftDeletePersonsCommand(dto.id));
  }
}
