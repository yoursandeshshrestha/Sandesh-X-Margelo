import { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import type { Song } from '../../types';
import { AlbumArt } from '../player/AlbumArt';
import { SongInfo } from '../player/SongInfo';

interface SongListItemProps {
  song: Song;
  onPress: (song: Song) => void;
}

const ITEM_HEIGHT = 80;

/**
 * Individual song item in the list with clean minimal design
 */
const SongListItemComponent = ({ song, onPress }: SongListItemProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(song)}
      className="flex-row items-center gap-4 border-b border-gray-200 bg-white px-5 py-4"
      style={{ height: ITEM_HEIGHT }}
      activeOpacity={0.6}
    >
      <AlbumArt coverUrl={song.coverUrl} size={48} />
      <SongInfo title={song.title} artist={song.artist} layout="compact" className="flex-shrink" />
    </TouchableOpacity>
  );
};

export const SongListItem = memo(SongListItemComponent);
export { ITEM_HEIGHT };
