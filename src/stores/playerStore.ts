import { create } from 'zustand';
import type { Song, PlayerState } from '../types';

interface PlayerStore extends PlayerState {
  setCurrentSong: (song: Song) => void;
  setIsExpanded: (isExpanded: boolean) => void;
  toggleExpanded: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
  togglePlaying: () => void;
}

/**
 * Global player state store
 */
export const usePlayerStore = create<PlayerStore>((set) => ({
  currentSong: null,
  isExpanded: false,
  isPlaying: false,

  setCurrentSong: (song) =>
    set({
      currentSong: song,
      isPlaying: true,
    }),

  setIsExpanded: (isExpanded) => set({ isExpanded }),

  toggleExpanded: () =>
    set((state) => ({
      isExpanded: !state.isExpanded,
    })),

  setIsPlaying: (isPlaying) => set({ isPlaying }),

  togglePlaying: () =>
    set((state) => ({
      isPlaying: !state.isPlaying,
    })),
}));
