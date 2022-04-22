import { bankBill } from './bank-bill.validation';
import { bankBillRevenue } from './bank-revenue-bill.validation';

export function bill(code: string, verifyFields = false): boolean {
  if (Number(code[0]) === 8) return bankBillRevenue(code, verifyFields);

  return bankBill(code, verifyFields);
}
