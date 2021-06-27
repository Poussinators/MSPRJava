import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView} from 'react-native';
import { Promotion } from '../interfaces/promotion';
import { MsprAPI } from '../services/MsprAPI';
import {InternalStorage} from "../services/InternalStorage";
import {listePromo} from "./ListePromo";

export class DetailPromo extends Component {

    navigation: any
    promotion: Promotion

    constructor(props: any) {
        super(props)

        this.navigation = props.navigation


        this.promotion = {
            codePromo: '',
            dateDebut: '',
            dateFin: '',
            description: '',
            imgPath: '',
            libelle: '',
            sujet: '',
            typePromo: 0,
            valeurPromo: 0,
            notYetLoaded: true
        }

        // @ts-ignore
        const {PromoVisee} = this.props.route.params;
        this.promotion = PromoVisee;

    }

    render() {
        if (this.promotion.typePromo == null) {

        } else {
            let fullSujet: string = ''

            switch (this.promotion.typePromo) {
                case 1:
                    fullSujet = this.promotion.valeurPromo + '€ ' + this.promotion.sujet
                    break;

                case 2:
                    fullSujet = this.promotion.valeurPromo + '% ' + this.promotion.sujet
                    break;

                default:
                    fullSujet = this.promotion.valeurPromo + ' ' + this.promotion.sujet
                    break;
            }


            return (
                <SafeAreaView style={styles.wrapper}>
                    <View style={styles.container}>
                        <Text style={styles.libelleText}>{this.promotion.libelle}</Text>
                        <View style={styles.description}>
                            <Text style={styles.sujet}>{fullSujet}</Text>
                            <Text>{this.promotion.description}</Text>
                        </View>
                    </View>
                </SafeAreaView>
            );
        }
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

// const promotion: Promotion = {
//     codePromo: "UNICORN04",
//     libelle: "C'est la fete des licornes !",
//     sujet: "sur chaque article Licorne achetés.",
//     description: "Quelle dinguerie cette promotion !",
//     valeurPromo: 10,
//     typePromo: 2,
//     dateDebut: "2021-03-11 10:26:00.000",
//     dateFin: "2021-05-01 10:26:00.000",
//     imgPath: "https://test.com/img.png"
// }
