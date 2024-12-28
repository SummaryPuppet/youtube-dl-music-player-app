import { create } from "zustand";
import { theme } from "../constants/colors";

export const useTheme = create((set) => ({
  themes: theme,
  currentTheme: "green",
  setTheme: (theme) => set({ currentTheme: theme }),
  getTheme: () => theme[this.currentTheme],
}));
