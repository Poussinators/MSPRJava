import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import detailPromo from './components/DetailPromo';
import listePromo from './components/ListePromo';
import QRCode from './components/QRCode';

const Stack = createStackNavigator();

export default function Main() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="listePromo">
                <Stack.Screen name="listePromo" component={listePromo} options={{ title: 'Liste des promos' }}/>
                <Stack.Screen name="detailPromo" component={detailPromo} options={{ title: 'Détail de la promo' }}/>
                <Stack.Screen name="QRCode" component={QRCode} options={{ title: 'Scan QR Code' }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
