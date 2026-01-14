import { memo } from 'react';
import { Text, View } from 'react-native';

interface SongInfoProps {
  title: string;
  artist: string;
  layout?: 'compact' | 'expanded';
  className?: string;
}

/**
 * Reusable song title and artist display component
 */
export const SongInfo = memo<SongInfoProps>(
  ({ title, artist, layout = 'compact', className = '' }) => {
    const isCompact = layout === 'compact';

    return (
      <View className={`${isCompact ? 'flex-1 min-w-0' : 'w-full'} ${className}`}>
        <Text
          className={`font-semibold text-gray-900 ${isCompact ? 'text-base' : 'text-2xl'}`}
          numberOfLines={isCompact ? 1 : 2}
          ellipsizeMode="tail"
          style={!isCompact ? { maxWidth: '100%' } : undefined}
        >
          {title}
        </Text>
        <Text
          className={`text-gray-500 ${isCompact ? 'text-sm' : 'text-lg'} ${isCompact ? '' : 'mt-2'}`}
          numberOfLines={1}
          ellipsizeMode="tail"
          style={!isCompact ? { maxWidth: '100%' } : undefined}
        >
          {artist}
        </Text>
      </View>
    );
  }
);

SongInfo.displayName = 'SongInfo';
