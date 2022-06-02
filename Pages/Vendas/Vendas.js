    import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity} from 'react-native';

import styles from './VendasStyle';

export default function Vendas( { navigation } ) {
  return (
    <View style={styles.container}>
        <StatusBar style="dark" />
      
        <TouchableOpacity 
            onPress={() => {navigation.navigate('ProcurarVenda')}}
            style={styles.Opts}
        >
            <Text style={styles.Text}>Pesquisar Venda</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            onPress={() => {navigation.navigate('AdicionarVendaPessoa')}}
            style={styles.Opts}
        >
            <Text style={styles.Text}>Adicionar Venda</Text>
        </TouchableOpacity>
    
    </View>
  );
}
