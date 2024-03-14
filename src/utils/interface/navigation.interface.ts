import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Datum } from '@utils/interface/artworks.interface';

export type RootStackParamList = {
  HomeScreen: undefined;
  DetailScreen: { item: Datum };
  FavoritesScreen: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;
export type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'DetailScreen'>;
export type FavoritesScreenProps = NativeStackScreenProps<RootStackParamList, 'FavoritesScreen'>;
