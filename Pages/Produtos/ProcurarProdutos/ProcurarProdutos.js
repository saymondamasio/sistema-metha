import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity} from 'react-native';

import styles from './ProcurarProdutosStyle';

export default function ProcurarProdutos( { navigation } ) {
  return (
    <View style={styles.container}>
        <StatusBar style="dark" />

     
        <TouchableOpacity
            style={styles.Opts}
            onPress={() => {navigation.navigate('ProcurarProdutoCodigo')}}
        >
            <Text style={styles.Text}>Código</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            onPress={() => {navigation.navigate('CodigodeBarras')}}
            style={styles.Opts}
        >
            <Text style={styles.Text}>Código de Barras</Text>
        </TouchableOpacity>


        <TouchableOpacity
            style={styles.Opts}
            onPress={() => {navigation.navigate('ProcurarProdutoDescricao')}}
        >
            <Text style={styles.Text}>Descrição</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.Opts}
        onPress={()=> {navigation.navigate('ProcurarFornecedor')}}
        >

            <Text style={styles.Text}>Fornecedor</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.Opts}
        onPress={()=> {navigation.navigate('ProcurarProdutoReferencia')}}
        >

            <Text style={styles.Text}>Referência</Text> 
        </TouchableOpacity>

    </View>
  );
}
