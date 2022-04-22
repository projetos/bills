import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { GetValidationResponse } from './response/get-validation.response';
import { BankBillEnum, ErrorsEnum, RevenueEnum } from './enum/errors.enum';
import {
  convertToBankBarCode,
  convertToRevenueBarCode,
} from '../common/decorators/validations/convert-fields.validation';
import { bill } from '../common/decorators/validations/bill-code.validation';
import {
  bankBillExpirationDate,
  bankRevenueBillExpirationDate,
} from '../common/decorators/validations/bill-expiration-date.validation';
import {
  getBillAmount,
  getRevenueBillAmount,
} from '../common/decorators/validations/bill-amount.validation';

@Injectable()
export class ValidationService {
  validate(typableLine: string): GetValidationResponse {
    const testing = bill(typableLine);
    let barCode = '';
    let expirationDate = '';
    let amount = '';

    if (Number(typableLine[0]) === 8) {
      if (testing) {
        barCode = convertToRevenueBarCode(typableLine);
        const date =
          typableLine.substring(20, 23) + typableLine.substring(24, 29);
        expirationDate = bankRevenueBillExpirationDate(date);

        amount = getRevenueBillAmount(typableLine);
      } else {
        throw new BadRequestException({
          status: RevenueEnum.BAD_REQUEST,
          message: RevenueEnum.MESSAGE,
        });
      }
    } else {
      if (testing) {
        barCode = convertToBankBarCode(typableLine);
        const date = typableLine.substring(33, 37);
        expirationDate = bankBillExpirationDate(date);

        amount = getBillAmount(typableLine);
      } else {
        throw new BadRequestException({
          status: BankBillEnum.BAD_REQUEST,
          message: BankBillEnum.MESSAGE,
        });
      }
    }

    const returnDto = new GetValidationResponse();
    returnDto.amount = amount;
    returnDto.barCode = barCode;
    returnDto.expirationDate = expirationDate;

    return returnDto;
  }

  throwValidError(error: HttpException | Error) {
    if (error instanceof HttpException) {
      throw error;
    } else {
      throw new InternalServerErrorException({
        status: ErrorsEnum.INTERNAL_ERROR,
        message: error.message,
      });
    }
  }
}
