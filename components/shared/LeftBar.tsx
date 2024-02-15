"use client";

import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import showMenu from "@/public/assets/icon-show-sidebar.svg";
import hideMenu from "@/public/assets/icon-hide-sidebar.svg";
import logoLight from "@/public/assets/logo-dark.svg";
import logoDark from "@/public/assets/logo-light.svg";
import Board from "../groups/Board";
import ThemeSwitcher from "../theme/ThemeSwitcher";

const LeftBar = () => {
  const isActiveMenu = useAppSelector(
    (state) => state.activeMenuSlice.isActiveMenu,
  );
  const isActiveForm = useAppSelector(
    (state) => state.activeMenuSlice.isActiveForm,
  );
  const isActiveDeleteForm = useAppSelector(
    (state) => state.activeMenuSlice.deleteBoard,
  );
  const isEditBoardActive = useAppSelector(
    (state) => state.activeMenuSlice.editBoard,
  );
  const newTaskForm = useAppSelector((state) => state.activeMenuSlice.newTask);
  const checkTaskBox = useAppSelector(
    (state) => state.activeMenuSlice.checkTask,
  );
  const editTaskBox = useAppSelector((state) => state.activeMenuSlice.editTask);

  const dispatch = useAppDispatch();

  return (
    <section className="relative">
      {isActiveMenu && (
        <nav
          className={`${
            (isActiveForm ||
              isActiveDeleteForm ||
              isEditBoardActive ||
              checkTaskBox ||
              newTaskForm ||
              editTaskBox) &&
            "dark:brightness-50"
          } absolute z-30 hidden h-full w-64 flex-col justify-between border-r-[1px] border-[#E4EBFA] bg-[#fff] dark:border-[#3E3F4E] dark:bg-[#2B2C37] sm:flex`}
        >
          {/* LOGO */}
          <div className="min-h-[60px] py-9 pl-7">
            <Image
              src={logoDark}
              alt="logo"
              width={150}
              className="hidden dark:block"
            />
            <Image
              src={logoLight}
              alt="logo"
              width={150}
              className=" block dark:hidden"
            />
          </div>

          {/* BOARDS SCROLL */}
          <Board />

          {/* SWITCHER + HIDE */}
          <div className="  mb-10 flex min-h-[90px] flex-col gap-2">
            <div className="self-center">
              <ThemeSwitcher />
            </div>
            <div
              className="flex h-10 w-[240px] cursor-pointer items-center gap-3 rounded-br-[1rem] rounded-tr-[1rem] pl-6 transition-all hover:bg-[#635FC7]/20 dark:hover:bg-white"
              onClick={() => dispatch({ type: "activeMenu/toggleMenu" })}
            >
              <Image src={hideMenu} alt="hide bar" className="h-4" />
              <p className="text-sm font-bold text-[#828FA3] ">Hide Sidebar</p>
            </div>
          </div>
        </nav>
      )}

      {/* show bar */}
      <div
        className={`${
          (isActiveForm ||
            isActiveDeleteForm ||
            isEditBoardActive ||
            checkTaskBox ||
            newTaskForm ||
            editTaskBox) &&
          "pointer-events-none brightness-50"
        } ${
          isActiveMenu && "sm:hidden"
        } absolute bottom-[2.5rem] z-40 hidden h-12 w-14 cursor-pointer items-center justify-center rounded-br-3xl rounded-tr-3xl bg-[#635FC7] sm:flex`}
        onClick={() => dispatch({ type: "activeMenu/toggleMenu" })}
      >
        <Image src={showMenu} width={20} alt="show sidebar" />
      </div>
    </section>
  );
};

export default LeftBar;
