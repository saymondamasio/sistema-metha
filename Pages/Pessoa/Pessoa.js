import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './PessoaStyle';

export default function Pessoa( { navigation } ) {

    return(
      <View style={styles.container}>
          <StatusBar style="dark" />

            <TouchableOpacity 
                onPress={() => {navigation.navigate('ProcurarPessoa')}}
                style={styles.Opts}
            >
                <Text style={styles.Text}>Pesquisar Pessoa</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => {navigation.navigate('PessoaDados')}}
                style={styles.Opts}
            >
                <Text style={styles.Text}>Adicionar Pessoa</Text>
            </TouchableOpacity>
      
      </View>
    )
 
}
