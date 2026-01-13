import { useCallback, useMemo } from 'react';
import { ActivityIndicator, FlatList, Text, View, type ListRenderItem } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useInfiniteSongs } from '../../hooks/useInfiniteSongs';
import { usePlayerStore } from '../../stores/playerStore';
import type { Song } from '../../types';
import { SongListItem, ITEM_HEIGHT } from './SongListItem';

/**
 * Main song list with infinite scrolling and pagination
 */
export const SongList = () => {
  const insets = useSafeAreaInsets();
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteSongs();

  const setCurrentSong = usePlayerStore((state) => state.setCurrentSong);

  // Flatten all pages into a single array
  const songs = useMemo(
    () => data?.pages.flatMap((page) => page.songs) ?? [],
    [data?.pages]
  );

  const handleSongPress = useCallback(
    (song: Song) => {
      setCurrentSong(song);
    },
    [setCurrentSong]
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderItem: ListRenderItem<Song> = useCallback(
    ({ item }) => <SongListItem song={item} onPress={handleSongPress} />,
    [handleSongPress]
  );

  const keyExtractor = useCallback((item: Song) => item.id, []);

  const getItemLayout = useCallback(
    (_data: ArrayLike<Song> | null | undefined, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;

    return (
      <View className="py-4">
        <ActivityIndicator size="small" color="#374151" />
      </View>
    );
  }, [isFetchingNextPage]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#374151" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-4">
        <Text className="text-center text-base text-red-600">
          Error loading songs: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={songs}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      windowSize={21}
      removeClippedSubviews
      className="flex-1 bg-white"
      contentContainerStyle={{
        paddingBottom: insets.bottom + 80, // Space for mini player + safe area
      }}
    />
  );
};
