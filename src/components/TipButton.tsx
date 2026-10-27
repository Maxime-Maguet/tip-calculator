type TipButtonProps = {
  percent: number;
  isSelected: boolean;
  onClick: () => void;
};

export default function TipButton({
  percent,
  isSelected,
  onClick,
}: TipButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-bold text-2xl py-3 rounded-lg transition-colors cursor-pointer ${
        isSelected
          ? "bg-primary text-dark"
          : "bg-dark text-white hover:bg-grey-200 hover:text-dark"
      }`}
    >
      {percent}%
    </button>
  );
}
