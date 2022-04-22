export function bankModule11Revenue(field: string): number {
  const code = field.split('').reverse();
  let multiplier = 2;
  const product = code.reduce((acc, current) => {
    const sum = Number(current) * multiplier;
    multiplier = multiplier === 9 ? 2 : multiplier + 1;
    return acc + sum;
  }, 0);
  const remainder = product % 11;

  if (remainder === 0 || remainder === 1) {
    return 0;
  }
  if (remainder === 10) {
    return 1;
  }
  const VD = 11 - remainder;
  return VD;
}
