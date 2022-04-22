import { bankModule10 } from './bank-module-10.validation';
import { bankModule11 } from './bank-module-11.validation';
import { convertToBankBarCode } from './convert-fields.validation';

export function bankBillBarCode(code: string): boolean {
  if (!/^[0-9]{44}$/.test(code)) return false;
  const VD = code[4];
  const field = code.substring(0, 4) + code.substring(5);
  return bankModule11(field) === Number(VD);
}

export function bankBillTypableLine(
  code: string,
  verifyFields = false,
): boolean {
  if (!/^[0-9]{47}$/.test(code)) return false;
  const fields = [
    {
      num: code.substring(0, 9),
      VD: code.substring(9, 10),
    },
    {
      num: code.substring(10, 20),
      VD: code.substring(20, 21),
    },
    {
      num: code.substring(21, 31),
      VD: code.substring(31, 32),
    },
  ];
  const validFields = verifyFields
    ? fields.every((e) => bankModule10(e.num) === Number(e.VD))
    : true;
  const verifiedVD = bankBillBarCode(convertToBankBarCode(code));
  return validFields && verifiedVD;
}

export function bankBill(code: string, verifyFields = false): boolean {
  if (code.length === 44) return bankBillBarCode(code);
  if (code.length === 47) return bankBillTypableLine(code, verifyFields);

  return false;
}
