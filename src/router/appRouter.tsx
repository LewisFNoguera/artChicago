import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen, DetailScreen, FavoritesScreen } from '@screens/index';
import { RootStackParamList } from '@utils/interface/navigation.interface';

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function AppRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'HomeScreen'}>
        <Stack.Screen options={{ headerShown: false, headerTitle: 'Home' }} name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailScreen" options={{ headerTitle: 'Art Detail' }} component={DetailScreen} />
        <Stack.Screen
          name="FavoritesScreen"
          options={{ headerTitle: 'Your Favorite Art' }}
          component={FavoritesScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
