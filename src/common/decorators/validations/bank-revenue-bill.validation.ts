import { bankModule10 } from './bank-module-10.validation';
import { bankModule11Revenue } from './bank-module-11-revenue.validation';
import { convertToRevenueBarCode } from './convert-fields.validation';

export function bankRevenueBillBarCode(code: string): boolean {
  if (!/^[0-9]{44}$/.test(code) || Number(code[0]) !== 8) return false;
  const coinCode = Number(code[2]);
  const VD = Number(code[3]);
  const field = code.substring(0, 3) + code.substring(4);

  let module: any;

  if (coinCode === 6 || coinCode === 7) module = bankModule10;
  else if (coinCode === 8 || coinCode === 9) module = bankModule11Revenue;
  else return false;
  return module(field) === VD;
}

export function bankRevenueTypableLine(code: string, validateFields = false) {
  if (!/^[0-9]{48}$/.test(code) || Number(code[0]) !== 8) return false;

  const validVD = bankRevenueBillBarCode(convertToRevenueBarCode(code));

  if (!validateFields) return validVD;

  const coinCode = Number(code[2]);
  let module: any;

  if (coinCode === 6 || coinCode === 7) module = bankModule10;
  else if (coinCode === 8 || coinCode === 9) module = bankModule11Revenue;
  else return false;

  const fields = Array.from({ length: 4 }, (v, index) => {
    const start = 11 * index + index;
    const end = 11 * (index + 1) + index;
    return {
      num: code.substring(start, end),
      VD: code.substring(end, end + 1),
    };
  });

  const validFields = fields.every((e) => module(e.num) === Number(e.VD));
  return validFields && validVD;
}

export function bankBillRevenue(code: string, validFields = false): boolean {
  if (code.length === 44) return bankRevenueBillBarCode(code);
  if (code.length === 48) return bankRevenueTypableLine(code, validFields);

  return false;
}
