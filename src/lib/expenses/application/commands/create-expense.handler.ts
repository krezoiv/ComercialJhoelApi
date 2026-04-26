import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateExpenseCommand } from './create-expense.command';
import { Inject } from '@nestjs/common';
import { ExpenseRepository } from '../../domain/index-expenses-domain';
import { ExpenseMapper } from '../mappers/expense.mapper';

@CommandHandler(CreateExpenseCommand)
export class CreateExpenseHandler implements ICommandHandler<CreateExpenseCommand> {
  constructor(
    @Inject('EXPENSES_REPOSITORY')
    private readonly _expensesRepository: ExpenseRepository,
  ) {}

  async execute(command: CreateExpenseCommand) {
    const expense = ExpenseMapper.toEntity({
      userId: command.userId,
      customerId: command.customerId,
      expenseDescription: command.expenseDescription,
      expenseAmount: command.expenseAmount,
      expenseType: command.expenseType,
    });
    return this._expensesRepository.create(expense);
  }
}
