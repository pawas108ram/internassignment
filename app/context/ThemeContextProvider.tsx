
'use client'
// ThemeContextProvider.tsx
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { ThemeType } from "../types/theme";

interface ThemeContextProps {
  theme: ThemeType;
  setTheme: Dispatch<SetStateAction<ThemeType>>;
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

export const useThemeContext = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeContextProvider");
  }
  return context;
};
