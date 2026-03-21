export class CreatePersonsCommand {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly phoneNumber: string,
    public readonly email: string,
  ) {}
}
