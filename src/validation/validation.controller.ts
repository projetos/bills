import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BILL_SWAGGER_GET_VALIDATION_DOCUMENTATION,
  BILL_SWAGGER_VALIDATION_MODULE,
} from '../swagger/validation.constants';
import { GetValidationDto } from './dto/get-validation.dto';
import { GetValidationResponse } from './response/get-validation.response';
import { ValidationService } from './validation.service';

@ApiTags(BILL_SWAGGER_VALIDATION_MODULE)
@Controller('boleto')
export class ValidationController {
  constructor(public validationService: ValidationService) {}

  @Get('/:typableLine')
  @ApiOkResponse(BILL_SWAGGER_GET_VALIDATION_DOCUMENTATION)
  @ApiResponse({ status: 400, description: 'Bad Request' })
  validateBill(@Param() param: GetValidationDto): GetValidationResponse {
    return this.validationService.validate(param.typableLine);
  }
}
