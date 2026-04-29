import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateBankAgentsCommand,
  CreateBankAgentsDto,
} from '../../application/index-banks-agents-application';
import { RequestWithUser } from 'src/shared/auth/types/request-with-user.interface';
import { BankAgent } from '../../domain/index-bank.agents-domain';
import { GetBankAgentsByCustomersQuery } from '../../application/queries/get-bank-agent-by-customers.query';

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
}
