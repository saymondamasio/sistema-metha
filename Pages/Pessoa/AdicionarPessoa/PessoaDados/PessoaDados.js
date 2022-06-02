import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-community/picker';
import styles from './PessoaDadosStyle';
import MaskInput, {Masks} from 'react-native-mask-input';
import { Parametros, ProcuraParam } from '../../../../Components/Parametro'
export default function PessoaDados( { navigation } ) {
  
    const [fisica_jur, setFisica_jur] = useState("F");
    const [tpPessoa, setTpPessoa] = useState("CL");
    const [NomeRazao, setNomeRazao] = useState("");
    const [phone1, setPhone1] = React.useState('');
    const [phone2, setPhone2] = React.useState('');
    const [phone3, setPhone3] = React.useState('');
    const [Dt_nasc, setDt_nasc] = React.useState('');
    const [rg, setRg] = React.useState('');
    const [Cpf, setCpf] = React.useState('');
    const [CpfSmask, setCpfSmask] = React.useState('');
    const [CpfCmask, setCpfCmask] = React.useState('');
    const [fantasia, setFantasia] = React.useState('');
    const [cgc, setCgc] = React.useState('');
    const [cgcSmask, setCgcSmask] = React.useState('');
    const [cgcCmask, setCgcCmask] = React.useState('');
    const [inscest, setInscest] = React.useState('');
    const [tpinscest, setTpinscest] = React.useState('');
    const [inscMun, setInscMun] = React.useState('');

    return (

        <View style={styles.container}>
        
        <ScrollView>
            <StatusBar style="dark" />

            <TextInput
                style={styles.Input}
                placeholder="Nome/Razão"
                maxLength={50}
                onChangeText={(text) => {
                    setNomeRazao(text)
                }}
            />
            <Picker
                selectedValue={tpPessoa}
                style={styles.selectFisJur}
                onValueChange={(itemValue, itemIndex) => {
                        setTpPessoa(itemValue)
                }}>
                <Picker.Item label="CL" value="CL" />
                <Picker.Item label="FO" value="FO" />
                <Picker.Item label="CF" value="CF" />
                <Picker.Item label="OU" value="OU" />
            </Picker>
            <Picker
                selectedValue={fisica_jur}
                style={styles.selectFisJur}
                onValueChange={(itemValue, itemIndex) => {
                        setFisica_jur(itemValue)
                        setDt_nasc('');
                        setRg('');
                        setCpf('');
                        setCpfCmask('');
                        setCpfSmask('');
                        setFantasia('');
                        setCgcSmask('');
                        setCgc('');
                        setCgcCmask('');
                        setInscest('');
                        setTpinscest('');
                        setInscMun('');
                    }}>
                <Picker.Item label="Fisico" value="F" />
                <Picker.Item label="Juridico" value="J" />
            </Picker>
            
            <View value = {fisica_jur}>
                {AddComp()}
            </View>

            <View style={styles.ViewNext}>
                <TouchableOpacity 
                    style={styles.ButtonNext}
                    onPress={() => {
                        SalvarCpfCnpj()
                    }} 
                >
                        <Text style={styles.TextNext}>Proximo</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        
        </View>
    );

    // Verifica se é fisico ou juridico e retorna os campos restantes
    function AddComp() {
        if (fisica_jur == 'J'){ // Juridico   , , , , ,
        return (
            <View style={styles.FisJur}>

                <MaskInput
                    value={fantasia}
                    placeholder='Nome Fantasia'
                    style={styles.Input}
                    maxLength={35}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setFantasia(unmasked);
                    }}
                />
                <MaskInput
                    value={cgcSmask}
                    placeholder='CNPJ'
                    style={styles.Input}
                    maxLength={18}
                    onChangeText={async (masked, unmasked, obfuscated) => {
                        setCgcSmask(unmasked)
                        setCgcCmask(masked)
                    }}
                    keyboardType= 'numeric'
                    mask={[/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/]}
                />
                <MaskInput
                    value={inscest}
                    placeholder='Inscrição Estadual'
                    keyboardType= 'numeric'
                    style={styles.Input}
                    maxLength={20}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setInscest(unmasked);
                    }}
                />
                <MaskInput
                    value={tpinscest}
                    placeholder='Tipo de Inscrição'
                    style={styles.Input}
                    maxLength={1}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setTpinscest(unmasked);
                    }}
                    keyboardType= 'numeric'
                    mask={[/[1|9]/]}
                />
                <MaskInput
                    value={inscMun}
                    placeholder='Inscricao Municipal'
                    style={styles.Input}
                    keyboardType= 'numeric'
                    maxLength={20}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setInscMun(unmasked);
                    }}
                />
                <MaskInput
                    value={phone1}
                    placeholder='Telefone'
                    keyboardType= 'numeric'
                    maxLength={15}
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setPhone1(unmasked);
                    }}
                    mask={['(',/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/,]}
                />
                <MaskInput
                    value={phone2}
                    placeholder='Telefone'
                    keyboardType= 'numeric'
                    maxLength={15}
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setPhone2(unmasked);
                    }}
                    mask={['(',/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/,]}
                />
                <MaskInput
                    value={phone3}
                    placeholder='Telefone'
                    keyboardType= 'numeric'
                    style={styles.Input}
                    maxLength={15}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setPhone3(unmasked);
                    }}
                    mask={['(',/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/,]}
                />

            </View>
        )
        } else { // Fisico 
            return (
                <View style={styles.FisJur}>

                    <MaskInput
                        value={CpfSmask}
                        placeholder='CPF'
                        style={styles.Input}
                        maxLength={14}
                        onChangeText={(masked, unmasked, obfuscated) => {
                            setCpfSmask(unmasked)
                            setCpfCmask(masked)
                        }}
                        keyboardType= 'numeric'
                        mask={[/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/,]}
                    />
                    <MaskInput
                        value={rg}
                        placeholder='RG'
                        style={styles.Input}
                        maxLength={15}
                        keyboardType= 'numeric'
                        onChangeText={(masked, unmasked, obfuscated) => {
                            setRg(unmasked);
                        }}
                    />
                    <MaskInput
                        value={Dt_nasc}
                        placeholder='Data de Nascimento'
                        keyboardType= 'numeric'
                        style={styles.Input}
                        maxLength={10}
                        onChangeText={(masked, unmasked, obfuscated) => {
                            setDt_nasc(masked);
                        }}
                        mask={Masks.DATE_DDMMYYYY}
                    />
                    <MaskInput
                    value={phone1}
                    placeholder='Telefone'
                    keyboardType= 'numeric'
                    style={styles.Input}
                    maxLength={15}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setPhone1(unmasked);
                    }}
                    mask={['(',/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/,]}
                />
                <MaskInput
                    value={phone2}
                    placeholder='Telefone'
                    keyboardType= 'numeric'
                    style={styles.Input}
                    maxLength={15}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setPhone2(unmasked);
                    }}
                    mask={['(',/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/,]}
                />
                <MaskInput
                    value={phone3}
                    placeholder='Telefone'
                    keyboardType= 'numeric'
                    style={styles.Input}
                    maxLength={15}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setPhone3(unmasked);
                    }}
                    mask={['(',/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/,]}
                />


                </View>
            )
        }
    }

    // Verifica se tem mascara ou não e salva o valor certo
    async function SalvarCpfCnpj () {
        let prox = false;

        if (NomeRazao == ''){
            alert('Preencha o Nome/Razão!')
            prox = false
        } else {
            prox = true

            if (fisica_jur == 'J') {    // Juridico
                if (ProcuraParam(667, 'parE') == 'S'){ // Cpf e Cnpj Obrigatorios
                    if (cgcSmask == ''){
                        alert('Preencha o CNPJ')
                        prox = false
                    }
                }


            } else {    // Fisico
                if (ProcuraParam(667, 'parE') == 'S'){ // Cpf e Cnpj Obrigatorios
                    if (CpfSmask == ''){
                        alert('Preencha o CPF')
                        prox = false
                    }
                }
                if (ProcuraParam(668, 'parE') == 'S'){ // RG Obrigatorio
                    if (rg == ''){
                        alert('Preencha o RG')
                        prox = false
                    }
                }
                if (ProcuraParam(743, 'parE') == 'S'){ // Dt Nascimento Obrigatorio
                    if (Dt_nasc == ''){
                        alert('Preencha a Data de Nascimento')
                        prox = false
                    }
                }

            }

            if (ProcuraParam(538, 'parE') == 'S'){ // Telefone Obrigatorio
                if (phone1 != '' || phone2 != '' || phone3 != ''){
                } else {
                    prox = false
                    alert('Preencha o Telefone')
                }
                
            }

        }

        if (prox){
            let param557 = ProcuraParam(557, 'parE')
            if (fisica_jur == 'F'){
                if (param557.resposta == 'N'){
                    navigation.navigate('PessoaLocalizacao', {
                        fisica_jur: fisica_jur,
                        tpPessoa: tpPessoa,
                        NomeRazao: NomeRazao,
                        phone1: phone1,
                        phone2: phone2,
                        phone3: phone3,
                        Dt_nasc: Dt_nasc,
                        rg: rg,
                        Cpf: CpfSmask,
                        fantasia: NomeRazao,
                        cgc: cgcSmask,
                        inscest: inscest,
                        tpinscest: tpinscest,
                        inscMun: inscMun
                    })
                } else {
                    navigation.navigate('PessoaLocalizacao', {
                        fisica_jur: fisica_jur,
                        tpPessoa: tpPessoa,
                        NomeRazao: NomeRazao,
                        phone1: phone1,
                        phone2: phone2,
                        phone3: phone3,
                        Dt_nasc: Dt_nasc,
                        rg: rg,
                        Cpf: CpfCmask,
                        fantasia: NomeRazao,
                        cgc: cgcCmask,
                        inscest: inscest,
                        tpinscest: tpinscest,
                        inscMun: inscMun
                    })
                }
            } else {
                if (param557.resposta == 'N'){
                    navigation.navigate('PessoaLocalizacao', {
                        fisica_jur: fisica_jur,
                        tpPessoa: tpPessoa,
                        NomeRazao: NomeRazao,
                        phone1: phone1,
                        phone2: phone2,
                        phone3: phone3,
                        Dt_nasc: Dt_nasc,
                        rg: rg,
                        Cpf: CpfSmask,
                        fantasia: fantasia,
                        cgc: cgcSmask,
                        inscest: inscest,
                        tpinscest: tpinscest,
                        inscMun: inscMun
                    })
                } else {
                    navigation.navigate('PessoaLocalizacao', {
                        fisica_jur: fisica_jur,
                        tpPessoa: tpPessoa,
                        NomeRazao: NomeRazao,
                        phone1: phone1,
                        phone2: phone2,
                        phone3: phone3,
                        Dt_nasc: Dt_nasc,
                        rg: rg,
                        Cpf: CpfCmask,
                        fantasia: fantasia,
                        cgc: cgcCmask,
                        inscest: inscest,
                        tpinscest: tpinscest,
                        inscMun: inscMun
                    })
                }
            }
        }

    } 


}
