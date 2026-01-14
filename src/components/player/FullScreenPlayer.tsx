import { memo } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Song } from '../../types';
import type { AnimatedStyleProp } from '../../types/animation';
import { PLAYER_SIZES } from '../../constants/player';
import { HAS_NATIVE_HEADER } from '../../constants/buildConfig';
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

  const topSpacing = HAS_NATIVE_HEADER ? insets.top + 0 : insets.top + 100;
  const albumBottomMargin = HAS_NATIVE_HEADER ? 40 : 40;
  const songInfoBottomSpacing = 48;

  return (
    <Animated.View style={[animatedStyle]} className="absolute inset-0 bg-white">
      <View className="flex-1 px-6" style={{ paddingTop: topSpacing }}>
        {/* Album Art - hidden when using shared element */}
        {!hideSharedElements && (
          <View className="items-center" style={{ marginBottom: albumBottomMargin }}>
            <AlbumArt coverUrl={song.coverUrl} size={ALBUM_ART_SIZE} className="shadow-2xl" />
          </View>
        )}
        {hideSharedElements && (
          <View style={{ height: ALBUM_ART_SIZE, marginBottom: albumBottomMargin }} />
        )}

        {/* Song Info - hidden when using shared element */}
        {!hideSharedElements && (
          <View className="px-4" style={{ marginBottom: songInfoBottomSpacing, width: '100%' }}>
            <SongInfo title={song.title} artist={song.artist} layout="expanded" />
          </View>
        )}
        {hideSharedElements && <View style={{ height: 60, marginBottom: songInfoBottomSpacing }} />}

        {/* Progress bar and controls - only visible in full screen */}
        <Animated.View style={contentStyle} className="px-4  ">
          {/* Progress bar placeholder */}
          <View className="mb-10 h-1 w-full overflow-hidden rounded-full bg-gray-200">
            <View className="h-full w-1/3 rounded-full bg-black" />
          </View>

          {/* Player Controls */}
          <PlayerControls size="large" />
        </Animated.View>
      </View>

      {/* Bottom safe area padding */}
      <View style={{ height: Math.max(insets.bottom + 16, 32) }} />
    </Animated.View>
  );
};

export const FullScreenPlayer = memo(FullScreenPlayerComponent);
