import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import styles from './ProcurarCodigodeBarrasStyle';
import AwesomeAlert from 'react-native-awesome-alerts';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { CamBarCodeScanner } from '../../../../Components/CamBarCodeScanner';
const { Parametros, ProcuraParam } = require('../../../../Components/Parametro')

export default function CodigodeBarras( { navigation } ) {
  

  const [scanned, setScanned] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [prodName, setProdName] = useState('')
  const [prodUn, setProdUn] = useState('')
  const [prodValue, setProdValue] = useState('')
  const [showCodigo, setShowCodigo] = useState(false)
  const [codDigitado, setCodDigitado] = useState('')
  const [produtoAtual, setProdutoAtual] = useState('')
  const [hasPermission, setHasPermission] = React.useState(null);
  const [load, setLoad] = React.useState(false) 

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

 
  
  const ProcuraBanco = async (code) => {
    setLoad(true)
    var data = JSON.stringify({
      "banco": await AsyncStorage.getItem('@banco'),
      "sql": `SELECT c_pro, ref_fabricante, descricao, c_pessoa,  un, pr_medio, qtde_estq,FORMAT(dt_ult_cmp, 'dd/MM/yyyy') as dt_ult_cmp, pr_venda1, pr_venda2, pr_venda3, ean,ean + ISNULL(digito, ean) as eanCompl, margem, ativo, tipo, digito, custo_tabela, qtde_estq_disp, c_gru, controla,  etiqueta, usa_grade, desconto, etiqueta, calcula_qt, nr_casas_valor, nr_casas_qtde, perc_icms, c_tbt, eh_processado, qtde_processado, pro_acabado, c_etiq, tabela FROM cd_pro where ean + ISNULL(digito, '') like '%${code}%'`
    });
    console.log(code)
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
        let prVenda
        if (ProcuraParam(98, 'par') == 1){
          prVenda = respJson[0].pr_venda1
        } else if (ProcuraParam(98, 'par') == 2){
          prVenda = respJson[0].pr_venda2
        } else if (ProcuraParam(98, 'par') == 3){
          prVenda = respJson[0].pr_venda3
        }
        prVenda = 'R$ ' + String(Number(prVenda).toFixed(2))
        
        let valueAux = 'Valor: ' + prVenda + '\nEan: ' + respJson[0].eanCompl
        if (respJson[0].ref_fabricante != null) {
          valueAux += '\nReferência: '+ respJson[0].ref_fabricante
        }

        
        setProdName(String(respJson[0].descricao))
        setProdUn(String(respJson[0].un))
        setProdValue(valueAux)
        setScanned(true)
        setShowAlert(true)
        setProdutoAtual(respJson)

    })
    .catch(function (error) {
      console.log(error)
        alert(`Produto não ${code} encontrado`)
    });
  }
  const handleBarCodeScanned = ({ type, data }) => {
    console.log(data)
    ProcuraBanco(data.replace(/[^0-9]/g,''))
  };
  const showCodigoCustonView = () => {
    return(
      <View>
        <TextInput
          style={styles.Input}
          onChangeText={(text) => {
            setCodDigitado(text)
          }}
        />
      </View>
    )
  }

  function digitarCodigo() {
    setShowCodigo(true)
    setScanned(true)
  }

  function BarCode() {
    if (Platform.OS == "web"){
      return(
        <CamBarCodeScanner
          on={!scanned}
          clock={200} // ms
          styleCam={styles.camera}
          type={'back'}
          onScan={(code)=>{
            handleBarCodeScanned({ type: "", data: code })
          }}
        />
      )
    } else {
      return(
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
      )
    }
    
  }

  return (
    <View style={styles.container}>
        <StatusBar style="dark" />

        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={prodName}
          message={prodValue}
          titleStyle={styles.titleStyle}
          messageStyle={styles.messageStyle}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={true}
          showConfirmButton={true}
          cancelButtonColor="#9fa0bf"
          confirmText="Ok"
          cancelText="Info"
          confirmButtonStyle={styles.confirmButtonStyle}
          confirmButtonColor="#2c3b76"
          onConfirmPressed={() => {
            setShowAlert(false);
            setScanned(false);
          }}
          onCancelPressed={()=>{
            setShowAlert(false);
            navigation.navigate('ProcurarProduto', produtoAtual[0]);
            console.log(prodName)
          }}
          onDismiss={() => {
            setShowAlert(false);
            setScanned(false);
          }}
        />

        <AwesomeAlert
          show={showCodigo}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          contentContainerStyle={styles.contentContainerStyle}
          showConfirmButton={true}
          confirmText="Pesquisar"
          confirmButtonStyle={styles.confirmButtonStyle}
          confirmButtonColor="#2c3b76"
          customView={showCodigoCustonView()}
          onConfirmPressed={() => {
            setShowCodigo(false);
            setScanned(false);
            handleBarCodeScanned({type: "", data: codDigitado});
          }}
          onDismiss={() => {
            setShowCodigo(false);
            setScanned(false);
          }}
        />

        <View style={styles.container}>
          {BarCode()}

          <View style={styles.ViewCodigo}>
            <TouchableOpacity 
              style={styles.ButtonCodigo}
              onPress={() => {digitarCodigo()}}
            >
              <Text style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20
              }}>Codigo</Text>
            </TouchableOpacity>
          </View>


        </View>

    </View>
  );

}
