'use client'
import React, { createContext, useContext, useState, ReactNode } from "react";
import { ThemeType } from "../types/theme";

interface ThemeContextProps {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('LIGHT');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeContextProvider");
  }
  return context;
};
