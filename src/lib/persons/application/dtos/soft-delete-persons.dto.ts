/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsUUID } from 'class-validator';

export class SoftDeletePersonsDto {
  @IsUUID()
  id!: string;
}
