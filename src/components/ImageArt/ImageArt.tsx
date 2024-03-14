import React from 'react';
import { ActivityIndicator, Image } from 'react-native';

import { useAppSelector } from '@redux/hooks/reduxHook';
import { artworksState } from '@redux/slices/artworksSlice';
import { ImageArtProps } from '@utils/interface/artworks.interface';
import { COLORS } from '@constants/colors';

import { styles } from './ImageArt.Style';

const ImageArt = ({ image }: ImageArtProps) => {
  const { isFetching } = useAppSelector(artworksState);
  return isFetching ? (
    <ActivityIndicator size="small" color={COLORS.black} />
  ) : image ? (
    <Image
      source={{
        uri: `https://www.artic.edu/iiif/2/${image}/full/843,/0/default.jpg`,
      }}
      style={styles.image}
    />
  ) : (
    <Image source={require('@assets/images/empty.png')} style={styles.image} />
  );
};

export default ImageArt;
