/**
 * Calculate the percent gain of the current value over the initial value.
 * @param currentValue
 * @param initialValue
 */
export function calculatePercentGain(currentValue: number, initialValue: number): number {
  return (initialValue > 0) ? currentValue / initialValue - 1 : 0;
}
