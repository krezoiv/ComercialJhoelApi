export class CreateExpenseCommand {
  constructor(
    public readonly userId: string,
    public readonly customerId: string,
    public readonly expenseDescription: string,
    public readonly expenseAmount: number,
    public readonly expenseType: string,
  ) {}
}
