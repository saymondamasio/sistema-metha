import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import MaskInput from 'react-native-mask-input';
import axios from 'axios'
import styles from './ProcurarCodigoStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../../../../Components/Loader'

export default function ProcurarPessoaCodigo( { navigation } ) {

    const [c_pessoa, setC_pessoa] = React.useState()
    const [load, setLoad] = React.useState(false)

    const ProcurarCodigo = async () => {
        setLoad(true)
        var data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": `select c_pessoa, nome, fantasia, fisica_jur, cpf, cgc, rg, FORMAT(dt_nasc, 'dd/MM/yyyy') as dt_nasc, ddd_fone, fone, ddd_celular, celular, ddd_fax, fax, insc_est, indIEDest, insc_mun, cep, bairro, endereco, numero, cidade, uf, compl, e_mail from cd_pessoa where c_pessoa = ${c_pessoa}`
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
                alert('Pessoa Não Encontrada')
            } else {
                navigation.navigate('PessoaLista', respJson);
            }
        })
        .catch(function (error) {
            console.log(error);
            setLoad(false)
            alert('[ERRO]')
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
                value={c_pessoa}
                placeholder='Digite o Código'
                style={styles.Input}
                keyboardType= 'numeric'
                onChangeText={(masked, unmasked, obfuscated) => {
                    setC_pessoa(unmasked);
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
