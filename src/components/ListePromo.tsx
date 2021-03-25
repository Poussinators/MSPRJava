import React from 'react';
import {Button, Text, View} from 'react-native';

// @ts-ignore
const listePromo = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Ceci est la page de la liste !</Text>
            <Button
                title="Aller sur la page des detail ?"
                onPress={() => navigation.navigate('detailPromo')}
            />
            <Button
                title="Aller sur la page du QRcode ?"
                onPress={() => navigation.navigate('QRCode')}
            />
        </View>
    );
}

export default listePromo;
