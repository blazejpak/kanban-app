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
  const isActive = useAppSelector((state) => state.activeMenuSlice.isActive);
  const dispatch = useAppDispatch();

  return (
    <section className="relative min-h-screen">
      {isActive && (
        <nav className="hidden sm:flex w-64 bg-[#fff] h-full z-30 sticky border-r-[1px] dark:border-[#3E3F4E] border-[#E4EBFA] dark:bg-[#2B2C37] flex-col justify-between">
          <div className="flex flex-col gap-14 ">
            <div className="pt-9 pl-7">
              <Image
                src={logoDark}
                alt="logo"
                width={150}
                className="dark:block hidden "
              />
              <Image
                src={logoLight}
                alt="logo"
                width={150}
                className="block dark:hidden"
              />
            </div>

            <Board />
          </div>

          <div className=" flex flex-col gap-2  mb-10">
            <div className="self-center">
              <ThemeSwitcher />
            </div>
            <div
              className="flex gap-3 items-center pl-6 cursor-pointer hover:bg-white w-[240px] h-10 rounded-tr-xl rounded-br-xl transition-all"
              onClick={() => dispatch({ type: "activeMenu/toggleMenu" })}
            >
              <Image src={hideMenu} alt="hide bar" className="h-4" />
              <p className="text-[#828FA3] font-bold text-sm ">Hide Sidebar</p>
            </div>
          </div>
        </nav>
      )}

      {/* hide bar */}
      <div
        className={`${
          isActive && "sm:hidden"
        } hidden bottom-[2.5rem] absolute h-12 w-14 bg-[#635FC7] cursor-pointer sm:flex justify-center items-center rounded-tr-3xl rounded-br-3xl z-40`}
        onClick={() => dispatch({ type: "activeMenu/toggleMenu" })}
      >
        <Image src={showMenu} width={20} alt="show sidebar" />
      </div>
    </section>
  );
};

export default LeftBar;
