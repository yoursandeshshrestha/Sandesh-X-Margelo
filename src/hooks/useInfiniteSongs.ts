import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRecordings, transformRecordingToSong } from '../api/musicbrainz';
import { QUERY_KEYS, API_CONFIG } from '../utils/constants';
import type { Song } from '../types';

/**
 * Hook for fetching songs with infinite scroll pagination
 */
export const useInfiniteSongs = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.RECORDINGS],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetchRecordings(pageParam);
      const songs: Song[] = response.recordings.map(transformRecordingToSong);

      return {
        songs,
        nextOffset: pageParam + API_CONFIG.PAGE_SIZE,
        hasMore: response.recordings.length === API_CONFIG.PAGE_SIZE,
      };
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextOffset : undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
