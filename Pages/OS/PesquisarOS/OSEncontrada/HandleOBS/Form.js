import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import MaskInput from 'react-native-mask-input';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import sx from '../OSEncontradaStyle';
import { ScrollView } from 'react-native-gesture-handler';

import * as A from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ({ navigation, route }) {

	const { c_mve, obs } = route.params;
	const [obsSQL, setObs] = React.useState(obs);
	const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>

	function updateData() {

		var querySQL = async () => {
			var data = JSON.stringify({
				"banco": await AsyncStorage.getItem('@banco'),
				"sql": `
				update cd_mve set obs = '${obsSQL}' where c_mve = ${c_mve}`
			});

			var config = {
				method: 'post',
				url: await AsyncStorage.getItem('@api'),
				headers: {
					'Content-Type': 'application/json'
				},
				data: data
			};

			axios(config)
				.then((response) => {
					let respJson = (JSON.parse(JSON.stringify(response.data)).recordset)
					alert('Observação atualizada com sucesso!')
					navigation.navigate('OSEncontrada', c_mve)
				})
		}

		querySQL()
	}

	return (
		<>
			{obsSQL ?
				<>
					<ScrollView style={sx.container} scrollEnabled={true}>
						<TextInput multiline={true} style={sx.box} value={obsSQL}
							onChangeText={obsSQL => setObs(obsSQL)} >
						</TextInput>
					</ScrollView>

					<A.Text animation="pulse" duration={2000} iterationCount="infinite"
						onPress={() => updateData()} style={{ ...sx.updateData }}>
						<Icon name="check-circle" size={15} color="#FFF" /> Salvar Alterações
					</A.Text>
				</>
				:
				<>
					<ScrollView style={sx.container} scrollEnabled={true}>
						<TextInput multiline={true} style={sx.box} value={obsSQL}
							onChangeText={obsSQL => setObs(obsSQL)} placeholder={'clique para inserir a observação'}>
						</TextInput>
					</ScrollView>

					<A.Text animation="pulse" duration={2000} iterationCount="infinite"
						onPress={() => updateData()} style={{ ...sx.updateData }}>
						<Icon name="check-circle" size={15} color="#FFF" /> Salvar Alterações
					</A.Text>
				</>
			}
		</>
	)
}