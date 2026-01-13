import { useCallback } from 'react';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { usePlayerStore } from '../../stores/playerStore';
import { usePlayerGesture } from '../../hooks/usePlayerGesture';
import { useSharedElementTransition } from '../../hooks/useSharedElementTransition';
import { MiniPlayer } from './MiniPlayer';
import { FullScreenPlayer } from './FullScreenPlayer';
import { AlbumArt } from './AlbumArt';
import { SongInfo } from './SongInfo';

/**
 * Container component that manages both mini and full screen players
 * with shared element transition and gesture handling
 */
export const PlayerContainer = () => {
  const currentSong = usePlayerStore((state) => state.currentSong);
  const setIsExpanded = usePlayerStore((state) => state.setIsExpanded);

  const {
    progress,
    expand,
    collapse,
    miniPlayerStyle,
    fullScreenStyle,
    sharedAlbumArtStyle,
    sharedSongInfoStyle,
    fullScreenContentStyle,
  } = useSharedElementTransition();

  const handleExpand = useCallback(() => {
    setIsExpanded(true);
    expand();
  }, [setIsExpanded, expand]);

  const handleCollapse = useCallback(() => {
    setIsExpanded(false);
    collapse();
  }, [setIsExpanded, collapse]);

  const panGesture = usePlayerGesture({
    progress,
    onCollapse: handleCollapse,
  });

  // Don't render if there's no song playing
  if (!currentSong) {
    return null;
  }

  return (
    <>
      {/* Mini Player (without album art and song info - they're shared) */}
      <MiniPlayer
        song={currentSong}
        onExpand={handleExpand}
        animatedStyle={miniPlayerStyle}
        hideSharedElements
      />

      {/* Full Screen Player with Gesture (without album art and song info - they're shared) */}
      <GestureDetector gesture={panGesture}>
        <FullScreenPlayer
          song={currentSong}
          onCollapse={handleCollapse}
          animatedStyle={fullScreenStyle}
          contentStyle={fullScreenContentStyle}
          hideSharedElements
        />
      </GestureDetector>

      {/* Shared Album Art - morphs between mini and full screen */}
      <Animated.View style={sharedAlbumArtStyle} className="overflow-hidden">
        <AlbumArt coverUrl={currentSong.coverUrl} className="h-full w-full" />
      </Animated.View>

      {/* Shared Song Info - morphs between mini and full screen */}
      <Animated.View style={sharedSongInfoStyle}>
        <SongInfo title={currentSong.title} artist={currentSong.artist} layout="compact" />
      </Animated.View>
    </>
  );
};
