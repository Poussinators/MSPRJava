import React, { useState, useEffect, Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MsprAPI } from '../services/MsprAPI';
import { Promotion } from '../interfaces/promotion';
import { InternalStorage } from '../services/InternalStorage';


export class QRCodePromo extends React.Component {
  [x: string]: any;

  navigation: any
    listeDePromotion: Promotion[] = []

    constructor(props: any) {
      //initialisation
      super(props);
      this.state = {hasPermission : null, scanned : false};
      this.navigation = props.navigation;
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

  // initialisation des variables
  __renderBarCodeScanned = () => () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    // Demande de permission de la caméra
    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);

    // retour du scan
    const handleBarCodeScanned = ({ type = "" , data = ""}) => {
      setScanned(true);
      //alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    // Envoie de la request
      const msprAPI: MsprAPI = new MsprAPI()
        msprAPI.initToken().then(() => {
            msprAPI.getAPromotion(data).then((promotion: Promotion) => {

              console.log(promotion);

              // enregistrement de la promotion
              const internalStorage: InternalStorage = new InternalStorage();

              internalStorage.addPromotionToList(promotion).catch((err) => {
                  if (err == -1) {
                    alert("Promo already exists")
                      throw err;
                  }
                  else{
                    alert(`The promotion ${promotion.codePromo} has been saved `);
                    this.navigation.navigate('detailPromo', { PromoVisee: promotion });
                    // redirection maintenant
                  }
              })
            })
        })

    };

    // retour de la permission pour la camera
    if (hasPermission === null) {
      return <Text>Camera's permission accepted</Text>;
    }
    if (hasPermission === false) {
      return <Text>Camera's permission denied</Text>;
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
