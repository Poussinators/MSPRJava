import React, {Component} from 'react';
import {FlatList, StyleSheet, Button, Text, View, SafeAreaView} from 'react-native';
import { Promotion } from '../interfaces/promotion';
import { MsprAPI } from '../services/MsprAPI';

export class listePromo extends Component {

    navigation: any
    listeDePromotion: Promotion[] = []

    constructor(props: any) {
        super(props)

        this.navigation = props.navigation


        // const listePromotion: Promotion[] =[ {
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
        // const internalTokene = window.localStorage.setItem('listePromotion',JSON.stringify(listePromotion));

        let strListePromo = window.localStorage.getItem('listePromotion');
        if (strListePromo == null) {
            strListePromo = '';
        }
        const ListePromo = JSON.parse(strListePromo);
        console.log('Nombre de promotion : ', ListePromo);
        var data = [];
        for (var i=0; i < ListePromo.length; i++) {
            console.log('longueur ListePromo', ListePromo.length);
            console.log('longueur ListePromo', ListePromo[i].codePromo);
            data[i] = ListePromo[i].codePromo;
            console.log('c\'est :' , data[i]);
        }
        this.listeDePromotion = data;
    }

    render() {

        console.log('ceci est la liste des promos :', this.listeDePromotion);
        return (
            // style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 1, alignItems: 'top', justifyContent: 'center' }}>
                    <Button
                        title="Aller sur la page du QRcode ?"
                        onPress={() => this.navigation.navigate('QRCode')}
                    />
                </View>

                <Text>Voici tous les codes Promo précédemment enregistrés !</Text>

                { this.listeDePromotion.map((item, key)=>(
                    <Text onPress={() => this.navigation.navigate('detailPromo', { promotionVise: item })} key={key}>{item}</Text>
                ))}


            </View>

        );
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
});



// // @ts-ignore
// const listePromo = ({ navigation }) => {
//
//     return (
//
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Button
//                 title="Aller sur la page des detail ?"
//                 onPress={() => navigation.navigate('detailPromo')}
//             />
//             <Button
//                 title="Aller sur la page du QRcode ?"
//                 onPress={() => navigation.navigate('QRCode')}
//             />
//             <Text>Ceci est une  liste ! </Text>
//             <FlatList
//             data={[
//               {key: 'Devin'},
//               {key: 'Dan'},
//               {key: 'Dominic'},
//               {key: 'Jackson'},
//               {key: 'James'},
//               {key: 'Joel'},
//               {key: 'John'},
//               {key: 'Jillian'},
//               {key: 'Jimmy'},
//               {key: 'Julie'},
//             ]}
//             renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
//
//           />
//
//
//
//
//         </View>
//
//     );
//
// }
//
// export default listePromo;
