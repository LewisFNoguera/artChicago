import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    marginBottom: 10,
    flex: 1,
  },
  title: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 40,
    margin: 20,
  },
  subtitle: {
    color: COLORS.black,
    fontSize: 16,
    margin: 20,
  },
});
