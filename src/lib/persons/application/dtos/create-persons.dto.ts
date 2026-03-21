/* eslint-disable @typescript-eslint/no-unsafe-call */

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  lastName!: string;

  @IsString()
  @Matches(/^\d{8}$/)
  phoneNumber!: string;

  @IsEmail()
  email!: string;
}
