export type TipCalculationInputs = {
  bill: string;
  people: string;
  selectedTip: number | null;
};
export default function calculateTip({
  bill,
  people,
  selectedTip,
}: TipCalculationInputs) {
  const billValue = Number(bill) || 0;
  const peopleValue = Number(people) || 0;
  const tipPercentage = selectedTip ?? 0;

  const totalTip = billValue * (tipPercentage / 100);
  const tipPerPerson = peopleValue > 0 ? totalTip / peopleValue : 0;
  const totalPerPerson =
    peopleValue > 0 ? billValue / peopleValue + tipPerPerson : 0;

  return { tipPerPerson, totalPerPerson };
}
