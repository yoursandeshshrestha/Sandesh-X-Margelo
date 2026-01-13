/**
 * MusicBrainz API response types
 */

export interface ArtistCredit {
  name: string;
  artist?: {
    id: string;
    name: string;
  };
}

export interface Recording {
  id: string;
  title: string;
  'artist-credit': ArtistCredit[];
  length?: number;
  score?: number;
}

export interface MusicBrainzResponse {
  recordings: Recording[];
  count: number;
  offset: number;
}

export interface MusicBrainzQueryParams {
  query: string;
  limit: number;
  offset: number;
  fmt: 'json';
  inc?: string;
}
