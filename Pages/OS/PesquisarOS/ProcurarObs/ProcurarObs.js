import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import MaskInput from 'react-native-mask-input';
import axios from 'axios'
import s from './ProcurarObsStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../../../../Components/Loader'

export default function ({ navigation }) {

    const [Observacao, setObservacao] = React.useState()
    const [load, setLoad] = React.useState(false)

    const querySQL = async () => {
        setLoad(true)
        var data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": `
            select ROW_NUMBER() OVER (ORDER BY b.nome ASC) AS row, 
            FORMAT(a.dt_lancamento, 'dd/MM/yyyy') as dt_lancamento, 
            b.nome, 
            a.situacao, 
            a.c_mve, 
            a.c_fun, 
            FORMAT(a.vl_efetivo, 'C', 'pt-br') vl_efetivo, 
            a.finalidade
          from 
            cd_mve a, 
            cd_pessoa b 
          where 
            a.c_pessoa = b.c_pessoa
            and A.c_mve = 95
            /* and a.obs like '%${Observacao}%' 
            and a.finalidade = 'OS'
			and situacao = 'EM ANDAMENTO' */`
        });

        var config = {
            method: 'post',
            url: await AsyncStorage.getItem('@api'),
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                setLoad(false)
                let respJson = (JSON.parse(JSON.stringify(response.data)).recordset);
                //console.log(respJson)
                respJson.length == 0 ?
                    alert('Nenhum registro encontrado') : navigation.navigate('OSLista', { respJson: respJson })
            })
            .catch(function (error) {
                console.log(error);
                alert("[ERRO]")
                setLoad(false)
            });

    }

    return (
        <View style={s.container}>
            <StatusBar style="dark" />

            <Loading
                show={load}
                onDismiss={() => {
                    setLoad(false)
                }}
            />

            <MaskInput
                value={Observacao}
                returnKeyType="next"
                placeholder='Digite a Observação'
                style={s.Input}
                onChangeText={(masked, unmasked, obfuscated) => {
                    setObservacao(unmasked);
                }}
            />

            <View style={s.ProcurarView}>
                <TouchableOpacity
                    style={s.Button}
                    onPress={() => { querySQL() }}
                >
                    <Text style={s.TextButton}>Procurar</Text>
                </TouchableOpacity>
            </View>

        </View>
    )

}