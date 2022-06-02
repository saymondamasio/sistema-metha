import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput, Alert, FlatList } from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input';
import { Picker } from '@react-native-community/picker';
import styles from './ProdutoEncontradoStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Ionicons } from '@expo/vector-icons'
import { Loading } from '../../../../Components/Loader'
const { Parametros, ProcuraParam } = require('../../../../Components/Parametro')

export default function ProcurarProduto( { navigation, route } ) {

    const [Mudou, setMudou] = React.useState('');
    const [descricao, setDescricao ] = React.useState('');
    const [ref_fabricante, setRef_fabricante] =React.useState('');
    const [un, setUn ]= React.useState('UN'); 
    const [qtde_estq, setQtde_estq] = React.useState('1');
    const [dt_ult_cmp, setDt_ult_cmp ] =React.useState('');
    const [pr_venda1, setPr_venda1] = React.useState('');
    const [pr_venda2, setPr_venda2] = React.useState('');
    const [pr_venda3, setPr_venda3] = React.useState('');
    const [pr_medio, setPr_medio] = React.useState('');
    const [ean, setEan] = React.useState('');
    const [digito, setDigito]= React.useState('');
    const [margem, setMargem]= React.useState('');
    const [ativo, setAtivo] = React.useState('S');
    const [tipo, setTipo] = React.useState('P');
    const [custo_tabela, setCusto_tabela] = React.useState('');
    const [c_grupo, setC_grupo] = React.useState('');
    const [GrupoList, setGrupoList] = React.useState('')
    const [grupo, setGrupo] = React.useState('');
    const [controla, setControla] = React.useState('S');
    const [usa_grade, setUsa_grade ]= React.useState('S');
    const [etiqueta, setEtiqueta] =  React.useState('');
    const [calcula_qt, setCalcula_qt] = React.useState('Q');
    const [nr_casas_valor, setNr_casas_valor] =  React.useState('');
    const [nr_casas_qtde, setNr_casas_qtde] = React.useState('0'); 
    const [desconto, setDesconto] = React.useState('0');
    const [perc_icms, setPerc_icms] = React.useState('0');
    const [c_tbt, setC_tbt] = React.useState('1');
    const [eh_processado, setEh_processado] = React.useState('N');
    const [qtde_processado, setQtde_processado] = React.useState('0');
    const [pro_acabado, setPro_acabado] = React.useState('S');
    const [c_etiq, setC_etiq] = React.useState('');
    const [tabela, setTabela] = React.useState('s');
    const [pesquisar, setPesquisar] = React.useState('');
    const [ShowtrocarProduto, setShowtrocarProduto] = React.useState(false);
    const [fornecedor, setFornecedor] =  React.useState('');
    const [ShowtrocarFornecedor, setShowtrocarFornecedor] =  React.useState(false);
    const [fornecedorList,   setFornecedorList] =  React.useState('');
    const [pesquisarF, setPesquisarF] = React.useState('');
    const [c_pessoa, setC_pessoa] =  React.useState('');
    const [load, setLoad] = React.useState(false) 
 
    useEffect(() => {
        CoplProduto()

    }, []);


    const salvarGrupo = async (c_gru) => {
        let data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": `SELECT c_grupo, descricao from cd_grupo where c_grupo = ${c_gru}` 
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
            let respJson = JSON.parse(JSON.stringify(response.data)).recordset

            if(respJson.length == 0 || respJson.length == null){
                respJson.length = 0
            }else {
                setGrupo(respJson[0].descricao)
            }
        })
        .catch(function (error) { 
            console.log(error);
            alert(error);
        })
    }
    
    const salvarFornecedor = async (c_fun) =>{
        let data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": `select c_pessoa, nome, fantasia from cd_pessoa where c_pessoa = ${c_fun}` 
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
            let respJson = JSON.parse(JSON.stringify(response.data)).recordset
            
            if (respJson.length == 0 || respJson.length == null){
                respJson.length = 0
            }else{
                setFornecedor(respJson[0].nome)
            }
        })
        .catch(function (error) { 
            console.log(error);
            alert(error);
        })
    }

    const Salvar = async () => {

        let dateUlt = dt_ult_cmp == "" || dt_ult_cmp == undefined || dt_ult_cmp == null ? null : dt_ult_cmp.split('/');

        setLoad(true)
       
        let data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": `UPDATE cd_pro SET descricao = '${descricao}',c_pessoa = ${c_pessoa}, ref_fabricante = ${ref_fabricante == "" || ref_fabricante == null || ref_fabricante == undefined ? null : `'${ref_fabricante}'` }, un = '${un}', pr_medio =  ${pr_medio == "" || pr_medio == null | pr_medio == undefined ? null : pr_medio}, qtde_estq = ${qtde_estq}, dt_ult_cmp = ${dt_ult_cmp == null || dt_ult_cmp == undefined || dt_ult_cmp == "" ? null : `CONVERT(DATETIME, '${dateUlt[2]}-${dateUlt[1]}-${dateUlt[0]}')`},  pr_venda1 =  ${pr_venda1 == "" || pr_venda1 == null || pr_venda1 == undefined ? null : pr_venda1 }, pr_venda2 = ${pr_venda2 == "" || pr_venda2 ==  null || pr_venda2 == undefined ? null : pr_venda2 }, pr_venda3 =  ${pr_venda3 == "" || pr_venda3 == null || pr_venda3 == undefined ? null : pr_venda3}, ean = ${ean == "" || ean == null || ean == undefined ? null : `'${ean}'`}, digito = ${digito == "" || digito == null || digito == undefined ? null : `'${digito}'`}, margem =  ${margem == "" || margem == null || margem == undefined ? null : margem }, ativo = '${ativo}', tipo = '${tipo}', custo_tabela = ${custo_tabela == "" || custo_tabela == null || custo_tabela == undefined ? null : custo_tabela}, c_gru = ${c_grupo == "" || c_grupo == null || c_grupo == undefined ? null : c_grupo}, controla ='${controla}', usa_grade= ${usa_grade == "" || usa_grade == null == usa_grade == undefined ? null : `'${usa_grade}'`} WHERE c_pro = ${route.params.c_pro}`     
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
                setLoad(false)
                let respJson = (JSON.parse(JSON.stringify(response.data)));
                if (respJson != "Transaction committed"){
                    alert(respJson)
                } else {
                    alert('As alterações foram salvas!')
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
  
    const renderFornecedor = ({item}) => {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: '#2c3b76',
                    margin: 2,
                    padding: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
                key={item.c_pessoa}
                onPress={() =>{
                   setShowtrocarFornecedor(false)
                   setFornecedor(item.nome)
                   setC_pessoa(item.c_pessoa)
                   setMudou(true)
                }}
            >
                <Text style={{color: '#fff'}} >{item.nome}</Text>
            </TouchableOpacity>
        )
      }  
    
    const showFornecedorCustomView = () => {
        return(
            <View style={{height: '100%', width: '100%'}}>
                <View 
                    style={{height: 60, marginBottom: 20}}
                >
                    <TextInput
                        style={styles.grupoPesquisar}
                        value={pesquisarF}
                        placeholder="Pesquisar"
                        onChangeText={(text) => {
                            setPesquisarF(text)
                        }}
                    />
                    <View
                        style={{
                            alignItems: 'flex-end',
                        }}
                    >
                        <TouchableOpacity
                            style={styles.ButtonProduto}
                            onPress={()=>{
                                pesquisaFornecedor()
                            }}
                        >
                            <Ionicons name="ios-search" size={25} color="white" />    
                        </TouchableOpacity>
                    </View>
                        
                </View>
                <FlatList
                    data={fornecedorList}
                    style={styles.listaPop}
                    renderItem={renderFornecedor}
                    keyExtractor={mKeyExtractor}
                />
    
            </View>
        )
    }

    const mKeyExtractor = (item) => {
        return String(item.c_pessoa)
    }

    //Para achar o fornecedor
    const pesquisaFornecedor = async () =>{
        setLoad(true)
        let data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": `select c_pessoa, nome, fantasia, tp_pessoa from cd_pessoa where (tp_pessoa = 'FO' OR tp_pessoa = 'CF') AND (ativo = 'S') AND nome like '%${pesquisarF}%' AND fantasia like '%${pesquisarF}%'` 
        });
        let config = {
            method: 'post',
            url: await AsyncStorage.getItem('@api'),
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        };
        
        return axios(config)
        .then(function (response) {
            let respJson = JSON.parse(JSON.stringify(response.data)).recordset
            setFornecedorList(respJson)
            setLoad(false)
            // console.log(respJson)
        })
        .catch(function (error) { 
            console.log(error);
            alert(error);

        })
    }
    
      //Para achar o grupo 
    const pesquisaProduto = async () =>{
        setLoad(true)
        let data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": `SELECT c_grupo, descricao from cd_grupo where descricao like '%${pesquisar}%'` 
            
        });
        let config = {
            method: 'post',
            url: await AsyncStorage.getItem('@api'),
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        };
        return axios(config)
        .then(function (response) {
            let respJson = JSON.parse(JSON.stringify(response.data)).recordset
            setGrupoList(respJson)
            setLoad(false)
        })
        .catch(function (error) { 
            console.log(error);
            alert(error);
        })
    }
    //rendeniza o produto
    const renderProduto = ({item}) => {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: '#2c3b76',
                    margin: 2,
                    padding: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
                    key={item.c_grupo}
                    onPress={() =>{
                        setShowtrocarProduto(false)
                        setGrupo(item.descricao)
                        setC_grupo(item.c_grupo)
                        setMudou(true)
                        
                    }}
            >
                <Text style={{color: '#fff'}} >{item.descricao}</Text>
            </TouchableOpacity>
        )
    }
    //tela que pesquisa o grupo
    const showProdutoCustomView = () => {
        return(
            <View style={{height: '100%', width: '100%'}}>
                <View 
                    style={{height: 60, marginBottom: 20}}
                >
                    <TextInput
                        style={styles.grupoPesquisar}
                        value={pesquisar}
                        placeholder="Pesquisar"
                        onChangeText={(text) => {
                            setPesquisar(text)
                        }}
                    />
                    <View
                        style={{
                            alignItems: 'flex-end',
                        }}
                    >
                        <TouchableOpacity
                            style={styles.ButtonProduto}
                            onPress={()=>{
                                pesquisaProduto()
                            }}
                        >
                            <Ionicons name="ios-search" size={25} color="white" />    
                        </TouchableOpacity>
                    </View>     
                </View>
                <FlatList
                    data={GrupoList}
                    style={styles.listaPop}
                    renderItem={renderProduto}
                    keyExtractor={myKeyExtractor}
                />
    
            </View>
        )
    }
    //'chave' que busca o item
    const myKeyExtractor = (item) => {
        return String(item.c_grupo)
    }

    const CoplProduto = async () => {

        let data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": `SELECT c_pro, ref_fabricante, descricao,c_pessoa, un, pr_medio, qtde_estq,FORMAT(dt_ult_cmp, 'dd/MM/yyyy') as dt_ult_cmp, pr_venda1, pr_venda2, pr_venda3, ean, margem, ativo, tipo, digito, custo_tabela, qtde_estq_disp, c_gru, controla,usa_grade, desconto, etiqueta, calcula_qt, nr_casas_valor, nr_casas_qtde, perc_icms, c_tbt, eh_processado, qtde_processado, pro_acabado, c_etiq, tabela FROM cd_pro WHERE (c_pro = ${route.params.c_pro})`
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
            let respJson = JSON.parse(JSON.stringify(response.data)).recordset

            setDescricao(respJson[0].descricao)   
            respJson[0].c_pessoa == "null" || respJson[0].c_pessoa == null || respJson[0].c_pessoa == undefined ? setC_pessoa ('') && setFornecedor('') : setC_pessoa(respJson[0].c_pessoa) && setFornecedor('')
            respJson[0].ref_fabricante == null || respJson[0].ref_fabricante == 'null' ?  setRef_fabricante('') : setRef_fabricante(respJson[0].ref_fabricante)
            respJson[0].un == "null" || respJson[0].un == undefined || respJson[0].un == null ? setUn('UN') :   setUn(respJson[0].un)
            respJson[0].pr_medio == null || respJson[0].pr_medio == undefined ? setPr_medio(0) :  setPr_medio(respJson[0].pr_medio)
            respJson[0].qtde_estq == "null" || respJson[0].qtde_estq == undefined || respJson[0].qtde_estq == null ? setQtde_estq(1) : setQtde_estq(respJson[0].qtde_estq)
            setDt_ult_cmp(respJson[0].dt_ult_cmp)
            respJson[0].pr_venda1 == null || respJson[0].pr_venda1 == undefined || respJson[0].pr_venda1 == "" ? null : setPr_venda1(respJson[0].pr_venda1)
            respJson[0].pr_venda2 == null || respJson[0].pr_venda2 == undefined || respJson[0].pr_venda2 == "" ? null : setPr_venda2(respJson[0].pr_venda2)
            respJson[0].pr_venda3 == null || respJson[0].pr_venda3 == undefined || respJson[0].pr_venda3 == "" ? null : setPr_venda3(respJson[0].pr_venda3)
            respJson[0].ean == null || respJson[0].ean == "null" ? setEan('') :  setEan(respJson[0].ean)
            respJson[0].digito == null ? setDigito : setDigito(respJson[0].digito) 
            respJson[0].margem == "null" || respJson[0].margem == undefined || respJson[0].margem == null ? setMargem(0) : setMargem(respJson[0].margem)
            respJson[0].ativo == "null" || respJson[0].ativo == undefined || respJson[0].ativo == null ? setAtivo('S') :   setAtivo(respJson[0].ativo)
            respJson[0].tipo == "null" || respJson[0].tipo == undefined || respJson[0].tipo == null ?  setTipo('P') :  setTipo(respJson[0].tipo)
            respJson[0].custo_tabela == "null" || respJson[0].custo_tabela == undefined || respJson[0].custo_tabela == null ? setCusto_tabela(0) :  setCusto_tabela(respJson[0].custo_tabela)
            respJson[0].c_gru == null || respJson[0].c_gru == undefined || respJson[0].c_gru == "" ? null : setC_grupo(respJson[0].c_gru)
            respJson[0].controla == "null" || respJson[0].controla == undefined || respJson[0].controla == null ? setControla('S') :  setControla(respJson[0].controla)
            respJson[0].usa_grade == "null" || respJson[0].usa_grade == undefined || respJson[0].usa_grade == null ? setUsa_grade('') : setUsa_grade(respJson[0].usa_grade)
            respJson[0].etiqueta == "null" || respJson[0].etiqueta == undefined || respJson[0].etiqueta == null  ? setEtiqueta('') : setEtiqueta(respJson[0].etiqueta) 
            respJson[0].calcula_qt == 'null' || respJson[0].calcula_qt == null || respJson[0].calcula_qt == undefined || respJson[0].calcula_qt == 'false' ? setCalcula_qt('Q') : setCalcula_qt(respJson[0].calcula_qt)
            respJson[0].nr_casas_qtde != 1|| respJson[0].nr_casas_qtde == null || respJson[0].nr_casas_qtde == undefined ? setNr_casas_qtde(1) : setNr_casas_qtde(respJson[0].nr_casas_valor)
            respJson[0].nr_casas_valor != 2|| respJson[0].nr_casas_valor == null || respJson[0].nr_casas_valor == undefined ? setNr_casas_valor(2) : setNr_casas_valor(respJson[0].nr_casas_valor)
            respJson[0].desconto == "null" || respJson[0].desconto == undefined || respJson[0].desconto == null ? setDesconto(0) : setDesconto(respJson[0].desconto)
            respJson[0].perc_icms == "null" || respJson[0].perc_icms == undefined || respJson[0].perc_icms == null ? setPerc_icms(0) : setPerc_icms(respJson[0].perc_icms)
            respJson[0].c_tbt == "null" || respJson[0].c_tbt == undefined || respJson[0].c_tbt == null ? setC_tbt(1) : setC_tbt(respJson[0].c_tbt)
            respJson[0].eh_processado == "null" || respJson[0].eh_processado == undefined || respJson[0].eh_processado == null ? setEh_processado('N') : setEh_processado(respJson[0].eh_processado)
            respJson[0].qtde_processado == "null" || respJson[0].qtde_processado == undefined || respJson[0].qtde_processado == null ?  setQtde_processado(0) : setQtde_processado(respJson[0].qtde_processado)
            respJson[0].pro_acabado == "null" || respJson[0].pro_acabado == undefined || respJson[0].pro_acabado == null ? setPro_acabado('S') : setPro_acabado(respJson[0].pro_acabado) 
            respJson[0].setC_etiq == "null" || respJson[0].c_etiq == undefined || respJson[0].c_etiq == null ? setC_etiq('0') :  setC_etiq(respJson[0].c_etiq)
            respJson[0].tabela == "null" || respJson[0].tabela == undefined || respJson[0].tabela == null ? setTabela('') : setTabela(respJson[0].tabela)
            
            salvarGrupo(respJson[0].c_gru)
            salvarFornecedor(respJson[0].c_pessoa)

        })
        .catch(function (error) {
            console.log(error);
        })               
        
    }
    const mrgem = () => {
        if (ProcuraParam(621, 'parE') == 'S'){
            return(
                <View>
                    <Text>Margem</Text> 
                    <TextInput 
                        style={styles.Input}
                        value={String(Number(margem))}
                        placeholder="Margem"
                        keyboardType='numeric'
                        onChangeText={(text) => {
                            setMargem(text)
                            setMudou(true)
                        }}
                    />
                </View>            
            )
        }
    }
    
    const TratarValor = (pr_venda)=>{
        if (pr_venda == '' || pr_venda == NaN || pr_venda == undefined){
            return ''
        } else {
            return pr_venda
        }
    }

    const cEtiq = () =>{

        c_etiq = ''

        if (ProcuraParam (373 , 'par') == 'S'){

            c_etiq = 'S';

        } else {
            c_etiq = 'N'
        }
    } 
  
    const PossuiGrade = () =>{
        usa_grade = '';
           if (ProcuraParam (640 , 'parE') == 'S'){
            usa_grade = 'S';
        } else {
            if(ProcuraParam(269, 'par') == 'S' || ProcuraParam(639, 'parE') == 'S'){
                
                if(ProcuraParam(638, 'parE') == 'S'){
                    usa_grade = 'S';
                }
            } else {
                usa_grade = 'N';
            }
        }

        if (usa_grade == 'S'){
            if (ean != ''){
                alert('Quando o produto usa grade o EAN - código de barras não pode estar preenchido!')
            }
        }
    }
    <TextInput
        style={styles.grupoPesquisar}
        value={pesquisar}
        placeholder="Pesquisar"
        onChangeText={(text) => {
            setPesquisar(text)
    }}
    /> ,
    <TextInput
        style={styles.grupoPesquisar}
        value={pesquisarF}
        placeholder="Pesquisar"
        onChangeText={(text) =>{
            setPesquisarF(text)
        }}
    />
    

    return(
        <View style={styles.container}>

            <AwesomeAlert
               show={ShowtrocarProduto}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                contentContainerStyle={{width: 450, height: '80%'}}
                customView={showProdutoCustomView()}
                contentStyle={{height: '80%'}}
                onDismiss={() => {
                    setShowtrocarProduto(false);
                }}
            /> 
             <AwesomeAlert
               show={ShowtrocarFornecedor}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                contentContainerStyle={{width: 450, height: '80%'}}
                customView={showFornecedorCustomView()}
                contentStyle={{height: '80%'}}
                onDismiss={() => {
                    setShowtrocarFornecedor(false);
                }}
            /> 

            <Loading 
                show={load}
                onDismiss={()=>{
                    setLoad(false)
                }}
            />

            <ScrollView>
            <StatusBar style="dark" />

                <Text>Descrição</Text>
                <TextInput
                    style={styles.Input}
                    maxLength={50}
                    value={descricao} 
                    placeholder="Descrição"
                    onChangeText={(text) => {
                        setDescricao(text)
                        setMudou(true)
                    
                    }}
                />
                <Text>Fornecedor</Text>
                <View 
                    style={{height: 60, marginBottom: 20}}
                >
                    <TextInput
                        style={styles.grupoPesquisar}
                        value={fornecedor}
                        placeholder="Fornecedor"
                        onChangeText={(text) =>{
                            setC_pessoa(text)
                        }}
                    />
                    <View
                        style={{
                            alignItems: 'flex-end',
                        }}
                    >
                        <TouchableOpacity
                            style={styles.ButtonProduto}
                            onPress={()=>{setShowtrocarFornecedor(true)}}
                        >
                            <Ionicons name="ios-search" size={25} color="white" />    
                        </TouchableOpacity>
                    </View>
                </View>        

                <Text>Unidade de Medida</Text>
                <TextInput
                    style={styles.Input}
                    maxLength={2}
                    value={un}
                    placeholder="UN"
                    onChangeText={(text) =>{
                        setUn(text)
                        setMudou(true)
                      
                    }}
                />
                 <Text>Grupo</Text>
                 <View 
                    style={{height: 60, marginBottom: 20}}
                >
                    <TextInput
                        style={styles.grupoPesquisar}
                        value={grupo}
                        placeholder="Grupo"
                        onChangeText={(text) =>{
                            setC_grupo(text)
                        }}
                    />
                    <View
                        style={{
                            alignItems: 'flex-end',
                        }}
                    >
                        <TouchableOpacity
                            style={styles.ButtonProduto}
                            onPress={()=>{setShowtrocarProduto(true)}}
                        >
                            <Ionicons name="ios-search" size={25} color="white" />    
                        </TouchableOpacity>
                    </View>
                </View>  
                <Text>Quantidade de Estoque</Text>
                <TextInput
                    style={styles.Input}
                    value={String(Number(qtde_estq))}
                    placeholder="Estoque"
                    keyboardType='numeric'
                    editable={false}
                    onChangeText={(text) =>{
                        setQtde_estq(text)
                        setMudou(true)
                    }}
                />
                <Text>Controla Estoque</Text>
                <Picker
                    selectedValue={controla}
                    style={styles.select}
                    onValueChange={(itemValue, itemIndex) => {
                        setControla(itemValue)
                        setMudou(true)
                    }}>
                    <Picker.Item label="S" value="S" />
                    <Picker.Item label="N" value="N" />
                </Picker>
                <Picker
                    selectedValue={ativo}
                    style={styles.select}
                    onValueChange={(itemValue, itemIndex) => {
                        setAtivo(itemValue)
                        setMudou(true)
                     
                    }}>
                    <Picker.Item label="Ativo" value="S" />
                    <Picker.Item label="Não Ativo" value="N" />
                </Picker>
                <Text>Referência</Text>
                <TextInput
                    style={styles.Input}
                    maxLength={20}
                    value={ref_fabricante}
                    placeholder="Referencia"
                    onChangeText={(text) =>{
                        setRef_fabricante(text)
                        setMudou(true)
                    }}
                />
                <Picker
                    selectedValue={tipo}
                    style={styles.select}
                    onValueChange={(itemValue, itemIndex) => {
                        setTipo(itemValue)
                        setMudou(true)
                    }}>
                    <Picker.Item label="Produto" value="P" />
                    <Picker.Item label="Serviço" value="S" />

                </Picker>

                <Text>Codigo de Barras</Text>
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                <TextInput
                    style={styles.InputEan}
                    maxLength={15}
                    value={ean}
                    placeholder="Ean"
                    onChangeText={(text) =>{
                        setEan(text)
                        setMudou(true)
                  
                    }}
                />     
                <TextInput
                    style={styles.InputCod}
                    maxLength={1}
                    value={digito}
                    placeholder="Digito"
                    keyboardType='numeric'
                    onChangeText={(text) =>{
                        setDigito(text)
                        setMudou(true)
                    }}
                />
                </View>
                <Text>Data Ultima Compra</Text>     
                <MaskInput
                    value={dt_ult_cmp}
                    placeholder='Data da Ultima compra'
                    keyboardType= 'numeric'
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setDt_ult_cmp(masked)
                        setMudou(true)
                    }}
                    mask={Masks.DATE_DDMMYYYY}
                />
                <Text>Preço Médio</Text>     
                <TextInput 
                    style={styles.Input}
                    value={String(Number(TratarValor(pr_medio)).toFixed(2))}
                    placeholder="Preço Medio"
                    keyboardType='numeric'
                    onChangeText={(text) => {
                        setPr_medio(text)
                        setMudou(true)
                    }}
                />  
                <Text>Custo Tabela</Text>     
                <TextInput 
                    style={styles.Input}
                    value={String(Number(TratarValor(custo_tabela)).toFixed(2))}
                    placeholder="Custo Tabela"
                    keyboardType='numeric'
                    onChangeText={(text) => {
                        setCusto_tabela(text)  
                        setMudou(true)              
                }}
                />
                <Text>Preço Venda 1</Text>     
                <TextInput
                    style={styles.Input}
                    value={String(Number(TratarValor(pr_venda1)).toFixed(2))}
                    placeholder="Preço de Venda 1"
                    keyboardType='numeric'
                    onChangeText={(text) =>{
                        setPr_venda1(text)
                        setMudou(true)
                      
                    }}
                />
                <Text>Preço Venda 2</Text>  
                 <TextInput
                    style={styles.Input}
                    value={String(Number(TratarValor(pr_venda2)).toFixed(2))}
                    placeholder="Preço de Venda 2"
                    keyboardType='numeric'
                    onChangeText={(text) =>{
                        setPr_venda2(text)
                        setMudou(true)
                    
                    }}
                />

                <Text>Preço Venda 3</Text>  
                <TextInput
                    style={styles.Input}
                    value={String(Number(TratarValor(pr_venda3)).toFixed(2))}
                    placeholder="Preço de Venda 3"
                    keyboardType='numeric'
                    onChangeText={(text) =>{
                        setPr_venda3(text)
                        setMudou(true)
                    
                    }}
                />
                 
                {mrgem()}
                
                <View style={{alignItems: "flex-end"}}>
                    <TouchableOpacity 
                        disabled={!Mudou}
                        style={styles.ButtonSave}
                        onPress={()=>{
                            Salvar()
                        }}
                    >
                            <Text style={styles.TextSave}>Salvar</Text>
                             
                    </TouchableOpacity> 
                </View>

                </ScrollView>
        
        </View>
    )
}