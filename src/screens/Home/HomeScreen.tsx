import React, { useEffect } from 'react';
import { FlatList, SafeAreaView } from 'react-native';

import { Datum } from '@utils/interface/artworks.interface';
import { HomeScreenProps } from '@utils/interface/navigation.interface';

import { useToast } from '@context/ToastContext';
import { useAppDispatch, useAppSelector } from '@redux/hooks/reduxHook';
import { artworksResponse, artworksState, gettingArtwork } from '@redux/slices/artworksSlice';
import { allFavorites } from '@redux/slices/favoritesSlice';

import { ArtItem, Button, ImageArt } from '@components/index';
import { styles } from './HomeScreen.Style';
import HomeHeader from './components/HomeHeader';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const allArtworks = useAppSelector(artworksResponse);
  const allFavoritesStored = useAppSelector(allFavorites);
  const { isFetching, status, pagination } = useAppSelector(artworksState);

  useEffect(() => {
    dispatch(gettingArtwork());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'ERROR' && !isFetching) {
      showToast('Cannot load the artworks now. Please try again later.', 3500);
    }
  }, [status]);

  const handleItemPress = (item: Datum) => {
    navigation.navigate('DetailScreen', { item });
  };

  const renderArtItem = ({ item, index }: { item: Datum; index: number }) => (
    <ArtItem item={item} origin="Home" onPress={() => handleItemPress(item)} idx={index} />
  );

  const onEndReached = () => {
    if (isFetching) {
      return;
    }
    if (pagination.current_page <= pagination.total_pages) {
      dispatch(gettingArtwork());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allArtworks}
        renderItem={renderArtItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={false}
        numColumns={2}
        ListHeaderComponent={<HomeHeader />}
        ListEmptyComponent={ImageArt}
        onEndReached={onEndReached}
      />
      <Button
        label={`My Favorites (${allFavoritesStored?.length})`}
        onPress={() => navigation.navigate('FavoritesScreen')}
        type="ghost"
        size="md"
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
