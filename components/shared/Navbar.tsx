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
import { useState } from "react";

const Navbar = () => {
  const [optionsActive, setOptionsActive] = useState<boolean>(false);

  const data = useAppSelector((state) => state.dataSlice.data);
  const activePage = useAppSelector(
    (state) => state.activeBoardSlice.activeBoard,
  );
  const isActiveMenu = useAppSelector(
    (state) => state.activeMenuSlice.isActiveMenu,
  );
  const dispatch = useAppDispatch();

  const boardName = data.find((item: any) => item._id === activePage)
    ? data.find((item: any) => item._id === activePage)?.name
    : "";

  const dataColumns = data.find((item) => item._id === activePage)?.columns;

  return (
    <header className="fixed z-10 flex h-16 w-full items-center justify-between bg-white px-[5%] dark:border-b dark:border-[#3E3F4E] dark:bg-[#2B2C37] sm:h-20 xl:h-24">
      <div className="flex h-full items-center gap-4 sm:gap-6">
        <div className={`hidden  ${!isActiveMenu && "sm:block"}`}>
          <Image
            src={logoDark}
            alt="logo"
            width={150}
            className="hidden dark:block "
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
          className="block sm:hidden"
        />

        <div className="hidden h-full w-[1px] bg-[#E4EBFA] dark:bg-[#3E3F4E] sm:block"></div>

        <h1
          className={`hidden font-bold uppercase sm:block sm:text-xl ${
            isActiveMenu && "sm:pl-[200px] lg:pl-[200px]"
          }`}
        >
          {data.length === 0 ? "" : boardName}
        </h1>

        {/* Activation menu for mobiles */}
        <div
          className="flex cursor-pointer items-center gap-2 sm:hidden"
          onClick={() => dispatch({ type: "activeMenu/toggleMenu" })}
        >
          <h1 className="text-lg font-bold uppercase sm:text-xl">
            {data.length === 0 ? "" : boardName}
          </h1>

          {isActiveMenu ? (
            <Image src={menuActive} width={10} alt="chevron up" />
          ) : (
            <Image src={menuInActive} width={10} alt="chevron down" />
          )}
        </div>
      </div>
      {/* Add New Task */}
      <div className="flex items-center gap-6">
        <div className="hidden sm:block">
          <Button
            text="+ Add New Task"
            onClick={() => {
              dispatch({ type: "activeMenu/toggleNewTask" });
            }}
            plus={false}
            disabled={dataColumns?.length > 0 ? false : true}
          />
        </div>
        <div className="block sm:hidden">
          <Button
            text=""
            onClick={() => {
              dispatch({ type: "activeMenu/toggleNewTask" });
              if (isActiveMenu) dispatch({ type: "activeMenu/toggleMenu" });
            }}
            plus={true}
            disabled={data?.length > 0 && false}
          />
        </div>
        <div
          onClick={() => setOptionsActive((prevState) => !prevState)}
          className="cursor-pointer p-1 transition-all hover:brightness-50 dark:hover:brightness-150"
        >
          <Image src={dots} alt="dots" className="h-5" />
        </div>
      </div>

      {/* DELETE AND EDIT MENU */}
      {optionsActive && (
        <nav className="absolute right-4 top-[110%] z-20 h-24 w-48 rounded-lg bg-[#fff] p-4 text-[#828FA3] dark:bg-[#2B2C37] ">
          <ul className="flex h-full w-full flex-col justify-center gap-3 text-sm font-medium">
            <li
              className="cursor-pointer"
              onClick={() => {
                dispatch({ type: "activeMenu/toggleEditBoard" });
                setOptionsActive(false);
              }}
            >
              Edit Board
            </li>
            <li
              className="cursor-pointer text-red-500"
              onClick={() => {
                dispatch({ type: "activeMenu/toggleDeleteBoard" });
                setOptionsActive(false);
              }}
            >
              Delete Board
            </li>
          </ul>
        </nav>
      )}

      {/* Mobile menu container */}
      {isActiveMenu && (
        <>
          <div
            className="absolute left-0 top-[100%] z-10 h-screen w-full sm:hidden"
            onClick={() => {
              dispatch({ type: "activeMenu/toggleMenu" });
            }}
          ></div>
          <nav className="min-h-96 absolute top-[110%] z-20 flex  w-64 flex-col justify-between rounded-lg bg-[#fff] pb-4 text-[#828FA3] dark:bg-[#2B2C37] sm:hidden">
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
