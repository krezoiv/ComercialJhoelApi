export class UpdateFinalBalanceCommand {
  constructor(
    public readonly updates: {
      accountNumber: string;
      finalBalance: number;
    }[],
  ) {}
}
