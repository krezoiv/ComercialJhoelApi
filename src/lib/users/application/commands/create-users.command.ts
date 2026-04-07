export class CreateUsersCommand {
  constructor(
    public readonly rolId: string,
    public readonly personId: string,
    public readonly userName: string,
    public readonly password: string,
  ) {}
}
