import { useState } from "react";

import TipButton from "./components/TipButton";
import InputField from "./components/Input";
import ResultSection from "./components/ResultSection";
import calculateTip from "./utils/calculate";

// 1. Liste statique des pourcentages de pourboire disponibles
const tipPercents: number[] = [5, 10, 15, 25, 50];

// 2. Définition du type TypeScript pour l'état du formulaire
// Garantit que notre objet formData ne contiendra que ces clés et que ce seront des chaînes de caractères.
type formState = {
  bill: string;
  people: string;
};

function App() {
  // 3. État centralisé unique pour tous les inputs du formulaire
  const [formData, setFormData] = useState<formState>({
    bill: "",
    people: "",
  });

  const [selectedTip, setSelectedTip] = useState<number | null>(null);

  const customInputValue =
    selectedTip !== null && tipPercents.includes(selectedTip)
      ? ""
      : (selectedTip ?? "");

  const onClick = (percent: number) => {
    setSelectedTip(percent);
  };

  const handleReset = () => {
    setFormData({ bill: "", people: "" });
    setSelectedTip(null);
  };

  // 4. Gestionnaire de changement unique et générique (gère à la fois "bill" et "people")
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // On récupère le nom de l'input modifié et sa nouvelle valeur
    setFormData((prev) => ({
      ...prev, // On garde l'ancien état intact
      [name]: value, // On met à jour dynamiquement la propriété ciblée (computed property name)
    }));
  };

  // 5. Tableau de configuration (Data-Driven Approach)
  // On sépare les données visuelles/statiques de la logique pour éviter de dupliquer le JSX.
  const inputMap = [
    {
      label: "Bill",
      name: "bill",
      type: "number",
      placeholder: "0",
      icon: "images/icon-dollar",
    },
    {
      label: "Number of People",
      name: "people",
      type: "number",
      placeholder: "0",
      icon: "images/icon-person",
    },
  ];

  const { tipPerPerson, totalPerPerson } = calculateTip({
    bill: formData.bill,
    people: formData.people,
    selectedTip,
  });

  return (
    <main className="min-h-screen flex flex-col">
      <h1 className=" w-full py-8 text-center tracking-[10px] uppercase font-bold text-dark">
        <span>SPLI</span>
        <span>TTER</span>
      </h1>
      <div className="bg-white rounded-xl flex flex-col items-center lg:grid lg:grid-cols-2 ">
        <section className="">
          {/* 6. Rendu dynamique via .map() */}
          {/* On parcourt le tableau pour générer proprement chaque input sans réécrire le code */}

          <InputField
            {...inputMap[0]}
            value={formData.bill}
            onChange={onChange} // Passage de la fonction de mise à jour commune
          />

          <div className="flex flex-col gap-2">
            <label>Select Tip %</label>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-white">
              {/* Rendu dynamique similaire pour les boutons de pourboire */}

              {tipPercents.map((p) => (
                <TipButton
                  key={p}
                  percent={p}
                  tipSelected={onClick}
                  isSelected={selectedTip === p}
                />
              ))}
              <input
                placeholder="custom"
                type="number"
                value={customInputValue}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedTip(val === "" ? null : Number(val));
                }}
                className="text-center font-bold text-xl text-[#00474b] bg-grey-200 focus:outline-none border-none"
              />
            </div>
          </div>
          <InputField
            {...inputMap[1]}
            value={formData.people}
            onChange={onChange} // Passage de la fonction de mise à jour commune
          />
        </section>

        <section className="w-full py-3 px-6">
          <ResultSection
            tipAmount={tipPerPerson}
            totalPerPerson={totalPerPerson}
            onReset={handleReset}
          />
        </section>
      </div>
    </main>
  );
}

export default App;
