import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity, TextInput} from 'react-native';
import { Picker } from '@react-native-community/picker';
import MaskInput from 'react-native-mask-input';
import axios from 'axios'
import styles from './ProcurarSituacaoStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../../../../Components/Loader'

export default function ProcurarVendaSituacao( { navigation } ) {

    const [situacao, setSituacao] = React.useState()
    const [load, setLoad] = React.useState(false)
    const [procSituacao, setProcSituacao] = React.useState()

    const ProcurarCodigo = async () => {
        setLoad(true)
        var data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": `select FORMAT(a.dt_lancamento, 'dd/MM/yyyy') as dt_lancamento, b.nome, a.situacao, a.c_mve, a.c_fun, a.vl_efetivo, a.finalidade from cd_mve a, cd_pessoa b where a.c_pessoa = b.c_pessoa and a.situacao like '%${situacao}%' and a.classe = 'V'`
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
                alert('Venda Não Encontrada')
            } else {
                navigation.navigate('VendaLista', respJson);
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
             
             <Picker                   
                    selectedValue={situacao}
                    style={styles.Input}
                    onValueChange={(itemValue, itemIndex) => {
                        setSituacao(itemValue)
                    }}
                    
                >
                    <Picker.Item label="Escolha a situação:"/>
                    <Picker.Item label="- EM ANDAMENTO " value="EM" />
                    <Picker.Item label="- CANCELADO" value="CANCELADO" />
                    <Picker.Item label="- REGISTRADO" value="REGISTRADO" />
  
                </Picker>

{/*             
            <MaskInput
                value={situacao}
                placeholder='Digite a Situação'
                style={styles.Input}
                onChangeText={(masked, unmasked, obfuscated) => {
                    setSituacao(unmasked);
                }}
            /> */}

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
