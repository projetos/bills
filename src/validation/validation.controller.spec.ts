import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GetValidationDto } from './dto/get-validation.dto';
import { RevenueEnum } from './enum/errors.enum';
import { GetValidationResponse } from './response/get-validation.response';
import { ValidationController } from './validation.controller';
import { ValidationService } from './validation.service';

describe('ValidationController', () => {
  let controller: ValidationController;
  let service: ValidationService;

  const getValidationResponse: GetValidationResponse = {
    amount: '44,99',
    expirationDate: '',
    barCode: '84600000000449902931000112205852192204677669',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValidationController],
      providers: [
        {
          provide: ValidationService,
          useValue: {
            validate: jest.fn().mockReturnValue(getValidationResponse),
          },
        },
      ],
    }).compile();

    controller = module.get<ValidationController>(ValidationController);
    service = module.get<ValidationService>(ValidationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      const response = controller.validateBill(getValidationDtoMock);
      expect(response).toEqual(getValidationResponseMock);
    });
  });

  describe('validation.controller - validate()', () => {
    test('Should return specified error message', () => {
      const getValidationDtoMock: GetValidationDto = {
        typableLine: '146000000006449902931004011220585217922046776691',
      };

      try {
        service.validate = jest.fn(() => {
          throw new BadRequestException({
            status: RevenueEnum.BAD_REQUEST,
            message: RevenueEnum.MESSAGE,
          });
        });
        controller.validateBill(getValidationDtoMock);
      } catch (error) {
        expect(error.message).toEqual(RevenueEnum.MESSAGE);
      }
    });
  });
});
