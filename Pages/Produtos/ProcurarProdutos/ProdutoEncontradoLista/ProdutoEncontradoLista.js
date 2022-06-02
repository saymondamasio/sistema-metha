import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity, TextInput, FlatList, Button } from 'react-native';
import styles from './ProdutoEncontradoListaStyle';

export default function ProdutoEncontradoLista( { navigation, route } ) {

    const Produtos = [];

    for(let i = 0; i <= route.params.length-1; i++){
        Produtos.push({
            id: i, 
            descricao: route.params[i].descricao,
            c_pessoa : route.params[i].c_pessoa,
            ref_fabricante: route.params[i].ref_fabricante,
            c_pro: route.params[i].c_pro,
            dt_ult_cmp: route.params[i].dt_ult_cmp,
            qtde_estq: route.params[i].qtde_estq,
            un: route.params[i].un,
            pr_medio: route.params[i].pr_medio,
            pr_venda1: route.params[i].pr_venda1,
            pr_venda2: route.params[i].pr_venda2,
            pr_venda3: route.params[i].pr_venda3,
            ean : route.params[i].ean,
            digito: route.params[i].digito,
            margem: route.params[i].margem,
            ativo: route.params[i].ativo,
            tipo: route.params[i].tipo, 
            custo_tabela: route.params[i].custo_tabela,
            c_gru : route.params[i].c_gru,
            controla : route.params[i].controla,
            etiqueta: route.params[i].etiqueta,
            calcula_qt: route.params[i].calcula_qt,
            nr_casas_valor: route.params[i].nr_casas_valor,
            nr_casas_qtde: route.params[i].nr_casas_qtde,
		    usa_grade: route.params[i].usa_grade,
		    desconto: route.params[i].desconto,
            perc_icms: route.params[i].perc_icms,
            c_tbt: route.params[i].c_tbt,
            eh_processado: route.params[i].eh_processado,
            qtde_processado: route.params[i].qtde_processado,
            pro_acabado: route.params[i].pro_acabado,
            c_etiq: route.params[i].c_etiq,
            tabela: route.params[i].tabela,

        })
    }

    const myKeyExtractor = (item) => {
        return String(item.id)
    }
          
    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                onPress={() => {navigation.navigate('ProcurarProduto', item)}}
                style={styles.ButtonLista}
            >
                <Text style={styles.TextLista} >{item.descricao}</Text>
            </TouchableOpacity>
        )
    }

    return(
        <View style={styles.container}>
            <StatusBar style="dark" />

            <FlatList
              data={Produtos}
              renderItem={renderItem}
              keyExtractor={myKeyExtractor}
            />
        
        </View>
    )
 
}




  
  
  

