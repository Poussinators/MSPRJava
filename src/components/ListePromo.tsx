import React, {Component} from 'react';
import {FlatList, StyleSheet, Button, Text, View, TouchableOpacity} from 'react-native';
import { Promotion } from '../interfaces/promotion';
import { MsprAPI } from '../services/MsprAPI';
import {InternalStorage} from "../services/InternalStorage";

export class listePromo extends Component {

    navigation: any
    listeDePromotion: Promotion[] = []

    constructor(props: any) {
        super(props)

        this.navigation = props.navigation

        const internalStorage: InternalStorage = new InternalStorage()
        internalStorage.getListPromotions().then((res: Promotion[]) => {
            this.listeDePromotion = res;
            this.setState({loading: true})
        })

    }

    render() {
        if (this.listeDePromotion == null) {

        } else {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
                    <View style={{width: '100%'}}>
                        <Button
                            title="Aller sur la page du QRcode ?"
                            onPress={() => this.navigation.navigate('QRCode')}
                            color="#009688"
                        />
                    </View>

                    <Text>{`\n`}</Text>
                    <Text style={styles.item}>Voici tous les codes Promo précédemment enregistrés :</Text>
                    <Text>{`\n`}</Text>

                    <View>
                        {this.listeDePromotion.map((item, key) => (
                            <Text style={styles.appButtonContainer}
                                  onPress={() => this.navigation.navigate('detailPromo', {PromoVisee: item})}
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
