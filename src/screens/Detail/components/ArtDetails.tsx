import React from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

import { ArtDetailsProps } from '@utils/interface/artworks.interface';
import { styles } from './ArtDetails.Style';

const ArtDetails = ({ item }: ArtDetailsProps) => {
  const { width } = useWindowDimensions();

  const artLabelDetails = {
    id: 'ID',
    artist_display: 'Artist',
    place_of_origin: 'Country',
    dimensions: 'Dimensions',
  };

  return (
    <View>
      {Object.entries(artLabelDetails).map(([fieldName, displayName]) => (
        <View key={fieldName}>
          <Text style={styles.label}>
            {displayName}: <Text style={styles.labelValue}>{item[fieldName] ?? 'Not Available'}</Text>
          </Text>
        </View>
      ))}
      <Text style={styles.label}>Description:</Text>
      <RenderHtml contentWidth={width} source={{ html: item.description ?? item.medium_display }} />
    </View>
  );
};

export default ArtDetails;
