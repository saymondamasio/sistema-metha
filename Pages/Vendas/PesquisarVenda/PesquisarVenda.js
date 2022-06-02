import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';

import styles from './PesquisarVendaStyle';

export default function ProcurarVenda( { navigation } ) {
  return (
    <View style={styles.container}>
        <StatusBar style="dark" />

        <ScrollView>
            <Text
                style={styles.TextTitulo}
            >
                Procurar por:
            </Text>

            <TouchableOpacity 
                onPress={() => {navigation.navigate('ProcurarVendaCodigo')}}
                style={styles.Opts}
            >
                <Text style={styles.Text}>Código</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => {navigation.navigate('ProcurarVendaNome')}}
                style={styles.Opts}
            >
                <Text style={styles.Text}>Nome/Razão</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                onPress={() => {navigation.navigate('ProcurarVendaFantasia')}}
                style={styles.Opts}
            >
                <Text style={styles.Text}>Fantasia</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => {navigation.navigate('ProcurarVendaCPF')}}
                style={styles.Opts}
            >
                <Text style={styles.Text}>CPF</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => {navigation.navigate('ProcurarVendaCNPJ')}}
                style={styles.Opts}
            >
                <Text style={styles.Text}>CNPJ</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => {navigation.navigate('ProcurarVendaFinalidade')}}
                style={styles.Opts}
            >
                <Text style={styles.Text}>Finalidade</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => {navigation.navigate('ProcurarVendaSituacao')}}
                style={styles.Opts}
            >
                <Text style={styles.Text}>Situação</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => {navigation.navigate('ProcurarVendadtLanca')}}
                style={styles.Opts}
            >
                <Text style={styles.Text}>Data Lançamento</Text>
            </TouchableOpacity>
        </ScrollView>
    
    </View>
  );
}
