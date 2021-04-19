import React, { useState, useEffect, Component,  } from 'react';
import { Text, View, StyleSheet, Button, } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Promotion } from "../interfaces/promotion";
import { MsprAPI } from '../services/MsprAPI';
import {AsyncStorage} from 'react-native-web/dist/index';

export class QRCodePromo extends React.Component {

  constructor(props: any){
    super(props);
    this.state = {hasPermission : null, scanned : false}
    
  }

  render(){
    // @ts-ignore
    const RenderBarCode : JSX.IntrinsicElements = this.__renderBarCodeScanned() as JSX.IntrinsicElements;

    return(
      <View style={styles.container}>
        <RenderBarCode/>
      </View>
    )
  }

  __renderBarCodeScanned = () => () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const listePromofound = false;

    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);

    const handleBarCodeScanned = ({ type = "" , data = ""}) => {
      setScanned(true);
      var sCodePromo : string = data.toString() ;
      alert('Bar code with type ${type} and data ' + sCodePromo + ' has been scanned!');
      
      // première chose :  vérifier si le code est bien unique
      // s'il n'existe pas on crée une promotion et on redirige dans Détails
      // s'il existe alerte + bouton aller à la promotion
      
      // récupération depuis le stockage interne des promos déja scannées
      const _storeData = async () => {
        try {
          await AsyncStorage.setItem(
            'mabite',
            'I like to see it.'
          );
          let value = await AsyncStorage.getItem('TASKS').then(() => {
            alert('data saved');
          });
          
          let value2 = AsyncStorage.getItem('TASKS');
          if (value2 == null) {
            //value = '';
          }
          // conversion en JSON (plus de facil à manipulier)
          alert('Nombre de promotion : '+ value2);
          }
      finally{

      }
    };
      // store.update('listePromotion', {  
      //   codePromo: "UNICORN04",
      //   libelle: "C'est la fete des licornes !",
      //   sujet: "sur chaque article Licorne achetés.",
      //   description: "Quelle dinguerie cette promotion !",
      //   valeurPromo: 10,
      //   typePromo: 2,
      //   dateDebut: "2021-03-11 10:26:00.000",
      //   dateFin: "2021-05-01 10:26:00.000",
      //   imgPath: "https://test.com/img.png"});

      // for (let index = 0; index < ListePromo.length; index++) {
      //   const promo = ListePromo[index];
      //   if (promo.codePromo == sCodePromo ){ // cas ou il existe déja

      //   } 
      //   else { // cas ou il n'existe pas
      //   }
      // }

      // récupération des données de l'api
      const msprAPI: MsprAPI = new MsprAPI()
        msprAPI.initToken().then(() => {
            msprAPI.getAPromotion('UNICORN04').then((promotion: Promotion) => {
                // console.log('====================================');
                alert('promotion :'+ promotion);
                // console.log('====================================');
               
                if (promotion == undefined){
                  // cas ou on ne recupère rien
                  alert(`Bar code can't be scanned`);
                }
                else{
                  alert(`Bar code can't be scanned` + value);
                }
              
                
            })
        });

    };

    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={styles.renderBarCode}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderBarCode:{
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: 200,
    marginHorizontal: 20,
    borderWidth: 1,
  },
}); 