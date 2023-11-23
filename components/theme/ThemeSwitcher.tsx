"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

import { motion, useSpring } from "framer-motion";

import sun from "@/public/assets/icon-light-theme.svg";
import moon from "@/public/assets/icon-dark-theme.svg";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  const spring = useSpring(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const currentTheme = theme === "system" ? systemTheme : theme;

  const themeChanger = () => {
    currentTheme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <div className="w-60 rounded-lg h-12 flex justify-center items-center gap-4 bg-[#F4F7FD] dark:bg-[#20212C]">
      <Image src={sun} className="h-5 w-5" alt="sun icon" />
      <div
        onClick={themeChanger}
        className={`flex h-5 w-10 cursor-pointer items-center rounded-full bg-[#635FC7] 
              ${currentTheme === "dark" ? "justify-end" : "justify-start"}`}
      >
        <motion.div
          layout
          transition={spring}
          className={
            currentTheme === "dark"
              ? "mr-1 h-4 w-4 items-center rounded-full bg-white"
              : "ml-1 h-4 w-4 items-center rounded-full bg-white"
          }
        ></motion.div>
      </div>
      <Image src={moon} className="h-5 w-5" alt="moon icon" />
    </div>
  );
};

export default ThemeSwitcher;
