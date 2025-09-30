"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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
 * Applies the correct CSS class to the HTML root element
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "browser extension",
  ...props
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

  /**
   * When theme changes:
   * - Remove old theme classes
   * - Apply new theme class to <html> element
   * - If `system` is selected, it detects OS preference automatically
   */
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme); // ✅ apply dark or light directly
    }
  }, [theme]);

  /**
   * Context Value
   * Exposes theme and setTheme method
   */
  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

/**
 * Custom hook for consuming Theme context
 */
export const useThemeContext = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
