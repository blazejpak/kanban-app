"use client";

import Image from "next/image";

import logoLight from "@/public/assets/logo-dark.svg";
import logoDark from "@/public/assets/logo-light.svg";
import logoMobile from "@/public/assets/logo-mobile.svg";

import menuActive from "@/public/assets/icon-chevron-up.svg";
import menuInActive from "@/public/assets/icon-chevron-down.svg";

import dots from "@/public/assets/icon-vertical-ellipsis.svg";
import Button from "../ui/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Board from "../groups/board";

const Navbar = () => {
  const isActive = useAppSelector((state) => state.activeMenuSlice.isActive);
  const dispatch = useAppDispatch();

  return (
    <header className="h-16 sm:h-20 xl:h-24 w-full bg-white dark:bg-[#2B2C37] flex justify-between items-center dark:border-b dark:border-[#3E3F4E] px-[5%] fixed z-20">
      <div className="flex sm:gap-6 gap-4 h-full items-center">
        <div className="hidden sm:block">
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

        <Image
          src={logoMobile}
          alt="logo"
          width={24}
          className="sm:hidden block"
        />

        <div className="hidden sm:block h-full w-[1px] dark:bg-[#3E3F4E] bg-[#E4EBFA]"></div>

        <h1
          className={`sm:text-xl hidden sm:block font-bold ${
            isActive && "sm:pl-8"
          }`}
        >
          Platform Launch
        </h1>

        {/* Activation menu for mobiles */}
        <div
          className="flex items-center gap-2 sm:hidden cursor-pointer"
          onClick={() => dispatch({ type: "activeMenu/toggleMenu" })}
        >
          <h1 className="sm:text-xl text-lg font-bold">Platform Launch</h1>

          {isActive ? (
            <Image src={menuActive} width={10} alt="chevron up" />
          ) : (
            <Image src={menuInActive} width={10} alt="chevron down" />
          )}
        </div>
      </div>
      <div className="flex gap-6 items-center">
        <div className="sm:block hidden">
          <Button text="+ Add New Task" onClick={() => {}} plus={false} />
        </div>
        <div className="sm:hidden block">
          <Button text="" onClick={() => {}} plus={true} />
        </div>
        <Image src={dots} alt="dots" className="h-5" />
      </div>

      {/* Mobile menu container */}
      {isActive && (
        <nav className="text-[#828FA3] sm:hidden w-64 h-40 top-[110%] rounded-lg bg-[#fff] dark:bg-[#2B2C37] absolute ">
          {/* TODO */}
          <Board />
        </nav>
      )}
    </header>
  );
};

export default Navbar;
