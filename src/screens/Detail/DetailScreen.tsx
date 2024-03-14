import React from 'react';
import { ScrollView, View } from 'react-native';
import { MotiView } from 'moti';

import { DetailScreenProps } from '@utils/interface/navigation.interface';
import { ImageArt } from '@components/index';
import ArtDetails from './components/ArtDetails';
import { styles } from './DetailScreen.Style';

const DetailScreen = ({ route }: DetailScreenProps) => {
  const { item } = route.params;
  const motiFromOptions = { opacity: 0, translateY: -50 };
  const motiAnimateOptions = { opacity: 1, translateY: 0 };
  return (
    <ScrollView style={styles.container}>
      <MotiView from={motiFromOptions} animate={motiAnimateOptions} transition={{ delay: 500 }}>
        <ImageArt image={item.image_id} />
      </MotiView>

      <View style={styles.content}>
        <MotiView from={motiFromOptions} animate={motiAnimateOptions} transition={{ delay: 200 }}>
          <ArtDetails item={item} />
        </MotiView>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;
