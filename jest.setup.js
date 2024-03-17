global.__DEV__ = true

import mockRNBootSplash from 'react-native-bootsplash';

jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('moti', () => ({
  ...jest.requireActual('moti'), 
  MotiView: jest.requireActual('moti').MotiView,
}));

jest.mock('@notifee/react-native', () => {
  return () => ({
    requestPermission: jest.fn(() => Promise.resolve(true)),  
  });
});
