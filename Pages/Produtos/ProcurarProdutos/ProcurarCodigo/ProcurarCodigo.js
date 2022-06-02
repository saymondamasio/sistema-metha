import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import styles from './ProcurarCodigoStyle';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../../../../Components/Loader'

export default function ProcurarProdutoCodigo( { navigation } ) {

    const [codigo, setCodigo] = React.useState('')   
    const [load, setLoad] = React.useState(false) 

    const pesquisarCodigo = async () => {
        setLoad(true)
        let data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": `SELECT c_pro, ref_fabricante, descricao,c_pessoa, un, pr_medio, qtde_estq,FORMAT(dt_ult_cmp, 'dd/MM/yyyy') as dt_ult_cmp, pr_venda1, pr_venda2, pr_venda3, ean, margem, ativo, tipo, digito, custo_tabela, qtde_estq_disp, c_gru, controla,usa_grade, desconto, etiqueta, calcula_qt, nr_casas_valor, nr_casas_qtde, perc_icms, c_tbt, eh_processado, qtde_processado, pro_acabado, c_etiq, tabela FROM cd_pro WHERE (c_pro = ${codigo})`
        });
          
        let config = {
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
            let respJson = JSON.parse(JSON.stringify(response.data)).recordset
            navigation.navigate('ProdutoEncontradoLista', respJson)
        })
        .catch(function (error) {
            console.log(error);
            setLoad(false)
        })
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
            
            <TextInput
                placeholder='Digite o Código'
                value={codigo}
                style={styles.Input}
                keyboardType= 'numeric'
                onChangeText={(text) => {
                    setCodigo(text)
                }}
            />

            <View style={styles.ProcurarView}>
                <TouchableOpacity
                    style={styles.Button}
                    onPress={() => {pesquisarCodigo()}}
                >
                    <Text style={styles.TextButton}>Procurar</Text>
                </TouchableOpacity>
            </View>
        
        </View>
    )
 
}
