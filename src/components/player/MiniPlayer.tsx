import { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePlayerStore } from '../../stores/playerStore';
import type { Song } from '../../types';
import type { AnimatedStyleProp } from '../../types/animation';
import { PLAYER_SIZES } from '../../constants/player';
import { AlbumArt } from './AlbumArt';
import { SongInfo } from './SongInfo';

interface MiniPlayerProps {
  song: Song;
  onExpand: () => void;
  animatedStyle?: AnimatedStyleProp;
  hideSharedElements?: boolean;
}

const MINI_ALBUM_SIZE = PLAYER_SIZES.MINI_ALBUM_SIZE;

/**
 * Play icon for mini player
 */
const MiniPlayIcon = memo<{ isPlaying: boolean }>(({ isPlaying }) => {
  if (isPlaying) {
    // Pause icon (two bars)
    return (
      <View className="flex-row items-center gap-1">
        <View className="h-3 w-1 rounded-sm bg-white" />
        <View className="h-3 w-1 rounded-sm bg-white" />
      </View>
    );
  }

  // Play icon (triangle)
  return (
    <View
      style={{
        width: 0,
        height: 0,
        borderTopWidth: 6,
        borderBottomWidth: 6,
        borderLeftWidth: 10,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'white',
        marginLeft: 2,
      }}
    />
  );
});

MiniPlayIcon.displayName = 'MiniPlayIcon';

/**
 * Compact mini player displayed at the bottom with clean minimal design
 */
const MiniPlayerComponent = ({
  song,
  onExpand,
  animatedStyle,
  hideSharedElements = false,
}: MiniPlayerProps) => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const insets = useSafeAreaInsets();

  return (
    <Animated.View
      style={[animatedStyle, { paddingBottom: insets.bottom }]}
      className="absolute bottom-0 left-0 right-0 px-3"
    >
      <View className="rounded-2xl bg-gray-200 shadow-2xl">
        <TouchableOpacity
          onPress={onExpand}
          className="flex-row items-center gap-4 px-5 py-3"
          activeOpacity={0.9}
        >
          {!hideSharedElements && <AlbumArt coverUrl={song.coverUrl} size={MINI_ALBUM_SIZE} />}
          {hideSharedElements && <View style={{ width: MINI_ALBUM_SIZE, height: MINI_ALBUM_SIZE }} />}
          {!hideSharedElements && (
            <SongInfo title={song.title} artist={song.artist} layout="compact" className="flex-1" />
          )}
          {hideSharedElements && <View className="flex-1" />}
          <View className="h-10 w-10 items-center justify-center rounded-full bg-black">
            <MiniPlayIcon isPlaying={isPlaying} />
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export const MiniPlayer = memo(MiniPlayerComponent);
