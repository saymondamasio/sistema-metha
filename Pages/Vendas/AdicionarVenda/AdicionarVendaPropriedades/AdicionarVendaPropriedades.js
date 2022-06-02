import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import MaskInput, {Masks} from 'react-native-mask-input';
import { Picker } from '@react-native-community/picker';
import styles from './AdicionarVendaPropriedadesStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import AwesomeAlert from 'react-native-awesome-alerts';
import { Ionicons } from '@expo/vector-icons'; 
import { Parametros, ProcuraParam } from '../../../../Components/Parametro'
import { Loading } from '../../../../Components/Loader'

export default function AdicionarVendaPropriedades( { navigation, route } ) {
  
  const [Finalidade, setFinalidade] = React.useState('VE');
  const [Dt_lanc, setDt_lanc] = React.useState(FutureDay(0));
  const [tp_preco, setTp_preco] = React.useState(ProcuraParam(98, 'par'));
  const [Contato, setContato] = React.useState('');
  const [obras, setObras] = React.useState('');
  const [c_Obras, setc_Obras] = React.useState('');
  const [funcionario, setFuncionario] = React.useState('');
  const [c_func, setc_func] = React.useState('');
  const [showObras, setShowObras] = React.useState(false);
  const [showFunc, setShowFunc] = React.useState(false);
  const [pesquisar, setPesquisar] = React.useState('')
  const [pesquisaFuncionario, setPesquisaFuncionario] = React.useState('')
  const [listaObras, setListaObras] = React.useState([])
  const [listaFunc, setListaFunc] = React.useState([])
  const [obs, setObs] = React.useState('')
  const [defeito, setDefeito] = React.useState(null)
  const [FinalidadeList, setFinalidadeList] = React.useState([]);
  const [load, setLoad] = React.useState(false)
  const [c_user, setC_user] = React.useState(0)

  useEffect(() => {
    
    // Finalidade
    let finalLista = []
    if (ProcuraParam(158, 'par') == "SV"){

        finalLista.push({value: "VE"})
        finalLista.push({value: "OS"})
        finalLista.push({value: "DEVOL_VENDA"})

        if (ProcuraParam(504, 'parE') == "S"){
            finalLista.push({value: "OR"})
        }

        if (ProcuraParam(50, 'par') == "S"){
            finalLista.push({value: "PE"})
        }

        finalLista.push({value: "GARANTIA"})
        

    } else {
        finalLista.push({value: "VE"})

        if (ProcuraParam(504, 'parE') == "S"){
            finalLista.push({value: "OR"})
        }
        
        if (ProcuraParam(50, 'par') == "S"){
            finalLista.push({value: "PE"})
        }

        finalLista.push({value: "DEVOL_VENDA"})
        
    }

    if (ProcuraParam(640, 'parE') == "S"){
        finalLista.push({value: "TRANSF_EMP"})
        
        if (ProcuraParam(360, 'par') == "S"){
            if (ProcuraParam(674, 'parE') == "SS"){
                finalLista.push({value: "SS"})
            } else {
                finalLista.push({value: "CS"})
            }
        }
        
    }

    finalLista.push({value: "BALANCO"});
    setFinalidadeList(finalLista)

    getUser()
  }, []);

  // Pesquisar Obras
  const pesquisarObras = async () => {
    // setLoad(true)
    var data = JSON.stringify({
        "banco": await AsyncStorage.getItem('@banco'),
        "sql": `select c_agrupa, descricao, endereco, numero, bairro, c_pessoa, cidade, uf from cd_agrupa where c_pessoa = ${route.params.c_pessoa} and descricao like '%${pesquisar}%' AND situacao = 'EM ANDAMENTO'`
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
       // setLoad(false)
        
        let respJson = (JSON.parse(JSON.stringify(response.data)).recordset);
        let aux = []
        for(let i = 0; i <= respJson.length-1; i++){
            aux.push({id: i, name: respJson[i].descricao, c_agrupa: respJson[i].c_agrupa, cidade: respJson[i].cidade, endereco: respJson[i].endereco, uf: respJson[i].uf, numero: respJson[i].numero})
        }
        setListaObras(aux)
        console.log(setListaObras)
    })
    .catch(function (error) {
        setLoad(false)
        console.log(error);
    }
    
    );
  }
  const showCustomViewObras = () => {
    return(
        <View style={{height: '100%', width: '100%'}}>
            <View 
                style={{height: 60, marginBottom: 20}}
            >

                <TextInput
                    style={styles.nomePesquisar}
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
                        style={styles.ButtonPessoa}
                        onPress={()=>{pesquisarObras()}}
                    >
                        <Ionicons name="ios-search" size={25} color="white" />    
                    </TouchableOpacity>
                </View>
                    
            </View>

            <FlatList
                data={listaObras}
                style={styles.listaPop}
                renderItem={renderObras}
                keyExtractor={myKeyExtractor}
            />

        </View>
    )
  }
  // retorna quantidade data daqui x dias
  function FutureDay(x){
    var data = new Date();
    data.setDate(data.getDate() + Number(x));
    let dia = data.getDate().toString().padStart(2, '0')
    let mes = (data.getMonth()+1).toString().padStart(2, '0')
    let ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`
  }
  const renderObras = ({item}) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#2c3b76',
                margin: 2,
                padding: 5,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
            onPress={() => {
                setc_Obras(item.c_agrupa)
                setObras(item.name)
                setShowObras(false)
            }}
        >
            <Text style={{color: '#fff'}} >{item.name}</Text>
        </TouchableOpacity>
    )
  }

  // Pesquisar Funcionarios
  const pesquisarFunc = async () => {
    setLoad(true)
    var data = JSON.stringify({
        "banco": await AsyncStorage.getItem('@banco'),
        "sql": `select c_fun, nome from cd_fun where nome like '%${pesquisaFuncionario}%'`
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
        let respJson = (JSON.parse(JSON.stringify(response.data)).recordset);
        let aux = []
        for(let i = 0; i <= respJson.length-1; i++){
            aux.push({id: i, name: respJson[i].nome, c_fun: respJson[i].c_fun})
        }
        setListaFunc(aux)
        setLoad(false)
    })
    .catch(function (error) {
        setLoad(false)
        console.log(error);
    });
  }
  const showCustomViewFunc = () => {
    return(
        <View style={{height: '100%', width: '100%'}}>
            <View 
                style={{height: 60, marginBottom: 20}}
            >

                <TextInput
                    style={styles.nomePesquisar}
                    value={pesquisaFuncionario}
                    placeholder="Pesquisar"
                    onChangeText={(text) => {
                        setPesquisaFuncionario(text)
                    }}
                />
                <View
                    style={{
                        alignItems: 'flex-end',
                    }}
                >
                    <TouchableOpacity
                        style={styles.ButtonPessoa}
                        onPress={()=>{pesquisarFunc()}}
                    >
                        <Ionicons name="ios-search" size={25} color="white" />    
                    </TouchableOpacity>
                </View>
                    
            </View>

            <FlatList
                data={listaFunc}
                style={styles.listaPop}
                renderItem={renderFunc}
                keyExtractor={myKeyExtractor}
            />

        </View>
    )
  }
  const renderFunc = ({item}) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#2c3b76',
                margin: 2,
                padding: 5,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
            onPress={() => {
                setc_func(item.c_fun)
                setFuncionario(item.name)
                setShowFunc(false)
            }}
        >
            <Text style={{color: '#fff'}} >{item.name}</Text>
        </TouchableOpacity>
    )
  }

  // Flatlist
  const myKeyExtractor = (item) => {
    return String(item.id)
  }

  const defeitoInput = () => {
    if (ProcuraParam(158, 'par') == 'SV' || ProcuraParam(158, 'par') == 'SVO'){
        return(
            <View>
                <Text>Defeito</Text>
                <TextInput
                    style={styles.InputMemo}
                    value={defeito}
                    placeholder="Defeito"
                    onChangeText={(text)=>{
                        setDefeito(text)
                    }}
                    multiline={true}
                />
            </View>
        )
    }
  }

    const mostraObras = () => {
        if (ProcuraParam(688, 'parE') == 'S'){
            return (
                <View>
                    <Text>Obras</Text>
                    <View 
                        style={{height: 60, marginBottom: 20}}
                    >
                        <TextInput
                            style={styles.InputPessoa}
                            value={obras}
                            placeholder="Obras"
                            multiline={true}
                        />
                        <View
                            style={{
                                alignItems: 'flex-end',
                                top: 10
                            }}
                        >
                            <TouchableOpacity
                                style={styles.ButtonPessoa}
                                onPress={()=>{setShowObras(true);pesquisarObras()}}
                            >
                                <Text style={styles.TextPos}>+</Text>    
                            </TouchableOpacity>
                        </View>
                                
                    </View>
                </View>
            )
        }

    }
  
    const SalvarProx = () => {

        let prox = true

        console.log('começo da venda');

        if (c_func == "" || c_func == null || c_func == undefined){
            alert("Selecione o funcionario!")
            prox = false
        }

        // Verifica se a data está correta
        let find = '/';
        let re = new RegExp(find, 'g');
        if (Dt_lanc.replace(re, '').length != 8){
            prox = false
            alert("Data de Lançamento Incorreta!")
        }

        if (prox){
            let prop = {
                c_pessoa: route.params.c_pessoa,
                haverPessoa: route.params.haverPessoa,
                situacao: "EM ANDAMENTO",
                finalidade: Finalidade,
                dt_lanc: Dt_lanc,
                tp_preco: tp_preco,
                c_fun: c_func,
                c_obras: c_Obras,
                Contato: Contato,
                defeito: defeito,
                obs: obs
            }
        
            navigation.navigate('AdicionarVendaProdutos', prop)
        }

    }

    //Retorna o picker com o tipo de preço
    const tpPrecoPicker = () => {
        if(ProcuraParam(270, 'par') == '123') {
            return( 
                <Picker
                    selectedValue={tp_preco}
                    style={styles.select}
                    onValueChange={(itemValue, itemIndex) => {
                        setTp_preco(itemValue)
                    }}
                >
                    <Picker.Item label="Preço 1" value="1" />
                    <Picker.Item label="Preço 2" value="2" />
                    <Picker.Item label="Preço 3" value="3" />
                </Picker>   
            )
            
        } else if (ProcuraParam(270, 'par') == '12') {
            return(
                <Picker
                    selectedValue={tp_preco}
                    style={styles.select}
                    onValueChange={(itemValue, itemIndex) => {
                        setTp_preco(itemValue)
                    }}
                >
                    <Picker.Item label="Preço 1" value="1" />
                    <Picker.Item label="Preço 2" value="2" />
                </Picker>
            )
            
        } else if (ProcuraParam(270, 'par') == '1') {
            return(
                <Picker
                    selectedValue={tp_preco}
                    style={styles.select}
                    onValueChange={(itemValue, itemIndex) => {
                        setTp_preco(itemValue)
                    }}
                >
                    <Picker.Item label="Preço 1" value="1" />
                </Picker>
            )
            
        }
    }

    // Capturar o usuario
    const getUser = async () => {
        setUser(await AsyncStorage.getItem('@c_username'))            
    }

    // Adicionar User como padrão
    const setUser = async (c_user) => {
        var data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": `select * from cd_usu where c_fun = ${c_user}`
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
            setc_func(respJson[0].c_fun);
            setFuncionario(respJson[0].descricao)
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            <Loading 
                show={load}
                onDismiss={()=>{
                    setLoad(false)
                }}
            />

            <AwesomeAlert
                show={showObras}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                contentContainerStyle={{width: 450, height: '80%'}}
                customView={showCustomViewObras()}
                contentStyle={{height: '80%'}}
                onDismiss={() => {
                    setShowObras(false);
                }}
            />
            <AwesomeAlert
                show={showFunc}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                contentContainerStyle={{width: 450, height: '80%'}}
                customView={showCustomViewFunc()}
                contentStyle={{height: '80%'}}
                onDismiss={() => {
                    setShowFunc(false);
                }}
            />

            <ScrollView>

                <Text>Situação</Text>
                <TextInput
                    style={styles.Input}
                    editable={false}
                    value="EM ANDAMENTO"
                    placeholder="Situação"
                />

                <Picker
                    selectedValue={Finalidade}
                    style={styles.select}
                    onValueChange={(itemValue, itemIndex) => {
                        setFinalidade(itemValue)
                    }}>
                    {
                        FinalidadeList.map( (item, key) => {
                            return <Picker.Item key={key} label={item.value} value={item.value} />
                        })
                    }
                </Picker>

                <Text style={{paddingTop: 10}}>Data de Lançamento</Text>
                <MaskInput
                    value={Dt_lanc}
                    placeholder='Data de Lançamento'
                    keyboardType= 'numeric'
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setDt_lanc(masked);
                    }}
                    mask={Masks.DATE_DDMMYYYY}
                />

                {tpPrecoPicker()}

                <Text style={{paddingTop: 10}}>Funcionario</Text>
                <View 
                    style={{height: 60, marginBottom: 20}}
                >
                    <TextInput
                        style={styles.InputPessoa}
                        value={funcionario}
                        placeholder="Funcionario"
                        multiline={true}
                    />
                    <View
                        style={{
                            alignItems: 'flex-end',
                            top: 10
                        }}
                    >
                        <TouchableOpacity
                            style={styles.ButtonPessoa}
                            onPress={()=>{setShowFunc(true);pesquisarFunc()}}
                        >
                            <Text style={styles.TextPos}>+</Text>    
                        </TouchableOpacity>
                    </View>
                            
                </View>

                {mostraObras()}

                <Text>Contato</Text>
                <TextInput
                    style={styles.Input}
                    value={Contato}
                    placeholder="Contato"
                    onChangeText={(text)=>{
                    setContato(text)
                    }}
                />

                {defeitoInput()}

                <Text>Observações</Text>
                <TextInput
                    style={styles.InputMemo}
                    value={obs}
                    placeholder="Observações"
                    onChangeText={(text)=>{
                        setObs(text)
                    }}
                    multiline={true}
                />

                <View style={styles.ViewNext}>
                    <TouchableOpacity 
                        style={styles.ButtonNext}
                        onPress={() => {
                            SalvarProx()
                        }}
                    >
                            <Text style={styles.TextNext}>Próximo</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

        </View>
    );
}