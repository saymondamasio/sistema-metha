import { StatusBar } from 'expo-status-bar';
import React from 'react';
import MaskInput, {Masks} from 'react-native-mask-input';
import { Text, View, TouchableOpacity, Button} from 'react-native';
import styles from './PessoaAdicionaisStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Loading } from '../../../../Components/Loader'

export default function PessoaAdicionais( { navigation, route } ) {

  const [email, setEmail] = React.useState('');
  const [load, setLoad] = React.useState(false)

  return (
    <View style={styles.container}>
        <StatusBar style="dark" />

        <Loading 
            show={load}
            onDismiss={()=>{
                setLoad(false)
            }}
        />

        <MaskInput
            value={email}
            placeholder='Email'
            style={styles.Input}
            maxLength={50}
            keyboardType="email-address"
            onChangeText={(masked, unmasked, obfuscated) => {
                setEmail(unmasked);
            }}
        />

        <View style={styles.ViewNext}>
            <TouchableOpacity 
                style={styles.ButtonNext}
                onPress={() => {registrar()}} 
            >
              <Text style={styles.TextNext}>Adicionar</Text>
            </TouchableOpacity>
        </View>
    
    </View>
  );

  async function registrar() {
    setLoad(true)
    let dataCpl = (route.params.Dt_nasc).split('/')
    
    var data = JSON.stringify({
      "banco": await AsyncStorage.getItem('@banco'),
      "sql": `INSERT INTO cd_pessoa (Cpf,Dt_nasc,nome,bairro,cep,cgc,cidade,compl,endereco,fantasia,fisica_jur,geocodigo,insc_mun,insc_est,numero,fone,celular,fax,rg,tp_pessoa,indIEDest,uf,e_mail,flag_transp,contribuinteICMS,dados_ok,ativo,haver,codigo_uf,codigo_pais)VALUES ('${route.params.Cpf}',${route.params.Dt_nasc == "" || route.params.Dt_nasc == null ? null : `CONVERT(DATETIME, '${dataCpl[2]}-${dataCpl[1]}-${dataCpl[0]}')` },'${route.params.NomeRazao}','${route.params.bairro}','${route.params.cep}',${route.params.cgc == '' ? null : `'${route.params.cgc}'`},'${route.params.cidade}',${route.params.compl == "" ? null : `'${route.params.compl}'`},'${route.params.endereco}','${route.params.fantasia}','${route.params.fisica_jur}','${route.params.geocodigo}',${route.params.inscMun == "" ? null : `'${route.params.inscMun}'`},${route.params.inscest == "" ? null : `'${route.params.inscest}'`},${route.params.numero == "" ? null : `'${route.params.numero}'`},'${route.params.phone1}',${route.params.phone2 == "" ? null : `'${route.params.phone2}'`},${route.params.phone3 == "" ? null : `'${route.params.phone3}'`},${route.params.rg == "" ? null : `'${route.params.rg}'`},'${route.params.tpPessoa}',${route.params.tpinscest == '' ? null : `'${route.params.tpinscest}'`},'${route.params.uf}','${email == undefined || email == 'null' ? null : email}','N','S','N','S',0,${route.params.codigo_uf == "" ? null : route.params.codigo_uf},1058)`
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
        let respJson = (JSON.parse(JSON.stringify(response.data)));
        if (respJson != "Transaction committed"){
          alert(respJson)
        } else {
          alert('Pessoa Cadastrada')
          navigation.navigate('Home')
        }
    })
    .catch(function (error) {
        console.log(error);
        setLoad(false)
        alert('[ERRO]')
    });

  }
}
