import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity, TextInput, FlatList, Button } from 'react-native';
import styles from './PessoaEncontradaListaStyle';

export default function PessoaLista( { navigation, route } ) {

    const Pessoas = [];

    for(let i = 0; i <= route.params.length-1; i++){
        Pessoas.push({id: i, name: route.params[i].nome})
    }

    const myKeyExtractor = (item) => {
        return String(item.id)
    }
          
    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                onPress={() => {escolherPessoa(item)}}
                style={styles.ButtonLista}
            >
                <Text style={styles.TextLista} >{item.name}</Text>
            </TouchableOpacity>
        )
    }

    function escolherPessoa(item){
        navigation.navigate('PessoaCadastro', [{id: item.id}, route])
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




  
  
  

