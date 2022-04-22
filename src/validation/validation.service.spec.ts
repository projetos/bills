import { Test, TestingModule } from '@nestjs/testing';
import { GetValidationDto } from './dto/get-validation.dto';
import { BankBillEnum, RevenueEnum } from './enum/errors.enum';
import { GetValidationResponse } from './response/get-validation.response';
import { ValidationService } from './validation.service';

describe('ValidationService', () => {
  let service: ValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidationService],
    }).compile();

    service = module.get<ValidationService>(ValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validation.controller - validate()', () => {
    test('Should return a valid GetValidationResponse', () => {
      const getValidationResponseMock: GetValidationResponse = {
        amount: '44,99',
        expirationDate: '',
        barCode: '84600000000449902931000112205852192204677669',
      };

      const getValidationDtoMock: GetValidationDto = {
        typableLine: '846000000006449902931004011220585217922046776691',
      };

      const response = service.validate(getValidationDtoMock.typableLine);
      expect(response).toEqual(getValidationResponseMock);
    });
  });

  describe('validation.controller - validate()', () => {
    test('Should return a valid GetValidationResponse', () => {
      const getValidationResponseMock: GetValidationResponse = {
        amount: '68,92',
        expirationDate: '2022-04-07',
        barCode: '81600000000689216052022040780020220275939505',
      };

      const getValidationDtoMock: GetValidationDto = {
        typableLine: '816000000009689216052027204078002027202759395058',
      };

      const response = service.validate(getValidationDtoMock.typableLine);
      expect(response).toEqual(getValidationResponseMock);
    });
  });

  describe('validation.controller - validate()', () => {
    test('Should return a valid GetValidationResponse', () => {
      const getValidationResponseMock: GetValidationResponse = {
        amount: '249,06',
        expirationDate: '2022-01-15',
        barCode: '00198886600000249060000002874902017694003017',
      };

      const getValidationDtoMock: GetValidationDto = {
        typableLine: '00190000090287490201476940030174888660000024906',
      };

      const response = service.validate(getValidationDtoMock.typableLine);
      expect(response).toEqual(getValidationResponseMock);
    });
  });

  describe('validation.controller - validate()', () => {
    test('Should return a valid GetValidationResponse', () => {
      const getValidationResponseMock: GetValidationResponse = {
        amount: '',
        expirationDate: '',
        barCode: '03395000000000000009492836981909106925380102',
      };

      const getValidationDtoMock: GetValidationDto = {
        typableLine: '03399492813698190910869253801026500000000000000',
      };

      const response = service.validate(getValidationDtoMock.typableLine);
      expect(response).toEqual(getValidationResponseMock);
    });
  });

  describe('validation.controller - validate()', () => {
    test('Should return specified error message when given code is invalid', () => {
      try {
        const getValidationDtoMock: GetValidationDto = {
          typableLine: '816000000009689216052027204078002027202759395058',
        };

        service.validate(getValidationDtoMock.typableLine);
      } catch (error) {
        expect(error.message).toEqual(RevenueEnum.MESSAGE);
      }
    });
  });

  describe('validation.controller - validate()', () => {
    test('Should return specified error message when given code is invalid', () => {
      try {
        const getValidationDtoMock: GetValidationDto = {
          typableLine: '00190000090287490201476940030174888660000024906',
        };

        service.validate(getValidationDtoMock.typableLine);
      } catch (error) {
        expect(error.message).toEqual(BankBillEnum.MESSAGE);
      }
    });
  });
});
