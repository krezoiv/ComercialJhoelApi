export class PersonsResponseDto {
  id!: string;
  firstName!: string;
  lastName!: string;
  phoneNumber!: string;
  email!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date | null;
}
