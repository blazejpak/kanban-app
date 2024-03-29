import Image from "next/image";
import ButtonLink from "../ui/ButtonLink";

import logo from "@/public/assets/icon-board.svg";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

const Board = () => {
  const data = useAppSelector((state) => state.dataSlice.data);
  const dispatch = useAppDispatch();

  return (
    <div className=" flex-grow overflow-y-auto overflow-x-hidden">
      <h2 className=" p-5 text-xs font-bold uppercase tracking-widest ">
        All boards ({data.length})
      </h2>
      <ul>
        {data.map((link) => (
          <li key={link._id}>
            <ButtonLink active={link._id} text={link.name} />
          </li>
        ))}
      </ul>
      <div
        className="flex w-[95%] cursor-pointer items-center gap-4 rounded-br-3xl  rounded-tr-3xl px-4 py-2 font-bold text-[#635FC7] transition-all  hover:bg-[#635FC7]/20 dark:hover:bg-[#F4F7FD] sm:py-4"
        onClick={() => {
          dispatch({ type: "activeMenu/typeForm", payload: "board" });
          dispatch({ type: "activeMenu/toggleForm" });
          dispatch({ type: "activeMenu/toggleMenu" });
        }}
      >
        <Image src={logo} alt={"Add New Board Icon"} className="h-4 w-4" />
        <p className="text-sm">+ Create New Board</p>
      </div>
    </div>
  );
};

export default Board;
