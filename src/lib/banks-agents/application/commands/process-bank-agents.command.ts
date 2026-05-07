export class ProcessBankAgentsCommand {
  constructor(
    public readonly data: {
      id: string;
      amount: number;
      createdAt: string;
      checked: boolean;
    }[],
  ) {}
}
