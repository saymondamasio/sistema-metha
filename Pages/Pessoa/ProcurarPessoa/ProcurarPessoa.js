import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';

import styles from './ProcurarPessoaStyle';

export default function ProcurarPessoa( { navigation } ) {

    return(
        <View style={styles.container}>
            <StatusBar style="dark" />

            <ScrollView>
                <Text style={styles.Title}> Procurar por: </Text>

                <View>
                    <TouchableOpacity 
                        onPress={() => {navigation.navigate('ProcurarPessoaCodigo')}}
                        style={styles.Opts}
                    >
                        <Text style={styles.Text}>Código</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {navigation.navigate('ProcurarPessoaNome')}}
                        style={styles.Opts}
                    >
                        <Text style={styles.Text}>Nome/Razão</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {navigation.navigate('ProcurarPessoaFantasia')}}
                        style={styles.Opts}
                    >
                        <Text style={styles.Text}>Fantasia</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {navigation.navigate('ProcurarPessoaCNPJ')}}
                        style={styles.Opts}
                    >
                        <Text style={styles.Text}>CNPJ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {navigation.navigate('ProcurarPessoaCPF')}}
                        style={styles.Opts}
                    >
                        <Text style={styles.Text}>CPF</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
            
        </View>
    )
 
}
