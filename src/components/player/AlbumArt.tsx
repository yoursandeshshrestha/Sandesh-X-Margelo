import { memo } from 'react';
import { Image } from 'react-native';
import Animated from 'react-native-reanimated';

interface AlbumArtProps {
  coverUrl: string;
  size?: number;
  animated?: boolean;
  className?: string;
}

const AnimatedImage = Animated.createAnimatedComponent(Image);

/**
 * Reusable album art component that supports both static and animated usage
 */
export const AlbumArt = memo<AlbumArtProps>(
  ({ coverUrl, size, animated = false, className = '' }) => {
    const ImageComponent = animated ? AnimatedImage : Image;

    // If size is provided, use inline styles; otherwise let container control size
    const style = size ? { width: size, height: size } : undefined;

    return (
      <ImageComponent
        source={{ uri: coverUrl }}
        className={`rounded-lg bg-gray-200 ${className}`}
        style={style}
        resizeMode="cover"
      />
    );
  }
);

AlbumArt.displayName = 'AlbumArt';
