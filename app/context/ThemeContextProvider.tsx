
'use client'
// ThemeContextProvider.tsx
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import { ThemeType } from "../types/theme";

interface ThemeContextProps {
  theme: ThemeType;
  setTheme: Dispatch<SetStateAction<ThemeType>>;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const getInitialTheme = (): ThemeType => {
  const localTheme = localStorage.getItem('theme') as ThemeType;
  return localTheme;
}

export const setLocalTheme = (theme: ThemeType) => {
  const oldTheme = localStorage.getItem('theme') as ThemeType;
  if (oldTheme === theme) return;
  else {
    localStorage.setItem('theme', theme);
  }
}

export const initialiseTheme = () => {
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'LIGHT');
  }
}

export const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  initialiseTheme();

  const [theme, setTheme] = useState<ThemeType>(getInitialTheme());

 




 

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
