import { MouseEvent } from "react";

interface Props {
  text: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ text, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#635FC7] w-40 h-12 rounded-3xl font-bold"
    >
      {text}
    </button>
  );
};

export default Button;
