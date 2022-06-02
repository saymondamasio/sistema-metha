import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';

import styles from './PesquisarOSStyle';

export default function ({ navigation }) {
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
                    onPress={() => { navigation.navigate('ProcurarOSCodigo') }}
                    style={styles.Opts}
                >
                    <Text style={styles.Text}>Código</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate('ProcurarOSNome') }}
                    style={styles.Opts}
                >
                    <Text style={styles.Text}>Nome/Razão</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate('ProcurarOSFantasia') }}
                    style={styles.Opts}
                >
                    <Text style={styles.Text}>Fantasia</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate('ProcurarOSCPF') }}
                    style={styles.Opts}
                >
                    <Text style={styles.Text}>CPF</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate('ProcurarOSCNPJ') }}
                    style={styles.Opts}
                >
                    <Text style={styles.Text}>CNPJ</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate('ProcurarOSFinalidade') }}
                    style={styles.Opts}
                >
                    <Text style={styles.Text}>Finalidade</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate('ProcurarOSSituacao') }}
                    style={styles.Opts}
                >
                    <Text style={styles.Text}>Situação</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate('ProcurarOSdtLanca') }}
                    style={styles.Opts}
                >
                    <Text style={styles.Text}>Data Lançamento</Text>
                </TouchableOpacity>
            </ScrollView>

        </View>
    );
}
