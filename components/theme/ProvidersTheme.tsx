"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

const ProvidersTheme = ({ children }: any) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      {children}
    </ThemeProvider>
  );
};

export default ProvidersTheme;
