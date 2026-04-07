import { IsUUID } from 'class-validator';

export class SoftDeletePersonsDto {
  @IsUUID()
  id!: string;
}
