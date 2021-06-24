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

        // let strListePromo = window.localStorage.getItem('listePromotion');
        // if (strListePromo == null) {
        //     strListePromo = '';
        // }
        // const ListePromo = JSON.parse(strListePromo);
        // console.log('Nombre de promotion : ', ListePromo);

        // let ListePromo: Promotion[] =[ {
        //     codePromo: "CARTEKIWI",
        //     libelle: "Mais si c'est possible !",
        //     sujet: "sur chaque déplacement en train",
        //     description: "Pour les moins de 16 ans, et tous ceux qui l'accompagnent jusqu'à 4 personnes paient tous moitié prix !",
        //     valeurPromo: 50,
        //     typePromo: 2,
        //     dateDebut: "2021-03-11 10:26:00.000",
        //     dateFin: "2021-05-01 10:26:00.000",
        //     imgPath: "https://test.com/img.png"
        // },
        // {
        //     codePromo: "UNICORN04",
        //     libelle: "C'est la fete des licornes !",
        //     sujet: "sur chaque article Licorne achetés.",
        //     description: "Quelle dinguerie cette promotion !",
        //     valeurPromo: 10,
        //     typePromo: 2,
        //     dateDebut: "2021-03-11 10:26:00.000",
        //     dateFin: "2021-05-01 10:26:00.000",
        //     imgPath: "https://test.com/img.png"
        // }];
        let ListePromoV2: Promotion[] =[];
        console.log('On est avant l\'internal storage promise ici');
        const internalStorage: InternalStorage = new InternalStorage()
        internalStorage.getListPromotions().then((res: Promotion[]) => {
            console.log('Return of getListPromotions :', res);
            ListePromoV2 = res;
            console.log('res est : ', ListePromoV2, ' et ', res)
            this.setState({loading: true})
        })

        console.log('On passe par là.');
        // @ts-ignore
        const {PromoVisee} = this.props.route.params;
        console.log('user est ', PromoVisee);
        // for (var i=0; i < ListePromoV2.length; i++) {
        //     console.log('code promo ', i, ' ', ListePromoV2[i].codePromo);
        //     if (PromoVisee.codePromo == ListePromoV2[i].codePromo) {
        //         this.promotion = ListePromoV2[i];
        //         console.log('la promo est', this.promotion);
        //     }
        // }
        this.promotion = PromoVisee;

    }

    render() {
        console.log('la promo actuellement est ', this.promotion)
        if (this.promotion.typePromo == null) {

        } else {
            console.log('la promo deuxiemement est ', this.promotion)
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
