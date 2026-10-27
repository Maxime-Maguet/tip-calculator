import { useState } from "react";
import TipButton from "./components/TipButton";
import ResultSection from "./components/ResultSection";
import { calculateTip } from "./utils/calculate";

// Type en PascalCase (recommandé par Claude)
type FormState = {
  bill: string;
  people: string;
};

const TIP_PRESETS = [5, 10, 15, 25, 50];

export default function App() {
  const [formData, setFormData] = useState<FormState>({
    bill: "",
    people: "",
  });

  // On sépare la source pour éviter le bug du custom
  const [selectedTip, setSelectedTip] = useState<number | null>(null);
  const [customTip, setCustomTip] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Empêche les valeurs négatives (Point 3 de Claude)
    if (Number(value) < 0) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTipSelect = (tip: number) => {
    setSelectedTip(tip);
    setCustomTip(""); // On vide le custom si on clique sur un bouton
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (Number(value) < 0) return;
    setCustomTip(value);
    setSelectedTip(null); // On désélectionne les boutons si on tape en custom
  };

  const handleReset = () => {
    setFormData({ bill: "", people: "" });
    setSelectedTip(null);
    setCustomTip("");
  };

  // Le pourcentage effectif à passer au calcul
  const activeTip = customTip !== "" ? Number(customTip) : (selectedTip ?? 0);

  const { tipAmount, totalPerPerson } = calculateTip({
    bill: Number(formData.bill) || 0,
    tipPercent: activeTip,
    people: Number(formData.people) || 0,
  });

  return (
    <main className="min-h-screen bg-grey-300 flex flex-col items-center justify-center p-4 sm:p-6 font-space-mono">
      {/* Header Logo */}
      <h1 className="text-dark tracking-[0.3em] font-bold text-xl mb-10 uppercase">
        Spli
        <br />
        tter
      </h1>

      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Inputs */}
        <div className="flex flex-col justify-between">
          {/* Bill Input */}
          <div className="flex flex-col mb-8">
            <label htmlFor="bill" className="text-grey-500 font-bold mb-2">
              Bill
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-grey-400 font-bold">
                $
              </span>
              <input
                id="bill"
                type="number"
                name="bill"
                min="0"
                placeholder="0"
                value={formData.bill}
                onChange={handleInputChange}
                className="w-full bg-grey-200 text-dark font-bold text-right text-2xl p-3 rounded-lg outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              />
            </div>
          </div>

          {/* Tip Selection */}
          <div className="flex flex-col mb-8">
            <label className="text-grey-500 font-bold mb-3">Select Tip %</label>
            <div className="grid grid-cols-3 gap-4">
              {TIP_PRESETS.map((percent) => (
                <TipButton
                  key={percent}
                  percent={percent}
                  isSelected={selectedTip === percent}
                  onClick={() => handleTipSelect(percent)}
                />
              ))}

              {/* Custom Tip Input (Accessibilité corrigée avec id et label associé) */}
              <input
                type="number"
                id="custom-tip"
                min="0"
                placeholder="Custom"
                value={customTip}
                onChange={handleCustomTipChange}
                aria-label="Custom Tip Percentage"
                className="bg-grey-200 text-dark font-bold text-center text-xl p-2 rounded-lg outline-none focus:ring-2 focus:ring-primary placeholder:text-grey-500 cursor-pointer"
              />
            </div>
          </div>

          {/* People Input */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="people" className="text-grey-500 font-bold">
                Number of People
              </label>
              {Number(formData.people) === 0 && formData.people !== "" && (
                <span className="text-red-500 text-xs font-bold">
                  Can't be zero
                </span>
              )}
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-grey-400 font-bold">
                👤
              </span>
              <input
                id="people"
                type="number"
                name="people"
                min="1"
                placeholder="0"
                value={formData.people}
                onChange={handleInputChange}
                className={`w-full bg-grey-200 text-dark font-bold text-right text-2xl p-3 rounded-lg outline-none cursor-pointer ${
                  Number(formData.people) === 0 && formData.people !== ""
                    ? "ring-2 ring-red-500"
                    : "focus:ring-2 focus:ring-primary"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Result Section (Utilisation d'un div simple au lieu d'une section imbriquée) */}
        <ResultSection
          tipAmount={tipAmount}
          totalPerPerson={totalPerPerson}
          onReset={handleReset}
        />
      </div>
    </main>
  );
}
