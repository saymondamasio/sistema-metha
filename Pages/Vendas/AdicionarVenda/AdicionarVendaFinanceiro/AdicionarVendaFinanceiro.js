import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import styles from './AdicionarVendaFinanceiroStyle';
import { Picker } from '@react-native-community/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import AwesomeAlert from 'react-native-awesome-alerts';
import MaskInput, {Masks} from 'react-native-mask-input';
import { Parametros, ProcuraParam } from '../../../../Components/Parametro'
import { Loading } from '../../../../Components/Loader'
import { _parseCSSDimensionValues } from 'quagga';

var numExc = 0
let DataHr = new Date()

export default function AdicionarVendaFinanceiro( { navigation, route } ) {

  const [vlDesc, setVlDesc] = React.useState('')
  const [percDisc, setPercDisc] = React.useState('')
  const [vlTotal, setVlTotal] = React.useState(String(Number(route.params.vlTotalCompra).toFixed(2)))
  const [vlEfetivo, setVlEfetivo] = React.useState(String(Number(route.params.vlTotalCompra).toFixed(2)))
  const [vlAcr, setVlAcr] = React.useState(0)
  const [outros, setOutros] = React.useState(0)
  const [modalPag, setModalPag] = React.useState('P')
  const [pagList, setPagList] = React.useState([])
  const [showModFinan, setShowModFinan] = React.useState(false)
  const [modFinanValor, setModFinanValor] = React.useState()
  const [modFinanTp_titulo, setModFinanTp_titulo] = React.useState()
  const [modFinanData, setModFinanData] = React.useState()
  const [finanList, setFinanList] = React.useState([])
  const [modFinanNbanco, setModFinanNbanco] = React.useState('')
  const [modFinanAgencia, setModFinanAgencia] = React.useState('')
  const [modFinanConta, setModFinanConta] = React.useState('')
  const [modFinanNr_doc_liq, setModFinanNr_doc_liq] = React.useState('')
  const [modFinanVl_cheque, setModFinanVl_cheque] = React.useState('')
  const [modFinanEmitente, setModFinanEmitente] = React.useState('')
  const [modFinanCpf_cgc, setModFinanCpf_cgc] = React.useState('')
  const [modFinanNrCob, setModFinanNrCob] = React.useState('')
  const [finanItem, setFinanItem] = React.useState({})
  const [modFinanCartao, setModFinanCartao] = React.useState('P')
  const [cartaoLista, setCartaoLista] = React.useState([])
  const [modFinanContaBanc, setModFinanContaBanc] = React.useState('P')
  const [contaLista, setContaLista] = React.useState([])
  const [vlFrete, setVlFrete] = React.useState(0)
  const [showSalvarParcelas, setShowSalvarParcelas] = React.useState(false)
  const [c_user, setC_user] = React.useState(0)
  const [load, setLoad] = React.useState(false)
  const [haver, setHaver] = React.useState(route.params.haver)
  const [flag_haver, setFlag_haver] = React.useState(route.params.flag_haver)

  useEffect(() => {
    
    if (route.params.vlTotalCompra - route.params.vlTotalTroca - Number(route.params.haverPessoa)< 0){
      setVlEfetivo(0.00)
    } else {
      setVlEfetivo(route.params.vlTotalCompra - route.params.vlTotalTroca - Number(route.params.haverPessoa))
    }

    renderModalPagList()
    renderCartaoContaLista()
    setUser()
  }, []);

  // Calcula o valor do desconto
  const desconto = (a, text, txt) => {
    if (a == '%') {
      let descporc = (Number(text) / 100 * vlTotal)
      setVlDesc(descporc.toFixed(2))
      
    } else if (a == '$') {
      let descporc = (Number(text) * 100 / vlTotal)
      setPercDisc(descporc.toFixed(2))

    } else {
      let descporc = (Number(vlDesc) * 100 / txt)
      if (descporc != Infinity){
        setPercDisc(descporc.toFixed(2))
      }

    }
  }

  // Outros
  const addoutros = () => {
    if (ProcuraParam(529, 'parE') == 'S'){
      return(
        <View>
            <Text>Valor Outros</Text>
            <TextInput
                style={styles.Input}
                value={String(outros)}
                placeholder="Outros"
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                    var numsStr = text.replace(/[^0-9||.]/g,'');
                    setOutros(numsStr)
                    attVlEfetivo(vlTotal, vlDesc, vlAcr, numsStr, vlFrete)
                }}
            />
        </View>
      )
    }
  }

  // Capturar o usuario
  const setUser = async () => {
    setC_user(await AsyncStorage.getItem('@c_username'))
  }

  // Frete
  const addFrete = () => {
    if (ProcuraParam(518, 'parE') == 'S'){
      return(
        <View>
          <Text>Valor Frete</Text>
          <TextInput
              style={styles.Input}
              value={String(vlFrete)}
              placeholder="Frete"
              keyboardType="decimal-pad"
              onChangeText={(text) => {
                  var numsStr = text.replace(/[^0-9||.]/g,'');
                  setVlFrete(numsStr)
                  if (ProcuraParam(520, 'parE') == 'S') {
                    attVlEfetivo(vlTotal, vlDesc, vlAcr, outros, numsStr)
                  }
              }}
          />
        </View>
      )
    }
  }

  const addVlTroca = () => {
    if (ProcuraParam(362, 'par') == 'S'){
      return(
        <View>
          <Text>Valor Troca</Text>
          <TextInput
              style={styles.Input}
              value={String(Number(route.params.vlTotalTroca).toFixed(2))}
              placeholder="Valor Troca"
              editable={false}
          />

          <View style={{
              alignItems: 'flex-end'
          }}>
              <Text style={{marginTop: -5}}>Haver da Troca</Text>
              <TextInput
                  style={styles.InputHaver}
                  value={String(Number(haver).toFixed(2))}
                  placeholder="Valor Troca"
                  editable={false}
              />

              <Text style={{marginTop: -5}}>Credito em Haver</Text>
              <TextInput
                  style={styles.InputHaver}
                  value={String(Number(route.params.haverPessoa).toFixed(2))}
                  placeholder="Valor Troca"
                  editable={false}
              />
          </View>
        </View>
      )
    }
  }

  // Carrega os cartões e as contas
  const renderCartaoContaLista = async() => {

    // Cartão
    var data = JSON.stringify({
      "banco": await AsyncStorage.getItem('@banco'),
      "sql": `SELECT c_cartao, nome FROM cd_cartao WHERE (ativo = 'S')`
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
        setCartaoLista(respJson)
    })
    .catch(function (error) {
        console.log(error);
    });

    // Contas
    var data = JSON.stringify({
      "banco": await AsyncStorage.getItem('@banco'),
      "sql": `SELECT c_ccr, nome, banco, ativo FROM cd_ccr where ativo = 'S'`
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
        setContaLista(respJson)
    })
    .catch(function (error) {
        console.log(error);
    });

  }

  // Atualizar Vl Efetivo
  const attVlEfetivo = (vlTotal, vlDesc, vlAcr, vloutros, vlFrete) => {
    let aux

    if (ProcuraParam(520, 'parE') == 'S' && ProcuraParam(518, 'parE') == 'S'){
      aux = Number(vlTotal) - Number(vlDesc) + Number(vlAcr) + Number(vloutros) - Number(route.params.vlTotalTroca)
      aux = aux - Number(route.params.haverPessoa) // Haver da pessoa
      setHaver(route.params.vlTotalTroca - (Number(vlTotal) - Number(vlDesc) + Number(vlAcr) + Number(vloutros) - Number(route.params.haverPessoa)))
    } else {
      aux = Number(vlTotal) - Number(vlDesc) + Number(vlAcr) + Number(vloutros) + Number(vlFrete) - Number(route.params.vlTotalTroca)
      aux = aux - Number(route.params.haverPessoa) // Haver da pessoa
      setHaver(route.params.vlTotalTroca - (Number(vlTotal) - Number(vlDesc) + Number(vlAcr) + Number(vloutros) + Number(vlFrete) - Number(route.params.haverPessoa)))
    }

    if (aux.toFixed(2) < 0){
      setVlEfetivo(0.00)
      setFlag_haver('S')
    } else {
      setVlEfetivo(aux.toFixed(2))
      setHaver(0)
      setFlag_haver('N')
    }
    
  }

  // Procura e adiciona as modalidades de pagamento
  const renderModalPagList = async () => {

    var data = JSON.stringify({
      "banco": await AsyncStorage.getItem('@banco'),
      "sql": `select c_mpg, descricao, tp_preco from cd_mpg`
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
        setPagList(respJson)

    })
    .catch(function (error) {
        console.log(error);
    });

  }
  const pesqMp = async (c_mpg) => {
    if (c_mpg != 'P'){
      var data = JSON.stringify({
        "banco": await AsyncStorage.getItem('@banco'),
        "sql": `SELECT c_itensmpg, c_mpg, porcentagem, dias, nr_parcela, tp_titulo FROM cd_itensmpg where c_mpg = ${c_mpg}`
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
          cplFinan(respJson)
  
      })
      .catch(function (error) {
          console.log(error);
      });
    } else {
      setFinanList([])
    }
  }
  const cplFinan = (respJson) => {
    let aux = []
    let vlPag = 0

    for (let i=0; i < respJson.length; i++) {
      let data = FutureDay(respJson[i].dias)
      let valor

      if (ProcuraParam(520, 'parE') == 'S' && ProcuraParam(518, 'parE') == 'S'){    
        if (i == respJson.length - 1) {
          // Ultimo
          valor = (Number(vlEfetivo) + Number(vlFrete)) - vlPag
          valor = valor.toFixed(2)
        } else {
          // Restante
          valor = (respJson[i].porcentagem / 100) * (Number(vlEfetivo) + Number(vlFrete))
          valor = valor.toFixed(2)
          vlPag += Number(valor)
        }

      } else {
        if (i == respJson.length - 1) {
          valor = Number(vlEfetivo) - vlPag
          valor = valor.toFixed(2)
        } else {
          valor = (respJson[i].porcentagem / 100) * Number(vlEfetivo)
          valor = valor.toFixed(2)
          vlPag += Number(valor)
        }

      }

      aux.push({
        id: i, 
        data: data, 
        tp_titulo: respJson[i].tp_titulo,
        valor: valor,
        nbanco: '',
        agencia: '',
        conta: '',
        nr_doc_liq: '',
        vl_cheque: '',
        emitente: '',
        cpf_cnpj: '',
        nr_doc_cob: '',
        c_cartao: '',
        c_ccr: ''
      })
    }
    setFinanList(aux)
  }

  // retorna quantidade data daqui x dias
  const FutureDay = (x) => {
    var data = new Date();
    data.setDate(data.getDate() + Number(x));
      let dia = data.getDate().toString().padStart(2, '0')
      let mes = (data.getMonth()+1).toString().padStart(2, '0')
      let ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`
  }

  //Completar Banco
  const cplDadosModFinan = () => {
    if (modFinanTp_titulo == 'CH' || modFinanTp_titulo == 'CP'){
      return(
        <View>

          <Text>Número do banco</Text>
          <TextInput
              style={styles.Input}
              value={String(modFinanNbanco)}
              placeholder="Número do banco"
              keyboardType="numeric"
              onChangeText={(text) => {
                setModFinanNbanco(text)
              }}
          />

          <Text>Agência</Text>
          <TextInput
              style={styles.Input}
              value={String(modFinanAgencia)}
              placeholder="Agência"
              onChangeText={(text) => {
                setModFinanAgencia(text)
              }}
          />

          <Text>Conta</Text>
          <TextInput
              style={styles.Input}
              value={String(modFinanConta)}
              placeholder="Conta"
              onChangeText={(text) => {
                setModFinanConta(text)
              }}
          />

          <Text>Número do Cheque</Text>
          <TextInput
              style={styles.Input}
              value={String(modFinanNr_doc_liq)}
              placeholder="Número do Cheque"
              onChangeText={(text) => {
                setModFinanNr_doc_liq(text)
              }}
          />  

          <Text>Emitente</Text>
          <TextInput
              style={styles.Input}
              value={String(modFinanEmitente)}
              placeholder="Emitente"
              onChangeText={(text) => {
                setModFinanEmitente(text)
              }}
          /> 

          <Text>CPF/CNPJ do Emitente</Text>
          <TextInput
              style={styles.Input}
              value={String(modFinanCpf_cgc)}
              placeholder="CPF/CNPJ"
              keyboardType="numeric"
              onChangeText={(text) => {
                setModFinanCpf_cgc(text)
              }}
          /> 
          
          <Text>Valor do cheque</Text>
          <TextInput
              style={styles.Input}
              value={String(modFinanVl_cheque)}
              placeholder="Valor do cheque"
              keyboardType="decimal-pad"
              onChangeText={(text) => {
                var numsStr = text.replace(/[^0-9||.]/g,'');
                setModFinanVl_cheque(numsStr)
              }}
          />

        </View>
      )
    } else if (modFinanTp_titulo == 'BO'){
      return(
        <View>
          <Text>Número de Cobrança</Text>
          <TextInput
              style={styles.Input}
              value={String(modFinanNrCob)}
              placeholder="Número de Cobrança"
              keyboardType="numeric"
              onChangeText={(text) => {
                setModFinanNrCob(text)
              }}
          /> 
        </View>
      )
    } else if (modFinanTp_titulo == 'CC'){
      return(
        <View>
          <Text>Banco</Text>
          <Picker
            selectedValue={modFinanCartao}
            style={styles.select}
            onValueChange={(itemValue, itemIndex) => {
                setModFinanCartao(itemValue)
            }}>
              <Picker.Item label="Escolha o Cartão" value="P" />
              {
                cartaoLista.map((product) => {
                  return <Picker.Item key={product.c_cartao} label={product.nome} value={product.c_cartao} />
                })
              }
          </Picker>
        </View>
      )
    } else if (modFinanTp_titulo == 'DP'){
      return(
        <View>
          <Text>Conta</Text>
          <Picker
            selectedValue={modFinanContaBanc}
            style={styles.select}
            onValueChange={(itemValue, itemIndex) => {
                setModFinanContaBanc(itemValue)
            }}>
              <Picker.Item label="Escolha a Conta" value="P" />
              {
                contaLista.map((product) => {
                  return <Picker.Item key={product.c_ccr} label={product.nome} value={product.c_ccr} />
                })
              }
          </Picker>
        </View>
      )
    }

  }

  // Salvar no Banco de Dados
  const salvar = async () => {

    let vendaCompleta = {
      Contato: route.params.Contato,
      c_fun: route.params.c_fun,
      c_obras: route.params.c_obras,
      c_pessoa: route.params.c_pessoa,
      defeito: route.params.defeito,
      dt_lanc: route.params.dt_lanc,
      finalidade: route.params.finalidade,
      items: route.params.items,
      obs: route.params.obs,
      situacao: route.params.situacao,
      tp_preco: route.params.tp_preco,
      vlTotalProdutos: route.params.vlTotalCompra,
      troca: route.params.troca,
      vlTotalTroca: route.params.vlTotalTroca,
      flag_haver: route.params.flag_haver,
      haver: route.params.haver,
      vlTotalVenda: vlTotal,
      vlDescVenda: vlDesc,
      percDiscVenda: percDisc,
      vlAcrVenda: vlAcr,
      vlOutrosVenda: outros,
      vlFreteVenda: vlFrete,
      c_mpg: modalPag,
      financeiro: finanList,
      vlEfetivoVenda: vlEfetivo,
    }

    if (ProcuraParam(520, 'parE') == 'S' && ProcuraParam(518, 'parE') == 'S'){
      if (ValorFinan().toFixed(2) == Number(vlEfetivo).toFixed(2) + Number(vlFrete).toFixed(2)){
        salvarBanco(vendaCompleta)
         
      } else {
        if (finanList.length == 0){
          salvarBanco(vendaCompleta)
        } else {
          alert('Valores não coincidem!')
        }
      }
    } else {
      if (ValorFinan().toFixed(2) == Number(vlEfetivo).toFixed(2)){
        salvarBanco(vendaCompleta)

      } else {
        if (finanList.length == 0){
          salvarBanco(vendaCompleta)
        } 
        else {
          alert('Valores não coincidem!')
        }
      }
    } 

  }

  // Pega o ultimo caixa aberto
  const procurarCaixa = async () => {
    var data = JSON.stringify({
        "banco": await AsyncStorage.getItem('@banco'),
        "sql": `SELECT TOP (1) c_tcx, c_fun, dt_abert, hr_abert, dt_fech, hr_fech FROM cd_tcx WHERE (dt_fech IS NULL)`
    });

    var config = {
        method: 'post',
        url: await AsyncStorage.getItem('@api'),
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };

    return axios(config)
    .then(function (response) {
        let respJson = (JSON.parse(JSON.stringify(response.data)).recordset);
        return respJson[0].c_tcx
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  // Salvar Venda no Banco
  const  salvarBanco = async (vendaCompleta) => {
    setLoad(true)
    const caixa = await procurarCaixa().then();

    let sql = "";
    let tp_mov, classe, haverpgto, usa_haverpgto, credito, creditopgto, usa_creditopgto = null
    
    // Props da Venda
        if (vendaCompleta.finalidade == 'DEVOL_VENDA'){
            tp_mov='E';
            classe='C';

            if (route.params.haverPessoa > 0){  
              haverpgto=route.params.haverPessoa;
              usa_haverpgto='S';
            } else {
              haverpgto=0;
              usa_haverpgto='N';
            }

            credito=0;
            creditopgto=0;
            usa_creditopgto='N';    
        } else {
            if (vendaCompleta.finalidade == 'GARANTIA'){
                tp_mov='S';
                classe='C';
                if (route.params.haverPessoa > 0){  
                  haverpgto=route.params.haverPessoa;
                  usa_haverpgto='S';
                } else {
                  haverpgto=0;
                  usa_haverpgto='N';
                }

                credito=0;
                creditopgto=0;
                usa_creditopgto='N';
            } else {
                if (vendaCompleta.finalidade == 'TRANSF_EMP'){
                    tp_mov='T';
                    classe='C';
                    if (route.params.haverPessoa > 0){  
                      haverpgto=route.params.haverPessoa;
                      usa_haverpgto='S';
                    } else {
                      haverpgto=0;
                      usa_haverpgto='N';
                    }

                    credito=0;
                    creditopgto=0;
                    usa_creditopgto='N';

                } else {
                    tp_mov='S';
                    classe='V';
                    if ((vendaCompleta.finalidade == 'OR') || (vendaCompleta.finalidade == 'RESGATE_PONTOS')) {
                        if (route.params.haverPessoa > 0){  
                          haverpgto=route.params.haverPessoa;
                          usa_haverpgto='S';
                        } else {
                          haverpgto=0;
                          usa_haverpgto='N';
                        }

                        credito=0;
                        creditopgto=0;
                        usa_creditopgto='N';
                    }

                }

            }
            
        }


    // Venda
    let dataLancCpl = (vendaCompleta.dt_lanc).split('/')
    sql += `INSERT INTO cd_mve (c_pessoa, situacao, dt_lancamento, finalidade, vl_total, contato, flag_p, c_fun, c_mpg, c_tcx, tp_titulo, vl_efetivo, tp_preco, vl_desc, perc_desc, vl_acres, perc_acres, c_fun_op, vl_frete, vl_outros, hr_lancamento, c_trm, tp_mov, classe, haver, flag_haver, usa_haverpgto, credito, creditopgto, usa_creditopgto, total_troca, haverpgto) VALUES (${vendaCompleta.c_pessoa}, 'EM ANDAMENTO', CONVERT(DATETIME, '${dataLancCpl[2]}-${dataLancCpl[1]}-${dataLancCpl[0]}'), '${vendaCompleta.finalidade}', ${vlTotal == "" || vlTotal == null || vlTotal == undefined ? 0 : vlTotal}, ${vendaCompleta.Contato == "" ? null : `'${vendaCompleta.Contato}'`}, 'N', ${vendaCompleta.c_fun}, ${modalPag == 'P' ? null : modalPag}, ${caixa}, '${getTp_titulo()}', ${vlEfetivo == null || vlEfetivo == "" || vlEfetivo == undefined ? 0 : vlEfetivo}, ${vendaCompleta.tp_preco}, ${vlDesc == "" || vlDesc == null || vlDesc == undefined ? 0 : vlDesc}, ${percDisc == "" || percDisc == null || percDisc == undefined ? 0 : percDisc}, ${vlAcr == "" || vlAcr == null || vlAcr == undefined ? 0 : vlAcr }, ${(vlAcr * 100) / Number(vlTotal)}, ${c_user}, ${vlFrete}, ${outros}, CONVERT(DATETIME, '${`${("0" + DataHr.getHours()).slice(-2)}:${("0" + DataHr.getMinutes()).slice(-2)}`}'), 999, ${tp_mov != null ? `'${tp_mov}'` : null}, ${classe != null ? `'${classe}'` : null}, ${haver == undefined ? null : haver}, ${flag_haver != null ? `'${flag_haver}'` : null}, ${usa_haverpgto != null ? `'${usa_haverpgto}'` : null}, ${credito == undefined ? null : credito}, ${creditopgto == undefined ? null : creditopgto}, ${usa_creditopgto != null ? `'${usa_creditopgto}'` : null}, ${vendaCompleta.vlTotalTroca}, ${route.params.haverPessoa > (Number(vlTotal) - Number(vlDesc) + Number(vlAcr) + Number(outros) + Number(vlFrete) - Number(route.params.vlTotalTroca)) ? (Number(vlTotal) - Number(vlDesc) + Number(vlAcr) + Number(outros) + Number(vlFrete) - Number(route.params.vlTotalTroca)) : route.params.haverPessoa});`

    // Variáveis
    sql += 'DECLARE @xmve as int; select @xmve = SCOPE_IDENTITY ()  from cd_mve;'

        // Financeiro
        if (finanList.length != 0){
          for(let i in finanList){
            let dataCpl = (finanList[i].data).split('/')
  
            let desc = `Venda '+CAST(@xmve as varchar)+' do dia ${vendaCompleta.dt_lanc}`
            sql += `INSERT INTO cd_mvfinAndam (valor, dt_emissao, dt_venc, c_pessoa, r_p, tp_titulo, vl_juros, vl_desc, vl_outros, situacao, nr_boleto, vl_efetivo, lanc_ccr, lanc_lvcx, c_fun, c_cce, c_plc, nr_doccob, nr_docliq, agencia, nbanco, conta, c_ccr, descricao, consolidado, avulso, c_tcx, c_mve, c_cartao, cpf_cgc_ch, emitente) VALUES (${finanList[i].valor}, CONVERT(DATETIME, '${dataLancCpl[2]}-${dataLancCpl[1]}-${dataLancCpl[0]}'), CONVERT(DATETIME, '${dataCpl[2]}-${dataCpl[1]}-${dataCpl[0]}'), ${vendaCompleta.c_pessoa}, 'R', '${finanList[i].tp_titulo}', 0, 0, 0, 'A', ${finanList[i].nr_doc_cob == undefined || finanList[i].nr_doc_cob == '' ? null : finanList[i].nr_doc_cob}, ${finanList[i].valor}, '${ProcuraParam(21, 'par')}', '${ProcuraParam(20, 'par')}', ${vendaCompleta.c_fun}, ${ProcuraParam(66, 'par')}, ${ProcuraParam(67, 'par')}, ${finanList[i].nr_doc_cob == undefined || finanList[i].nr_doc_cob == '' ? null : finanList[i].nr_doc_cob}, ${finanList[i].nr_doc_liq == undefined || finanList[i].nr_doc_liq == '' ? null : `'${finanList[i].nr_doc_liq}'`}, ${finanList[i].agencia == undefined || finanList[i].agencia == '' ? null : `'${finanList[i].agencia}'`}, ${finanList[i].nbanco == undefined || finanList[i].nbanco == '' ? null : finanList[i].nbanco}, ${finanList[i].conta == undefined || finanList[i].conta == '' ? null : finanList[i].conta}, ${ProcuraParam(21, 'par') == 'S' ? ProcuraParam(22, 'par') : 0}, '${desc}', 'N', 'N', ${caixa}, @xmve, ${finanList[i].c_cartao == 'P' || finanList[i].c_cartao == '' ? null : `'${finanList[i].c_cartao}'`}, ${finanList[i].cpf_cnpj == undefined || finanList[i].cpf_cnpj == '' ? null : finanList[i].cpf_cnpj}, ${finanList[i].emitente == undefined || finanList[i].emitente == '' ? null : `'${finanList[i].emitente}'`});`
          }
        }

        // Produtos
        for(let j in vendaCompleta.items){
          sql += `INSERT INTO cd_imve (c_mve, contador, c_pro, qtde, vl_unit, pr_venda1, pr_venda2, pr_venda3, flag_p, pr_custo, vl_desc, perc_desc, vl_efetivo, entregue, vl_total, tp_preco, descricao, margem2, c_trm, c_depo, especificacao1) VALUES (@xmve, ${vendaCompleta.items[j].contador}, ${vendaCompleta.items[j].c_pro}, ${vendaCompleta.items[j].qtde}, ${vendaCompleta.items[j].vlUnitario}, ${vendaCompleta.items[j].pr_venda1}, ${vendaCompleta.items[j].pr_venda2}, ${vendaCompleta.items[j].pr_venda3}, 'N', ${ProcuraParam(709, 'parE') == 'S' ? vendaCompleta.items[j].pr_medio : vendaCompleta.items[j].pr_ult_cmp}, ${vendaCompleta.items[j].vlDesc == "" ? 0 : vendaCompleta.items[j].vlDesc}, ${vendaCompleta.items[j].percDisc == "" ? 0 : vendaCompleta.items[j].percDisc}, ${vendaCompleta.items[j].vlEfetivo}, 'S', ${Number(vendaCompleta.items[j].vlUnitario) * vendaCompleta.items[j].qtde}, ${vendaCompleta.tp_preco}, '${vendaCompleta.items[j].descricao}', ${vendaCompleta.items[j].margem2}, 999, ${vendaCompleta.items[j].emprEstq}, ${vendaCompleta.items[j].especificacao1 == null || vendaCompleta.items[j].especificacao1 == '' ? null : `'${vendaCompleta.items[j].especificacao1}'`});`
          console.log('sql '+sql);
        }
        
        // Troca
        for (let c in vendaCompleta.troca){
          // SQL insert cd_tro
          
          // verifica se tem algum produto na troca
          if (vendaCompleta.troca.length > 0){
            sql += `INSERT INTO cd_tro (c_mve, c_pro ,qtde, vl_unit ,vl_total, vl_efetivo, c_imve, flag_p, p1, total_p1, p2, total_p2, p3, total_p3, pr_custo) VALUES (@xmve, ${vendaCompleta.troca[c].c_pro}, ${vendaCompleta.troca[c].qtde}, ${vendaCompleta.troca[c].vlUnitario} ,${vendaCompleta.troca[c].vlTotal}, ${vendaCompleta.troca[c].vlEfetivo}, 0, 'N', ${vendaCompleta.troca[c].pr_venda1}, ${vendaCompleta.troca[c].pr_venda1 * vendaCompleta.troca[c].qtde}, ${vendaCompleta.troca[c].pr_venda2}, ${vendaCompleta.troca[c].pr_venda2 * vendaCompleta.troca[c].qtde}, ${vendaCompleta.troca[c].pr_venda3}, ${vendaCompleta.troca[c].pr_venda3 * vendaCompleta.troca[c].qtde}, ${vendaCompleta.troca[c].custo_tabela});`;
          }

        }

    var data = JSON.stringify({
      "banco": await AsyncStorage.getItem('@banco'),
      "sql": sql
    });

    var config = {
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
        let respJson = JSON.parse(JSON.stringify(response.data));
        if (respJson != "Transaction committed"){
          alert(respJson)
        } else {
          alert('Venda salva com sucesso!')
          navigation.navigate('Home')
        }
    })
    .catch(function (error) {
        console.log(error);
        setLoad(false)
        alert('[ERRO]')
    });

    console.log()
  }

  // Verifica Valor total do Financeiro
  const ValorFinan = () => {
    let vlTt = 0

    for(let i=0; i < finanList.length; i++){
      vlTt += parseFloat(finanList[i].valor)
    }

    return vlTt

  }

  // Excluir item do Financeiro
  const excluirItemFinan = () => {
    if (Object.keys(finanItem).length != 0){
      let aux = finanList
      aux.splice(aux.indexOf(finanItem), 1);
      setFinanList(aux)
      numExc++
    }
  }

  // Add ou salvar item Finan
  const salvarAddItemFinan = () => {
    if (Object.keys(finanItem).length == 0){
        // Add
        let obj = {
          "agencia": modFinanAgencia,       
          "c_cartao": modFinanCartao,    
          "c_ccr": modFinanContaBanc,
          "conta": modFinanConta,
          "cpf_cnpj": modFinanCpf_cgc,
          "data": modFinanData,
          "emitente": modFinanEmitente,
          "id": (finanList.length+numExc+1),
          "nbanco": modFinanNbanco,
          "nr_doc_cob": modFinanNrCob,
          "nr_doc_liq": modFinanNr_doc_liq,
          "tp_titulo": modFinanTp_titulo,
          "valor": modFinanValor,
          "vl_cheque": modFinanVl_cheque,
        }
        finanList.push(obj)
    } else {
        // Salvar
        if (modFinanCartao != 'P' && modFinanCartao != undefined && modFinanCartao != ''){
          setShowSalvarParcelas(true)
        }

        finanList[finanList.indexOf(finanItem)].agencia = modFinanAgencia
        finanList[finanList.indexOf(finanItem)].c_cartao = modFinanCartao
        finanList[finanList.indexOf(finanItem)].c_ccr = modFinanContaBanc
        finanList[finanList.indexOf(finanItem)].conta = modFinanConta
        finanList[finanList.indexOf(finanItem)].cpf_cnpj = modFinanCpf_cgc
        finanList[finanList.indexOf(finanItem)].emitente = modFinanEmitente
        finanList[finanList.indexOf(finanItem)].nbanco = modFinanNbanco
        finanList[finanList.indexOf(finanItem)].nr_doc_cob = modFinanNrCob
        finanList[finanList.indexOf(finanItem)].nr_doc_liq = modFinanNr_doc_liq
        finanList[finanList.indexOf(finanItem)].tp_titulo = modFinanTp_titulo
        finanList[finanList.indexOf(finanItem)].data = modFinanData
        finanList[finanList.indexOf(finanItem)].valor = modFinanValor
        finanList[finanList.indexOf(finanItem)].vl_cheque = modFinanVl_cheque
    }
  }

  function getTp_titulo(){
    let tp_titulo

    if (finanList.length == 0){
      tp_titulo = 'OU'
    } else {
      tp_titulo = finanList.length >= 0 ? finanList[0].tp_titulo : null 
      for(let i in finanList){
          if (tp_titulo != finanList[i].tp_titulo){
              tp_titulo = 'OU'
          }
      }
    }
    
    return tp_titulo

  }

  // Atualizar cartões
  const AttCC = () => {
      for(let i=0; i < finanList.length; i++){
          if (finanList[i].tp_titulo == "CC") {
              finanList[i].c_cartao = modFinanCartao
          }
      }
  }

  // Custom View Modificar Financeiro
  const showCustomViewModFinan = () => {

    return(
      <View style={{height: '100%', width: '100%'}}>

          <ScrollView>
            <Text>Data</Text>
            <MaskInput
                value={modFinanData}
                placeholder='Data de Lançamento'
                keyboardType= 'numeric'
                style={styles.Input}
                onChangeText={(masked, unmasked, obfuscated) => {
                    setModFinanData(masked);
                }}
                mask={Masks.DATE_DDMMYYYY}
            />

            <Text>Tipo de Título</Text>
            <Picker
              selectedValue={modFinanTp_titulo}
              style={styles.select}
              onValueChange={(itemValue, itemIndex) => {
                setModFinanTp_titulo(itemValue)
                setModFinanNbanco('')
                setModFinanAgencia('')
                setModFinanConta('')
                setModFinanNr_doc_liq('')
                setModFinanVl_cheque('')
                setModFinanNrCob('')
                setModFinanEmitente('')
                setModFinanCpf_cgc('')
                setModFinanCartao('P')
                setModFinanContaBanc('P')
              }}>
                <Picker.Item label="DI" value="DI" />
                <Picker.Item label="BO" value="BO" />
                <Picker.Item label="CH" value="CH" />
                <Picker.Item label="CP" value="CP" />
                <Picker.Item label="CC" value="CC" />
                <Picker.Item label="CA" value="CA" />
                <Picker.Item label="NP" value="NP" />
                <Picker.Item label="DP" value="DP" />
            </Picker>

            <Text>Valor</Text>
            <TextInput
                style={styles.Input}
                value={String(modFinanValor)}
                placeholder="Valor"
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  var numsStr = text.replace(/[^0-9||.]/g,'');
                  setModFinanValor(numsStr);
                }}
            />

            {cplDadosModFinan()}

          </ScrollView>

      </View>
    )
  }

  // Pega Valor restante
  const valorMax = () => {
    if (ProcuraParam(520, 'parE') == 'S' && ProcuraParam(518, 'parE') == 'S'){  
      return Number(vlEfetivo - ValorFinan() + Number(vlFrete)).toFixed(2)
    } else {
      return Number(vlEfetivo - ValorFinan()).toFixed(2)
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
            show={showModFinan}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            confirmButtonStyle={styles.confirmButtonStyle}
            confirmButtonTextStyle={{fontSize: 20}}
            cancelButtonTextStyle={{fontSize: 20}}
            cancelText="Excluir"
            confirmText="Salvar"
            contentContainerStyle={{width: 450, height: '80%'}}
            customView={showCustomViewModFinan()}
            contentStyle={{height: '90%'}}
            onDismiss={() => {
              setShowModFinan(false);
            }}
            onRequestClose={()=>{
              setShowModFinan(false);
            }}
            onCancelPressed={()=>{ // Excluir
              setShowModFinan(false);
              excluirItemFinan()
            }}
            onConfirmPressed={()=>{ // Salvar
              setShowModFinan(false);
              salvarAddItemFinan()
            }}
        />

        <AwesomeAlert
            show={showSalvarParcelas}
            showProgress={false}
            title="Deseja salvar este cartão para todas as parcelas?"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="Não"
            confirmText="Sim"
            confirmButtonColor="#2c3b76"
            cancelButtonColor="#8c94b4"
            confirmButtonStyle={{width: 100, alignItems: 'center'}}
            cancelButtonStyle={{width: 100, alignItems: 'center'}}
            onCancelPressed={() => {
                setShowSalvarParcelas(false)
            }}
            onConfirmPressed={() => {
                setShowSalvarParcelas(false)
                AttCC()
            }}
            onDismiss={() => {
                setShowSalvarParcelas(false)
            }}
        />

        <ScrollView>
          <Text>Valor Total</Text>
          <TextInput
              style={styles.Input}
              value={String(vlTotal)}
              placeholder="Valor Total"
              keyboardType="decimal-pad"
              onChangeText={(text) => {
                  var numsStr = text.replace(/[^0-9||.]/g,'');
                  setVlTotal(numsStr)
                  desconto('','',numsStr)
                  attVlEfetivo(numsStr, vlDesc, vlAcr, outros, vlFrete)
              }}
          />

          <Text>Valor de Desconto</Text>
          <View style={{flexDirection: "row", width: '100%'}}>

              <Text style={styles.TextInputM}>R$</Text>
              <TextInput
                  style={styles.InputM}
                  value={String(vlDesc)}
                  placeholder="$ Desconto"
                  keyboardType="decimal-pad"
                  onChangeText={(text) => {
                      var numsStr = text.replace(/[^0-9||.]/g,'');
                      setVlDesc(numsStr)
                      desconto('$', numsStr)
                      attVlEfetivo(vlTotal, numsStr, vlAcr, outros, vlFrete)
                  }}
              />

              <Text style={styles.TextInputN}>%</Text>
              <TextInput
                  style={styles.InputN}
                  value={String(percDisc)}
                  placeholder="% Desconto"
                  keyboardType="decimal-pad"
                  onChangeText={(text) => {
                      var numsStr = text.replace(/[^0-9||.]/g,'');
                      setPercDisc(numsStr)
                      desconto('%', numsStr)
                      attVlEfetivo(vlTotal, Number(numsStr) / 100 * vlTotal, vlAcr, outros, vlFrete)
                  }}
              />
          </View>

          <Text>Valor de Acréscimo</Text>
          <TextInput
              style={styles.Input}
              value={String(vlAcr)}
              placeholder="Valor Acréscimo"
              keyboardType="decimal-pad"
              onChangeText={(text) => {
                  var numsStr = text.replace(/[^0-9||.]/g,'');
                  setVlAcr(numsStr)
                  attVlEfetivo(vlTotal, vlDesc, numsStr, outros, vlFrete)
              }}
          />

          {addoutros()}
          {addFrete()}
          {addVlTroca()}

          <Text>Valor Efetivo</Text>
          <TextInput
              style={styles.Input}
              value={String(Number(vlEfetivo).toFixed(2))}
              placeholder="Valor Efetivo"
              editable={false}
          />
          
          <Text>Financeiro</Text>
          <View
              style={{
                flexDirection: "row"
              }}
          >
              <Picker
                selectedValue={modalPag}
                style={styles.selectFisJur}
                onValueChange={(itemValue, itemIndex) => {
                    setModalPag(itemValue)
                    pesqMp(itemValue)
                }}>
                  <Picker.Item label="Modalidade de Pagamento" value="P" />
                  {
                    pagList.map((product) => {
                      return <Picker.Item key={product.c_mpg} label={product.descricao} value={product.c_mpg} />
                    })
                  }
              </Picker>

              <TouchableOpacity
                  onPress={()=>{pesqMp(modalPag)}}
                  style={styles.ButtonFinan}
              >
                <Text style={{color: "#FFF", fontSize: 20}}>+</Text>
              </TouchableOpacity>
          </View>
            
          <View style = {styles.lista}>
            {(finanList.map( item => {
                return (
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#2c3b76',
                            margin: 2,
                            padding: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                        key={item.id}
                        onPress={() => {
                          setFinanItem(item)
                          setModFinanValor(item.valor)
                          setModFinanData(item.data)
                          setModFinanTp_titulo(item.tp_titulo)
                          setModFinanNbanco(item.nbanco)
                          setModFinanAgencia(item.agencia)
                          setModFinanConta(item.conta)
                          setModFinanNr_doc_liq(item.nr_doc_liq)
                          setModFinanVl_cheque(item.vl_cheque)
                          setModFinanNrCob(item.nr_doc_cob)
                          setModFinanEmitente(item.emitente)
                          setModFinanCpf_cgc(item.cpf_cnpj)
                          setModFinanCartao(item.c_cartao)
                          setModFinanContaBanc(item.c_ccr)
                          setShowModFinan(true);
                        }}
                    >
                        <Text style={styles.TextProduto}>{item.data}</Text>
                        <Text style={styles.TextProduto}>{item.tp_titulo}</Text>
                        <Text style={styles.TextProduto}>{'R$ ' + String(Number(item.valor).toFixed(2)).replace('.', ',')}</Text>
                    </TouchableOpacity>
                )
            }))}
          </View>

          <TouchableOpacity
              style={{
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#2c3b76',
              }}
              onPress={()=>{
                let aux
                if (ProcuraParam(520, 'parE') == 'S' && ProcuraParam(518, 'parE') == 'S'){
                  aux = Number(vlEfetivo) + Number(vlFrete)
                } else {
                  aux = Number(vlEfetivo)
                }
                if (Number(aux - ValorFinan()).toFixed(2) > 0){
                  setFinanItem({})
                  setModFinanValor(valorMax())
                  setModFinanData(FutureDay(0))
                  setModFinanTp_titulo('DI')
                  setModFinanNbanco('')
                  setModFinanAgencia('')
                  setModFinanConta('')
                  setModFinanNr_doc_liq('')
                  setModFinanVl_cheque('')
                  setModFinanNrCob('')
                  setModFinanEmitente('')
                  setModFinanCpf_cgc('')
                  setModFinanCartao('P')
                  setModFinanContaBanc('P')
                  setShowModFinan(true);
                } else {
                  alert('Valor Total foi Atingido')
                }
              }}
          >   
              <Text style={styles.TextNext}>+</Text>
          </TouchableOpacity>

          <View style={styles.ViewNext}>
            <TouchableOpacity 
              style={styles.ButtonNext}
              onPress={() => {
                  salvar()
                 
              }}
            >
              <Text style={styles.TextNext}>Adicionar</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
        
    </View>
  );
}