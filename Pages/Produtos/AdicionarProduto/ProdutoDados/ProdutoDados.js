import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList} from 'react-native';
import styles from './ProdutoDadosStyle';
import { Picker } from '@react-native-community/picker';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Ionicons } from '@expo/vector-icons'
import { Loading } from '../../../../Components/Loader'

export default function ProdutoDados ({navigation}){
    
    const [descricao, setDescricao ] = useState('');
    const [un, setUn ]= useState('UN');
    const [qtde_estq, setQtde_estq] = useState('0');
    const [ref_fabricante, setRef_fabricante] = useState('');
    const [ativo, setAtivo] = useState('S');
    const [tipo, setTipo] = useState('P');
    const [ean, setEan] = useState('');
    const [digito, setDigito]= useState('');
    const [grupo, setGrupo] = useState('');
    const [controla, setControla] = useState('S');
    const [ShowtrocarProduto, setShowtrocarProduto] = useState(false)
    const [GrupoList, setGrupoList] = useState([])
    const [pesquisar, setPesquisar] = useState('')
    const [c_grupo, setC_grupo] = useState('')
    const [fornecedor, setFornecedor] = useState('')
    const [ShowtrocarFornecedor, setShowtrocarFornecedor] = useState(false)
    const [fornecedorList,   setFornecedorList] = useState([])
    const [pesquisarF, setPesquisarF] = useState('')
    const [c_pessoa, setC_pessoa] = useState('')
    const [load, setLoad] = React.useState(false)

    //salvar o valor dentro
    async function SalvarDados(){
        let dados  = {
            descricao: descricao,
            un: un,
            qtde_estq: qtde_estq,
            ref_fabricante: ref_fabricante,
            ativo: ativo,
            tipo: tipo,
            ean: ean,
            digito: digito,
            c_grupo: c_grupo,
            controla: controla,
            c_pessoa: c_pessoa,
        }
        navigation.navigate('ProdutoFinanceiro', dados)
    }

    function preencherDescricao(){
        if(descricao.length == 0){
            alert('Por favor preencher a descrição')
        }else{
            SalvarDados()
        }
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
                key={item.fornecedor}
                onPress={() =>{
                   setShowtrocarFornecedor(false)
                   setFornecedor(item.nome)
                   setC_pessoa(item.c_pessoa)
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
        })
        .catch(function (error) { 
            console.log(error);
            setLoad(false)
            alert('[ERRO]')
        })
    }
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
                }}
            >
                <Text style={{color: '#fff'}} >{item.descricao}</Text>
            </TouchableOpacity>
        )
      }
      
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

    const myKeyExtractor = (item) => {
        return String(item.c_grupo)
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
            setLoad(false)
            alert('[ERRO]')
        })
    }

    const verificarEan = async (code) =>{
        setLoad(true)
        
        let data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": `SELECT c_pro, descricao, ean + ISNULL(digito, ean) as eanCompl FROM cd_pro where ean + ISNULL(digito, '')  = '${code}'` 
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
            setLoad(false)
            let respJson = JSON.parse(JSON.stringify(response.data)).recordset
            if (respJson.length == 0){ // se for um valor diferente do ean ele retorna false
                return false;
            } else { //se ja tiver um produto com o mesmo codigo ele retorna true
                return true;
            }
        })
        .catch(function (error) { 
            console.log(error);
            setLoad(false)
            alert('[ERRO]')
        })
    }

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
                    value={descricao}
                    maxLength={50}
                    placeholder='Descrição'
                    style={styles.Input}
                    onChangeText={(text)=>{
                        setDescricao(text)
                    }}            
                />
                <Text>Fornecedor</Text>
                <View 
                    style={{height: 60, marginBottom: 20}}
                >
                    <TextInput
                        style={styles.grupoPesquisar}
                        value={String(fornecedor)}
                        placeholder="Fornecedor"
                        onChangeText={(text) =>{
                            setFornecedor(text)
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
                    }}
                />

                <Text>Grupo</Text>    
                <View 
                    style={{height: 60, marginBottom: 20}}
                >
                    <TextInput
                        style={styles.grupoPesquisar}
                        value={String(grupo)}
                        placeholder="Grupo"
                        onChangeText={(text) =>{
                            setGrupo(text)
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
                    keyboardType="numeric"
                    editable={false}
                    onChangeText={(text) =>{
                        setQtde_estq(text)
                    }}
                />
                <Text>Controla Estoque</Text>
                <Picker
                    selectedValue={controla}
                    style={styles.select}
                    onValueChange={(itemValue, itemIndex) => {
                        setControla(itemValue)
                    }}>
                    <Picker.Item label="S" value="S" />
                    <Picker.Item label="N" value="N" />
                </Picker>
                <Picker
                    selectedValue={ativo}
                    style={styles.select}
                    onValueChange={(itemValue, itemIndex) => {
                        setAtivo(itemValue)    
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
                    }}
                />     
                <Picker
                    selectedValue={tipo}
                    style={styles.select}
                    onValueChange={(itemValue, itemIndex) => {
                        setTipo(itemValue)
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
                        }
                    }
                    />
                    <TextInput
                        maxLength={1}
                        style={styles.InputDig}
                        value={digito}
                        keyboardType='numeric'
                        onChangeText={(text) =>{
                            setDigito(text)                        
                        }}
                    />
                </View>
                <View style={styles.ViewNext}>
                <TouchableOpacity 
                    style={styles.ButtonNext}
                    onPress={() => {
                        if (ean != '' && ean != undefined && ean != null  ){
                            verificarEan(ean).then(res => {
                                if(res == true){ 
                                    alert('Não é possivel adicionar dois produtos com os mesmo EAN')
                                }else{
                                    preencherDescricao()
                                }
                            })
                        }else{
                            preencherDescricao()
                        }
                        
                    }} 
                >
                        <Text style={styles.TextNext}>Proximo</Text>
                </TouchableOpacity>
            </View>

            </ScrollView>
        </View>
        
    )
        
}




