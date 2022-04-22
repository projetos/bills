import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNumberString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class GetValidationDto {
  @ApiProperty()
  @IsDefined()
  @IsNumberString()
  @MinLength(47)
  @MaxLength(48)
  typableLine: string;
}
