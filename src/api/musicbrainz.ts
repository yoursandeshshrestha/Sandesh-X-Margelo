import type { MusicBrainzResponse, Song } from '../types';
import { API_BASE_URL, API_CONFIG } from '../utils/constants';
import { getAlbumArtUrl } from '../utils/imageUrl';

/**
 * Fetches recordings from MusicBrainz API
 */
export const fetchRecordings = async (
  offset: number = 0
): Promise<MusicBrainzResponse> => {
  const params = {
    query: API_CONFIG.SEARCH_QUERY,
    limit: API_CONFIG.PAGE_SIZE.toString(),
    offset: offset.toString(),
    fmt: 'json' as const,
    inc: API_CONFIG.INCLUDE_PARAMS,
  };

  const queryString = new URLSearchParams(params).toString();
  const url = `${API_BASE_URL}/recording?${queryString}`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'MusicPlayerApp/1.0.0',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch recordings: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Transforms API recording to domain Song model
 */
export const transformRecordingToSong = (recording: MusicBrainzResponse['recordings'][0]): Song => {
  const artistName = recording['artist-credit']?.[0]?.name || 'Unknown Artist';

  return {
    id: recording.id,
    title: recording.title,
    artist: artistName,
    coverUrl: getAlbumArtUrl(recording.id),
    duration: recording.length,
  };
};
