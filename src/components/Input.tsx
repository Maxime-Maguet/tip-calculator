import type React from "react";

type InputFieldProps = {
  type: string;
  name: string;
  placeholder: string;
  label: string;
  className?: string;
  value: string;
  icon?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function InputField(props: InputFieldProps) {
  const {
    label,
    name,
    type,
    placeholder,
    value,
    className,
    icon,
    onChange,
    onKeyDown,
  } = props;

  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <div className="relative flex items-center bg-[#f4f7f8] rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-teal-500">
        {icon && (
          <img
            src={`${icon}.svg`}
            alt=""
            className="w-3 h-4 pointer-events-none select-none"
          />
        )}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          // L'input n'a plus de fond propre, il prend toute la place et le texte s'écrit à droite
          className="w-full bg-transparent text-right font-bold text-xl text-[#00474b] focus:outline-none border-none"
        />
      </div>
    </div>
  );
}
