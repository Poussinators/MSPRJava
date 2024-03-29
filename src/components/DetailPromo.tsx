import React, { Component } from 'react';
import {Text, View, StyleSheet, SafeAreaView, ImageBackground} from 'react-native';
import { Promotion } from '../interfaces/promotion';
import { InternalStorage } from "../services/InternalStorage";

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

        async function suppressionRedirection(promotion: Promotion, navigation: any){
            const internalStorage: InternalStorage = new InternalStorage();
            await internalStorage.removePromotion(promotion.codePromo);
            // navigation.navigate('listePromo');
            navigation.goBack(null);
        }

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
                        <ImageBackground source={{uri: this.promotion.imgPath}} style={{width: '100%', height: '100%'}}>
                            <Text>{`\n`}</Text>
                            <Text style={styles.libelleText}>{this.promotion.libelle}</Text>
                            <View style={styles.descriptionWrapper}>
                                <Text style={styles.fullSujet}>{fullSujet}</Text>
                                <Text style={styles.description}>{this.promotion.description}</Text>
                            </View>
                            <View>
                                <Text style={styles.suppression}
                                      onPress={() => suppressionRedirection(this.promotion, this.navigation)}>Suppression</Text>
                            </View>
                        </ImageBackground>
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
        elevation: 8,
        backgroundColor: "#009688",
        opacity: 0.7,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: '3%',
        color: "#ffffff",
        alignSelf: "center",
    },

    description: {
        fontSize: 18,
        color: "#ffffff"
    },

    fullSujet: {
        fontSize: 20,
        color: "#ffffff",
        fontWeight: "bold"
    },

    descriptionWrapper: {
        backgroundColor: "#009688",
        elevation: 8,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        opacity: 0.7
    },

    suppression: {
        backgroundColor: "#ff0000",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 105,
        bottom: 0,
    }

});
