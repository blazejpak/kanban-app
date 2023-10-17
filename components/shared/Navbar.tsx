"use client";

import Image from "next/image";

import logoLight from "@/public/assets/logo-dark.svg";
import logoDark from "@/public/assets/logo-light.svg";
import dots from "@/public/assets/icon-vertical-ellipsis.svg";

import Button from "../ui/button";

const Navbar = () => {
  return (
    <header className="h-[97px] bg-white dark:bg-[#2B2C37] flex justify-between items-center border-b border-[#3E3F4E] px-[5%]">
      <div className="flex gap-6 h-full items-center">
        <div>
          <Image
            src={logoDark}
            alt="logo"
            width={150}
            className="dark:block hidden"
          />
          <Image
            src={logoLight}
            alt="logo"
            width={150}
            className="block dark:hidden"
          />
        </div>

        <div className="h-full w-[1px] bg-[#3E3F4E]"></div>

        <h1 className="text-xl font-bold">Platform Launch</h1>
      </div>
      <div className="flex gap-6 items-center">
        <Button text="+ Add New Task" onClick={() => {}} />
        <Image src={dots} alt="dots" className="h-5" />
      </div>
    </header>
  );
};

export default Navbar;
