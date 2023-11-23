import { MouseEvent } from "react";

import Image from "next/image";

import plusMobile from "@/public/assets/icon-add-task-mobile.svg";

interface Props {
  text: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  plus: boolean;
  disabled: boolean;
}

const Button = ({ text, onClick, plus, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#635FC7] text-white  px-4 py-2 sm:py-4 rounded-3xl flex justify-center items-center font-bold hover:bg-[#A8A4FF] transition-all disabled:pointer-events-none disabled:grayscale"
      disabled={disabled}
    >
      {plus ? <Image src={plusMobile} width={10} alt="add task plus" /> : text}
    </button>
  );
};

export default Button;
