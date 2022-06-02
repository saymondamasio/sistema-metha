import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input';
import { Picker } from '@react-native-community/picker';
import styles from './PessoaEncontradaStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { Loading } from '../../../../Components/Loader'

let ContPessoa
let rota

export default function ProcurarPessoa( { navigation, route } ) {

    const [ContP, setContP] = React.useState('');
    const [Mudou, setMudou] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone1, setPhone1] = React.useState(null);
    const [phone2, setPhone2] = React.useState(null);
    const [phone3, setPhone3] = React.useState(null);
    const [Dt_nasc, setDt_nasc] = React.useState('');
    const [rg, setRg] = React.useState('');
    const [Cpf, setCpf] = React.useState('');
    const [fantasia, setFantasia] = React.useState('');
    const [cgc, setCgc] = React.useState('');
    const [inscest, setInscest] = React.useState('');
    const [tpinscest, setTpinscest] = React.useState('');
    const [inscMun, setInscMun] = React.useState('');
    const [Fisica_jur, setFisica_jur] = React.useState("");
    const [NomeRazao, setNomeRazao] = React.useState("");
    const [cep, setCep] = React.useState('');
    const [cidade, setCidade] = React.useState('');
    const [uf, setUf] = React.useState('');
    const [endereco, setEndereco] = React.useState('');
    const [bairro, setBairro] = React.useState('');
    const [numero, setNumero] = React.useState('');
    const [compl, setCompl] = React.useState('');
    const [load, setLoad] = React.useState(false)

    useEffect(() => {
        rota = route.params[1]
        ContPessoa = Number(route.params[0].id);
        Atualizar()
        setContP(ContPessoa)
        Preencher()
    }, []);

    const Atualizar = async () => {

        var data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": `select c_pessoa, nome, fantasia, fisica_jur, cpf, cgc, rg, FORMAT(dt_nasc, 'dd/MM/yyyy') as dt_nasc, ddd_fone, fone, ddd_celular, celular, ddd_fax, fax, insc_est, indIEDest, insc_mun, cep, bairro, endereco, numero, cidade, uf, compl, e_mail from cd_pessoa where c_pessoa = '${rota.params[ContPessoa].c_pessoa}'`
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
            let respJson = (JSON.parse(JSON.stringify(response.data)).recordset);

            rota.params[ContPessoa].nome = respJson[0].nome
            rota.params[ContPessoa].fantasia = respJson[0].fantasia
            rota.params[ContPessoa].fisica_jur = respJson[0].fisica_jur
            rota.params[ContPessoa].cgc = respJson[0].cgc
            rota.params[ContPessoa].cpf = respJson[0].cpf
            rota.params[ContPessoa].rg = respJson[0].rg
            rota.params[ContPessoa].dt_nasc = respJson[0].dt_nasc
            rota.params[ContPessoa].insc_est = respJson[0].insc_est
            rota.params[ContPessoa].indIEDest = respJson[0].indIEDest
            rota.params[ContPessoa].insc_mun = respJson[0].insc_mun
            rota.params[ContPessoa].ddd_fone = respJson[0].ddd_fone
            rota.params[ContPessoa].fone = respJson[0].fone
            rota.params[ContPessoa].ddd_fax = respJson[0].ddd_fax
            rota.params[ContPessoa].fax = respJson[0].fax
            rota.params[ContPessoa].ddd_celular = respJson[0].ddd_celular
            rota.params[ContPessoa].celular = respJson[0].celular
            rota.params[ContPessoa].cep = respJson[0].cep
            rota.params[ContPessoa].cidade = respJson[0].cidade
            rota.params[ContPessoa].uf = respJson[0].uf
            rota.params[ContPessoa].endereco = respJson[0].endereco
            rota.params[ContPessoa].bairro = respJson[0].bairro
            rota.params[ContPessoa].numero = respJson[0].numero
            rota.params[ContPessoa].compl = respJson[0].compl
            rota.params[ContPessoa].e_mail = respJson[0].e_mail

        })
        .catch(function (error) {
            console.log(error);
        });

    }

    const Preencher = (sit) => {
        
        if (sit == 'prox'){
            ContPessoa += 1
            setContP(ContPessoa)
        } else if (sit == 'ant'){
            ContPessoa -= 1
            setContP(ContPessoa)
        }
        setNomeRazao(rota.params[ContPessoa].nome)
        setFantasia(rota.params[ContPessoa].fantasia)
        setEmail(rota.params[ContPessoa].e_mail)
        setFisica_jur(rota.params[ContPessoa].fisica_jur)
        setCgc(rota.params[ContPessoa].cgc)
        setCpf(rota.params[ContPessoa].cpf)
        setRg(rota.params[ContPessoa].rg)
        setDt_nasc(rota.params[ContPessoa].dt_nasc)
        setInscest(rota.params[ContPessoa].insc_est)
        setTpinscest(rota.params[ContPessoa].indIEDest)
        setInscMun(rota.params[ContPessoa].insc_mun)
        if (rota.params[ContPessoa].ddd_fone != null){
            setPhone1((rota.params[ContPessoa].ddd_fone) + (rota.params[ContPessoa].fone))
        } else {
            setPhone1(rota.params[ContPessoa].fone)
        }
        if (rota.params[ContPessoa].ddd_fax != null){
            setPhone2((rota.params[ContPessoa].ddd_fax) + (rota.params[ContPessoa].fax))
        } else {
            setPhone2(rota.params[ContPessoa].fax)
        }
        if (rota.params[ContPessoa].ddd_celular != null){
            setPhone3((rota.params[ContPessoa].ddd_celular) + (rota.params[ContPessoa].celular))
        } else {
            setPhone3(rota.params[ContPessoa].celular)
        }
        setCep(rota.params[ContPessoa].cep)
        setCidade(rota.params[ContPessoa].cidade)
        setUf(rota.params[ContPessoa].uf)
        setEndereco(rota.params[ContPessoa].endereco)
        setBairro(rota.params[ContPessoa].bairro)
        setNumero(rota.params[ContPessoa].numero)
        setCompl(rota.params[ContPessoa].compl)
    }
    const Salvar = async () => {
        setLoad(true)
        let dtlanc = Dt_nasc == "" || Dt_nasc == null ? null : Dt_nasc.split('/')
        
        var data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": `update cd_pessoa set e_mail = ${email == null || email == "" ? null : `'${email}'`},fone = ${phone1 == null || phone1 == "" ? null : `'${phone1}'`},fax = ${phone2 == null || phone2 == "" ? null : `'${phone2}'`},celular = ${phone3 == null || phone3 == "" ? null : `'${phone3}'`},dt_nasc = ${dtlanc == null || dtlanc == "" ? null : `CONVERT(DATETIME, '${dtlanc[2]}-${dtlanc[1]}-${dtlanc[0]}')`}, rg = ${rg == null || rg == "" ? null : `'${rg}'`},cpf = ${Cpf == null || Cpf == "" ? null : `'${Cpf}'`},fantasia = ${fantasia == null || fantasia == "" ? null : `'${fantasia}'`},cgc = ${cgc == null || cgc == "" ? null : `'${cgc}'`},insc_est = ${inscest == null || inscest == "" ? null : `'${inscest}'`},indIEDest = ${tpinscest == null || tpinscest == "" ? null : `'${tpinscest}'`},insc_mun = ${inscMun == null || inscMun == "" ? null : `'${inscMun}'`},fisica_jur = ${Fisica_jur == null || Fisica_jur == "" ? null : `'${Fisica_jur}'`},nome = ${NomeRazao == null || NomeRazao == "" ? null : `'${NomeRazao}'`},cep = ${cep == null || cep == "" ? null : `'${cep}'`},cidade = ${cidade == null || cidade == "" ? null : `'${cidade}'`},uf = ${uf == null || uf == "" ? null : `'${uf}'`},endereco = ${endereco == null || endereco == "" ? null : `'${endereco}'`},bairro = ${bairro == null || bairro == "" ? null : `'${bairro}'`},numero = ${numero == null || numero == "" ? null : `'${numero}'`},compl = ${compl == null || compl == "" ? null : `'${compl}'`} where c_pessoa = '${rota.params[ContPessoa].c_pessoa}'`
        });
        
        var config = {
            method: 'post',
            url: await AsyncStorage.getItem('@apiTran'),
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
        .then(function (response) {
            setLoad(false)
            let respJson = (JSON.parse(JSON.stringify(response.data)));
            if (respJson == "Transaction committed"){
                alert('As alterações foram salvas')
            } else {
                alert(respJson)
            }
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return(
        <View style={styles.container}>

            <StatusBar style="dark" />

            <Loading 
                show={load}
                onDismiss={()=>{
                    setLoad(false)
                }}
            />
            
            <ScrollView>

                <Text>Nome/Razão</Text>
                <TextInput
                    style={styles.Input}
                    value={NomeRazao}
                    placeholder="Nome/Razão"
                    onChangeText={(text) => {
                        setNomeRazao(text)
                        setMudou(true)
                    }}
                />
                <Text>Nome Fantasia</Text>
                <MaskInput
                    value={fantasia}
                    placeholder='Nome Fantasia'
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setFantasia(unmasked);
                        setMudou(true)
                    }}
                />
                <Picker
                    selectedValue={Fisica_jur}
                    style={styles.selectFisJur}
                    onValueChange={(itemValue, itemIndex) => {
                        setFisica_jur(itemValue)
                        setMudou(true)
                    }}>
                    <Picker.Item label="Fisico" value="F" />
                    <Picker.Item label="Juridico" value="J" />
                </Picker>
                <Text style={{paddingTop: 10}}>CNPJ</Text>
                <MaskInput
                    value={cgc}
                    placeholder='CNPJ'
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setCgc(unmasked);
                        setMudou(true)
                    }}
                    keyboardType= 'numeric'
                    mask={[/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/]}
                />
                <Text>CPF</Text>
                <MaskInput
                    value={Cpf}
                    placeholder='CPF'
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setCpf(unmasked);
                        setMudou(true)
                    }}
                    keyboardType= 'numeric'
                    mask={[/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/,]}
                />
                <Text>RG</Text>
                <MaskInput
                    value={rg}
                    placeholder='RG'
                    style={styles.Input}
                    keyboardType= 'numeric'
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setRg(unmasked);
                        setMudou(true)
                    }}
                />
                <Text>Data de Nascimento</Text>
                <MaskInput
                    value={Dt_nasc}
                    placeholder='Data de Nascimento'
                    keyboardType= 'numeric'
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setDt_nasc(masked);
                        setMudou(true)
                    }}
                    mask={Masks.DATE_DDMMYYYY}
                />
                <Text>Inscrição Estadual</Text>
                <MaskInput
                    value={inscest}
                    placeholder='Inscrição Estadual'
                    keyboardType= 'numeric'
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setInscest(unmasked);
                        setMudou(true)
                    }}
                />
                <Text>Tipo de Inscrição</Text>
                <MaskInput
                    value={tpinscest}
                    placeholder='Tipo de Inscrição'
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setTpinscest(unmasked);
                        setMudou(true)
                    }}
                    keyboardType= 'numeric'
                    mask={[/\d/]}
                />
                <Text>Inscricao Municipal</Text>
                <MaskInput
                    value={inscMun}
                    placeholder='Inscricao Municipal'
                    style={styles.Input}
                    keyboardType= 'numeric'
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setInscMun(unmasked);
                        setMudou(true)
                    }}
                />
                <Text>Telefone 01</Text>
                <MaskInput
                    value={phone1}
                    placeholder='Telefone'
                    keyboardType= 'numeric'
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setPhone1(unmasked);
                        setMudou(true)
                    }}
                    mask={['(',/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/,]}
                />
                <Text>Telefone 02</Text>
                <MaskInput
                    value={phone2}
                    placeholder='Telefone'
                    keyboardType= 'numeric'
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setPhone2(unmasked);
                        setMudou(true)
                    }}
                    mask={['(',/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/,]}
                />
                <Text>Telefone 03</Text>
                <MaskInput
                    value={phone3}
                    placeholder='Telefone'
                    keyboardType= 'numeric'
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setPhone3(unmasked);
                        setMudou(true)
                    }}
                    mask={['(',/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/,]}
                />
                <Text>CEP</Text>
                <MaskInput
                    value={cep}
                    placeholder='CEP'
                    keyboardType= 'numeric'
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setCep(unmasked);
                        setMudou(true)
                    }}
                    mask={[/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/]}
                />
                <Text>Cidade</Text>
                <MaskInput
                    value={cidade}
                    placeholder='Cidade'
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setCidade(unmasked);
                        setMudou(true)
                    }}
                />
                <Text>Estado</Text>
                <MaskInput
                    value={uf}
                    placeholder='Estado'
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setUf(unmasked);
                        setMudou(true)
                    }}
                    mask={[/[a-zA-Z]/, /[a-zA-Z]/]}
                />
                <Text>Rua</Text>
                <MaskInput
                    value={endereco}
                    placeholder='Rua'
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setEndereco(unmasked);
                        setMudou(true)
                    }}
                />
                <Text>Bairro</Text>
                <MaskInput
                    value={bairro}
                    placeholder='Bairro'
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setBairro(unmasked);
                        setMudou(true)
                    }}
                />
                <Text>Número</Text>
                <MaskInput
                    value={numero}
                    placeholder='Número'
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setNumero(unmasked);
                        setMudou(true)
                    }}
                />
                <Text>Complemento</Text>
                <MaskInput
                    value={compl}
                    placeholder='Complemento'
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setCompl(unmasked);
                        setMudou(true)
                    }}
                />
                <Text>Email</Text>
                <MaskInput
                    value={email}
                    placeholder='Email'
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setEmail(unmasked);
                        setMudou(true)
                    }}
                />

                <View style={{alignItems: "flex-end"}}>
                    <TouchableOpacity 
                        disabled={!Mudou}
                        style={styles.ButtonSave}
                        onPress={()=>{Salvar();Atualizar()}}
                    >
                            <Text style={styles.TextSave}>Salvar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.ViewPos}>
                    <TouchableOpacity 
                        style={styles.ButtonLoc}
                        disabled={ContP == 0}
                        onPress={()=>{Preencher("ant");Atualizar()}}
                    >
                            <Text style={styles.TextPos}>&lt;</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.ButtonLoc}
                        disabled={ContP == route.params[1].params.length-1}
                        onPress={()=>{Preencher("prox");Atualizar()}}
                    >
                            <Text style={styles.TextPos}>&gt;</Text>
                    </TouchableOpacity>
                </View>

                </ScrollView>
        
        </View>
    )
 
}
