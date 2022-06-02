import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView, Dimensions, FlatList, SegmentedControlIOSBase} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Ionicons } from '@expo/vector-icons'; 
import { Picker } from '@react-native-community/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import MaskInput from 'react-native-mask-input';
import { Loading } from '../../../../Components/Loader'
import { Parametros, ProcuraParam } from '../../../../Components/Parametro'
import { MaterialIcons } from '@expo/vector-icons'; 

import styles from './AdicionarVendaPessoaStyle';
//import { set } from 'react-native-reanimated';

export default function AdicionarVendaPessoa( { navigation } ) {
  
  const [Pessoa, setPessoa] = useState([]);
  const [NomeRazao, setNomeRazao] = useState("")
  const [showtrocarPessoa, setShowtrocarPessoa] = useState(false)
  const [pesquisar, setPesquisar] = useState('')
  const [pesquisarPor, setPesquisarPor] = useState('NOME')
  const [pesquisaPessoa , setPesquisaPessoa] = useState()
  const [c_pessoa, setC_pessoa] = useState(ProcuraParam(96, 'par'))
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [compl, setCompl] = useState('');
  const [cpfCgc, setCpfCgc] = useState('');
  const [inscEstRg, setInscEstRg] = useState('');
  const [fone, setFone] = useState('');
  const [obs, setObs] = useState('')
  const [load, setLoad] = React.useState(false)
  const [expand, setExpand] = React.useState(false)
  const [haver, setHaver] = React.useState(0)

  useEffect(() => {
    setConsumidor()
  }, []);

  // Adicionar consumidor como padrão
  const setConsumidor = async () => {
    var data = JSON.stringify({
        "banco": await AsyncStorage.getItem('@banco'),
        "sql": `select c_pessoa, obs, nome, fantasia, fisica_jur, cpf, cgc, rg, FORMAT(dt_nasc, 'dd/MM/yyyy') as dt_nasc, ddd_fone, fone, ddd_celular, celular, ddd_fax, fax, insc_est, indIEDest, insc_mun, cep, bairro, endereco, numero, cidade, uf, compl, e_mail, haver from cd_pessoa where c_pessoa = ${ProcuraParam(96, 'par')}`
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
        let aux = []
        for(let i = 0; i <= respJson.length-1; i++){
            aux.push({id: i, name: respJson[i].nome, c_pessoa: respJson[i].c_pessoa})
        }
        preencherPessoa(respJson[0])
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  // Pesquisar pessoa
  const pesquisarPessoa = async () => {
    let cod
    setLoad(true)

    if (pesquisarPor == 'CODIGO') {
        cod = `select c_pessoa, obs, nome, fantasia, fisica_jur, cpf, cgc, rg, FORMAT(dt_nasc, 'dd/MM/yyyy') as dt_nasc, ddd_fone, fone, ddd_celular, celular, ddd_fax, fax, insc_est, indIEDest, insc_mun, cep, bairro, endereco, numero, cidade, uf, compl, e_mail, haver from cd_pessoa where c_pessoa = ${pesquisar}`
    } else if (pesquisarPor == 'NOME'){
        cod = `select c_pessoa, obs, nome, fantasia, fisica_jur, cpf, cgc, rg, FORMAT(dt_nasc, 'dd/MM/yyyy') as dt_nasc, ddd_fone, fone, ddd_celular, celular, ddd_fax, fax, insc_est, indIEDest, insc_mun, cep, bairro, endereco, numero, cidade, uf, compl, e_mail, haver from cd_pessoa where nome like '%${pesquisar}%'`
    } else if (pesquisarPor == 'CPF'){
        cod = `select c_pessoa, obs, nome, fantasia, fisica_jur, cpf, cgc, rg, FORMAT(dt_nasc, 'dd/MM/yyyy') as dt_nasc, ddd_fone, fone, ddd_celular, celular, ddd_fax, fax, insc_est, indIEDest, insc_mun, cep, bairro, endereco, numero, cidade, uf, compl, e_mail, haver from cd_pessoa where cpf like '%${pesquisar}%' or cpf like '%${pesquisar}%'`
    } else if (pesquisarPor == 'CNPJ'){
        cod = `select c_pessoa, obs, nome, fantasia, fisica_jur, cpf, cgc, rg, FORMAT(dt_nasc, 'dd/MM/yyyy') as dt_nasc, ddd_fone, fone, ddd_celular, celular, ddd_fax, fax, insc_est, indIEDest, insc_mun, cep, bairro, endereco, numero, cidade, uf, compl, e_mail, haver from cd_pessoa where cgc like '%${pesquisar}%' or cgc like '%${pesquisar}%'`
    }

    var data = JSON.stringify({
        "banco": await AsyncStorage.getItem('@banco'),
        "sql": cod
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
        setPesquisaPessoa(respJson)
        let aux = []
        for(let i = 0; i <= respJson.length-1; i++){
            aux.push({id: i, name: respJson[i].nome, c_pessoa: respJson[i].c_pessoa})
        }
        setPessoa(aux)
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  const showPessoaCustomView = () => {
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
                        onPress={()=>{pesquisarPessoa()}}
                    >
                        <Ionicons name="ios-search" size={25} color="white" />    
                    </TouchableOpacity>
                </View>
                    
            </View>
            
            <Picker
                selectedValue={pesquisarPor}
                style={styles.selectPop}
                onValueChange={(itemValue, itemIndex) => {
                    setPesquisarPor(itemValue)
                }}>
                <Picker.Item label="NOME" value="NOME" />
                <Picker.Item label="CODIGO" value="CODIGO" />
                <Picker.Item label="CPF" value="CPF" />
                <Picker.Item label="CNPJ" value="CNPJ" />
            </Picker>

            <FlatList
                data={Pessoa}
                style={styles.listaPop}
                renderItem={renderPessoa}
                keyExtractor={myKeyExtractor}
            />

        </View>
    )
  }

  // Pessoa
  const renderPessoa = ({item}) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#2c3b76',
                margin: 2,
                padding: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
            onPress={() => {
                preencherPessoa(pesquisaPessoa[item.id])
                setShowtrocarPessoa(false)
            }}
            onLongPress={() => {
                setShowtrocarPessoa(false)
                navigation.navigate('PessoaCadastro', [{id: item.id}, {params: pesquisaPessoa}])
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

  // Preenche os dados da pessoa
  const preencherPessoa = (pessoa) => {
    setNomeRazao(pessoa.nome)
    setC_pessoa(pessoa.c_pessoa)
    setCep(pessoa.cep)
    setCidade(pessoa.cidade)
    setUf(pessoa.uf)
    setEndereco(pessoa.endereco)
    setBairro(pessoa.bairro)
    setNumero(pessoa.numero)
    setCompl(pessoa.compl)
    setHaver(pessoa.haver)

    if (pessoa.fisica_jur == "F"){
      setCpfCgc(pessoa.cpf)
      setInscEstRg(pessoa.rg)
    } else {
      setCpfCgc(pessoa.cgc)
      setInscEstRg(pessoa.insc_est)
    }

    setFone(pessoa.fone)
    setObs(pessoa.obs)

  }

  const SalvarProx = () => {

    if (c_pessoa == null){
        alert('Pessoa não Encontrada!')
    } else {
        let prop = {
            c_pessoa: c_pessoa,
            haverPessoa: haver
        }
    
        navigation.navigate('AdicionarVendaPropriedades', prop)
    }

  }
  
    const expandInfo = () => {
        if (expand) {
            return(
                <View
                    style={{
                        paddingTop: 15
                    }}
                >
                    <Text>Cep</Text>
                    <MaskInput
                        value={cep}
                        placeholder='Cep'
                        keyboardType= 'numeric'
                        style={styles.Input}
                        maxLength={9}
                        editable={false}
                        mask={[/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/]}
                    />
                    <Text>Cidade</Text>
                    <MaskInput
                        value={cidade}
                        placeholder='Cidade'
                        style={styles.Input}
                        maxLength={35}
                        editable={false}
                    />
                    <Text>Estado</Text>
                    <MaskInput
                        value={uf}
                        placeholder='Estado'
                        style={styles.Input}
                        maxLength={2}
                        editable={false}
                        mask={[/[a-zA-Z]/, /[a-zA-Z]/]}
                    />
                    <Text>Rua</Text>
                    <MaskInput
                        value={endereco}
                        placeholder='Rua'
                        maxLength={50}
                        editable={false}
                        style={styles.Input}
                        multiline={true}
                    />
                    <Text>Bairro</Text>
                    <MaskInput
                        value={bairro}
                        placeholder='Bairro'
                        maxLength={35}
                        editable={false}
                        style={styles.Input}
                        multiline={true}
                    />
                    <Text>Número</Text>
                    <MaskInput
                        value={numero}
                        placeholder='Número'
                        style={styles.Input}
                        maxLength={7}
                        editable={false}
                    />
                    <Text>Complemento</Text>
                    <MaskInput
                        value={compl}
                        placeholder='Complemento'
                        style={styles.Input}
                        editable={false}
                        multiline={true}
                    />
                    <Text>CPF / CNPJ</Text>
                    <TextInput
                        style={styles.Input}
                        value={cpfCgc}
                        placeholder="CPF / CNPJ"
                        editable={false}
                    />
                    <Text>RG / IE</Text>
                    <TextInput
                        style={styles.Input}
                        value={inscEstRg}
                        placeholder="RG / IE"
                        editable={false}
                    />
                    <Text>Telefone</Text>
                    <MaskInput
                        value={fone}
                        placeholder='Telefone'
                        keyboardType= 'numeric'
                        style={styles.Input}
                        editable={false}
                        maxLength={15}
                        mask={['(',/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/,]}
                    />
                    <Text>Observações</Text>
                    <TextInput
                        style={styles.InputMemo}
                        value={obs}
                        placeholder="Observações"
                        onChangeText={(text)=>{
                            setObs(text)
                        }}
                        editable={false}
                        multiline={true}
                    />
                    <Text>Haver</Text>
                    <TextInput
                        style={styles.Input}
                        value={String(Number(haver).toFixed(2))}
                        placeholder="Haver"
                        editable={false}
                    />
                </View>
            )
        }
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
            show={showtrocarPessoa}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            //contentContainerStyle={{width: 450}}
            customView={showPessoaCustomView()}
            contentContainerStyle={{width: 450, height: '80%'}}
            contentStyle={{height: '80%'}}
            onDismiss={() => {
                setShowtrocarPessoa(false);
            }}
        />

        <ScrollView>
        
            <Text>Nome/Razão</Text>
            <View 
                style={{height: 60, marginBottom: 20}}
            >
                <TextInput
                    style={styles.InputPessoa}
                    value={NomeRazao}
                    placeholder="Nome/Razão"
                    multiline={true}
                />
                <View
                    style={{
                        alignItems: 'flex-end',
                        top: 10
                    }}
                >
                    <TouchableOpacity
                        onLongPress={()=>{propPessoa(c_pessoa)}}
                        style={styles.ButtonPessoa}
                        onPress={()=>{setShowtrocarPessoa(true)}}
                    >
                        <Ionicons name="ios-search" size={25} color="white" /> 
                    </TouchableOpacity>
                </View>
                            
            </View>
            
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: 'space-between'
                }}
                onStartShouldSetResponder={() => (expand == true ? setExpand(false) : setExpand(true))}
            >
                <Text selectable={false}>{expand == false ? "Mostrar Mais" : "Mostrar Menos"}</Text>
                {(expand == false ? (<MaterialIcons name="arrow-drop-down" size={24} color="black" selectable={false}/>) : (<MaterialIcons name="arrow-drop-up" size={24} color="black" selectable={false} />))}
            </View>
            
            {expandInfo()}

            <View style={{
                paddingTop: (expand == true ? 10 : 0),
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                height: (expand == true ? 70 : Dimensions.get('window').height - 250),
            }}>
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