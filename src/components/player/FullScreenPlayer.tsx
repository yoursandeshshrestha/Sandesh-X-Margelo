import { memo } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Song } from '../../types';
import type { AnimatedStyleProp } from '../../types/animation';
import { PLAYER_SIZES } from '../../constants/player';
import { AlbumArt } from './AlbumArt';
import { PlayerControls } from './PlayerControls';
import { SongInfo } from './SongInfo';

interface FullScreenPlayerProps {
  song: Song;
  onCollapse: () => void;
  animatedStyle?: AnimatedStyleProp;
  contentStyle?: AnimatedStyleProp;
  hideSharedElements?: boolean;
}

const ALBUM_ART_SIZE = PLAYER_SIZES.FULL_ALBUM_SIZE;

/**
 * Full screen player with large album art and controls
 */
const FullScreenPlayerComponent = ({
  song,
  animatedStyle,
  contentStyle,
  hideSharedElements = false,
}: FullScreenPlayerProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Animated.View style={[animatedStyle]} className="absolute inset-0 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        {/* Album Art - hidden when using shared element */}
        {!hideSharedElements && (
          <View className="mb-10">
            <AlbumArt coverUrl={song.coverUrl} size={ALBUM_ART_SIZE} className="shadow-2xl" />
          </View>
        )}
        {hideSharedElements && <View style={{ height: ALBUM_ART_SIZE, marginBottom: 40 }} />}

        {/* Song Info and Controls */}
        <View className="w-full max-w-md">
          {/* Song Info - hidden when using shared element */}
          {!hideSharedElements && (
            <View className="mb-6 items-center">
              <SongInfo title={song.title} artist={song.artist} layout="expanded" />
            </View>
          )}
          {hideSharedElements && <View style={{ height: 60, marginBottom: 24 }} />}

          {/* Progress bar and controls - only visible in full screen */}
          <Animated.View style={contentStyle}>
            {/* Progress bar placeholder */}
            <View className="mb-10 h-1 w-full overflow-hidden rounded-full bg-gray-200">
              <View className="h-full w-1/3 rounded-full bg-black" />
            </View>

            {/* Player Controls */}
            <PlayerControls size="large" />
          </Animated.View>
        </View>
      </View>

      {/* Bottom safe area padding */}
      <View style={{ height: Math.max(insets.bottom + 16, 32) }} />
    </Animated.View>
  );
};

export const FullScreenPlayer = memo(FullScreenPlayerComponent);
