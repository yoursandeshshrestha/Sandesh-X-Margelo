import { useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import {
  PLAYER_ANIMATIONS,
  PLAYER_SIZES,
  PLAYER_POSITIONS,
  PLAYER_TRANSITIONS,
  PLAYER_ANIMATION_VALUES,
  PLAYER_DIMENSIONS,
} from '../constants/player';

const { SCREEN_HEIGHT, SCREEN_WIDTH } = PLAYER_DIMENSIONS;
const { MINI_ALBUM_SIZE, FULL_ALBUM_SIZE, CONTAINER_PADDING_Y } = PLAYER_SIZES;


/**
 * Custom hook for shared element transition between mini and full screen player
 */
export const useSharedElementTransition = () => {
  const insets = useSafeAreaInsets();

  // Progress: 0 = mini player, 1 = full screen
  const progress = useSharedValue(0);

  // Calculate actual mini player positions accounting for safe area
  // Mini player: safe area + py-3 padding (12px)
  const MINI_BOTTOM_BASE = insets.bottom + CONTAINER_PADDING_Y;

  /**
   * Expand to full screen
   */
  const expand = useCallback(() => {
    progress.value = withTiming(1, PLAYER_ANIMATIONS.EXPAND);
  }, [progress]);

  /**
   * Collapse to mini player - faster animation
   */
  const collapse = useCallback(() => {
    progress.value = withTiming(0, PLAYER_ANIMATIONS.COLLAPSE);
  }, [progress]);

  /**
   * Animated style for mini player container
   */
  const miniPlayerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      progress.value,
      [0, PLAYER_TRANSITIONS.MINI_FADE_OUT],
      [1, 0]
    );
    const translateY = interpolate(
      progress.value,
      [0, 1],
      [0, PLAYER_ANIMATION_VALUES.MINI_TRANSLATE_Y]
    );

    return {
      opacity,
      transform: [{ translateY }],
      pointerEvents: progress.value > PLAYER_TRANSITIONS.MINI_DISABLE_INTERACTION ? ('none' as const) : ('auto' as const),
    };
  });

  /**
   * Animated style for full screen player container (backdrop)
   */
  const fullScreenStyle = useAnimatedStyle(() => {
    // Slide down when closing, fade in when opening
    const translateY = interpolate(progress.value, [0, 1], [SCREEN_HEIGHT, 0]);
    // More gradual opacity: builds up slowly when opening, fades out when closing
    const opacity = interpolate(
      progress.value,
      [0, PLAYER_TRANSITIONS.FULL_FADE_IN_MID, 1],
      [0, PLAYER_ANIMATION_VALUES.FULL_OPACITY_MID, 1]
    );

    return {
      opacity,
      transform: [{ translateY }],
      pointerEvents: progress.value < PLAYER_TRANSITIONS.FULL_ENABLE_INTERACTION ? ('none' as const) : ('auto' as const),
    };
  });

  /**
   * Animated style for shared album art that morphs between states
   */
  const sharedAlbumArtStyle = useAnimatedStyle(() => {
    // Size animation
    const size = interpolate(progress.value, [0, 1], [MINI_ALBUM_SIZE, FULL_ALBUM_SIZE]);

    // Position animation
    // Mini player: px-3 container (12px) + px-5 padding (20px) = 32px from left
    // Full screen: centered horizontally, centered vertically
    const leftPosition = interpolate(
      progress.value,
      [0, 1],
      [PLAYER_POSITIONS.MINI_LEFT_OFFSET, (SCREEN_WIDTH - FULL_ALBUM_SIZE) / 2]
    );

    // Mini player bottom: safe area + py-3 padding (12px) = MINI_BOTTOM_BASE
    // Full screen: centered vertically
    const bottomPosition = interpolate(
      progress.value,
      [0, 1],
      [MINI_BOTTOM_BASE, SCREEN_HEIGHT / 2 - PLAYER_POSITIONS.ALBUM_FULL_BOTTOM_OFFSET]
    );

    // Border radius animation
    const borderRadius = interpolate(
      progress.value,
      [0, 1],
      [PLAYER_ANIMATION_VALUES.BORDER_RADIUS_MINI, PLAYER_ANIMATION_VALUES.BORDER_RADIUS_FULL]
    );

    return {
      position: 'absolute' as const,
      left: leftPosition,
      bottom: bottomPosition,
      width: size,
      height: size,
      borderRadius,
      pointerEvents: 'none' as const, // Don't block touches
    };
  });

  /**
   * Animated style for shared song info that morphs between states
   */
  const sharedSongInfoStyle = useAnimatedStyle(() => {
    // Mini: to right, Full: keep on screen with more padding
    const leftPosition = interpolate(
      progress.value,
      [0, 1],
      [PLAYER_POSITIONS.SONG_INFO_MINI_LEFT, PLAYER_POSITIONS.SONG_INFO_FULL_LEFT]
    );

    // Mini: same bottom as album, Full: move much higher up (below album centered)
    const bottomPosition = interpolate(
      progress.value,
      [0, 1],
      [
        MINI_BOTTOM_BASE + PLAYER_POSITIONS.SONG_INFO_VERTICAL_OFFSET,
        SCREEN_HEIGHT / 2 - PLAYER_POSITIONS.SONG_INFO_FULL_BOTTOM_OFFSET
      ]
    );

    const width = interpolate(
      progress.value,
      [0, 1],
      [SCREEN_WIDTH - PLAYER_POSITIONS.SONG_INFO_MINI_WIDTH_OFFSET, SCREEN_WIDTH]
    );

    // Scale up in full screen to make text bigger
    const scale = interpolate(
      progress.value,
      [0, 1],
      [PLAYER_ANIMATION_VALUES.TEXT_SCALE_MINI, PLAYER_ANIMATION_VALUES.TEXT_SCALE_FULL]
    );

    const opacity = interpolate(progress.value, [0, 0.2, 0.8, 1], [1, 0.5, 0.5, 1]);

    return {
      position: 'absolute' as const,
      left: leftPosition,
      bottom: bottomPosition,
      width,
      opacity,
      transform: [{ scale }],
      pointerEvents: 'none' as const, // Don't block touches
    };
  });

  /**
   * Animated style for full screen only content (progress bar, controls)
   * Only appears after shared elements reach their positions
   */
  const fullScreenContentStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      progress.value,
      [PLAYER_TRANSITIONS.CONTENT_FADE_START, PLAYER_TRANSITIONS.CONTENT_FADE_MID, 1],
      [0, 0, 1]
    );
    const translateY = interpolate(
      progress.value,
      [PLAYER_TRANSITIONS.CONTENT_FADE_START, 1],
      [PLAYER_ANIMATION_VALUES.CONTENT_TRANSLATE_Y, 0]
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return {
    progress,
    expand,
    collapse,
    miniPlayerStyle,
    fullScreenStyle,
    sharedAlbumArtStyle,
    sharedSongInfoStyle,
    fullScreenContentStyle,
  };
};
