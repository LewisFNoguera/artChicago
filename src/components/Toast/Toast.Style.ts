import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: COLORS.backdrop,
    paddingBottom: 40,
  },
  toast: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
  },
});
