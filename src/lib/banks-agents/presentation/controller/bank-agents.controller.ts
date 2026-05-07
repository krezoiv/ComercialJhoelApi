import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateBankAgentsCommand,
  CreateBankAgentsDto,
  GetBankAgentsByCustomerIdDto,
} from '../../application/index-banks-agents-application';
import { RequestWithUser } from 'src/shared/auth/types/request-with-user.interface';
import { BankAgent } from '../../domain/index-bank.agents-domain';
import { GetBankAgentsByCustomersQuery } from '../../application/queries/get-bank-agent-by-customers.query';
import { GetBankAgentByCustormerIdQuery } from '../../application/queries/get-bank-agent-by-customer-id.query';
import { IBankAgentCustomersIdResponseDto } from '../../application/dtos/bank-agent-customersId.response.dto';
import { ProcessBankAgentsDto } from '../../application/dtos/process-bank-agent.dto';
import { ProcessBankAgentsCommand } from '../../application/commands/process-bank-agents.command';
import { ProcessBankAgentsResult } from '../../infrastructure/index-agent-banks-infrastructure';

@Controller('bankAgents')
export class BankAgentsController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() dto: CreateBankAgentsDto,
    @Req() req: RequestWithUser,
  ): Promise<BankAgent> {
    return this._commandBus.execute(
      new CreateBankAgentsCommand(
        dto.customerId,
        dto.bankId,
        req.user.id,
        dto.description,
        dto.amount,
        dto.paymentDate,
      ),
    );
  }

  @Get('bankAgents-customers')
  async getAgentBanksByCustomers(): Promise<BankAgent> {
    return this._queryBus.execute(new GetBankAgentsByCustomersQuery());
  }

  @Get('customer/:id')
  async findBankAgentsByCustomerId(
    @Param() params: GetBankAgentsByCustomerIdDto,
  ): Promise<IBankAgentCustomersIdResponseDto[]> {
    return this._queryBus.execute(
      new GetBankAgentByCustormerIdQuery(params.id),
    );
  }

  @Post('process')
  async processBankAgents(
    @Body() dto: ProcessBankAgentsDto,
  ): Promise<ProcessBankAgentsResult> {
    console.log('🔥 DTO:', dto);
    return this._commandBus.execute(new ProcessBankAgentsCommand(dto.data));
  }
}
