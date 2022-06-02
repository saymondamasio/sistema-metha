import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Parametros = {par: {}, parE: {}}

parametroPar()
parametroParE()

async function parametroPar() {

    let data = JSON.stringify({
        "banco": await AsyncStorage.getItem('@banco'),
        "sql": `select codigo, resposta from cd_par`
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
        Parametros.par = (JSON.parse(JSON.stringify(response.data)).recordset)
    })
    .catch(function (error) {
        console.log(error);
    })

}

async function parametroParE() {

    let data = JSON.stringify({
        "banco": await AsyncStorage.getItem('@banco'),
        "sql": `select codigo, resposta from cd_parE`
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
        Parametros.parE = (JSON.parse(JSON.stringify(response.data)).recordset)
    })
    .catch(function (error) {
        console.log(error);
    })

}

export function ProcuraParam(param, tabela) {
        
    if (tabela == 'par') {

        for(let j = 0; j < Parametros.par.length; j++){
            if (Parametros.par[j].codigo == param){
                return Parametros.par[j].resposta
            }
        }

    } else if (tabela == 'parE') {
        for(let j = 0; j < Parametros.parE.length; j++){
            if (Parametros.parE[j].codigo == param){
                return Parametros.parE[j].resposta
            }
        }
    }

}
