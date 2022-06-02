import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity, Linking} from 'react-native';

import styles from '../Produtos/ProdutosStyle';

export default function Revista( { navigation} ) {
  return (
    <View style={styles.container}>
        <StatusBar style="dark" />
      
        <TouchableOpacity 
            onPress={() =>{Linking.openURL('http://google.com')}}
            style={styles.Opts}
        >
            <Text style={styles.Text}>Natura</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={()=>{Linking.openURL('http://google.com')}}
            style={styles.Opts}
        >
          <Text style={styles.Text}> Avon</Text>

        </TouchableOpacity>

        


    </View>
  );
}
