export class CreateBankAgentsCommand {
  constructor(
    public readonly customerId: string,
    public readonly bankId: string,
    public readonly userId: string,
    public readonly description: string,
    public readonly amount: number,
    public readonly paymentDate: Date,
  ) {}
}
