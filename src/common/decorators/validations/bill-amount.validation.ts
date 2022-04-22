export function getBillAmount(code: string): string {
  let getAmount = parseInt(code.substring(37));
  getAmount /= Math.pow(10, 2);
  const amount = getAmount.toLocaleString('pt-BR');

  if (amount === '0' || amount == null) {
    return '';
  }

  return amount;
}

export function getRevenueBillAmount(code: string): string {
  let getAmount = parseInt(code.substring(4, 11) + code.substring(12, 16));
  getAmount /= Math.pow(10, 2);
  const amount = getAmount.toLocaleString('pt-BR');

  return amount;
}
