import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { ImageBackground, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './AliasStyle';

export default function Alias( { navigation } ) {
  
  const [banco, setBanco] = useState('');
  const [bancoAgora, setBancoAgora] = useState('');
  const [Api, setApi] = useState('');
  const [apiAgora, setApiAgora] = useState('');
  const [apiTran, setApitran] = useState('');
  const [apiTranAgora, setApitranAgora] = useState('');

  const bancoValue = async () => {
    setBancoAgora(await AsyncStorage.getItem('@banco'))
    setApiAgora(await AsyncStorage.getItem('@api'))
    setApitranAgora(await AsyncStorage.getItem('@apiTran'))
  }

  async function salvar(banco, navigation){
    try {
        if (banco != ''){
            await AsyncStorage.setItem('@banco', banco)
            setBancoAgora(banco)
        }
        if (Api != ''){
          await AsyncStorage.setItem('@api', Api)
          setApi(Api)
        }
        if (apiTran != ''){
          await AsyncStorage.setItem('@apiTran', apiTran)
          setApitran(apiTran)
        }

    } catch (e) {
        alert(e)
    }

    navigation.navigate('Login');

  }
  bancoValue()

  return (

    <View style={styles.container}>
        <StatusBar style="dark" />
        
        <ImageBackground blurRadius={5} source={require('../../Imagens/BackGroundLogin.jpg')} style={styles.imageBackground}>
        
          <TextInput
              style={styles.Input}
              onChangeText={(text) => {setBanco(text)}}
              placeholder= 'Banco'
          />
          <Text>{bancoAgora}</Text>

          <TextInput
              style={styles.Input}
              onChangeText={(text) => {setApi(text)}}
              placeholder = 'Api'
          />
          <Text>{apiAgora}</Text>

          <TextInput
              style={styles.Input}
              onChangeText={(text) => {setApitran(text)}}
              placeholder = 'Api Transação'
          />
          <Text>{apiTranAgora}</Text>

          <TouchableOpacity
              style={styles.ButtonNext}
              onPress={() => {salvar(banco, navigation)}}
          >
            <Text style={styles.textbutton}>Salvar</Text>
          </TouchableOpacity>

        </ImageBackground>
        
    </View>
  );
}