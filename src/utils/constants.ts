/**
 * Application constants
 */

export const API_BASE_URL = 'https://musicbrainz.org/ws/2';
export const PICSUM_BASE_URL = 'https://picsum.photos';

export const QUERY_KEYS = {
  RECORDINGS: 'recordings',
} as const;

export const API_CONFIG = {
  PAGE_SIZE: 20,
  SEARCH_QUERY: 'a',
  INCLUDE_PARAMS: 'artist-credits',
} as const;
