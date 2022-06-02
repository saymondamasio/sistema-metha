import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ImageBackground, Text, View, TextInput, TouchableOpacity, Platform, Image, ScrollView } from 'react-native';
import axios from 'axios'
import styles from './LoginStyle';
import { Loading } from '../../Components/Loader'
import { Camera } from 'expo-camera';
import Constants from "expo-constants"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login( { navigation }) {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [load, setload] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  
  useEffect(() => {
    aux()
  }, []);

  async function aux() {
    setUsername(await AsyncStorage.getItem('@username'))
  }

  const Entrar = async (navigation, username, pass) => {

    setload(true)

    await AsyncStorage.setItem('@username', username)
    
    var data = JSON.stringify({
      "banco": await AsyncStorage.getItem('@banco'),
      "sql": `select * from cd_usu where '${username}' = nome and '${pass}' = senha`
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
      var resp = JSON.stringify(response.data);
      var respJson = (JSON.parse(resp).recordset)

      setload(false)
      if(respJson.length == 0){
        alert('[Erro] : Erro ao conectar ao servidor')
      } else {
        salvarFun(respJson[0].c_fun)
        navigation.navigate('Home');
      }
    })
    .catch(function (error) {
      console.log(error);
      alert(error)
    });
    
  }

  const salvarFun = async (c_fun) => {
    await AsyncStorage.setItem('@c_username', String(c_fun))
  }

  return (

    <View style={styles.container}>
        <StatusBar style="dark" />

        <Loading 
            show={load}
            onDismiss={()=>{
                setload(false)
            }}
        />

        <ImageBackground blurRadius={5} source={require('../../Imagens/BackGroundLogin.jpg')} style={styles.imageBackground}>
              
          <ScrollView>
              
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                  style={styles.ButtonAlias}
                  onPress={() => {navigation.navigate('Alias')}}
              >
                <Text style={styles.textbutton}>A</Text>
              </TouchableOpacity>
            </View>

            <Image source={require('../../Imagens/Logo_transparente_semSlogan_semNumTel.png')}
                  style={styles.LogoImg}
            /> 

            <View style={styles.down}>
              <TextInput
                  style={styles.Input}
                  placeholder="Usuário"
                  value={username}
                  onChangeText={(text) => {setUsername(text);}}
              />
              <TextInput
                  style={styles.Input}
                  placeholder="Senha" 
                  onChangeText={(text) => {setPass(text)}}
                  secureTextEntry={true}
                  keyboardType='numeric'
              />

              <TouchableOpacity
                  style={styles.ButtonNext}
                  onPress={() => {Entrar(navigation, username, pass)}}
              >
                  <Text style={styles.textbutton}>Login</Text>

              </TouchableOpacity>

              <View
                style={{
                  paddingTop: '55%'
                }}
              ></View>

            </View>

          </ScrollView>

          <Text style={{textAlign: 'right', paddingRight: 5, color: 'white'}}>{Constants.manifest.version}</Text>

        </ImageBackground>
      
    
    </View>
  );

  
}