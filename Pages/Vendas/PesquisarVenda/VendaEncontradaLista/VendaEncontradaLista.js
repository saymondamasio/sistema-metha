import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity, TextInput, FlatList, Button } from 'react-native';
import styles from './VendaEncontradaListaStyle';

export default function VendaLista( { navigation, route } ) {

    const Pessoas = [];

    for(let i = 0; i <= route.params.length-1; i++){
        Pessoas.push({id: i, name: route.params[i].nome, data: route.params[i].dt_lancamento, valor: route.params[i].vl_efetivo, situacao: route.params[i].situacao, finalidade: route.params[i].finalidade})
    }

    const myKeyExtractor = (item) => {
        return String(item.id)
    }
          
    const renderItem = ({item}) => {
        if (item.valor != null){
            return (
                <TouchableOpacity
                    onPress={() => {escolherPessoa(item)}}
                    style={styles.ButtonLista}
                >
                    <Text style={styles.TextLista} >{item.name}</Text>
                    <Text style={styles.TextLista} >{item.situacao}</Text>
                    <Text style={styles.TextLista} >{item.data}</Text>
                    <Text style={styles.TextLista} >{'R$ ' + String(item.valor.toFixed(2))}</Text>
                    <Text style={styles.TextLista} >{item.finalidade}</Text>
                </TouchableOpacity>
            )
        }
    }

    function escolherPessoa(item){
        navigation.navigate('VendaCadastro', [{id: item.id}, route])
    }

    return(
        <View style={styles.container}>
            <StatusBar style="dark" />

            <FlatList
              data={Pessoas}
              renderItem={renderItem}
              keyExtractor={myKeyExtractor}
            />
        
        </View>
    )
 
}




  
  
  

