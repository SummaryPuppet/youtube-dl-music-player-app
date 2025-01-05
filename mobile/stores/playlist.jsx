import { create } from "zustand";

export const usePlaylistStore = create((set) => ({
  playlists: {},
  setPlaylists: (playlists) => set(() => ({ playlists })),
}));
