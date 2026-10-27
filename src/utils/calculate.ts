export type TipCalculationInputs = {
  bill: number;
  tipPercent: number;
  people: number;
};

export function calculateTip({
  bill,
  tipPercent,
  people,
}: TipCalculationInputs) {
  const totalTip = bill * (tipPercent / 100);
  const tipAmount = people > 0 ? totalTip / people : 0;
  const totalPerPerson = people > 0 ? (bill + totalTip) / people : 0;

  return { tipAmount, totalPerPerson };
}
