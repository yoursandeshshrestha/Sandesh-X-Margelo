import { PICSUM_BASE_URL } from './constants';

/**
 * Generates a unique image URL for a song using its ID as the seed
 */
export const getAlbumArtUrl = (songId: string, size: number = 800): string => {
  return `${PICSUM_BASE_URL}/seed/${songId}/${size}`;
};
