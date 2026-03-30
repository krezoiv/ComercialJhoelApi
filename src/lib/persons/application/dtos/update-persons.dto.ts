import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UpdatePersonDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  lastName?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{8}$/, {
    message: 'Invalid phone number format',
  })
  phoneNumber?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
