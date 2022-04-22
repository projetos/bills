export function bankModule10(field: string): number {
  const code = field.split('').reverse();
  const product = code.reduce((acc, current, index) => {
    let sum = Number(current) * (((index + 1) % 2) + 1);
    sum = sum > 9 ? Math.trunc(sum / 10) + (sum % 10) : sum;
    return acc + sum;
  }, 0);
  return Math.ceil(product / 10) * 10 - product;
}
