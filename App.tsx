import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import detailPromo from './src/components/DetailPromo';
import listePromo from './src/components/ListePromo';
import QRCode from './src/components/QRCode';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="listePromo">
          <Stack.Screen name="listePromo" component={listePromo} />
          <Stack.Screen name="detailPromo" component={detailPromo} />
          <Stack.Screen name="QRCode" component={QRCode} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
