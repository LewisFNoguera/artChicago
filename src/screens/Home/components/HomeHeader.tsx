import React from 'react';
import { Text } from 'react-native';
import { styles } from '../HomeScreen.Style';

const HomeHeader = () => {
  return (
    <>
      <Text style={styles.title}>Art Institute of Chicago</Text>
      <Text style={styles.subtitle}>Below you will find works of art that you can find in our gallery.</Text>
    </>
  );
};

export default HomeHeader;
