import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";

import logo from "@/public/assets/icon-board.svg";

interface Props {
  text: string;
  active: string;
}

const ButtonLink = ({ text, active }: Props) => {
  const boardActive = useAppSelector(
    (state) => state.activeBoardSlice.activeBoard
  );
  const dispatch = useAppDispatch();

  const activeBoardHandler = () => {
    dispatch({ type: "activeBoard/payloadBoard", payload: active });
  };

  return (
    <div
      className={`${
        boardActive === active && "bg-[#635FC7]"
      } text-white  px-4 py-2 sm:py-4 rounded-3xl flex justify-center items-center font-bold hover:bg-[#A8A4FF] transition-all cursor-pointer`}
      onClick={activeBoardHandler}
    >
      <Image src={logo} width={16} alt={text} />
      <p>{text}</p>
    </div>
  );
};

export default ButtonLink;