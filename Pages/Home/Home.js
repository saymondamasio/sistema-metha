import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity, Image, Linking} from 'react-native';
import styles from './HomeStyle';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { ProcuraParam } from '../../Components/Parametro';

export default function Home( { navigation } ) {

  return (
    <View style={styles.container}>
        <StatusBar style="dark" />
      
        <View style={styles.line}>
          <View style={styles.ButtonBack}>
              <TouchableOpacity
                  style={styles.ButtonOpt}
                  onPress={() => {navigation.navigate('Vendas')}}
              >
                <Image source={require('../../Imagens/empty_shopping_cart_azul_96px.png')}
                    style={styles.LogoImg1}
                /> 
                <Text style={styles.textbutton}>Vendas</Text>
              </TouchableOpacity>

          </View>

          <View style={styles.ButtonBack}>
              <TouchableOpacity
                  style={styles.ButtonOpt}
                  onPress={() => {navigation.navigate('Pessoa')}}
              >
                <Image source={require('../../Imagens/Actions-user-group-icon_128.png')}
                    style={styles.LogoImg1}
                />
                <Text style={styles.textbutton}>Pessoa</Text>
              </TouchableOpacity>
          </View>

          


          
        </View>

        <View style={styles.line}>
          <View style={styles.ButtonBack}>
              <TouchableOpacity
                  style={styles.ButtonOpt}
                  onPress={() => {navigation.navigate('Produtos')}}
              >
                <Image source={require('../../Imagens/produtos_96px.png')}
                    style={styles.LogoImg2}
                /> 
                <Text style={styles.textbutton}>Produtos</Text>
              </TouchableOpacity>

          </View>

        <View style={styles.ButtonBack}>
            <TouchableOpacity
                style={styles.ButtonOpt}
                onPress={() => {navigation.navigate('ControleEstoque')}}
            >
              <Image source={require('../../Imagens/controledeestoque.png')}
                  style={styles.LogoImg2}
               />
              <Text style={styles.textbutton}>Controle de Estoque</Text>
            </TouchableOpacity>
        </View>
{/* 
          <View style={styles.ButtonBack}>
              <TouchableOpacity
                  style={styles.ButtonOpt}
                  onPress={() => {navigation.navigate('Revista')}}
              >
                <Image source={require('../../Imagens/revista.png')}
                    style={styles.LogoImg1}
                />
                <Text style={styles.textbutton}>Revista</Text>
              </TouchableOpacity>
          </View> */}

          {
            ProcuraParam(771, 'parE') === 'S' ?
              <View style={styles.ButtonBack}>
                <TouchableOpacity
                  style={styles.ButtonOpt}
                  onPress={() => { navigation.navigate('OS') }}>
                  <Image source={require('../../Imagens/OS.png')}
                    style={styles.LogoImg2}
                  />
                  <Text style={styles.textbutton}>OS Horas</Text>
                </TouchableOpacity>
              </View> : null
          }
      
        </View>
        {
          ProcuraParam(786, 'parE') != null && ProcuraParam(786, 'parE') != '' ? (
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              
            }}
          >
            <TouchableOpacity
                onPress={() => {Linking.openURL(ProcuraParam(786, 'parE'))}}
            >
              <FontAwesome5 name="link" size={27} color="#2c3b76" />
            </TouchableOpacity>
          </View>
        ) : null}
    

    </View>
  );
}
