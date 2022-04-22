export function convertToRevenueBarCode(code: string): string {
  let barCode = '';
  for (let index = 0; index < 4; index++) {
    const start = 11 * index + index;
    const end = 11 * (index + 1) + index;
    barCode += code.substring(start, end);
  }
  return barCode;
}

export function convertToBankBarCode(code: string): string {
  let barCode = '';
  barCode += code.substring(0, 3); // Identificação do banco
  barCode += code.substring(3, 4); // Código da moeda
  barCode += code.substring(32, 33); // DV
  barCode += code.substring(33, 37); // Fator Vencimento
  barCode += code.substring(37, 47); // Valor nominal
  barCode += code.substring(4, 9); // Campo Livre Bloco 1
  barCode += code.substring(10, 20); // Campo Livre Bloco 2
  barCode += code.substring(21, 31);
  return barCode;
}
