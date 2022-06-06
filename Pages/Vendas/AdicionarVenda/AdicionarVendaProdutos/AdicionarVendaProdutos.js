import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, TextInput, Alert, Platform, ScrollView} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Ionicons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { Picker } from '@react-native-community/picker';
import { Parametros, ProcuraParam } from '../../../../Components/Parametro'
import { Loading } from '../../../../Components/Loader'
import Modal from "react-native-modal";

// Camera para o navegador 
import { CamBarCodeScanner } from '../../../../Components/CamBarCodeScanner';
// Camera para o celular/android/ios
import { BarCodeScanner } from 'expo-barcode-scanner';

import styles from './AdicionarVendaProdutosStyle';
import { FontAwesome5 } from '@expo/vector-icons'; 


var fffixed;
var palavra;


export default function AdicionarVendaProdutos( { navigation, route } ) {
  
  const [items, setItems] = React.useState([]);
  const [itemsTroca, setItemsTroca] = React.useState([]);
  const [showAddProd, setShowAddProd] = React.useState(false);
  const [pesquisar, setPesquisar] = React.useState('');
  const [listaAddProd, setListaAddProd] = React.useState('');
  const [showPropItems, setShowPropItems] = React.useState(false);
  const [qtde, setQtde] = React.useState('');
  const [vlUnitario, setVlUnitario] = React.useState(0);
  const [vlDesc, setVlDesc] = React.useState('');
  const [percDisc, setPercDisc] = React.useState('');
  const [prodEsc, setProdEsc] = React.useState('');
  const [emprEstq, setEmprEstq] = React.useState(1);
  const [emps, setEmps] = React.useState([]);
  const [obs, setObs] = React.useState('');
  const [vlTotalCompra, setVlTotalCompra] = React.useState(0);
  const [showModItem, setShowModItem] = React.useState(false);
  const [modItem, setModItem] = React.useState();
  const [load, setLoad] = React.useState(false);
  const [pesquisarPor, setPesquisarPor] = React.useState('NOME');
  const [showScanCodeBar, setShowScanCodeBar] = React.useState(false);
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);
  const [showTrocaProd, setShowTrocaProd] = React.useState(false)
  const [listaTrocaProd, setListaTrocaProd] = React.useState('');
  const [showlistaTroca, setShowlistaTroca] = React.useState(false);
  const [showPropItemsTroca, setShowPropItemsTroca] = React.useState(false);
  const [vlTotalTroca, setVlTotalTroca] = React.useState(0);
  const [showModItemTroca, setShowModItemTroca] = React.useState(false);
  const [contador, setContador] = React.useState(0);
  
  useEffect(() => {
    requestPermission()
    //SalvarAnterior()
    cmplEmps()
    
  }, []);

  async function requestPermission() {
    // pede permissão para usar a camera
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  }

  const cmplEmps = async () => {
    var data = JSON.stringify({
      "banco": await AsyncStorage.getItem('@banco'),
      "sql": `select c_emp, nome_pop from cd_emp`
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
        setEmps(respJson)
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  // Flatlist
  const myKeyExtractor = (item) => {
    return String(item.id)
  }

  // Items Render
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
          style={{
              backgroundColor: '#2c3b76',
              margin: 2,
              padding: 5
          }}
          onPress={()=>{
            setQtde(item.qtde);
            setVlUnitario(item.vlUnitario);
            setObs(item.obs)
            setEmprEstq(item.emprEstq)
            setVlDesc(item.vlDesc);
            setPercDisc(item.percDisc);
            setShowModItem(true); 
            setModItem(item)
          }}
      >
          <Text style={{color: "#FFF"}}>{`${item.qtde}   ${item.descricao}`}</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10
          }}>
            <Text style={{color: "#FFF"}}>{'R$ ' + String(Number(item.vlUnitario).toFixed(2))}</Text>
            
            <Text style={{color: "#FFF"}}>{'R$ ' + String(Number(item.vlEfetivo).toFixed(2))}</Text>
          </View>
      </TouchableOpacity>
    )
  }

  // Itens da troca Render
  const renderItemTroca = ({item}) => {
    return (
      <TouchableOpacity
          style={{
              backgroundColor: '#2c3b76',
              margin: 2,
              padding: 5
          }}
          onPress={()=>{
              setModItem(item)
              setShowModItemTroca(true)
          }}
      >
          <Text style={{color: "#FFF"}}>{`${item.qtde}   ${item.descricao} `}</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10
          }}>
            <Text style={{color: "#FFF"}}>{'R$ ' + String(Number(item.vlUnitario).toFixed(2))}</Text>
            
            <Text style={{color: "#FFF"}}>{'R$ ' + String(Number(item.vlEfetivo).toFixed(2))}</Text>
          </View>
      </TouchableOpacity>
    )
  }

  const renderAddItem = ({item}) => {

    return (
      <TouchableOpacity
          style={{
              backgroundColor: item.tp == 'P' ? '#2c3b76': '#DD6B55',
              margin: 2,
              padding: 5
          }}
          onPress={() => {
            let vlunit = 0;

            setProdEsc(item);
            setQtde(1);

            if (route.params.finalidade != 'BALANCO') {
              if (route.params.tp_preco == 1) {
                setVlUnitario(Number(item.pr_venda1).toFixed(2));
                vlunit = Number(item.pr_venda1).toFixed(2);
              } else if (route.params.tp_preco == 2) {
                setVlUnitario(Number(item.pr_venda2).toFixed(2));
                vlunit = Number(item.pr_venda2).toFixed(2);
              } else if (route.params.tp_preco == 3) {
                setVlUnitario(Number(item.pr_venda3).toFixed(2));
                vlunit = Number(item.pr_venda3).toFixed(2);
              }else{
                setVlUnitario(Number(item.pr_venda1).toFixed(2));
                vlunit = Number(item.pr_venda1).toFixed(2);
              }
            


              setObs('')

              if(ProcuraParam(91, 'par') == 'CALCULAR'){
                if (item.desconto > 0){
                  setVlDesc(String((Number(item.desconto) / 100 * vlunit).toFixed(2)));
                  setPercDisc(String(item.desconto));
                  
                } else {

                  if (route.params.tp_preco == 1) {
                    if (item.vl_desc != null) {
                      setVlDesc(String(item.vl_desc.toFixed(2)));
                      setPercDisc(String((Number(item.vl_desc) * 100 / vlunit).toFixed(2)));
                    } else {
                      setVlDesc('');
                      setPercDisc('');
                    }
                  } else if (route.params.tp_preco == 2) {
                    if (item.vl_desc2 != null) {
                      setVlDesc(String(item.vl_desc2.toFixed(2)));
                      setPercDisc(String((Number(item.vl_desc2) * 100 / vlunit).toFixed(2)));
                    } else {
                      setVlDesc('');
                      setPercDisc('');
                    }
                  } else if (route.params.tp_preco == 3) {
                    if (item.vl_desc3 != null) {
                      setVlDesc(String(item.vl_desc3.toFixed(2)));
                      setPercDisc(String((Number(item.vl_desc3) * 100 / vlunit).toFixed(2)));
                    } else {
                      setVlDesc('');
                      setPercDisc('');
                    }
                  }

                }

              } else {
                setVlDesc('');
                setPercDisc('');
              }
            }

            setShowPropItems(true)
          }}
      > 
          <Text style={{color: "#FFF"}}>{item.descricao}</Text>  
      </TouchableOpacity>
    )
  }

  // Render add Item troca
  const renderAddItemTroca = ({item}) => {
    return (
      <TouchableOpacity
          style={{
              backgroundColor: item.tp == 'P' ? '#2c3b76' : '#DD6B55',
              margin: 2,
              padding: 5
          }}
          onPress={() => {
            let vlunit = 0;

            if (route.params.finalidade != 'BALANCO') {
              setProdEsc(item);
              setQtde(1);

              if (route.params.tp_preco == 1) {
                setVlUnitario(Number(item.pr_venda1).toFixed(2));
                vlunit = Number(item.pr_venda1).toFixed(2);
              } else if (route.params.tp_preco == 2) {
                setVlUnitario(Number(item.pr_venda2).toFixed(2));
                vlunit = Number(item.pr_venda2).toFixed(2);
              } else if (route.params.tp_preco == 3) {
                setVlUnitario(Number(item.pr_venda3).toFixed(2));
                vlunit = Number(item.pr_venda3).toFixed(2);
              }

              setShowPropItemsTroca(true)
              setShowlistaTroca(false)
            }
          }}
      > 
          <Text style={{color: "#FFF"}}>{item.descricao}</Text>  
      </TouchableOpacity>
    )
  }

  const desconto = (a, text, txt) => {
    if (a == '%') {
      let descporc = (Number(text) / 100 * vlUnitario)
      setVlDesc(descporc.toFixed(2))

    } else if (a == '$') {
      let descporc = (Number(text) * 100 / vlUnitario)
      setPercDisc(descporc.toFixed(2))

    } else {

      let descporc = (Number(vlDesc) * 100 / txt)
      if (descporc != Infinity){
        setPercDisc(descporc.toFixed(2))
      }

    }

  }

  // Adiciona um Item
  const addItem = (item) => {
    let aux1 = false

    if (route.params.finalidade != 'BALANCO') {
      if (items.length > 0){
        
        for(let i = 0; i < items.length; i++) {
      
          if (items[i].c_pro == item.c_pro){
            alert('Este item já foi adicionado')
            aux1 = true
          }
        }
      }
  
      if (aux1 == false){
        if (item.vlUnitario <= 0){
            alert('Valor unitário zerado')
            aux1 = true
          }  
      } 
    }
    
    if (aux1 == false){
      let aux = items
      aux.push(item)
      // setVlTotalCompra(vlTotalCompra + item.vlEfetivo)
      attVlTotalCompra()
      setItems(aux)
    }
  }

  const obsItem = () => {
    if (ProcuraParam(764, 'parE') == 'S') {
      return(
        <View>
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
        </View>
      )
    }
  }

  const showCustomViewPropItems = () => {
    if (route.params.finalidade = 'BALANCO') 
    {
      return(
        <View style={{width: '100%', height: '100%'}}>
          <View style={{paddingTop: 6}}>  
              <Text>Quantidade</Text>
              <TextInput
                  style={styles.Input}
                  value={String(qtde)}
                  placeholder="Quantidade"
                  keyboardType="decimal-pad"
                  onChangeText={(text) => {
                      var numsStr = text.replace(/[^0-9||.]/g,'');
                      setQtde(numsStr)
                  }}
              />
              
              {estqempr()}

            </View>
        </View>              
      )
    }
    else
    {
      return(
        <View style={{width: '100%', height: '100%'}}>
          <View style={{paddingTop: 6}}>
              
              <Text>Quantidade</Text>
              <TextInput
                  style={styles.Input}
                  value={String(qtde)}
                  placeholder="Quantidade"
                  keyboardType="decimal-pad"
                  onChangeText={(text) => {
                      var numsStr = text.replace(/[^0-9||.]/g,'');
                      setQtde(numsStr)
                  }}
              />
              
              {estqempr()}

              <Text>Valor Unitário</Text>
              <TextInput
                  style={styles.Input}
                  value={String(vlUnitario)}
                  placeholder="Valor Unitário"
                  keyboardType="decimal-pad"
                  onChangeText={(text) => {
                      var numsStr = text.replace(/[^0-9||.]/g,'');
                      setVlUnitario(numsStr)
                      desconto('','',numsStr)
                  }}
              />
              
              <Text>Desconto</Text>
              <View style={{flexDirection: "row", width: '100%'}}>
                <TextInput
                    style={styles.InputM}
                    value={vlDesc}
                    placeholder="$ Desconto"
                    keyboardType="decimal-pad"
                    onChangeText={(text) => {
                        var numsStr = text.replace(/[^0-9||.]/g,'');
                        setVlDesc(numsStr)
                        desconto('$', numsStr)
                    }}
                />


                <TextInput
                    style={styles.InputM}
                    value={percDisc}
                    placeholder="% Desconto"
                    keyboardType="decimal-pad"
                    onChangeText={(text) => {
                      var numsStr = text.replace(/[^0-9||.]/g,'');
                        setPercDisc(numsStr)
                        desconto('%', numsStr)
                    }}
                />
          

                
              </View>

              {obsItem()}
              
              {/* <View style={styles.ViewNextAdd}>
                <TouchableOpacity 
                  style={{
                    height: 55,
                    borderRadius: 20,
                    alignContent: "center",
                    justifyContent: 'center',
                    backgroundColor: '#2c3b76',
                  }}
                  onPress={() => {
                      AdicionarProd()
                      setPesquisar('')
                  }}
                >
                    <Text style={styles.TextNext}>Adicionar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{
                    height: 55,
                    borderRadius: 20,      
                    backgroundColor: '#2c3b76',
                    alignContent: "center",
                    justifyContent: 'center',
                    marginRight: 10,
                    
                  }}
                  onPress={() => {
                    setShowPropItems(false)
                  }}
                >
                    <Text style={styles.TextNext}>Voltar</Text>
                </TouchableOpacity>
              </View> */}
              
          </View>
        </View>
      )
    }              
  }

  // Prop Troca
  const showCustomViewPropItemsTroca = () => {
    return(
      <View style={{width: '100%', height: '100%'}}>
        <View style={{paddingTop: 10}}>
            <Text>Quantidade</Text>
            <TextInput
                style={styles.Input}
                value={String(qtde)}
                placeholder="Quantidade"
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                    var numsStr = text.replace(/[^0-9||.]/g,'');
                    setQtde(numsStr)
                }}
            />
            
            {estqempr()}
            
            <Text>Valor Unitário</Text>
            <TextInput
                style={styles.Input}
                value={String(vlUnitario)}
                placeholder="Valor Unitário"
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                    var numsStr = text.replace(/[^0-9||.]/g,'');
                    setVlUnitario(numsStr)
                    desconto('','',numsStr)
                }}
            />
          
            {/* <View style={styles.ViewNextAdd}>
              <TouchableOpacity 
                style={{
                  height: 60,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#2c3b76',
                }}
                onPress={() => {
                    AdicionarTroca()
                    setPesquisar('')
                }}
              >
                  <Text style={styles.TextNext}>Adicionar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={{
                  height: 60,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',      
                  backgroundColor: '#2c3b76',
                  marginRight: 10,
                }}
                onPress={() => {
                  setShowPropItemsTroca(false)
                }}
              >
                  <Text style={styles.TextNext}>Voltar</Text>
              </TouchableOpacity>
            </View> */}
            
        </View>
      </View>
    )
  }

  const ListaTrocaCustomView = () => {
    return(
      <View style={{
        marginTop:30,
        height: 500,
        width: '100%',
      }}>
          <FlatList
              data={listaTrocaProd}
              style={{
                  paddingTop: 5,
                  backgroundColor: 'white',
              }}
              renderItem={renderAddItemTroca}
              keyExtractor={myKeyExtractor}
          />
          <View style={styles.ViewNextVolt}>
              <TouchableOpacity 
                style={{
                  height: 60,
                  borderRadius: 20, 
                  alignItems: 'center', 
                  justifyContent: 'center',     
                  backgroundColor: '#2c3b76',
                  width: '60%',
                  
                }}
                onPress={() => {
                  setShowlistaTroca(false)
                }}
              >
                  <Text style={styles.TextNext}>Voltar</Text>
              </TouchableOpacity>
            </View>
      </View>

    )
  }

  // Retorna data depois de determinados dias
  const FutureDay = (x) => {
    // Somar quantidade de dias com de hoje
    var data = new Date();
    data.setDate(data.getDate() + x);
      let dia = data.getDate().toString().padStart(2, '0')
      let mes = (data.getMonth()+1).toString().padStart(2, '0')
      let ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`
  }

  // Botão Adicionar Produto
  const AdicionarProd = async () => {

    setContador(contador+1);    
    
    if (prodEsc.tp == 'P'){ //se for produtos
      if (route.params.finalidade = 'BALANCO') {
        let vlTotal = Number(0);
        var prop = {
          c_gru: prodEsc.c_gru,
          c_pro: prodEsc.c_pro,
          c_depo: prodEsc.c_depo,
          custo_tabela: Number(0),
          descricao: prodEsc.descricao,
          id: prodEsc.id,
          margem: Number(0),
          margem2: Number(0),
          margem20: Number(0),
          margem30: Number(0),
          pr_venda1: Number(0),
          pr_venda2: Number(0),
          pr_venda3: Number(0),
          qtde_estq: prodEsc.qtde_estq,
          defeito: Number(0),
          tipo: prodEsc.tipo,
          qtde: Number(qtde),
          ref: prodEsc.ref,
          pr_medio: Number(0),
          pr_ult_cmp: Number(0),
          emprEstq: emprEstq,
          vlUnitario: Number(0),
          vlDesc: Number(0),
          percDisc: Number(0),
          obs: obs,
          ean: prodEsc.ean,
          digito: prodEsc.digito,
          dt_garantia: null,
          vlTotal: Number(0),
          vlEfetivo: Number(0),
          contador: contador,
          especificacao1: null 
            
        }
      }
      else
      {
        let vlTotal = Number(qtde) * vlUnitario
        var prop = {
          c_gru: prodEsc.c_gru,
          c_pro: prodEsc.c_pro,
          c_depo: prodEsc.c_depo,
          custo_tabela: prodEsc.custo_tabela,
          descricao: prodEsc.descricao,
          id: prodEsc.id,
          margem: prodEsc.margem,
          margem2: prodEsc.margem2,
          margem20: prodEsc.margem20,
          margem30: prodEsc.margem30,
          pr_venda1: prodEsc.pr_venda1,
          pr_venda2: prodEsc.pr_venda2,
          pr_venda3: prodEsc.pr_venda3,
          qtde_estq: prodEsc.qtde_estq,
          defeito: prodEsc.defeito,
          tipo: prodEsc.tipo,
          qtde: Number(qtde),
          ref: prodEsc.ref,
          pr_medio: prodEsc.pr_medio, 
          pr_ult_cmp: prodEsc.pr_ult_cmp,
          emprEstq: emprEstq,
          vlUnitario: vlUnitario,
          vlDesc: vlDesc,
          percDisc: percDisc,
          obs: obs,
          ean: prodEsc.ean,
          digito: prodEsc.digito,
          dt_garantia: null,
          vlTotal: vlTotal,
          vlEfetivo: vlTotal - vlDesc,
          contador: contador,
          especificacao1: espec1(), 
            
        }
      }

      if (ProcuraParam(158, 'par') == 'SV'){
        var data = JSON.stringify({
          "banco": await AsyncStorage.getItem('@banco'),
          "sql": `select * from cd_grupo where c_grupo = ${prodEsc.c_gru}`
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
            if (respJson[0].qtde_dias_garantia > 0){
              prop.dt_garantia = FutureDay(respJson[0].qtde_dias_garantia)
              addItem(prop)
              setShowPropItems(false)
            } else {

              if (prodEsc.tipo == 'S') {
                // pegar quantidade de dias no par 252
                prop.dt_garantia = FutureDay(Number(ProcuraParam(252, 'par')))
                addItem(prop)
                setShowPropItems(false)
              } else if (prodEsc.tipo == 'P'){
                // pegar quantidade de dias na par 338
                prop.dt_garantia = FutureDay(Number(ProcuraParam(338, 'par')))
                addItem(prop)
                setShowPropItems(false)
              }

            }
        })
        .catch(function (error) {
            console.log(error);
        });
      } else {
        //console.log('passou pelo adiciona item AdicionarProd')
        addItem(prop)
        setShowPropItems(false)
      }
    } else { //se for serviços
      if (route.params.finalidade = 'BALANCO') {
        alert('Não é possível incluir serviço no balanço');
      }
      else
      {
        var data = JSON.stringify({
          "banco": await AsyncStorage.getItem('@banco'),
          "sql": `select a.c_pro, a.qtde_estq, a.ean, a.digito, a.pr_venda1, a.pr_medio, a.pr_ult_cmp, a.pr_venda2, a.pr_venda3, a.custo_tabela, a.descricao, a.margem2, a.margem, a.margem20, a.margem30, a.c_gru, a.ref_fabricante, a.tipo, a.desconto, a.vl_desc, a.vl_desc2, a.vl_desc3, b.qtde from cd_pro a, cd_ikit b where b.c_kit = ${prodEsc.c_kit} and b.c_pro = a.c_pro and Ativo = 'S'`
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
            for(let val of respJson){
              let vlUnitario = Number(val.pr_venda2)
              let vlTotal = Number(val.qtde) * vlUnitario

              var prop = {
                c_gru: val.c_gru,
                c_pro: val.c_pro,
                c_depo: 1,
                custo_tabela: val.custo_tabela,
                descricao: val.descricao,
                id: val.c_pro,
                margem: val.margem,
                margem2: val.margem2,
                margem20: val.margem20,
                margem30: val.margem30,
                pr_venda1: val.pr_venda1,
                pr_venda2: val.pr_venda2,
                pr_venda3: val.pr_venda3,
                qtde_estq: val.qtde_estq,
                defeito: val.defeito,
                tipo: val.tipo,
                qtde: Number(val.qtde),
                ref: val.ref,
                pr_medio: val.pr_medio, 
                pr_ult_cmp: val.pr_ult_cmp,
                emprEstq: 1,
                vlUnitario: vlUnitario,
                vlDesc: '0',
                percDisc: '0',
                obs: '',
                ean: val.ean,
                digito: val.digito,
                dt_garantia: null,
                vlTotal: vlTotal,
                vlEfetivo: vlTotal - 0,
                contador: 0,
                especificacao1: espec1()
              }
              if (ProcuraParam(158, 'par') == 'SV'){
                {async () => {
                  var data = JSON.stringify({
                    "banco": await AsyncStorage.getItem('@banco'),
                    "sql": `select * from cd_grupo where c_grupo = ${val.c_gru}`
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
                      if (respJson[0].qtde_dias_garantia > 0){
                        prop.dt_garantia = FutureDay(respJson[0].qtde_dias_garantia)
                        addItem(prop)
                        setShowPropItems(false)
                      } else {
    
                        if (prodEsc.tipo == 'S') {
                          // pegar quantidade de dias no par 252
                          prop.dt_garantia = FutureDay(Number(ProcuraParam(252, 'par')))
                          addItem(prop)
                          setShowPropItems(false)
                        } else if (val.tipo == 'P'){
                          // pegar quantidade de dias na par 338
                          prop.dt_garantia = FutureDay(Number(ProcuraParam(338, 'par')))
                          addItem(prop)
                          setShowPropItems(false)
                        }
    
                      }
                  })
                  .catch(function (error) {
                      console.log(error);
                  });
                }}
                
              } else {
                console.log('else do SV')
                addItem(prop)
                setShowPropItems(false)

              }
            } 
        })
        .catch(function (error) {
            console.log(error);
        });
      } //else se não for balanço

    }//else dos serviços
  }

  const AdicionarTroca = async () => {
    let vlTotal = Number(qtde) * vlUnitario

    let prop = {
      c_gru: prodEsc.c_gru,
      c_pro: prodEsc.c_pro,
      custo_tabela: prodEsc.custo_tabela,
      descricao: prodEsc.descricao,
      id: prodEsc.id,
      margem: prodEsc.margem,
      margem2: prodEsc.margem2,
      margem20: prodEsc.margem20,
      margem30: prodEsc.margem30,
      pr_venda1: prodEsc.pr_venda1,
      pr_venda2: prodEsc.pr_venda2,
      pr_venda3: prodEsc.pr_venda3,
      qtde_estq: prodEsc.qtde_estq,
      defeito: prodEsc.defeito,
      tipo: prodEsc.tipo,
      qtde: Number(qtde),
      ref: prodEsc.ref,
      pr_medio: prodEsc.pr_medio, 
      pr_ult_cmp: prodEsc.pr_ult_cmp,
      emprEstq: emprEstq,
      vlUnitario: vlUnitario,
      ean: prodEsc.ean,
      digito: prodEsc.digito,
      vlTotal: vlTotal,
      vlEfetivo: vlTotal
    }
    let aux1 = false

    if (itemsTroca.length > 0){
      for(let i = 0; i < itemsTroca.length; i++) {
        if (itemsTroca[i].c_pro == prop.c_pro){
          alert('Este item já foi adicionado')
          aux1 = true
        }
      }
    }

    if (aux1 == false){
      let aux = itemsTroca
      aux.push(prop)
      setVlTotalTroca(vlTotalTroca + prop.vlEfetivo)
      setItemsTroca(aux)
    }
    setShowPropItemsTroca(false);
  }

  function espaco(palavra, tamanho, com_valor){
            
      let f = ''
      let branco = tamanho - palavra;
      for(let i in branco){
          f = f + ' ';
      }
      if (com_valor == false){
          return f
      } else {
          return f + palavra;
      }   
  }

  function pula_linha(mensagem){
      if (mensagem != ''){
          mensagem = mensagem + '\n\r';
      }
      
      return mensagem;
  }

  function espec1() {
      //contador = items.indexOf(modItem) // contagem

      let especifica = ''
      // Variaveis auxiliares ou ainda não usadas
      let aux_ean, ean_grapro, tamanho_pro;
      let casas_valor, tamanho_nr = '';
      
      if (ProcuraParam(273, 'par') == 4){
          especifica = String(contador) + espaco(String(contador),3,false);// contagem
          
          //Espaço
          especifica = especifica+' ';

          //ref
          if (prodEsc.ref == null){
            especifica = especifica+' ';
          } else {
            especifica = especifica+prodEsc.ref+' ';
          }

          if (tamanho_pro == '') {
              /*      Fazer Depois

              //Descrição do Produto
              if dm_variaveis.p_aumento_descricao = 'N' then
                      especifica:=especifica+descricao+fm_principal.espaco(descricao,29,false)
              else
              begin
                      especifica:=especifica+copy(descricao,1,29)+fm_principal.espaco(copy(descricao,1,29),29,false);
                      if copy(descricao,30,48) <> '' then
                      begin
                              especifica:=fm_principal.pula_linha(especifica);
                              especifica:=especifica+copy(descricao,30,48)+fm_principal.espaco(copy(descricao,30,48),48,false);
                      end;
                      //especifica:=especifica+descricao+fm_principal.espaco(descricao,60,false);
              end;
              */
          } else {    
              if (ProcuraParam(83, 'par') == 'N'){
                  especifica = especifica + prodEsc.descricao + espaco(prodEsc.descricao,27,false)
              } else {
                  especifica = especifica + (prodEsc.descricao).substr(1,26) + espaco((prodEsc.descricao).substr(1,26),26,false);
                  if ((prodEsc.descricao).substr(30,45) != '') {
                      especifica = pula_linha(especifica);
                      especifica = especifica+(prodEsc.descricao).substr(30,45)+espaco((prodEsc.descricao).substr(30,45),45,false);
                  }
              }
              
              // //Tamanho da peça
              // if (tamanho_pro != '' && tamanho_pro != undefined){
              //     especifica = especifica+' '+tamanho_pro.substr(1,2);
              // }

          }
        
          //qtde
          especifica=especifica+Number(qtde)+espaco(String(qtde),7,false);
          //'x'
          especifica=especifica+' x ';
          //valor unitário
          especifica=especifica+ floattostrf(vlUnitario) + espaco(String(floattostrf(vlUnitario)),8,false);
          especifica=pula_linha(especifica);
          //Espaço
          especifica=especifica+' ';
          if (vlDesc > 0){
              //palavra Desc
              especifica=especifica+'Desc';
              //Espaço
              especifica=especifica+' ';
              //valor do desconto
              especifica=especifica+ floattostrf(vlDesc) + espaco(String(floattostrf(vlDesc)),8,false);
              //Espaço
              especifica=especifica+' ';
          } else {
              for(let i in 16) {
                  especifica=especifica+' ';
              }
          }

          //valor total do item com o desconto
          especifica=especifica+floattostrf((vlUnitario * Number(qtde)) - vlDesc)+espaco(floattostrf((vlUnitario * qtde) - vlDesc),10,false);
          //Espaço
          especifica=especifica+' ';

          //05/04/2021
          if ((ProcuraParam(51, 'parE') == 'DESCRICAO_VISUREF') && ((prodEsc.ref).trim() != '')){
              especifica=especifica+' Ref: '+prodEsc.ref;
          }

          /* Não usa local
          if trim(local) <> ''  then
          begin
                  if (fm_principal.pe_usa_local_pro = 'PRO') or
                    (fm_principal.pe_usa_local_pro = 'GRAPRO') then
                          especifica:=especifica+' Local: '+local;
          end;
          */

      } else {
          //Contador 3 espaços
          if (ProcuraParam(273, 'par') == 3){
              especifica=String(contador)+')'+espaco(String(contador),3,false); // contagem
          } else {
              especifica=String(contador)+espaco(String(contador),3,false);// contagem
          }
                  
          //Espaço
          especifica=especifica+' ';
          //EAN do Produto aqui
          if (ProcuraParam(273, 'par') == 3){
              // não coloca ean
          } else {
              if (ProcuraParam(638, 'parE') == 'S'){
                  aux_ean=ean_grapro;
              } else {
                  aux_ean=prodEsc.ean;
                  
                      if (tamanho_nr > 0){
                          /*  
                          if (ProcuraParam(172, 'par') = 'EAN8') or
                              (ProcuraParam(172, 'par') = 'EAN8SEMPRI') then
                          begin
                                  try
                                          aux_ean:=aux_ean+
                                                      copy('00' + Trim(inttostr(cor_nr)),
                                                      Length(inttostr(cor_nr)) + 1, 2 )+
                                                      copy('00' + Trim(inttostr(tamanho_nr)),
                                                      Length(inttostr(tamanho_nr)) + 1, 2 );
                                  except
                                          aux_ean:=ean;
                                  end;
                          end
                          else
                          begin
                                  try
                                          aux_ean:=aux_ean+inttostr(tamanho_nr);
                                  except
                                          aux_ean:=ean;
                                  end;
                          end;
                          if digito_gra <> '' then
                          begin
                                  aux_ean:=aux_ean+digito_gra;
                          end;
                      */
                      
                      } else {
                          if (prodEsc.digito != '' && prodEsc.digito != null){
                              aux_ean=aux_ean+prodEsc.digito;
                          }

                      }

              }

              especifica=especifica+aux_ean+espaco(aux_ean,15,false);
          }
                  
          //Espaço
          especifica=especifica+' ';

          if (tamanho_pro == ''){
              //Descrição do Produto
              if (ProcuraParam(83, 'par') == 'N'){
                  especifica=especifica+prodEsc.descricao+espaco(prodEsc.descricao,29,false)
              } else {
                  especifica=especifica+(prodEsc.descricao).substr(1,29)+espaco((prodEsc.descricao).substr(1,29),29,false);
                  if ((prodEsc.descricao).substr(30,48) != ''){
                      especifica=pula_linha(especifica);
                      especifica=especifica+(prodEsc.descricao).substr(30,48)+espaco((prodEsc.descricao).substr(30,48),48,false);
                  }
                  //especifica:=especifica+descricao+fm_principal.espaco(descricao,60,false);
              }
              
          } else {
              if (ProcuraParam(83, 'par') == 'N'){
                  especifica=especifica+prodEsc.descricao+espaco(prodEsc.descricao,27,false)
              } else {
                  especifica=especifica+(prodEsc.descricao).substr(1,26)+espaco((prodEsc.descricao).substr(1,26),26,false);
                  if ((prodEsc.descricao).substr(30,45) != ''){
                      especifica=pula_linha(especifica);
                      especifica=especifica+(prodEsc.descricao).substr(30,45)+espaco((prodEsc.descricao).substr(30,45),45,false);
                  }
              }
          }

          // especifica=pula_linha(especifica);
          // //Tamanho da peça
          // if (tamanho_pro != ''){
          //     especifica=especifica+' '+tamanho_pro.substr(1,2);
          // }
          
          //cor da peça
          if ((ProcuraParam(172, 'par') == 'EAN8') || (ProcuraParam(172, 'par') == 'EAN8SEMPRI') || (ProcuraParam(638, 'parE') == 'S')) { //tennis trip
              let cor_pro, cor_aux
              
              getColor(cor_nr).then(res => {cor_aux = res})

              if (cor_aux.length > 0){
                  cor_pro=cor_aux[0].descricao
              } else {
                  cor_pro='';
              }

              especifica=especifica+' '+cor_pro.substr(1,20);
              especifica=pula_linha(especifica);
          }
          
          //qtde
          especifica=especifica+String(qtde)+espaco(String(qtde),7,false);
          //'x'
          especifica=especifica+' x ';
          //OUTRA LINHA
          //OUTRA LINHA
          switch(ProcuraParam(273, 'par')){
              case 0:
                  especifica=pula_linha(especifica);
              break;
              case 1:
                  especifica=pula_linha(especifica);
              break;
          }
              
          //valor unitário
          switch(casas_valor){
              case 0:
                  //especifica:=especifica+floattostrf(vl_unit,fffixed,18,2)+fm_principal.espaco(floattostrf(vl_unit,fffixed,18,2),8,false);
                  switch (ProcuraParam(273, 'par')){
                      case 0:
                          especifica=especifica+'A prazo: '+floattostrf(item.pr_venda2,18,2)+espaco(floattostrf(item.pr_venda2,18,2),8,false);
                          especifica=especifica+' ';
                          especifica=especifica+'A vista: '+floattostrf(item.pr_venda1,18,2)+espaco(floattostrf(item.pr_venda1,18,2),8,false);
                      break;
                      case 1:
                          especifica=especifica+'A prazo: '+floattostrf(item.pr_venda2,18,2)+espaco(floattostrf(item.pr_venda2,18,2),8,false);
                          especifica=especifica+' ';
                          especifica=especifica+'A vista: '+floattostrf(item.pr_venda1,18,2)+espaco(floattostrf(item.pr_venda1,18,2),8,false);
                      break;
                      case 2:
                          especifica=especifica+floattostrf(vlUnitario,18,2)+espaco(floattostrf(vlUnitario,18,2),8,false);
                      break;
                      case 3:
                          especifica=especifica+floattostrf(vlUnitario,18,2)+espaco(floattostrf(vlUnitario,18,2),8,false);
                      break;
                  }

              break;
              case 1:
                  //especifica:=especifica+floattostrf(vl_unit,fffixed,18,2)+fm_principal.espaco(floattostrf(vl_unit,fffixed,18,2),8,false);
                  switch(ProcuraParam(273, 'par')){
                      case 0:
                          especifica=especifica+'A prazo: '+floattostrf(item.pr_venda2,18,2)+espaco(floattostrf(item.pr_venda2,18,2),8,false);
                          especifica=especifica+' ';
                          especifica=especifica+'A vista: '+floattostrf(item.pr_venda1,18,2)+espaco(floattostrf(item.pr_venda1,18,2),8,false);
                      break;
                      case 1:
                          especifica=especifica+'A prazo: '+floattostrf(item.pr_venda2,18,2)+espaco(floattostrf(item.pr_venda2,18,2),8,false);
                          especifica=especifica+' ';
                          especifica=especifica+'A vista: '+floattostrf(item.pr_venda1,18,2)+espaco(floattostrf(item.pr_venda1,18,2),8,false);
                      break;
                      case 2:
                          especifica=especifica+floattostrf(vlUnitario,18,2)+espaco(floattostrf(vlUnitario,18,2),8,false);
                      break;
                      case 3:
                          especifica=especifica+floattostrf(vlUnitario,18,2)+espaco(floattostrf(vlUnitario,18,2),8,false);
                      break;
                  }
              break;
              case 2:
                  //especifica:=especifica+floattostrf(vl_unit,fffixed,18,2)+fm_principal.espaco(floattostrf(vl_unit,18,2),8,false);
                  switch (ProcuraParam(273, 'par')) {
                      case 0:
                          especifica=especifica+'A prazo: '+floattostrf(pr_venda2,fffixed,18,2)+espaco(floattostrf(pr_venda2,fffixed,18,2),8,false);
                          especifica=especifica+' ';
                          especifica=especifica+'A vista: '+floattostrf(pr_venda1,fffixed,18,2)+espaco(floattostrf(pr_venda1,fffixed,18,2),8,false);
                      break;
                      case 1:
                          especifica=especifica+'A prazo: '+floattostrf(pr_venda2,fffixed,18,2)+espaco(floattostrf(pr_venda2,fffixed,18,2),8,false);
                          especifica=especifica+' ';
                          especifica=especifica+'A vista: '+floattostrf(pr_venda1,fffixed,18,2)+fm_principal.espaco(floattostrf(pr_venda1,fffixed,18,2),8,false);
                      break;
                      case 2:
                          especifica=especifica+floattostrf(vlUnitario,fffixed,18,2)+espaco(floattostrf(vlUnitario,fffixed,18,2),8,false);
                      break;
                      case 3:
                          especifica=especifica+floattostrf(vlUnitario,fffixed,18,2)+espaco(floattostrf(vlUnitario,fffixed,18,2),8,false);
                      break;
                  }
              break;
              case 3:
                  //especifica:=especifica+floattostrf(vl_unit,fffixed,18,3)+fm_principal.espaco(floattostrf(vl_unit,fffixed,18,3),8,false);
                  switch (ProcuraParam(273, 'par')){
                      case 0:
                          especifica=especifica+'A prazo: '+floattostrf(pr_venda2,fffixed,18,2)+espaco(floattostrf(pr_venda2,fffixed,18,2),8,false);
                          especifica=especifica+' ';
                          especifica=especifica+'A vista: '+floattostrf(pr_venda1,fffixed,18,2)+espaco(floattostrf(pr_venda1,fffixed,18,2),8,false);
                      break;
                      case 1:
                          especifica=especifica+'A prazo: '+floattostrf(pr_venda2,fffixed,18,2)+espaco(floattostrf(pr_venda2,fffixed,18,2),8,false);
                          especifica=especifica+' ';
                          especifica=especifica+'A vista: '+floattostrf(pr_venda1,fffixed,18,2)+espaco(floattostrf(pr_venda1,fffixed,18,2),8,false);
                      break;
                      case 2:
                          especifica=especifica+floattostrf(vlUnitario,fffixed,18,2)+espaco(floattostrf(vlUnitario,fffixed,18,2),8,false);
                      break;
                      case 3:
                          especifica=especifica+floattostrf(vlUnitario,fffixed,18,2)+espaco(floattostrf(vlUnitario,fffixed,18,2),8,false);
                      break;
                  }
              break;
          }
          //OUTRA LINHA
          switch (ProcuraParam(273, 'par')){
              case 0:
                  especifica=pula_linha(especifica);
              break;
              case 1:
                  especifica=pula_linha(especifica);
              break;
              case 2:
                  especifica=pula_linha(especifica);
              break;
              case 3:
                  //especifica:=fm_principal.pula_linha(especifica);
              break;
          }
          if (vlDesc > 0){
              //palavra Desc
              especifica=especifica+'Desc';
              //Espaço
              especifica=especifica+' ';
              //valor do desconto
              especifica=especifica+floattostrf(vlDesc,fffixed,18,2)+espaco(floattostrf(vlDesc,fffixed,18,2),8,false);
              //Espaço
              especifica=especifica+' ';
          } else {
              for(let i in 16){
                  especifica=especifica+' ';
              }
          }
          
          //valor total do item com o desconto
          especifica=especifica+floattostrf((vlUnitario * qtde) - vlDesc,fffixed,18,2)+espaco(floattostrf((vlUnitario * qtde) - vlDesc,fffixed,18,2),10,false);
          //Espaço
          especifica=especifica+' ';

          //05/04/2021
          if ((ProcuraParam(51, 'parE') == 'DESCRICAO_VISUREF') && (String(prodEsc.ref).trim() != '')) {
              especifica=especifica+' Ref: '+prodEsc.ref;
          }
            
          /*
              Não precisa por enquanto

              //21/03/2021
              if trim(local) <> ''  then
              begin
                      if (fm_principal.pe_usa_local_pro = 'PRO') or
                      (fm_principal.pe_usa_local_pro = 'GRAPRO') then
                              especifica:=especifica+' Local: '+local;
              end;
          */
      }
      return especifica
  }

  const floattostrf = (vl,n,nCasas) => {
    return parseFloat(vl).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
  }

  const renderProductList = () => {
    return emps.map((product, key) => {
      return <Picker.Item key={key} label={product.nome_pop} value={product.c_emp} />
    })
    
  }

  const estqempr = () => {
    if (ProcuraParam(640, 'parE') == 'S' && ProcuraParam(747, 'parE') == 'S') {
      return(
        <Picker
            selectedValue={emprEstq}
            style={styles.selectFisJur}
            onValueChange={(itemValue, itemIndex) => {
                setEmprEstq(itemValue)
            }}>
            {
              renderProductList()
            }
        </Picker>
      ) 
    }
  }

  const showCustomViewAddProd = () => {
    return(
      <View style={{height: '100%', width: '100%'}}>
            <View 
                style={{height: 60, marginBottom: 10}}
            >
                <TextInput
                    style={styles.nomePesquisar}
                    value={pesquisar}
                   //onFocus={this.value=''}
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
                        onPress={()=>{
                          pesquisarProd(undefined, 'addItem')
                        }}
                        onLongPress={()=>{
                          if (pesquisarPor == 'CODEBAR'){
                            // Escanear codigo de barra
                            // erro
                            setShowScanCodeBar(true)
                            setScanned(false)
                          } 
                        }}  
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
                <Picker.Item label="CODIGO DE BARRAS" value="CODEBAR" />
            </Picker>
            <FlatList
                data={listaAddProd}
                style={styles.listaPop}
                renderItem={renderAddItem}
                keyExtractor={myKeyExtractor}
            />
            <View style={styles.ViewNextVolt}>
              <TouchableOpacity 
                style={{
                  height: 50,
                  borderRadius: 20, 
                  alignItems: 'center', 
                  justifyContent: 'center',     
                  backgroundColor: '#2c3b76',
                  width: '80%',
                }}
                onPress={() => {
                  setShowAddProd(false)
                }}
              >
                  <Text style={styles.TextNext}>Voltar</Text>
              </TouchableOpacity>
            </View>

        </View>
    )
  }
  const showCustomViewTrocaProd = () => {

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
                        onPress={()=>{pesquisarProd(undefined, 'troca')}}
                        onChangeText={(text) => {
                          setPesquisar(text)
                        }}                       
                        onLongPress={()=>{
                          if (pesquisarPor == 'CODEBAR'){
                            // Escanear codigo de barras
                            setShowScanCodeBar(true)
                            setScanned(false)
                          }
                        }}
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
                <Picker.Item label="CODIGO DE BARRAS" value="CODEBAR" />
            </Picker>
            <FlatList
                data={itemsTroca}
                style={styles.listaPop}
                renderItem={renderItemTroca}
                keyExtractor={myKeyExtractor}
            />
             <View style={styles.ViewNextVolt}>
              <TouchableOpacity 
                style={{
                  height: 50,
                  borderRadius: 20, 
                  alignItems: 'center', 
                  justifyContent: 'center',     
                  backgroundColor: '#2c3b76',
                  width:'80%',
                }}
                onPress={() => {
                  setShowTrocaProd(false)
                }}
              >
                  <Text style={styles.TextNext}>Voltar</Text>
              </TouchableOpacity>
            </View>
        </View>
    )
  }

  // Excluir Item
  const excluirItem = () => {
    let aux = items;
    aux.splice(aux.indexOf(modItem), 1);
    setItems(aux);
    setVlTotalCompra(vlTotalCompra - modItem.vlEfetivo);
  }

  // Excluir Item Troca
  const excluirItemTroca = () => {
    let aux = itemsTroca;
    aux.splice(aux.indexOf(modItem), 1);
    setItemsTroca(aux);
    setVlTotalTroca(vlTotalTroca - modItem.vlEfetivo);
  }

  // Salvar item
  const salvarModItem = () => {
    let vlTotal = qtde * vlUnitario

    items[items.indexOf(modItem)].qtde = qtde;
    items[items.indexOf(modItem)].vlUnitario = vlUnitario;
    items[items.indexOf(modItem)].obs = obs;
    items[items.indexOf(modItem)].emprEstq = emprEstq;
    items[items.indexOf(modItem)].vlDesc = vlDesc;
    items[items.indexOf(modItem)].percDisc = percDisc;
    items[items.indexOf(modItem)].vlTotal = vlTotal;
    items[items.indexOf(modItem)].vlEfetivo = vlTotal - vlDesc;
    items[items.indexOf(modItem)].especificacao1 = espec1();
    items[items.indexOf(modItem)].contador = contador;
    console.log('contador '+contador);

    // Atualiza o valor da venda
    attVlTotalCompra()
  }

  // Atualizar Vl total da compra
  const attVlTotalCompra = () => {
    let vlTot = 0
    for(let i=0; i < items.length; i++){
      vlTot += items[i].vlEfetivo
    }
    setVlTotalCompra(vlTot)
  }

  // Pesquisar Produto
  const pesquisarProd = async (pesq, tp) => {
    setLoad(true)
    let cod = ``  
       let aux = []
    let encontrou = 'N';
    let sqlWhere = '';
    let cod_sql = ``;

    if (pesq == undefined || pesq == null) {
      if (pesquisarPor == 'CODIGO') {
          cod = `select c_pro, qtde_estq, ean, digito, pr_venda1, pr_medio, pr_ult_cmp, pr_venda2, pr_venda3, custo_tabela, descricao, margem2, margem, margem20, margem30, c_gru, ref_fabricante, tipo, desconto, vl_desc, vl_desc2, vl_desc3 from cd_pro where c_pro = ${pesquisar} and ativo = 'S'`
      } else if (pesquisarPor == 'NOME'){
          let v = pesquisar.split(';')
          sqlWhere = '';
          
          for (let i in v){
              sqlWhere += `descricao like '%${v[i]}%'`
              if(v.length-1 != i){
                  sqlWhere += ' AND ' 
              }
          }
          cod = `select c_pro, qtde_estq, ean, digito, pr_venda1, pr_medio, pr_ult_cmp, pr_venda2, pr_venda3, custo_tabela, descricao, margem2, margem, margem20, margem30, c_gru, ref_fabricante, tipo, desconto, vl_desc, vl_desc2, vl_desc3 from cd_pro where ${sqlWhere} and ativo = 'S'`
      } else if (pesquisarPor == 'CODEBAR'){
          //cod = `select c_pro, qtde_estq, ean, digito, pr_venda1, pr_medio, pr_ult_cmp, pr_venda2, pr_venda3, custo_tabela, descricao, margem2, margem, margem20, margem30, c_gru, ref_fabricante, tipo, desconto, vl_desc, vl_desc2, vl_desc3 from cd_pro where ean + ISNULL(digito, '')  like '%${pesquisar}%' and ativo = 'S'`;
          cod = `select a.c_pro,a.qtde_estq, a.ean, a.digito, a.pr_venda1, a.pr_medio, a.pr_ult_cmp, a.pr_venda2, a.pr_venda3, a.custo_tabela, 
                    a.descricao, a.margem2, a.margem, a.margem20, a.margem30, a.c_gru, a.ref_fabricante, a.tipo, a.desconto, a.vl_desc, a.vl_desc2, 
                    a.vl_desc3 
                    from cd_pro a left join cd_grapro b ON a.c_pro = b.c_pro left join tb_pro_det c ON a.c_pro = c.c_pro 
                    where a.ativo = 'S' and 
                    ((a.ean + ISNULL(a.digito, '')  like '%${pesquisar}%') or 
                    (b.ean_grapro  like '%${pesquisar}%') or 
                    (c.campo_ean  like '%${pesquisar}%'))`;
      }
    } else {
     
      if (pesquisarPor == 'CODIGO') {
          cod = `select c_pro, qtde_estq, ean, digito, pr_venda1, pr_medio, pr_ult_cmp, pr_venda2, pr_venda3, custo_tabela, descricao, margem2, margem, margem20, margem30, c_gru, ref_fabricante, tipo, desconto, vl_desc, vl_desc2, vl_desc3 from cd_pro where c_pro = ${pesq} and  ativo = 'S'`
      } else if (pesquisarPor == 'NOME'){
          let v = pesq.split(';')
          sqlWhere = '';

          for (let i in v){
              sqlWhere += `descricao like '%${v[i]}%'`
              if(v.length-1 != i){
                  sqlWhere += ' AND ' 
              }
          };

          cod = `select c_pro, qtde_estq, ean, digito, pr_venda1, pr_medio, pr_ult_cmp, pr_venda2, pr_venda3, custo_tabela, descricao, margem2, margem, margem20, margem30, c_gru, ref_fabricante, tipo, desconto, vl_desc, vl_desc2, vl_desc3 from cd_pro where descricao like '%${sqlWhere}% and ativo = 'S'`;

      } else if (pesquisarPor == 'CODEBAR'){
        //editar
        //cod = `select c_pro, qtde_estq, ean, digito, pr_venda1, pr_medio, pr_ult_cmp, pr_venda2, pr_venda3, custo_tabela, descricao, margem2, margem, margem20, margem30, c_gru, ref_fabricante, tipo, desconto, vl_desc, vl_desc2, vl_desc3 from cd_pro where ean + ISNULL(digito, '')  like '%${pesq}%' where ativo = 'S'`;
        cod = `select a.c_pro,a.qtde_estq, a.ean, a.digito, a.pr_venda1, a.pr_medio, a.pr_ult_cmp, a.pr_venda2, a.pr_venda3, a.custo_tabela, 
                    a.descricao, a.margem2, a.margem, a.margem20, a.margem30, a.c_gru, a.ref_fabricante, a.tipo, a.desconto, a.vl_desc, a.vl_desc2, 
                    a.vl_desc3 
                    from cd_pro a left join cd_grapro b ON a.c_pro = b.c_pro left join tb_pro_det c ON a.c_pro = c.c_pro 
                    where a.ativo = 'S' and 
                    ((a.ean + ISNULL(a.digito, '')  like '%${pesq}%') or 
                    (b.ean_grapro  like '%${pesq}%') or 
                    (c.campo_ean  like '%${pesq}%'))`;
         }
    }

    /*busca na cd_pro*/
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
    
    return new Promise((resolve, reject) => {
      // Executa a requisição GET/post.
      axios(config)
      .then(response => {
      try {
        var respJson_pro = (JSON.parse(JSON.stringify(response.data)).recordset);
        resolve(response.data.JSON);
        if (respJson_pro.length <= 0) {
            (encontrou = 'N');
            alert('Produto não encontrado');
            setLoad(false);
        }
        else {
          let aux = []; //acrescentado olhando o vendaencontrada
          for(let i = 0; i <= respJson_pro.length-1; i++){
            encontrou = 'S';
            aux.push({
              id: respJson_pro[i].c_pro,
              c_pro: respJson_pro[i].c_pro,
              custo_tabela: respJson_pro[i].custo_tabela,
              descricao: respJson_pro[i].descricao,
              margem: respJson_pro[i].margem,
              margem2: respJson_pro[i].margem2,
              margem20: respJson_pro[i].margem20,
              margem30: respJson_pro[i].margem30,
              pr_venda1: respJson_pro[i].pr_venda1,
              pr_venda2: respJson_pro[i].pr_venda2,
              pr_venda3: respJson_pro[i].pr_venda3,
              qtde_estq: respJson_pro[i].qtde_estq,
              c_gru: respJson_pro[i].c_gru,
              tipo: respJson_pro[i].tipo,
              ref: respJson_pro[i].ref_fabricante,
              pr_medio: respJson_pro[i].pr_medio, 
              pr_ult_cmp: respJson_pro[i].pr_ult_cmp,
              ean: respJson_pro[i].ean,
              digito: respJson_pro[i].digito,
              desconto: respJson_pro[i].desconto, 
              vl_desc: respJson_pro[i].vl_desc, 
              vl_desc2: respJson_pro[i].vl_desc2, 
              vl_desc3: respJson_pro[i].vl_desc3,
              tp: 'P'
            });
          }; //for
          
          
          if (tp == 'troca'){
            // Se for troca
            setListaTrocaProd(aux);
            setShowlistaTroca(true);
          } else {
            // Se for para Adicionar Item
            setListaAddProd(aux);
          };  
          setLoad(false);
        }
        } catch (error) {
            reject(error);
            console.log(error);
            alert("[ERRO]");
            setLoad(false);
        }
      });
        
    }); //return
  }; //const
    
  // Escanear codigo de barras
  const scanCodeBar = () => {
    if (Platform.OS == "web"){
      return(
        <View style={{width: '100%', height: '100%', backgroundColor: '#2c3b76'}}>
          <CamBarCodeScanner
            on={!scanned}
            clock={200} // ms
            styleCam={{
              position: 'absolute',
              left: 0,  
              right: 0,
              top: 0,
              bottom: 0,
            }}
            type={'back'}
            onScan={(code)=>{
              handleBarCodeScanned(code)
            }}
          />
        </View>
      )
    } else {
      return(
        <View style={{width: '100%', height: '100%', backgroundColor: '#2c3b76'}}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          /> 
        </View>
      )
    }
  }

  // View custtom para excluir e modificar item
  const showCustomModItem = () => {
    if (route.params.finalidade = 'BALANCO') 
    {
      return (
        <View style={{width: '100%', height: '100%'}}>
  
          <ScrollView style={{paddingTop: 10}}>
              
              <Text>Quantidade</Text>
              <TextInput
                  style={styles.Input}
                  value={String(qtde)}
                  placeholder="Quantidade"
                  keyboardType="decimal-pad"
                  onChangeText={(text) => {
                      var numsStr = text.replace(/[^0-9||.]/g,'');
                      setQtde(numsStr)
                  }}
              />
              
              estqempr()
          </ScrollView>

        </View>
      )                
    }
    else
    {
      return (
      <View style={{width: '100%', height: '100%'}}>

        <ScrollView style={{paddingTop: 10}}>
            
            <Text>Quantidade</Text>
            <TextInput
                style={styles.Input}
                value={String(qtde)}
                placeholder="Quantidade"
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                    var numsStr = text.replace(/[^0-9||.]/g,'');
                    setQtde(numsStr)
                }}
            />
            
            {estqempr()}
            
            <Text>Valor Unitário</Text>
            <TextInput
                style={styles.Input}
                value={String(vlUnitario)}
                placeholder="Valor Unitário"
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                    var numsStr = text.replace(/[^0-9||.]/g,'');
                    setVlUnitario(numsStr)
                    desconto('','',numsStr)
                }}
            />
            
            <Text>Desconto</Text>
            <View style={{flexDirection: "row", width: '100%'}}>
              <TextInput
                  style={styles.InputM}
                  value={vlDesc}
                  placeholder="$ Desconto"
                  keyboardType="decimal-pad"
                  onChangeText={(text) => {
                      var numsStr = text.replace(/[^0-9||.]/g,'');
                      setVlDesc(numsStr)
                      desconto('$', numsStr)
                  }}
              />


              <TextInput
                  style={styles.InputM}
                  value={percDisc}
                  placeholder="% Desconto"
                  keyboardType="decimal-pad"
                  onChangeText={(text) => {
                      var numsStr = text.replace(/[^0-9||.]/g,'');
                      setPercDisc(numsStr)
                      desconto('%', numsStr)
                  }}
              />
             
            </View>

            {obsItem()}
            
        </ScrollView>

      </View>
      )
    }               
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(false)
    setShowScanCodeBar(false)
    setPesquisar(data.replace(/[^0-9]/g,''))
    pesquisarProd(data.replace(/[^0-9]/g,''))
  };

  const SalvarProx = async () => {
    let prox = true

    let vlVenda = 0;
    let vlProd=0, vlServ=0
    for (let val of items){
      if (val.tipo == 'P'){
        vlProd += val.vlEfetivo;
      } else {
        vlServ += val.vlEfetivo;
      }
    }
    if (ProcuraParam(706, 'parE') == 'S'){
      vlVenda = vlProd + vlServ;
    } else {
      vlVenda = vlProd;
    }
    let flag_haver, haver

    if (vlTotalTroca.toFixed(2) > vlVenda){
      if(ProcuraParam(96, 'par') == route.params.c_pessoa){
        prox = false;
        alert('Valor de troca é maior que o valor da venda!');
      } else {
        
        await AsyncAlert(vlTotalTroca, vlVenda).then((txt) => {
          if(txt.resp == "S"){
            flag_haver = 'S',
            haver = vlTotalTroca - vlVenda;
          } else {
            prox = false;
          }

        });

      }

    } else {
      flag_haver = 'N',
      haver = 0;
    }


    if(items.length == 0){
      prox = false
      alert('Selecione um Produto!')
    }

    if(prox){
      let prop = {
        Contato: route.params.Contato,
        haverPessoa: route.params.haverPessoa,
        c_fun: route.params.c_fun,
        c_obras: route.params.c_obras,
        c_pessoa: route.params.c_pessoa,
        dt_lanc: route.params.dt_lanc,
        finalidade: route.params.finalidade,
        situacao: route.params.situacao,
        tp_preco: route.params.tp_preco,
        defeito: route.params.defeito,
        obs: route.params.obs,
        flag_haver: flag_haver,
        haver: Number(haver).toFixed(2),
        items: items,
        troca: itemsTroca,
        vlTotalCompra: Number(vlTotalCompra).toFixed(2),
        vlTotalTroca: Number(vlTotalTroca).toFixed(2)
      }
  
      navigation.navigate('AdicionarVendaFinanceiro', prop)
    }

  }
  const SalvarAnterior = async () => {
    let prox = true

    let vlVenda = 0;
    let vlProd=0, vlServ=0
    for (let val of items){
      if (val.tipo == 'P'){
        vlProd += val.vlEfetivo;
      } else {
        vlServ += val.vlEfetivo;
      }
    }
    if (ProcuraParam(706, 'parE') == 'S'){
      vlVenda = vlProd + vlServ;
    } else {
      vlVenda = vlProd;
    }
    let flag_haver, haver

    if (vlTotalTroca.toFixed(2) > vlVenda){
      if(ProcuraParam(96, 'par') == route.params.c_pessoa){
        prox = false;
        alert('Valor de troca é maior que o valor da venda!');
      } else {
        
        await AsyncAlert(vlTotalTroca, vlVenda).then((txt) => {
          if(txt.resp == "S"){
            flag_haver = 'S',
            haver = vlTotalTroca - vlVenda;
          } else {
            prox = false;
          }

        });

      }

    } else {
      flag_haver = 'N',
      haver = 0;
    }


    if(items.length == 0){
      prox = false
      alert('Selecione um Produto!')
    }

    if(prox){
      let prop = {
        Contato: route.params.Contato,
        haverPessoa: route.params.haverPessoa,
        c_fun: route.params.c_fun,
        c_obras: route.params.c_obras,
        c_pessoa: route.params.c_pessoa,
        dt_lanc: route.params.dt_lanc,
        finalidade: route.params.finalidade,
        situacao: route.params.situacao,
        tp_preco: route.params.tp_preco,
        defeito: route.params.defeito,
        obs: route.params.obs,
        flag_haver: flag_haver,
        haver: Number(haver).toFixed(2),
        items: items,
        troca: itemsTroca,
        vlTotalCompra: Number(vlTotalCompra).toFixed(2),
        vlTotalTroca: Number(vlTotalTroca).toFixed(2)
      }
  
      navigation.navigate('AdicionarVendapropiedades', prop)
    }

  }

  const AsyncAlert = async (vlTotalTroca, vlVenda) => new Promise((resolve) => {
    Alert.alert(
      "Valor de troca é maior que o valor da venda!",
      "Deseja continuar?",
      [
        {
          text: "Não",
          onPress: async () => {
            resolve({resp: "N", flag_haver: null, haver: null});
          },
        },
        { 
          text: "Sim", 
          onPress: async () => {
            resolve({resp: "S", flag_haver: "S", haver: vlTotalTroca - vlVenda});
          }
        }

      ],
      { cancelable: false },
    );

    
  });

  return (
    <View style={styles.container}>
        <StatusBar style="dark"/>

        <Loading 
            show={load}
            onDismiss={()=>{
                setLoad(false)
            }}
        />

        <AwesomeAlert
            show={showTrocaProd}
            closeOnTouchOutside={true}
            showCancelButton={false}
            contentContainerStyle={{width: 400, height: '80%'}}
            customView={showCustomViewTrocaProd()}
            contentStyle={{height: '100%'}}
            onDismiss={() => {
              setShowTrocaProd(false);
            }}
            // onRequestClose={()=>{
            //   setShowTrocaProd(false);
            // }}
        />

        <AwesomeAlert
            show={showAddProd}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            contentContainerStyle={{width: 400, height: '80%'}}
            customView={showCustomViewAddProd()}
            contentStyle={{height: '100%'}}
            onDismiss={() => {
              setShowAddProd(false);
            }}
            // onRequestClose={()=>{
            //   setShowAddProd(false);
            // }}
        />

        <AwesomeAlert
            show={showPropItems}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="Voltar"
            confirmButtonStyle={{marginLeft:8, height: 60, width: 130, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginTop: 40,  backgroundColor: '#2c3b76'}}
            confirmButtonTextStyle={ {fontSize: 22, textAlign: 'center', fontWeight: 'bold'}}
            cancelButtonTextStyle={{ fontSize: 25, textAlign: 'center', fontWeight: 'bold'}}
            cancelButtonStyle={{marginRight:8, height: 60, width: 130, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginTop: 40,  backgroundColor: '#2c3b76' }}
            confirmText="Adicionar"
            contentContainerStyle={{width: 450, height: 450}}
            customView={showCustomViewPropItems()}
            contentStyle={{height: '70%'}}
            onDismiss={() => {
              setShowPropItems(false);
            }}
            onCancelPressed={() => {
              setShowPropItems(false);
              setPesquisar('')
            }}
            onConfirmPressed={() => {
              console.log('onConfirmPressed');
              AdicionarProd()
              setPesquisar('')
            }}

            // onRequestClose={()=>{
            //   setShowPropItems(false);
            // }}
        />

        {/* O erro está nesse alert */ }
        { <AwesomeAlert
            show={showScanCodeBar}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            contentContainerStyle={{width: 450}}
            customView={scanCodeBar()}
            contentStyle={{height: '100%', width: '100%', backgroundColor: 'transparent'}}
            onDismiss={() => {  
              setShowScanCodeBar(false);
              setScanned(false);
            }}
            onRequestClose={()=>{
              setShowScanCodeBar(true);
              setScanned(false);
            }}
        /> }
{/*<Modal 
          isVisible={showScanCodeBar} 
          onDismiss={() => {
            setShowScanCodeBar(false);
            setScanned(false)
          }}
          onRequestClose={()=>{
            setShowScanCodeBar(false);
            setScanned(false)
          }}
          onBackdropPress={()=>{
            setShowScanCodeBar(false);
            setScanned(false)
          }}
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
            {scanCodeBar()}
        </Modal>*/}

        <AwesomeAlert
            show={showPropItemsTroca}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="Voltar"
            confirmButtonStyle={{marginLeft:8, height: 60, width: 130, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginTop: 40,  backgroundColor: '#2c3b76'}}
            confirmButtonTextStyle={ {fontSize: 22, textAlign: 'center', fontWeight: 'bold'}}
            cancelButtonTextStyle={{ fontSize: 25, textAlign: 'center', fontWeight: 'bold'}}
            cancelButtonStyle={{marginRight:8, height: 60, width: 130, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginTop: 40,  backgroundColor: '#2c3b76' }}
            confirmText="Adicionar"
            contentContainerStyle={{width: 450, height: 400}}
            customView={showCustomViewPropItemsTroca()}
            contentStyle={{height: '50%'}}
            onDismiss={() => {
              setShowPropItemsTroca(false);
            }}
            onCancelPressed={() => {
              setShowPropItemsTroca(false);;
              setPesquisar('')
            }}
            onConfirmPressed={() => {
              AdicionarTroca()
              setPesquisar('')
            }}
        />

        <AwesomeAlert
            show={showlistaTroca}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            contentContainerStyle={{width: 450, height: '90%'}}
            customView={ListaTrocaCustomView()}
            contentStyle={{height: '100%'}}
            onDismiss={() => {
              setShowlistaTroca(false);
            }}
            onRequestClose={()=>{
              setShowlistaTroca(false);
            }}
        />
          
        <AwesomeAlert
            show={showModItem}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            confirmButtonStyle={{width: 100, alignItems: 'center', backgroundColor: '#2c3b76'}}
            confirmButtonTextStyle={{fontSize: 20}}
            cancelButtonTextStyle={{fontSize: 20}}
            cancelText="Excluir"
            confirmText="Salvar"
            contentContainerStyle={{width: 450, height: '80%'}}
            customView={showCustomModItem()}
            contentStyle={{height: '90%'}}
            onDismiss={() => {
                setShowModItem(false)
            }}
            onRequestClose={()=>{
                setShowModItem(false)
            }}
            onCancelPressed={()=>{ // Excluir
                setShowModItem(false)
                excluirItem()
            }}
            onConfirmPressed={()=>{ // Salvar
                setShowModItem(false)
                salvarModItem()
            }}
        />

        <AwesomeAlert
          show={showModItemTroca}
          showProgress={false}
          title="Deseja excluir este item?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Cancelar"
          confirmText="Excluir"
          confirmButtonColor='#2c3b76'
          onCancelPressed={() => {
            setShowModItemTroca(false)
          }}
          onConfirmPressed={() => {
            setShowModItemTroca(false)
            excluirItemTroca()
          }}
          onDismiss={() => {
            setShowModItemTroca(false)
          }}
        />

        <FlatList
            data={items}
            style={styles.listaPop}
            renderItem={renderItem}
            keyExtractor={myKeyExtractor}
        />

        <View style={{
          marginTop: 10,
          position: 'relative',
        }}>
            <TouchableOpacity
                style={{
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#2c3b76',
                }}
                onPress={()=>{
                  setShowAddProd(true)
                }}
            >   
                <Text style={styles.TextNext}>+</Text>
            </TouchableOpacity>

            {(route.params.finalidade == 'OS' || route.params.finalidade == 'VE') && (ProcuraParam(362, 'par') == 'S') ? (
              <TouchableOpacity
                  style={{
                    height: 40,
                    width: 50,
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#black',
                    right: 0,
                  }}
                  onPress={()=>{
                    setShowTrocaProd(true)
                  }}
              >   
                  <FontAwesome5 name="people-arrows" size={24} color="white" />
              </TouchableOpacity>
            ) : null}
        </View> 

        <View style={{
          paddingBottom: 20,
          paddingTop: 10
        }}>
          <Text style={styles.TextValor}>{'R$ ' + String(Number(vlTotalCompra).toFixed(2))}</Text>
          <Text style={styles.TextTroca}>{'R$ ' + String(Number(vlTotalTroca).toFixed(2))}</Text>
        </View>
    
        <View style={styles.ViewNext}>
            <TouchableOpacity 
                style={styles.ButtonNext}
                onPress={() => {
                    SalvarProx();
                }}
            >
                    <Text style={styles.TextNext}>Próximo</Text>
            </TouchableOpacity>
        </View>

    </View>
  );
}