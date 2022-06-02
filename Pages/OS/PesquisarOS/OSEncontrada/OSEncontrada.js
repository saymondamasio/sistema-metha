import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Keyboard, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';

const { Item } = Picker;

import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import sx from './OSEncontradaStyle';
//import { ScrollView } from 'react-native-gesture-handler';
import { ScrollTo, Target, ScrollView } from "@nandorojo/anchor";

import { Appbar } from 'react-native-paper';

import MaskInput, { Masks } from 'react-native-mask-input';

import * as A from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ({ navigation, route }) {

	const [sql, setSQL] = useState(null)
	const [listFunc, setListFunc] = useState(['Selecione'])
	const [defSQL, setDef] = useState('')
	const [obsSQL, setObs] = useState('')

	const [handleSave, setHandleSave] = useState(false)

	const [c_mve, setC_mve] = useState(route.params)
	const [modalForm, setModalForm] = useState(false)
	const [form, setForm] = useState({ local: 'Selecione', func: 'Selecione' })

	const dtRegex = new RegExp(/^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/)
	const hrRegex = new RegExp(/^([0-1][0-9]|(2)[0-3])(:)([0-5][0-9])$/)
	const [test, setTest] = useState({ dtExecFull: false, hrIni: false, hrFim: false })

	useEffect(() => {
		getOS_SQL()
		getFunc_SQL()
	}, [])

	async function getOS_SQL() {
		var data = JSON.stringify({
			"banco": await AsyncStorage.getItem('@banco'),
			"sql": `select IIF(left(f.nome,charindex(' ',f.nome)) = '', f.nome, left(f.nome,charindex(' ',f.nome))) nomeExec,
			f.nome nomeExecFull,
			FORMAT(a.dt_lancamento, 'dd/MM/yyyy') dtAbertura, 
			b.nome, 
			o.c_osHr idExec,
			convert(varchar(max),a.obs) obs,
			a.situacao, 
			a.c_mve, 
			a.c_fun, 
			FORMAT(a.vl_efetivo, 'C', 'pt-br') vlEfetivo, 
			a.finalidade,
			convert(varchar, o.dt_lancamento, 112) dtReverse,
			FORMAT(o.dt_lancamento, 'dd/MM') dtExec,
			FORMAT(o.dt_lancamento, 'dd/MM/yyyy') dtExecFull,
			FORMAT(o.hr_inicio,'HH:mm') hrIni,
			FORMAT(o.hr_final,'HH:mm') hrFim,
			o.horas_real hrReal,
			convert(varchar(max),a.defeito) defeito,
			fora local,
		  c_fun_print funcioExec
		from cd_mve a, cd_pessoa b, cd_osHr o, cd_fun f
		where a.c_pessoa = b.c_pessoa 
			and a.c_mve = o.c_mve
			and f.c_fun = o.c_fun_print
			and o.c_mve = ${c_mve}
			order by convert(varchar, o.dt_lancamento, 112), FORMAT(o.hr_inicio,'HH:mm') asc`
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
				let r = (JSON.parse(JSON.stringify(response.data)).recordset);

				if (r.length == 0) {
					getDescOS_SQL()

				} else {
					setSQL(r)
					setForm({ ...form })
					setObs(r[0].obs)
					setDef(r[0].defeito)
				}
			})
			.catch((error) => {
				alert("[ERRO]");
			});
	}

	async function getDescOS_SQL() {
		var data = JSON.stringify({
			"banco": await AsyncStorage.getItem('@banco'),
			"sql": `select  	FORMAT(a.dt_lancamento, 'dd/MM/yyyy') dtAbertura, 
			convert(varchar(max),a.obs) obs,
			a.situacao, 
			a.c_mve, 
			a.c_fun, 
			FORMAT(a.vl_efetivo, 'C', 'pt-br') vlEfetivo, 
			a.finalidade,
			convert(varchar(max),a.defeito) defeito
		from cd_mve a
		where a.c_mve = ${c_mve}`
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
				let r = (JSON.parse(JSON.stringify(response.data)).recordset);

				if (r.length == 0) {
					alert('Nenhum registro encontrado')
					//setModalForm(true)
				} else {
					setSQL(r)
					setForm({ ...form, semExec: true })
					setObs(r[0].obs)
					setDef(r[0].defeito)
				}
			})
			.catch((error) => {
				alert("[ERRO]");
			});
	}

	async function getFunc_SQL() {
		var data = JSON.stringify({
			"banco": await AsyncStorage.getItem('@banco'),
			"sql": `SELECT c_fun, nome FROM cd_fun order by 2 asc`
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
				let r = (JSON.parse(JSON.stringify(response.data)).recordset);
				if (r.length == 0) {
					alert('Nenhum funcionário encontrado')
				} else {
					setListFunc(r)
				}
			})
			.catch((error) => {
				alert("[ERRO]");
			});
	}

	async function putDesc_SQL() {
		var data = JSON.stringify({
			"banco": await AsyncStorage.getItem('@banco'),
			"sql": `update cd_mve set obs = '${obsSQL}', defeito = '${defSQL}' where c_mve = ${c_mve}`
		});

		var config = {
			method: 'post',
			url: await AsyncStorage.getItem('@apiTran'),
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		};

		axios(config)
			.then((response) => {
				Keyboard.dismiss()
				let r = (JSON.parse(JSON.stringify(response.data)).recordset);

			})
			.catch((error) => {
				alert('Erro ao Salvar')
			})
	}

	async function putForm_SQL(hrRealNew) {

		var data = JSON.stringify({
			"banco": await AsyncStorage.getItem('@banco'),
			"sql": `update cd_osHr set dt_lancamento = '${form.dtExecFull.split("/").reverse().join("")}', hr_inicio = '01/01/2021 ${form.hrIni}:00', hr_final = '01/01/2021 ${form.hrFim}:00', horas_real = '${hrRealNew}', fora='${form.local}', c_fun_print = '${form.funcioExec}' where c_osHr = '${form.idExec}'`
		})

		var config = {
			method: 'post',
			url: await AsyncStorage.getItem('@apiTran'),
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		}

		axios(config)
			.then((response) => {
				Keyboard.dismiss()
				let r = (JSON.parse(JSON.stringify(response.data)).recordset);
				setModalForm(!modalForm)
				setHandleSave(!handleSave)
				setForm({ semExec: false })
				setSQL(null)
				getOS_SQL()
			})
			.catch((error) => {
				alert('Erro ao Salvar')
			})
	}

	async function delForm_SQL() {

		var data = JSON.stringify({
			"banco": await AsyncStorage.getItem('@banco'),
			"sql": `delete from cd_osHr where c_osHr = '${form.idExec}'`
		})

		var config = {
			method: 'post',
			url: await AsyncStorage.getItem('@apiTran'),
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		}

		axios(config)
			.then((response) => {
				Keyboard.dismiss()
				setModalForm(!modalForm)
				setHandleSave(false)
				setForm({})
				setSQL(null)
				getOS_SQL()
				alert('Execução deletada com sucesso')
			})
			.catch((error) => {
				alert('Erro ao Deletar')
			})
	}

	async function postForm_SQL(hrRealNew) {
		var data = JSON.stringify({
			"banco": await AsyncStorage.getItem('@banco'),
			"sql": `insert into cd_osHr(c_mve, dt_lancamento, hr_inicio, hr_final, horas_real, fechado, fora, c_fun_print) values(${c_mve}, convert(datetime, '${form.dtExecFull.split("/").reverse().join("")}'), convert(datetime, '${form.hrIni}'), convert(datetime, '${form.hrFim}'), '${hrRealNew}', 'S', '${form.local}', '${form.funcioExec}')`
		});

		console.log(data)

		var config = {
			method: 'post',
			url: await AsyncStorage.getItem('@apiTran'),
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		};

		axios(config)
			.then((response) => {
				Keyboard.dismiss()
				let r = (JSON.parse(JSON.stringify(response.data)).recordset)
				setModalForm(!modalForm)
				setHandleSave(!handleSave)
				setForm({})
				setSQL(null)
				getOS_SQL()
			})
			.catch((error) => {
				alert('Erro ao Salvar')
			})
	}

	async function PassagemParam() {
		var data = JSON.stringify({
			"banco": await AsyncStorage.getItem('@banco'),
			"sql": `select FORMAT(a.dt_lancamento, 'dd/MM/yyyy') as dt_lancamento, b.nome, a.situacao, a.c_mve, a.c_fun, a.vl_efetivo, a.finalidade from cd_mve a, cd_pessoa b where a.c_pessoa = b.c_pessoa and c_mve = '${c_mve}' and classe = 'V'`
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
			.then(function (response) {
				let respJson = (JSON.parse(JSON.stringify(response.data)).recordset);

				if (respJson.length == 0) {
					alert('OS Não Encontrada');
				} else {
					navigation.navigate('PassagemParam', respJson);

					//navigation.navigate('VendaCadastro', [{ id: 0 }, respJson]);
					//navigation.navigate('VendaLista', respJson);
				}
			})
			.catch(function (error) {
				console.log(error);
				alert("[ERRO]");
			});
	}

	function dtMoreThanToday(dt1) {
		const today = new Date()
		var newDt = dt1.split(/\//)
		newDt = new Date([newDt[1], newDt[0], newDt[2]].join('/'))

		if (newDt > today) return true
		else return false
	}

	function castToMM(hhmm) {
		var a = hhmm.split(':')
		var minutes = (+a[0]) * 60 + (+a[1])
		return minutes
	}

	function validateForm() {

		if (castToMM(form.hrFim) < castToMM(form.hrIni)) {
			alert('Hora de Fim não pode ser menor que Hora de Início')
			return false
		}

		if (castToMM(form.hrFim) == castToMM(form.hrIni)) {
			alert('Hora de Inicio não pode ser igual Hora de fim')
			return false
		}

		if (test.hrFim && test.hrIni && test.dtExecFull && form.local !== 'Selecione' && form.funcioExec !== 'Selecione') {
			let somaMM = castToMM(form.hrFim) - castToMM(form.hrIni)

			let hrReal = new Date(somaMM * 60 * 1000).toISOString().substr(11, 8)

			if (form.title === 'Alterar Execução') {
				putForm_SQL(hrReal)
			} else {
				postForm_SQL(hrReal)
			}

			getOS_SQL()
		} else {
			alert('Preencha todos os campos corretamente')
		}
	}

	function B(props) {
		return <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>;
	}

	function InputDesc(state, oldState, setState, inputName) {
		return (
			<TouchableOpacity>
				<ScrollView style={sx.container} scrollEnabled={true}>
					<Text style={{ ...sx.box, ...sx.boxTop }}>
						<B>{inputName.toUpperCase()}</B>
					</Text>
					{sql[0].situacao === 'EM ANDAMENTO' ?
						<TextInput multiline={true} value={state}
							placeholder='Digite Aqui'
							style={{ ...sx.box, ...sx.boxBottom }}
							onChangeText={state => setState(state)}
							/* onBlur: se ele desfocar do input, alert questiona salvamento */
							onBlur={() => {
								if (oldState != state) {
									Alert.alert('Atenção', `Você confirma a alteração de ${inputName}?`,
										[{ text: 'NÃO', onPress: () => setState(oldState), style: 'cancel', },
										{
											text: 'SIM', onPress: async () => {
												await putDesc_SQL()
												await getOS_SQL()
											}
										},], { cancelable: false })
								}
							}} />
						:
						<TextInput multiline={true} value={state}
							placeholder='Nada Inserido' editable={false}
							style={{ ...sx.box, ...sx.boxBottom }} />}
				</ScrollView>
			</TouchableOpacity>
		)
	}

	function inputForm() {

		return (
			<View style={{ alignItems: 'center' }}>
				<Text
					style={{ ...sx.textMenu2, marginTop: 50, fontSize: 30 }}>
					<B>{form.title}</B>
				</Text>

				<Text><B>{'Início'}</B> Execução</Text>
				<MaskInput placeholder='___/___/______'
					mask={Masks.DATE_DDMMYYYY}
					style={sx.dates} value={form.dtExecFull}
					keyboardType='numeric' maxLength={10}
					color={test.dtExecFull ? 'black' : 'red'}
					onChangeText={masked => {
						setHandleSave(true)
						setForm({ ...form, dtExecFull: masked })
						setTest({ ...test, dtExecFull: dtRegex.test(masked) && !dtMoreThanToday(masked, null) })
					}} />

				<Text>Hora <B>{'Início'}</B></Text>
				<MaskInput placeholder='___:___'
					mask={[/\d/, /\d/, ':', /\d/, /\d/]}
					style={sx.dates} value={form.hrIni}
					keyboardType='numeric' maxLength={5}
					color={test.hrIni ? 'black' : 'red'}
					onChangeText={masked => {
						setHandleSave(true)
						setForm({ ...form, hrIni: masked })
						setTest({ ...test, hrIni: hrRegex.test(masked) })
					}}
				/>

				<Text>Hora <B>{'Fim'}</B></Text>
				<MaskInput placeholder='___:___' mask={[/\d/, /\d/, ':', /\d/, /\d/]}
					style={sx.dates} value={form.hrFim}
					keyboardType='numeric' maxLength={5}
					color={test.hrFim ? 'black' : 'red'}
					onChangeText={masked => {
						setHandleSave(true)
						setForm({ ...form, hrFim: masked })
						setTest({ ...test, hrFim: hrRegex.test(masked) })
					}}
				/>
			</View>
		)
	}

	return (
		<>
			{modalForm ? //Se true, abre o formulário de Add ou alteracao de execução
				<ScrollView scrollEnabled={true}>
					{inputForm()}

					<View style={{ alignItems: 'center', marginTop: 20 }}>
						<Text><B>Execução do Serviço</B></Text>
					</View>
					<Picker style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}
						selectedValue={form.local} onPress={() => setForm({ ...form, local: 'Selecione' })}
						onValueChange={v => {
							setHandleSave(true)
							setForm({ ...form, local: v })
						}}>
						<Item label="Selecione" value="Selecione" />
						<Item label="Fora da Empresa" value="S" />
						<Item label="Dentro da Empresa" value="N" />
					</Picker>

					<View style={{ alignItems: 'center', marginTop: 20 }}>
						<Text><B>Funcionário Executante</B></Text>
					</View>

					<Picker style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}
						selectedValue={form.funcioExec} onPress={() => setForm({ ...form, local: 'Selecione' })}
						onValueChange={v => {
							setHandleSave(true)
							setForm({ ...form, funcioExec: v })
						}}>
						<Item label="Selecione" value="Selecione" />
						{listFunc && listFunc.map((f, v) => <Item key={v} label={f.nome} value={f.c_fun} />)}
					</Picker>

					{handleSave && //Botao para Salvar Execução
					<Appbar style={sx.saveBar}>
						<A.Text animation="pulse" duration={2000} iterationCount="infinite"
						onPress={() => validateForm()} style={sx.updateData}>
						<Icon name="check-circle" size={15} color="#FFF" /> Salvar Execução
						</A.Text>
					</Appbar>
					}

					<A.Text animation="pulse" duration={2000} iterationCount="infinite"
						onPress={() => {
							setSQL(null)
							getOS_SQL()
							setModalForm(!modalForm)
							setHandleSave(false)
						}} style={{ ...sx.updateData, backgroundColor: '#2c3b76' }}>
						<Icon name="arrow-circle-left" size={15} color="#FFF" /> Voltar
					</A.Text>


					{form.title === 'Alterar Execução' ?
						<Text animation="pulse" duration={2000}
							iterationCount="infinite" onPress={() => delForm_SQL()}
							style={{ ...sx.updateData, backgroundColor: 'red', marginTop: 30 }}>
							<Icon name="minus-circle" size={15} color="#FFF" /> Excluir Execução
						</Text> : null}
				</ScrollView>

				: // se false, mostra o painel de execuções, dados da OS, etc.
				<ScrollView scrollEnabled={true}>
					{sql ?
						<ScrollView>
							<ScrollTo target="teste">
								<Text style={sx.textMenu}>
									<B>{'Nº da OS: '}</B>{sql[0].c_mve}
								</Text>
							</ScrollTo>

							<Text style={sx.textMenu2}>
								<B>{'Dt. Abertura: '}</B>{sql[0].dtAbertura}
							</Text>
							<Text style={sx.textMenu2}>
								<B>{'Situação OS: '}</B>{sql[0].situacao}
							</Text>
							<Text style={{ ...sx.textMenu2, marginBottom: 10 }}>
								<B>{'Valor Efetivo: '}</B>{sql[0].vlEfetivo}
							</Text>

							{form.semExec ? null : //Se true, não mostra o list de execuções
								<>
									<Text style={sx.exec}>
										Execuções
									</Text>
									<Text style={sx.layoutExec}>Data Início             Data Fim             Execução</Text>
									{sql.map((e, i) => {
										return (
											<Text onPress={() => {

												if (sql[0].situacao === 'EM ANDAMENTO') {
													//setForm({ title: 'Alterar Execução', ...{ funcioExec, local, idExec, dtExecFull, dtExec, hrIni, hrFim } = sql[i] })
													setForm({ title: 'Alterar Execução', funcioExec: sql[i].funcioExec, local: sql[i].local, idExec: sql[i].idExec, dtExecFull: sql[i].dtExecFull, dtExec: sql[i].dtExec, hrIni: sql[i].hrIni, hrFim: sql[i].hrFim })
													setTest({ dtExecFull: true, hrIni: true, hrFim: true })
													setModalForm(!modalForm)
												}
											}}
												key={i} // se i é par, bkgColor = '#d5def2'
												style={{ ...sx.layoutExecRow, backgroundColor: i & 1 ? '#FFF' : '#d5def2' }}>
												{e.dtExec} {e.hrIni}         {e.dtExec} {e.hrFim}         {e.hrReal}  -  {e.nomeExecFull && e.nomeExecFull.split(' ').slice(0, 2).join(' ')}
											</Text>
										)
									})}
								</>}

							{sql[0].situacao === 'EM ANDAMENTO' ?
								<A.Text animation="pulse" duration={2000}
									iterationCount="infinite" style={sx.execAnimate}
									onPress={() => {
										setModalForm(!modalForm)
										setForm({ title: 'Inserir Execução', funcioExec: `Selecione`, local: `Selecione`, idExec: null })
									}}>
									<Icon name="plus-circle" size={20} color="#FFF" /> Adicionar Execução
								</A.Text> : null
							}
							<Target name="teste">
								<A.Text animation="pulse" duration={2000}
									iterationCount="infinite" style={sx.execAnimate}
									onPress={() => PassagemParam()}>
									<Icon name="info-circle" size={20} color="#FFF" /> Ver Produtos desta OS
								</A.Text>
							</Target>


							{InputDesc(obsSQL, sql[0].obs, setObs, 'Observações')}
							{InputDesc(defSQL, sql[0].defeito, setDef, 'Defeitos')}
						</ScrollView>
						:
						null
					}
				</ScrollView>
			}
		</>
	)
}