import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    example: 'Superman',
    description: "The supercontact's nickname",
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255, { message: 'Nickname must be at least 3 characters long' })
  readonly nickname: string;

  @ApiProperty({
    example: 'Clark Kent',
    description: "The supercontact's real name",
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255, { message: 'Real name must be at least 3 characters long' })
  readonly real_name: string;
}
