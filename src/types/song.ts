/**
 * Domain types for songs and player
 */

export interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  duration?: number;
}

export interface PlayerState {
  currentSong: Song | null;
  isExpanded: boolean;
  isPlaying: boolean;
}

export interface LayoutMeasurement {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}
