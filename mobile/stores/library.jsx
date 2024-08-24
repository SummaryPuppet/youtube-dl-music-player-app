import { create } from "zustand";

const useLibraryStore = create(() => ({
  tracks: [],
  computedTracks: [],
}));

export const useTracks = () => useLibraryStore((state) => state.computedTracks);

export const addTracks = (tracks) => useLibraryStore.setState({ tracks });
export const addComputedTracks = (tracks) =>
  useLibraryStore.setState({ computedTracks: tracks });

export const searchTracks = (title) =>
  useLibraryStore.setState((state) => ({
    computedTracks: state.tracks.filter((track) =>
      title ? track.title.includes(title) : track
    ),
  }));
