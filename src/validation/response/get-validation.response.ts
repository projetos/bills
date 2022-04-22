import { ApiProperty } from '@nestjs/swagger';

export class GetValidationResponse {
  @ApiProperty()
  amount: string;

  @ApiProperty()
  expirationDate: string;

  @ApiProperty()
  barCode: string;
}
