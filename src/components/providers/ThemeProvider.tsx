"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

// Possible theme values
type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme?: Theme;
  setTheme: (theme: Theme) => void;
};

// Default context state
const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

// Creating theme context
const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

/**
 * ThemeProvider
 * Manages theme state (dark, light, or system) and persists it in localStorage
 *  applies the correct CSS class to the HTML root element
 */

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "browser extension",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  /**
   * On mount:
   * - Load stored theme preference from localStorage (if available)
   */
  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme;

    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [storageKey]);
}
