import React, { Component } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { Promotion } from '../interfaces/promotion';

export class DetailPromo extends Component {
    
    promotion: Promotion = {
        codePromo: "UNICORN04",
        libelle: "C'est la fete des licornes !",
        sujet: "sur chaque article Licorne achetés.",
        description: "Quelle dinguerie cette promotion !",
        valeurPromo: 10,
        typePromo: 2,
        dateDebut: "2021-03-11 10:26:00.000",
        dateFin: "2021-05-01 10:26:00.000",
        imgPath: "https://test.com/img.png"
    }

    navigation: any
    
    constructor(props: any) {
        super(props)

        this.navigation = props.navigation
        
    }

    render() {

        return (
            <View style={styles.center}>
                <Text>Ceci est la page des details, wesh la street.</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    center: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    }
  });
