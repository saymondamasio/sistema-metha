import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './OSStyle';

export default function OS({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <TouchableOpacity
        onPress={() => { navigation.navigate('ProcurarOS') }}
        style={styles.Opts}
      >
        <Text style={styles.Text}>Pesquisar OS</Text>
      </TouchableOpacity>

    </View>
  );
}
