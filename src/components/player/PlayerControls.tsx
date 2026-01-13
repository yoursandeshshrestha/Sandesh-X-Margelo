import { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { usePlayerStore } from '../../stores/playerStore';

interface PlayerControlsProps {
  size?: 'small' | 'large';
  className?: string;
}

/**
 * Skip button icon (triangles pointing left/right)
 */
const SkipIcon = memo<{ direction: 'prev' | 'next'; size: number }>(({ direction, size }) => {
  const iconSize = size * 0.4;
  return (
    <View className="flex-row items-center gap-0.5">
      {direction === 'prev' && <View style={{ width: 2, height: iconSize }} className="bg-gray-400" />}
      <View
        style={{
          width: 0,
          height: 0,
          borderTopWidth: iconSize / 2,
          borderBottomWidth: iconSize / 2,
          borderRightWidth: direction === 'prev' ? iconSize * 0.8 : 0,
          borderLeftWidth: direction === 'next' ? iconSize * 0.8 : 0,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderRightColor: direction === 'prev' ? '#9ca3af' : 'transparent',
          borderLeftColor: direction === 'next' ? '#9ca3af' : 'transparent',
        }}
      />
      {direction === 'next' && <View style={{ width: 2, height: iconSize }} className="bg-gray-400" />}
    </View>
  );
});

SkipIcon.displayName = 'SkipIcon';

/**
 * Play button icon (triangle)
 */
const PlayIcon = memo<{ size: number }>(({ size }) => {
  return (
    <View
      style={{
        width: 0,
        height: 0,
        borderTopWidth: size / 2,
        borderBottomWidth: size / 2,
        borderLeftWidth: size * 0.8,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'white',
        marginLeft: 2,
      }}
    />
  );
});

PlayIcon.displayName = 'PlayIcon';

/**
 * Pause button icon (two bars)
 */
const PauseIcon = memo<{ size: number }>(({ size }) => {
  const barWidth = size * 0.25;
  const barHeight = size * 0.8;
  return (
    <View className="flex-row items-center gap-1.5">
      <View style={{ width: barWidth, height: barHeight }} className="rounded-sm bg-white" />
      <View style={{ width: barWidth, height: barHeight }} className="rounded-sm bg-white" />
    </View>
  );
});

PauseIcon.displayName = 'PauseIcon';

/**
 * Reusable player control buttons with proper icon shapes
 * Note: Only play/pause has functionality as per requirements
 */
export const PlayerControls = memo<PlayerControlsProps>(({ size = 'small', className = '' }) => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const togglePlaying = usePlayerStore((state) => state.togglePlaying);

  const buttonSize = size === 'large' ? 72 : 48;
  const skipButtonSize = size === 'large' ? 44 : 32;
  const iconSize = size === 'large' ? 28 : 18;

  return (
    <View className={`flex-row items-center justify-center gap-6 ${className}`}>
      {/* Previous button - non-functional as per requirements */}
      <TouchableOpacity
        className="items-center justify-center"
        style={{ width: skipButtonSize, height: skipButtonSize }}
        activeOpacity={0.6}
      >
        <SkipIcon direction="prev" size={skipButtonSize} />
      </TouchableOpacity>

      {/* Play/Pause button */}
      <TouchableOpacity
        onPress={togglePlaying}
        className="items-center justify-center rounded-full bg-black shadow-lg"
        style={{ width: buttonSize, height: buttonSize }}
        activeOpacity={0.8}
      >
        {isPlaying ? <PauseIcon size={iconSize} /> : <PlayIcon size={iconSize} />}
      </TouchableOpacity>

      {/* Next button - non-functional as per requirements */}
      <TouchableOpacity
        className="items-center justify-center"
        style={{ width: skipButtonSize, height: skipButtonSize }}
        activeOpacity={0.6}
      >
        <SkipIcon direction="next" size={skipButtonSize} />
      </TouchableOpacity>
    </View>
  );
});

PlayerControls.displayName = 'PlayerControls';
