type resultSectionProps = {
  tipAmount: number;
  totalPerPerson: number;
  onReset: () => void;
};

export default function ResultSection({
  tipAmount,
  totalPerPerson,
  onReset,
}: resultSectionProps) {
  return (
    <section className="bg-dark rounded-2xl p-8 flex flex-col justify-between">
      {/* Ligne Tip Amount */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h3 className="text-white font-bold">Tip Amount</h3>
          <span className="text-grey-400 text-sm">/ person</span>
        </div>
        <span className="text-primary text-4xl sm:text-5xl font-bold">
          {`$${!tipAmount ? "0.00" : tipAmount}`}
        </span>
      </div>

      {/* Ligne Total */}
      <div className="flex justify-between items-center my-6">
        <div className="flex flex-col">
          <h3 className="text-white font-bold">Total</h3>
          <span className="text-grey-400 text-sm">/ person</span>
        </div>
        <span className="text-primary text-4xl sm:text-5xl font-bold">
          {`$${!totalPerPerson ? "0.00" : totalPerPerson}`}
        </span>
      </div>

      {/* Bouton Reset */}
      <button
        onClick={onReset}
        className="w-full bg-primary text-dark font-bold py-3 rounded-md uppercase hover:bg-grey-200 transition-colors cursor-pointer"
      >
        RESET
      </button>
    </section>
  );
}
