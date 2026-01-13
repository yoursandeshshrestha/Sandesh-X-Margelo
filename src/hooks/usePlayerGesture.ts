import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, withTiming, type SharedValue } from 'react-native-reanimated';
import { PLAYER_ANIMATIONS, PLAYER_GESTURES } from '../constants/player';

interface UsePlayerGestureParams {
  progress: SharedValue<number>;
  onCollapse: () => void;
}

/**
 * Custom hook for gesture-driven player transitions
 * Allows user to swipe down to close the full screen player
 */
export const usePlayerGesture = ({ progress, onCollapse }: UsePlayerGestureParams) => {
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Track the drag continuously - downward swipes decrease progress
      if (event.translationY > 0) {
        // Convert translation to progress (0-1)
        const dragProgress = Math.min(event.translationY / PLAYER_GESTURES.SWIPE_THRESHOLD, 1);
        progress.value = 1 - dragProgress;
      } else {
        // If dragging upward, keep at fully expanded
        progress.value = 1;
      }
    })
    .onEnd((event) => {
      const velocity = event.velocityY;
      const translation = event.translationY;

      // Collapse if dragged down more than threshold or swiped with velocity
      const shouldCollapse = translation > PLAYER_GESTURES.SWIPE_THRESHOLD || velocity > PLAYER_GESTURES.VELOCITY_THRESHOLD;

      if (shouldCollapse) {
        // Animate to collapsed state - faster
        progress.value = withTiming(0, PLAYER_ANIMATIONS.COLLAPSE, () => {
          runOnJS(onCollapse)();
        });
      } else {
        // Snap back to full screen
        progress.value = withTiming(1, PLAYER_ANIMATIONS.EXPAND);
      }
    });

  return panGesture;
};
