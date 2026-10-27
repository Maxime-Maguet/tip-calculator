type TipButtonProps = {
  percent: number;
  tipSelected: (percent: number) => void;
  isSelected: boolean;
  className?: string;
};

export default function TipButton({
  percent,
  tipSelected,
  isSelected,
}: TipButtonProps) {
  return (
    <button
      type="button"
      onClick={() => tipSelected(percent)}
      className={` text-bg-pale py-2 px-12  border rounded-md cursor-pointer ${isSelected ? "bg-primary text-dark" : "bg-dark"}`}
    >
      {percent}%
    </button>
  );
}
