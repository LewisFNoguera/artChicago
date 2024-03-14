import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MotiView } from 'moti';

import { useDispatch } from 'react-redux';
import { useToast } from '@context/ToastContext';
import { addToFavorites, removeFromFavorites } from '@redux/slices/favoritesSlice';
import { ArtItemProps, Datum } from '@utils/interface/artworks.interface';
import { useAppSelector } from '@redux/hooks/reduxHook';
import { artworksState } from '@redux/slices/artworksSlice';

import { Button, ImageArt } from '@components/index';
import { COLORS } from '@constants/colors';
import { styles } from './ArtITem.Style';

const ArtItem = ({ item, onPress, origin, idx }: ArtItemProps) => {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const { isFetching } = useAppSelector(artworksState);

  const handleRemoveArtWork = (artwork: Datum) => {
    const artworkId = artwork.id;
    dispatch(removeFromFavorites({ artworkId }));
    showToast('Art was removed from Favorites!', 2000);
  };

  const handleAddArtWork = (artwork: Datum) => {
    dispatch(addToFavorites({ artwork }));
    showToast('Art added to Favorites!', 2000);
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: idx * 200 }}
      style={styles.item}
      key={item.id.toString()}
    >
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.itemContainer}>
          <View style={styles.imageContainer}>
            {isFetching ? <ActivityIndicator size="small" color={COLORS.black} /> : <ImageArt image={item.image_id} />}
          </View>

          <Text numberOfLines={1} style={styles.textArt}>
            {item.title ?? 'No Available'}
          </Text>

          <Text numberOfLines={1} style={styles.textArtist}>
            By: {item.artist_display ?? 'No Available'}
          </Text>

          {origin === 'Favorite' ? (
            <Button label="Remove from Favorites" onPress={() => handleRemoveArtWork(item)} type="danger" />
          ) : (
            <Button label="Add to Favorites" onPress={() => handleAddArtWork(item)} type="primary" />
          )}
        </View>
      </TouchableOpacity>
    </MotiView>
  );
};

export default ArtItem;
