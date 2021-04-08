import React, { useState, useEffect, Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ReactDom, { render } from "react-dom";

export class QRCodePromo extends Component {
  
  /*scanned: any;
  handleBarCodeScanned: any;
  hasPermission: any;
  navigation: any;*/
  
  constructor(props: any) {
      
    super(props)    
  }
  
  render() {
    const handleBarCodeScanned = ({ type = "" , data = ""}) => {
      setScanned(true);
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);

      return (
        <View style={styles.container}>
        {hasPermission === null &&  <Text>Requesting for camera permission</Text> }
        {hasPermission === false && <Text>No access to camera</Text>}
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: 200,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ff0066",
  },
}); 

