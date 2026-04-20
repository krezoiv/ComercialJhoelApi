export class CreateBanksCommand {
  constructor(
    public readonly bankName: string,
    public readonly description: string,
  ) {}
}
