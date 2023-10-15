"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="flex flex-col">
      The current theme is: {theme}
      <button
        onClick={() =>
          currentTheme === "light" ? setTheme("dark") : setTheme("light")
        }
      >
        {theme}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
