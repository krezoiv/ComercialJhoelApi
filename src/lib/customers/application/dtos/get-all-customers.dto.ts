import { IsInt, IsOptional, Min } from 'class-validator';

export class GetAllCustomersDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}

export class CustomerResponseDto {
  id!: string;
  personId!: string;
  firstName!: string;
  lastName!: string;
  phoneNumber!: string;
  email!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
