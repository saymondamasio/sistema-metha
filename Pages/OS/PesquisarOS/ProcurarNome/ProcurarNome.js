import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import MaskInput from 'react-native-mask-input';
import axios from 'axios'
import styles from './ProcurarNomeStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../../../../Components/Loader'

export default function ProcurarOSNome( { navigation } ) {

    const [NomeRazao, setNomeRazao] = React.useState()
    const [load, setLoad] = React.useState(false)

    const ProcurarCodigo = async () => {
        setLoad(true)
        var data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": `select FORMAT(a.dt_lancamento, 'dd/MM/yyyy') as dt_lancamento, b.nome, a.situacao, a.c_mve, a.c_fun, a.vl_efetivo, a.finalidade from cd_mve a, cd_pessoa b where a.c_pessoa = b.c_pessoa and b.nome like '%${NomeRazao}%' and a.classe = 'V'`
        });

        var config = {
            method: 'post',
            url: await AsyncStorage.getItem('@api'),
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
        .then(function (response) {
            setLoad(false)
            let respJson = (JSON.parse(JSON.stringify(response.data)).recordset);
            if(respJson.length == 0){
                alert('OS Não Encontrada')
            } else {
                navigation.navigate('OSLista', respJson);
            }
        })
        .catch(function (error) {
            console.log(error);
            alert("[ERRO]")
            setLoad(false)
        });

    }

    return(
        <View style={styles.container}>
            <StatusBar style="dark" />

            <Loading 
                show={load}
                onDismiss={()=>{
                    setLoad(false)
                }}
            />
            <MaskInput
                value={NomeRazao}
                placeholder='Digite o Nome/Razão'
                style={styles.Input}
                onChangeText={(masked, unmasked, obfuscated) => {
                    setNomeRazao(unmasked);
                }}
            />

            <View style={styles.ProcurarView}>
                <TouchableOpacity
                    style={styles.Button}
                    onPress={() => {ProcurarCodigo()}}
                >
                    <Text style={styles.TextButton}>Procurar</Text>
                </TouchableOpacity>
            </View>
        
        </View>
    )
 
}
