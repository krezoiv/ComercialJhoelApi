export class CreateRolsCommand {
  constructor(
    public readonly rolName: string,
    public readonly description: string,
  ) {}
}
