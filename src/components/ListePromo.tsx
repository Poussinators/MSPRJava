import React, { Component } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { Promotion } from '../interfaces/promotion';
import { InternalStorage } from "../services/InternalStorage";

export class listePromo extends Component {

    navigation: any
    listeDePromotion: Promotion[] = []

    constructor(props: any) {

        super(props)

        props.navigation.addListener(
            'focus',
            () => {
                console.log('focus event');
                const internalStorage: InternalStorage = new InternalStorage()
                internalStorage.getListPromotions().then((res: Promotion[]) => {
                    this.listeDePromotion = res;
                    this.setState({ loading: true })
                })
            }
        )

        this.navigation = props.navigation

    }

    render() {
        if (this.listeDePromotion == null) {

        } else {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                    <View style={{ width: '100%' }}>
                        <Button
                            title="Aller sur la page du QRcode ?"
                            onPress={() => this.navigation.navigate('QRCode')}
                            color="#009688"
                        />
                    </View>

                    <Text>{`\n`}</Text>
                    <Text style={ styles.item }>Voici tous les codes Promo précédemment enregistrés :</Text>
                    <Text>{`\n`}</Text>

                    <View>
                        {this.listeDePromotion.map((item, key) => (
                            <Text style={styles.appButtonContainer}
                                onPress={() => this.navigation.navigate('detailPromo', { PromoVisee: item })}
                                key={key}>{item.codePromo}</Text>
                        ))}
                    </View>


                </View>

            );
        }
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: '15%',
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
});
