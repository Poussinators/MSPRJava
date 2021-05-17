import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView} from 'react-native';
import { Promotion } from '../interfaces/promotion';

export class DetailPromo extends Component {

    navigation: any
    
    constructor(props: any) {
        super(props)

        this.navigation = props.navigation

        // console.log(props.navigation)

        // props.navigation.setParams({
        //     Title: promotion.codePromo
        //   });

    }

    render() {

        let fullSujet: string = ''
        
        switch (promotion.typePromo) {
            case 1:
                fullSujet = promotion.valeurPromo + '€ ' + promotion.sujet
                break;

            case 2:
                fullSujet = promotion.valeurPromo + '% ' + promotion.sujet
                break;
        
            default:
                fullSujet = promotion.valeurPromo + ' ' + promotion.sujet
                break;
        }

        return (
            <SafeAreaView style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.libelleText}>{promotion.libelle}</Text>
                    <View style={styles.description}>
                        <Text style={styles.sujet}>{fullSujet}</Text>
                        <Text>{promotion.description}</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({

    wrapper: {
        flex: 1,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    libelleText: {
        fontSize: 27,
        backgroundColor: "#ffffff",
        shadowColor: "#00ff00",
        shadowOffset: {
            height: 50,
            width: 50
        },
        shadowRadius: 50,
        shadowOpacity: 1
    },

    description: {
        marginTop: 20,
        backgroundColor: "#aaaaaa",
        width: 350
    },

    sujet: {
        fontSize: 18
    },

  });

const promotion: Promotion = {
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