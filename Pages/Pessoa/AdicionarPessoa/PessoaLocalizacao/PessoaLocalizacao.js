import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity, ScrollView} from 'react-native';
import MaskInput from 'react-native-mask-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './PessoaLocalizacaoStyle';
import { Parametros, ProcuraParam } from '../../../../Components/Parametro'
export default function PessoaLocalizacao( { navigation, route } ) {

  const [cep, setCep] = React.useState('');
  const [cidade, setCidade] = React.useState('');
  const [uf, setUf] = React.useState('');
  const [endereco, setEndereco] = React.useState('');
  const [bairro, setBairro] = React.useState('');
  const [ibge, setIbge] = React.useState('');
  const [numero, setNumero] = React.useState('');
  const [compl, setCompl] = React.useState('');
  const [codigo_uf, setCodigo_uf] = React.useState('');

  const preencheEnd = (unmasked) => {

    let axios = require('axios');

    let config = {
        method: 'get',
        url: `https://viacep.com.br/ws/${unmasked}/json/`,
        headers: { }
    };
      
      axios(config)
      .then(function (response) {
        let resp = JSON.parse(JSON.stringify(response.data));
        setCidade(resp.localidade);
        setUf(resp.uf);
        setEndereco(resp.logradouro);
        setBairro(resp.bairro);
        setIbge(resp.ibge);
        CodigoUf(resp.ibge)
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  async function CodigoUf(geo) {

    let axios = require('axios');
    var data = JSON.stringify({
      "banco": await AsyncStorage.getItem('@banco'),
      "sql": `select * from cd_ibge where geocodigo = ${geo}`
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
      setCodigo_uf(JSON.parse(JSON.stringify(response.data)).recordset[0].codigo_uf);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <View style={styles.container}>
        
        <ScrollView>
            <StatusBar style="dark" />

            <MaskInput
              value={cep}
              placeholder='Cep'
              keyboardType= 'numeric'
              style={styles.Input}
              maxLength={9}
              onChangeText={(masked, unmasked, obfuscated) => {
                  setCep(unmasked);
                  if (unmasked.length == 8){
                      preencheEnd(unmasked);
                  }
              }}
              mask={[/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/]}
            />
            <MaskInput
              value={cidade}
              placeholder='Cidade'
              style={styles.Input}
              maxLength={35}
              onChangeText={(masked, unmasked, obfuscated) => {
                  setCidade(unmasked);
              }}
            />
            <MaskInput
              value={uf}
              placeholder='Estado'
              style={styles.Input}
              maxLength={2}
              onChangeText={(masked, unmasked, obfuscated) => {
                  setUf(unmasked);
              }}
              mask={[/[a-zA-Z]/, /[a-zA-Z]/]}
            />
            <MaskInput
              value={endereco}
              placeholder='Rua'
              maxLength={50}
              style={styles.Input}
              onChangeText={(masked, unmasked, obfuscated) => {
                  setEndereco(unmasked);
              }}
            />
            <MaskInput
              value={bairro}
              placeholder='Bairro'
              maxLength={35}
              style={styles.Input}
              onChangeText={(masked, unmasked, obfuscated) => {
                  setBairro(unmasked);
              }}
            />
            <MaskInput
              value={numero}
              placeholder='Número'
              style={styles.Input}
              maxLength={7}
              onChangeText={(masked, unmasked, obfuscated) => {
                  setNumero(unmasked);
              }}
            />
            <MaskInput
              value={compl}
              placeholder='Complemento'
              style={styles.Input}
              onChangeText={(masked, unmasked, obfuscated) => {
                  setCompl(unmasked);
              }}
            />

            <View style={styles.ViewNext}>
                <TouchableOpacity 
                    style={styles.ButtonNext}
                    onPress={() => {Salvar()}} 
                >
                  <Text style={styles.TextNext}>Proximo</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    
    </View>
  );

  function Salvar() {
    let prox = false;

    if (ProcuraParam(744, 'parE') == 'S') { // Endereço Obrigatorio
      prox = true;
      if (cep == ''){
        alert('Preencha o Cep')
        prox = false
      }
      if (cidade == ''){
        alert('Preencha a Cidade')
        prox = false
      }
      if (uf == ''){
        alert('Preencha o Estado')
        prox = false
      }
      if (endereco == ''){
        alert('Preencha o Endereço')
        prox = false
      }
      if (bairro == ''){
        alert('Preencha o Bairro')
        prox = false
      }

    } else {
      prox = true
    }

    if (prox) {
      navigation.navigate('PessoaAdicionais', {
        Cpf: route.params.Cpf,
        Dt_nasc: route.params.Dt_nasc,
        NomeRazao: route.params.NomeRazao,
        cgc: route.params.cgc,
        fantasia: route.params.fantasia,
        fisica_jur: route.params.fisica_jur,
        tpPessoa: route.params.tpPessoa,
        inscMun: route.params.inscMun,
        inscest: route.params.inscest,
        phone1: route.params.phone1,
        phone2: route.params.phone2,
        phone3: route.params.phone3,
        rg: route.params.rg,
        tpinscest: route.params.tpinscest,
        cep: cep,
        cidade: cidade,
        uf: uf,
        endereco: endereco,
        bairro: bairro,
        geocodigo: ibge,
        codigo_uf: codigo_uf,
        numero: numero,
        compl: compl
      })
    }
    
  }
}
