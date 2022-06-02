import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity, Button} from 'react-native';
import styles from './ProdutoFinanceiroStyle';
import MaskInput, { Masks } from 'react-native-mask-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
const { Parametros, ProcuraParam } = require('../../../../Components/Parametro')
import { Loading } from '../../../../Components/Loader'

export default function ProdutoFinanceiro({navigation, route}){

    const [dt_ult_cmp, setDt_ult_cmp ] = React.useState(FutureDay(0));
    const [pr_medio, setPr_medio] = React.useState('0.00');
    const [custo_tabela, setCusto_tabela] = React.useState('0.00');
    const [pr_venda1, setPr_venda1] = React.useState('0.00');
    const [pr_venda2, setPr_venda2] = React.useState('0.00');
    const [pr_venda3, setPr_venda3] = React.useState('0.00');
    const [margem, setMargem] = React.useState('0.00');
    const [load, setLoad] = React.useState(false)

    function FutureDay (x){
        let data = new Date();
        data.setDate(data.getDate() + Number(x));
          let dia = data.getDate().toString().padStart(2, '0')
          let mes = (data.getMonth()+1).toString().padStart(2, '0')
          let ano = data.getFullYear();
    
        return `${dia}/${mes}/${ano}`
    }

    const salvar = async () =>{ 
        setLoad(true)
        let dateUlt = dt_ult_cmp.split('/')

        let data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": `insert into cd_pro (descricao, c_pessoa, un, c_gru, qtde_estq, controla, ref_fabricante, ativo, tipo, ean, digito, dt_ult_cmp, pr_medio, custo_tabela, margem, pr_venda1, pr_venda2, pr_venda3) values ('${route.params.descricao}', ${route.params.c_pessoa == "" || route.params.c_pessoa ==  null || route.params.c_pessoa == undefined ? null : route.params.c_pessoa }, '${route.params.un}',${route.params.c_grupo == "" || route.params.c_grupo == null || route.params.c_grupo == undefined ? null : route.params.c_grupo }, ${route.params.qtde_estq},'${route.params.controla}', ${route.params.ref_fabricante == "" || route.params.ref_fabricante == null || route.params.ref_fabricante == undefined ? null : `'${route.params.ref_fabricante}'`}, '${route.params.ativo}', '${route.params.tipo}', ${route.params.ean == "" || route.params.ean == null || route.params.ean == undefined ? null : `'${route.params.ean}'`}, ${route.params.digito == "" || route.params.digito == null || route.params.digito == undefined ? null : `'${route.params.digito}'`}, ${dt_ult_cmp == null || dt_ult_cmp == undefined || dt_ult_cmp == "" ? null : `CONVERT(DATETIME, '${dateUlt[2]}-${dateUlt[1]}-${dateUlt[0]}')`}, ${pr_medio == "" || pr_medio == null | pr_medio == undefined ? null : pr_medio}, ${custo_tabela == "" || custo_tabela == null || custo_tabela == undefined ? null : custo_tabela}, ${margem == "" || margem == null || margem == undefined ? null : margem }, ${pr_venda1 == "" || pr_venda1 == undefined || pr_venda1 == null ? null : pr_venda1}, ${pr_venda2 == "" || pr_venda2 ==  null || pr_venda2 == undefined ? null : pr_venda2 }, ${pr_venda3 == "" || pr_venda3 == null || pr_venda3 == undefined ? null : pr_venda3})` 
        });
        let config = {
            method: 'post',
            url: await AsyncStorage.getItem('@apiTran'),
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        };
        axios(config)
        .then(function (response) {
            let respJson = (JSON.parse(JSON.stringify(response.data)));
            if (respJson != "Transaction committed"){
                alert(respJson)
            } else {
                alert('Produto Cadastrado')
                navigation.navigate('Home')
            }
            setLoad(false)
            
        })
        .catch(function (error) {
            console.log(error);
            alert(error);
        })
        
    }
    
    const mrgem = () => {
        if (ProcuraParam(621, 'parE') == 'S'){
            return(
                <View>
                    <Text>Margem</Text>
                    <TextInput 
                        style={styles.Input}
                        value={String(margem)}
                        keyboardType= 'decimal-pad'
                        placeholder="Margem"
                        onChangeText={(text) => {
                            var numsStr = text.replace(/[^0-9||.]/g,'');
                            setMargem(numsStr)                   
                        }}
                        EndEditing={() => {
                            setMargem(Number(margem).toFixed(2))
                        }}
                    />                    
                </View>            
            )
        }
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

            <ScrollView>

                <Text>Data da Ultima Compra</Text>
                <MaskInput
                    value={dt_ult_cmp}
                    placeholder='Data da Ultima Compra'
                    keyboardType= 'numeric'
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setDt_ult_cmp(masked)
                    }}
                    mask={Masks.DATE_DDMMYYYY}
                />
                <Text>Preço Médio </Text>
                <TextInput 
                    style={styles.Input}
                    value={String(pr_medio)}
                    placeholder="Preço Medio"
                    keyboardType= 'decimal-pad'
                    onChangeText={(text) => {
                        var numsStr = text.replace(/[^0-9||.]/g,'');
                        setPr_medio(numsStr)
                    }}
                    onEndEditing={() => {
                        setPr_medio(Number(pr_medio).toFixed(2))
                    }}
                />  
                <Text>Custo Tabela </Text>
                <TextInput 
                    style={styles.Input}
                    value={String(custo_tabela)}
                    keyboardType= 'decimal-pad'
                    placeholder="Custo Tabela"
                    onChangeText={(text) => {
                        var numsStr = text.replace(/[^0-9||.]/g,'');
                        setCusto_tabela(numsStr)                   
                    }}
                    onEndEditing={() => {
                        setCusto_tabela(Number(custo_tabela).toFixed(2))
                    }}
                />
                <Text>Preço de Venda 1</Text>
                <TextInput
                    style={styles.Input}
                    value={String(pr_venda1)}
                    keyboardType= 'decimal-pad'
                    placeholder="Preço de Venda 1"
                    onChangeText={(text) =>{
                        var numsStr = text.replace(/[^0-9||.]/g,'');
                        setPr_venda1(numsStr)
                    }}
                    onEndEditing={() => {
                        setPr_venda1(Number(pr_venda1).toFixed(2))
                    }}
                />
                <Text>Preço de Venda 2</Text>
                <TextInput
                    style={styles.Input}
                    value={String(pr_venda2)}
                    keyboardType= 'decimal-pad'
                    placeholder="Preço de Venda 2"
                    onChangeText={(text) =>{
                        var numsStr = text.replace(/[^0-9||.]/g,'');
                        setPr_venda2(numsStr)   
                    }}
                    onEndEditing={() => {
                        setPr_venda2(Number(pr_venda2).toFixed(2))
                    }}
                />
                <Text>Preço de Venda 3</Text>
                <TextInput
                    style={styles.Input}
                    value={String(pr_venda3)}
                    keyboardType= 'decimal-pad'
                    placeholder="Preço de Venda 3"
                    onChangeText={(text) =>{
                        var numsStr = text.replace(/[^0-9||.]/g,'');
                        setPr_venda3(numsStr)
                    }}
                    onEndEditing={() => {
                        setPr_venda3(Number(pr_venda3).toFixed(2))
                    }}
                />
                
                {mrgem()}
                
                <View style={styles.ViewNext}>
                    <TouchableOpacity
                    style={styles.ButtonNext}
                    onPress={ () =>{salvar()}}
                    >
                        <Text style={styles.TextNext}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
                


            </ScrollView>
            
        </View>
    )
        
}