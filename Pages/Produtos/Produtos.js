import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity} from 'react-native';

import styles from './ProdutosStyle';

export default function Produtos( { navigation } ) {
  return (
    <View style={styles.container}>
        <StatusBar style="dark" />
      
        <TouchableOpacity 
            onPress={() =>{navigation.navigate('ProcurarProdutos')}}
            style={styles.Opts}
        >
            <Text style={styles.Text}>Procurar Produtos</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={()=>{navigation.navigate('ProdutoDados')}}
            style={styles.Opts}
        >
          <Text style={styles.Text}> Adicionar Produto</Text>

        </TouchableOpacity>

        


    </View>
  );
}
