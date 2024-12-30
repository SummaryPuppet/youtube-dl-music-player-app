import { create } from "zustand";
import { theme } from "../constants/colors";
import { storage } from "../storage/storage";

export const useTheme = create((set) => ({
  themes: theme,
  currentTheme: "green",
}));

export const getTheme = async () => {
  const currentTheme = await storage.getString("currentTheme");
  useTheme.setState({ currentTheme: currentTheme || "green" });
};

export const setTheme = async (theme) => {
  await storage.set("currentTheme", theme);
  useTheme.setState({ currentTheme: theme });
};
