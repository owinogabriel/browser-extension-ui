"use client";

import { useThemeContext } from "@/components/providers/ThemeProvider";

/**
 * TODO:
 * Custom hook for consuming the them context
 * Provides:
 * - Theme: current theme value('light', 'dark', 'system')
 * - setTheme: function to manually set a theme
 * - toggleTheme:helper to switch betwwen light and dark mode
 */
export function useTheme() {
  const { theme, setTheme } = useThemeContext();

  /**
   * Toggle theme btn 'dark' && 'light'
   * - ingores 'system' mode && switches directly btn light && dark
   */

  // If the theme is dark, switch it to light. Otherwise, switch it to dark.
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return { theme, setTheme, toggleTheme };
}
