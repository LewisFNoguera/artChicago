import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';

export const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    marginTop: 10,
    padding: 8,
    alignSelf: 'center',
  },
  md: {
    width: '80%',
    padding: 15,
  },
  full: {
    width: '100%',
  },
  sm: {
    width: '40%',
  },
  primary: {
    backgroundColor: COLORS.black,
  },
  danger: {
    borderColor: COLORS.danger,
    borderWidth: 1,
  },

  ghost: {
    borderColor: COLORS.black,
    borderWidth: 1,
  },

  textBase: {
    fontSize: 12,
    textAlign: 'center',
  },

  text_primary: {
    color: COLORS.white,
  },

  text_danger: {
    color: COLORS.danger,
  },

  text_ghost: {
    color: COLORS.black,
    fontSize: 16,
  },
});
