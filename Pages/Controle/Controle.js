import { StatusBar } from 'expo-status-bar';
import React,  {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import MaskInput, {Masks} from 'react-native-mask-input';
import styles from './ControleStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import AwesomeAlert from 'react-native-awesome-alerts';
import { Ionicons } from '@expo/vector-icons'; 
import { Loading } from '../../Components/Loader'

export default function ControleEstoque( { navigation,route } ) {
  
  const [Dt_lanc, setDt_lanc] = React.useState(FutureDay(0));
  const [load, setLoad] = React.useState(false)
  const [fornecedor, setFornecedor] = useState('')
  const [ShowtrocarFornecedor, setShowtrocarFornecedor] = useState('false')
  const [fornecedorList, setFornecedorList] = useState([])
  const [pesquisarF, setPesquisarF] = useState('')
  const [c_pessoa, setC_pessoa] = useState('');


  useEffect(() => {
    getUser()
  }, []);



  // Salvar Venda no Banco
//     const  salvar = async (vendaCompleta) => {
        
        
//         let prox = true
//         let sql = "";
//         let tp_mov, classe = null;

//         tp_mov='B';
//         classe='C';    

//         // Venda
//         let dataLancCpl = (vendaCompleta.dt_lanc).split('/')
//         sql += `INSERT INTO cd_mve (c_pessoa, situacao, dt_lancamento, finalidade, vl_total, flag_p, vl_efetivo, tp_preco, vl_desc, perc_desc, vl_acres, perc_acres, c_fun_op, vl_frete, vl_outros, hr_lancamento, c_trm, tp_mov, classe) VALUES (${vendaCompleta.c_pessoa}, 'EM ANDAMENTO', CONVERT(DATETIME, '${dataLancCpl[2]}-${dataLancCpl[1]}-${dataLancCpl[0]}'), '${vendaCompleta.finalidade}', ${vlTotal == "" || vlTotal == null || vlTotal == undefined ? 0 : vlTotal},  'N', ${vlEfetivo == null || vlEfetivo == "" || vlEfetivo == undefined ? 0 : vlEfetivo}, ${vendaCompleta.tp_preco}, ${vlDesc == "" || vlDesc == null || vlDesc == undefined ? 0 : vlDesc}, ${percDisc == "" || percDisc == null || percDisc == undefined ? 0 : percDisc}, ${vlAcr == "" || vlAcr == null || vlAcr == undefined ? 0 : vlAcr }, ${(vlAcr * 100) / Number(vlTotal)}, ${c_user}, ${vlFrete}, ${outros}, CONVERT(DATETIME, '${`${("0" + DataHr.getHours()).slice(-2)}:${("0" + DataHr.getMinutes()).slice(-2)}`}'), 999, ${tp_mov != null ? `'${tp_mov}'` : null}, ${classe != null ? `'${classe}'` : null});`

//         // Variáveis
//         sql += 'DECLARE @xmve as int; select @xmve = SCOPE_IDENTITY ()  from cd_mve;'

//         // Produtos
//         for(let j in vendaCompleta.items){
//           sql += `INSERT INTO cd_imve (c_mve, contador, c_pro, qtde, vl_unit, flag_p, vl_efetivo, entregue, vl_total, tp_preco, descricao, c_trm, c_depo) 
//           VALUES (@xmve, ${vendaCompleta.items[j].contador}, ${vendaCompleta.items[j].c_pro}, ${vendaCompleta.items[j].qtde}, ${vendaCompleta.items[j].vlUnitario}, 'N', ${vendaCompleta.items[j].vlEfetivo}, 'S', ${Number(0)}, ${vendaCompleta.tp_preco}, '${vendaCompleta.items[j].descricao}', 999, ${vendaCompleta.items[j].emprEstq});`
//           console.log('sql '+sql);
//         }
        
        
//         var data = JSON.stringify({
//             "banco": await AsyncStorage.getItem('@banco'),
//             "sql": sql
//         });

//         var config = {
//             method: 'post',
//             rl: await AsyncStorage.getItem('@apiTran'),
//             headers: { 
//                 'Content-Type': 'application/json'
//             },
//             data : data
//         };

//         axios(config)
//             .then(function (response) {
//                 setLoad(false)
//                     let respJson = JSON.parse(JSON.stringify(response.data));
//                 if (respJson != "Transaction committed"){
//                     alert(respJson)
//                 } else {
//                     alert('Balanço salvo com sucesso!')
//                 navigation.navigate('Home')
//                 }
//         })
//         .catch(function (error) {
//             console.log(error);
//             setLoad(false)
//             alert('[ERRO]')
//         });
//     if(prox){navigation.navigate('ControleItens', prop)}
//     console.log()
//   }
   // TELA DE PESQUISA DO FORNECEDOR
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
                        style={styles.ButtonControle}
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

  function renderFornecedor({ item }) {
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
                onPress={() => {
                    setShowtrocarFornecedor(false);
                    setFornecedor(item.nome);
                    setC_pessoa(item.c_pessoa);
                } }
            >
                <Text style={{ color: '#fff' }}>{item.nome}</Text>
            </TouchableOpacity>
        );
    }

 

 // Flatlist
 const myKeyExtractor = (item) => {
    return String(item.id)
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

  // retorna quantidade data daqui x dias
  function FutureDay(x){
    var data = new Date();
    data.setDate(data.getDate() + Number(x));
    let dia = data.getDate().toString().padStart(2, '0')
    let mes = (data.getMonth()+1).toString().padStart(2, '0')
    let ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`
  }

  const SalvarProx = () => {

    let prox = true

    console.log('começo do balanço');

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
            situacao: "EM ANDAMENTO",
            dt_lanc: Dt_lanc,
            obs: obs
        }
    
        navigation.navigate('ControleItens1', prop)
    }

}

  



    // // Capturar o usuario
    // const getUser = async () => {
    //     setUser(await AsyncStorage.getItem('@c_username'))            
    // }

    // // Adicionar User como padrão
    // const setUser = async (c_user) => {
    //     var data = JSON.stringify({
    //         "banco": await AsyncStorage.getItem('@banco'),
    //         "sql": `select * from cd_usu where c_fun = ${c_user}`
    //     });

    //     var config = {
    //         method: 'post',
    //         url: await AsyncStorage.getItem('@api'),
    //         headers: { 
    //             'Content-Type': 'application/json'
    //         },
    //         data : data
    //     };

    // }
    
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
            

            <ScrollView>

                <Text>Situação</Text>
                <TextInput
                    style={styles.Input}
                    editable={false}
                    value="EM ANDAMENTO"
                    placeholder="Situação"
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
                            style={styles.ButtonControle}
                            onPress={()=>{setShowtrocarFornecedor(true)}}
                        >
                            <Ionicons name="ios-search" size={25} color="white" />    
                        </TouchableOpacity>
                    </View>
                </View>

                <Text>Finalidade</Text>
                    <TextInput
                        style={styles.Input}
                        editable={false}
                        value="BALANCO"
                        placeholder="Finalidade"
                />

                <Text style={{paddingTop: 10}}>Data de Mov.</Text>
                <MaskInput
                    value={Dt_Lanc}
                    placeholder='DD/MM/AAAA'
                    keyboardType= 'numeric'
                    style={styles.Input}
                    onChangeText={(masked) => {
                        setDt_lanc(masked);
                    }}
                    mask={Masks.DATE_DDMMYYYY}
                />
                    

                <View style={styles.ViewNext}>
                    <TouchableOpacity 
                        style={styles.ButtonNext}
                        onPress={() => {
                            
                        }}
                    >
                            <Text style={styles.TextNext}>Salvar</Text>
                    </TouchableOpacity>
                </View>

                

            </ScrollView>

        </View>
    );
}