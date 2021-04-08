import React from 'react';
import { FlatList, StyleSheet, Button, Text, View} from 'react-native';


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



// @ts-ignore
const listePromo = ({ navigation }) => {
    
    return (
          
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Aller sur la page des detail ?"
                onPress={() => navigation.navigate('detailPromo')}
            />
            <Button
                title="Aller sur la page du QRcode ?"
                onPress={() => navigation.navigate('QRCode')}
            />
            <Text>Ceci est une  liste ! </Text>
            <FlatList
            data={[
              {key: 'Devin'},
              {key: 'Dan'},
              {key: 'Dominic'},
              {key: 'Jackson'},
              {key: 'James'},
              {key: 'Joel'},
              {key: 'John'},
              {key: 'Jillian'},
              {key: 'Jimmy'},
              {key: 'Julie'},
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            
          />

          
        
            
        </View>
        
    );
         
}

export default listePromo;
