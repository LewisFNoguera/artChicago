import React from 'react';
import { View, FlatList } from 'react-native';

import { useAppSelector } from '@redux/hooks/reduxHook';
import { allFavorites } from '@redux/slices/favoritesSlice';

import { Datum } from '@utils/interface/artworks.interface';
import { ArtItem, ImageArt } from '@components/index';
import { styles } from '@screens/Favorite/FavoriteScreen.Style';
import { FavoritesScreenProps } from '@utils/interface/navigation.interface';

const FavoritesScreen = ({ navigation }: FavoritesScreenProps) => {
  const favorites = useAppSelector(allFavorites);
  const handleItemPress = (item: Datum) => navigation.navigate('DetailScreen', { item });

  const renderArtItem = ({ item, index }: { item: Datum; index: number }) => (
    <ArtItem item={item} origin="Favorite" onPress={() => handleItemPress(item)} idx={index} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        key={2}
        data={favorites}
        renderItem={renderArtItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={false}
        numColumns={2}
        ListEmptyComponent={ImageArt}
      />
    </View>
  );
};

export default FavoritesScreen;
