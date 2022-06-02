import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import styles from './ProcurarDescricaoStyle';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../../../../Components/Loader'

export default function ProcurarProdutoDescricao( { navigation } ) {

    const [descricao, setDescricao] = React.useState('') 
    const [load, setLoad] = React.useState(false)    
   
    const pesquisarDescricao = async () => {
        setLoad(true)

            let v = descricao.split(';')
            let sqlWhere = '';
            
            for (let i in v){
                sqlWhere += `descricao like '%${v[i]}%'`
                if(v.length-1 != i){
                    sqlWhere += ' AND ' 
                }
            }
                    
            console.log(sqlWhere)
        let sql =  `SELECT c_pro, ref_fabricante, descricao, c_pessoa, un, pr_medio, qtde_estq,FORMAT(dt_ult_cmp, 'dd/MM/yyyy') as dt_ult_cmp, pr_venda1, pr_venda2, pr_venda3, ean, margem, ativo, tipo, digito, custo_tabela, qtde_estq_disp, c_gru, controla,usa_grade, desconto, etiqueta, calcula_qt, nr_casas_valor, nr_casas_qtde, perc_icms, c_tbt, eh_processado, qtde_processado, pro_acabado, c_etiq, tabela FROM cd_pro WHERE ${sqlWhere}`

        let data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": sql
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
                placeholder='Digite a Descrição'
                value={descricao}
                style={styles.Input}
                keyboardType= 'default'
                onChangeText={(text) => {
                    setDescricao(text)
                }}
            />

            <View style={styles.ProcurarView}>
                <TouchableOpacity
                    style={styles.Button}
                    onPress={() => {pesquisarDescricao()}}
                >
                    <Text style={styles.TextButton}>Procurar</Text>
                </TouchableOpacity>
            </View>
        
        </View>
    )
} 

