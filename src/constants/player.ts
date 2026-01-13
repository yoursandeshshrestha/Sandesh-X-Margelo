import { Dimensions } from 'react-native';
import { Easing } from 'react-native-reanimated';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * Animation timing configurations
 */
export const PLAYER_ANIMATIONS = {
  EXPAND: {
    duration: 500,
    easing: Easing.bezier(0.4, 0.0, 0.2, 1),
  },
  COLLAPSE: {
    duration: 300,
    easing: Easing.bezier(0.4, 0.0, 0.2, 1),
  },
} as const;

/**
 * Gesture interaction thresholds
 */
export const PLAYER_GESTURES = {
  SWIPE_THRESHOLD: 100,
  VELOCITY_THRESHOLD: 500,
} as const;

/**
 * Player size configurations
 */
export const PLAYER_SIZES = {
  MINI_ALBUM_SIZE: 52,
  FULL_ALBUM_SIZE: SCREEN_WIDTH * 0.9,
  CONTAINER_PADDING_X: 12, // px-3
  CONTENT_PADDING_X: 20, // px-5
  CONTAINER_PADDING_Y: 12, // py-3
} as const;

/**
 * Position offsets for shared element transitions
 */
export const PLAYER_POSITIONS = {
  // Mini player left position: px-3 (12) + px-5 (20) = 32
  MINI_LEFT_OFFSET: PLAYER_SIZES.CONTAINER_PADDING_X + PLAYER_SIZES.CONTENT_PADDING_X,
  // Song info offset from album art
  SONG_INFO_MINI_LEFT: 100,
  SONG_INFO_FULL_LEFT: 90,
  SONG_INFO_MINI_WIDTH_OFFSET: 180,
  SONG_INFO_VERTICAL_OFFSET: 10,
  // Full screen vertical centering offsets
  ALBUM_FULL_BOTTOM_OFFSET: 50,
  SONG_INFO_FULL_BOTTOM_OFFSET: 120,
} as const;

/**
 * Transition progress thresholds
 */
export const PLAYER_TRANSITIONS = {
  // Opacity transitions
  MINI_FADE_OUT: 0.5,
  FULL_FADE_IN_START: 0.5,
  FULL_FADE_IN_MID: 0.5,
  // Pointer events transitions
  MINI_DISABLE_INTERACTION: 0.3,
  FULL_ENABLE_INTERACTION: 0.7,
  // Content appearance
  CONTENT_FADE_START: 0.6,
  CONTENT_FADE_MID: 0.9,
} as const;

/**
 * Animation interpolation values
 */
export const PLAYER_ANIMATION_VALUES = {
  // Opacity
  FULL_OPACITY_MID: 0.8,
  // Scale
  TEXT_SCALE_MINI: 1,
  TEXT_SCALE_FULL: 1.3,
  // Border radius
  BORDER_RADIUS_MINI: 8,
  BORDER_RADIUS_FULL: 12,
  // Translation
  MINI_TRANSLATE_Y: 20,
  CONTENT_TRANSLATE_Y: 30,
} as const;

/**
 * Screen dimensions
 */
export const PLAYER_DIMENSIONS = {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} as const;
