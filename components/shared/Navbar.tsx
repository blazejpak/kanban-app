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
import Board from "../groups/Board";
import ThemeSwitcher from "../theme/ThemeSwitcher";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const data = useAppSelector((state) => state.dataSlice.data);
  const activePage = useAppSelector(
    (state) => state.activeBoardSlice.activeBoard
  );
  const isActiveMenu = useAppSelector(
    (state) => state.activeMenuSlice.isActiveMenu
  );
  const dispatch = useAppDispatch();

  const boardName = data.find((item: any) => item._id === activePage)
    ? data.find((item: any) => item._id === activePage)?.name
    : "";

  return (
    <header className="h-16 sm:h-20 xl:h-24 w-full bg-white dark:bg-[#2B2C37] flex justify-between items-center dark:border-b dark:border-[#3E3F4E] px-[5%] fixed z-20">
      <div className="flex sm:gap-6 gap-4 h-full items-center">
        <div className={`hidden  ${!isActiveMenu && "sm:block"}`}>
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
          className={`sm:text-xl hidden sm:block font-bold uppercase ${
            isActiveMenu && "sm:pl-[200px] lg:pl-[200px]"
          }`}
        >
          {data.length === 0 ? "" : boardName}
        </h1>

        {/* Activation menu for mobiles */}
        <div
          className="flex items-center gap-2 sm:hidden cursor-pointer"
          onClick={() => dispatch({ type: "activeMenu/toggleMenu" })}
        >
          <h1 className="sm:text-xl text-lg font-bold uppercase">
            {data.length === 0 ? "" : boardName}
          </h1>

          {isActiveMenu ? (
            <Image src={menuActive} width={10} alt="chevron up" />
          ) : (
            <Image src={menuInActive} width={10} alt="chevron down" />
          )}
        </div>
      </div>
      <div className="flex gap-6 items-center">
        <div className="sm:block hidden">
          <Button
            text="+ Add New Task"
            onClick={() => {}}
            plus={false}
            disabled={data?.length > 0 && false}
          />
        </div>
        <div className="sm:hidden block">
          <Button
            text=""
            onClick={() => {}}
            plus={true}
            disabled={data?.length > 0 && false}
          />
        </div>
        <Image src={dots} alt="dots" className="h-5" />
      </div>

      {/* Mobile menu container */}
      {isActiveMenu && (
        <>
          <div
            className="absolute h-screen z-10 w-full top-[100%] left-0 sm:hidden"
            onClick={() => {
              dispatch({ type: "activeMenu/toggleMenu" });
            }}
          ></div>
          <nav className="text-[#828FA3] z-20 sm:hidden w-64 min-h-96  top-[110%] rounded-lg bg-[#fff] dark:bg-[#2B2C37] absolute flex flex-col justify-between pb-4">
            {/* TODO */}
            <Board />
            <div className="self-center">
              <ThemeSwitcher />
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Navbar;
