export class CreateBanksAccountsCommand {
  constructor(
    public readonly initialBalance: number,
    public readonly finalBalance: number,
    public readonly bankId: string,
    public readonly accountTypeId: string,
    public readonly bankAccountNumber: string,
    public readonly bankAccountName: string,
  ) {}
}
