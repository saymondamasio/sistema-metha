import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity, TextInput, FlatList, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './OSEncontradaListaStyle';
//import ProcurarOSHr from './ProcurarOSHr';

export default function ({ navigation, route }) {

    console.log('route.params ' + route.params)

    const os = (route.params);
    console.log('-----------------------------');
    const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>

    return (
        <ScrollView style={styles.container} scrollEnabled={true}>
            <StatusBar style="dark" />

            {os && os.map(e => {
                return (
                    <Text style={styles.ButtonLista} key={e.c_mve}
                        onPress={() => { navigation.navigate('OSEncontrada', e.c_mve) }}>
                        <B>{'Nº da OS: '}</B> {e.c_mve}{"\n"}
                        <B>{'Data Abertura: '}</B> {e.dt_lancamento}{"\n"}
                        <B>{'Cliente: '}</B> {e.nome.substr(0, 25)}{"\n"}
                        <B>{'Valor de Serviço: '}</B> {e.vl_efetivo}{"\n"}
                        <B>{'Situação: '}</B> {e.situacao}
                    </Text>
                )
            })}

        </ScrollView>
    )

}