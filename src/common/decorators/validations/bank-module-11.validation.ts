export function bankModule11(field: string): number {
  const code = field.split('').reverse();
  let multiplier = 2;
  const product = code.reduce((acc, current) => {
    const sum = Number(current) * multiplier;
    multiplier = multiplier === 9 ? 2 : multiplier + 1;
    return acc + sum;
  }, 0);
  const remainder = product % 11;
  const VD = 11 - remainder;
  if (VD === 0 || VD === 10 || VD === 11) return 1;
  return VD;
}
