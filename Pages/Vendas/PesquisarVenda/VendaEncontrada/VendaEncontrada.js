import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput, Platform, FlatList, Button, ActivityIndicatorComponent } from 'react-native';
import MaskInput, {Masks} from 'react-native-mask-input';
import { Picker } from '@react-native-community/picker';
import styles from './VendaEncontradaStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import AwesomeAlert from 'react-native-awesome-alerts';
import { Ionicons } from '@expo/vector-icons'; 
import Modal from "react-native-modal";
import { ProcuraParam } from '../../../../Components/Parametro'
import { Loading } from '../../../../Components/Loader'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { CamBarCodeScanner } from '../../../../Components/CamBarCodeScanner';
import { FontAwesome5 } from '@expo/vector-icons'; 

var numExc, contagem = 0
let ContPessoa, rota
let prodExclu = []
let trocaExclu = []
let prodAtual
let DataHr = new Date()

var tamanho_nr;
var casas_valor;
var palavra;
var fffixed;

export default function VendaCadastro ( { navigation, route } ) {

    const [Produtos, setProdutos] = React.useState([]);
    const [Financeiro, setFinanceiro] = React.useState([]);
    const [FinalidadeList, setFinalidadeList] = React.useState([]);
    const [Pessoa, setPessoa] = React.useState([]);
    const [Mudou, setMudou] = React.useState(false);
    const [Finalidade, setFinalidade] = React.useState('');
    const [NomeRazao, setNomeRazao] = React.useState("");
    const [Situação, setSituação] = React.useState("");
    const [Dt_lanc, setDt_lanc] = React.useState('');
    const [tp_preco, setTp_preco] = React.useState('');
    const [Contato, setContato] = React.useState('');
    const [Vl_Efetivo, setVl_Efetivo] = React.useState()
    const [vl_DescVenda, setVl_DescVenda] = React.useState()
    const [funcionario, setFuncionario] = React.useState('')
    const [showtrocarPessoa, setShowtrocarPessoa] = React.useState(false)
    const [pesquisar, setPesquisar] = React.useState('')
    const [pesquisarPor, setPesquisarPor] = React.useState('NOME')
    const [pesquisaPessoa , setPesquisaPessoa] = React.useState()
    const [clFunc , setClFunc] = React.useState()
    const [c_pessoa, setC_pessoa] = React.useState()
    const [c_func, setC_func] = React.useState()
    const [showProdutos, setShowProdutos] = React.useState(false)
    const [showPesqProd, setShowPesqProd] = React.useState(false)
    const [pesqProd, setPesqProd] = React.useState()
    const [pesquisarProd, setPesquisarProd] = React.useState()
    const [pesquisarProdPor, setPesquisarProdPor] = React.useState('PRODUTO')
    const [showPropItems, setShowPropItems] = React.useState(false)
    const [showPropItemsTroca, setShowPropItemsTroca] = React.useState(false)
    const [qtde, setQtde] = React.useState('')
    const [vlUnitario, setVlUnitario] = React.useState(0)
    const [vlDesc, setVlDesc] = React.useState(0)
    const [percDisc, setPercDisc] = React.useState(0)
    const [emprEstq, setEmprEstq] = React.useState(1)
    const [emps, setEmps] = React.useState([])
    const [obs, setObs] = React.useState('')
    const [descricao, setDescricao] = React.useState('')
    const [showExcluirItem, setShowExcluirItem] = React.useState(false)
    const [itemParaExcluir, setItemParaExcluir] = React.useState({})
    const [vl_PercVenda, setVl_PercVenda] = React.useState('')
    const [vlAcrVenda, setVlAcrVenda] = React.useState('')
    const [outrosVenda, setOutrosVenda] = React.useState(0)
    const [vlFreteVenda, setVlFreteVenda] = React.useState(0)
    const [vl_Total, setVl_Total] = React.useState(0)
    const [modalPag, setModalPag] = React.useState()
    const [pagList, setPagList] = React.useState([])
    const [showModFinan, setShowModFinan] = React.useState(false)
    const [modFinanValor, setModFinanValor] = React.useState()
    const [modFinanTp_titulo, setModFinanTp_titulo] = React.useState()
    const [modFinanData, setModFinanData] = React.useState()
    const [modFinanNbanco, setModFinanNbanco] = React.useState('')
    const [modFinanAgencia, setModFinanAgencia] = React.useState('')
    const [modFinanConta, setModFinanConta] = React.useState('')
    const [modFinanNr_doc_liq, setModFinanNr_doc_liq] = React.useState('')
    const [modFinanEmitente, setModFinanEmitente] = React.useState('')
    const [modFinanCpf_cgc, setModFinanCpf_cgc] = React.useState('')
    const [modFinanNrCob, setModFinanNrCob] = React.useState('')
    const [modFinanCartao, setModFinanCartao] = React.useState('P')
    const [modFinanContaBanc, setModFinanContaBanc] = React.useState('P')
    const [finanItem, setFinanItem] = React.useState({})
    const [cartaoLista, setCartaoLista] = React.useState([])
    const [contaLista, setContaLista] = React.useState([])
    const [sitAtt, setSitAtt] = React.useState(false)
    const [c_user, setC_user] = React.useState(0)
    const [showSalvarParcelas, setShowSalvarParcelas] = React.useState(false)
    const [load, setLoad] = React.useState(false)
    const [showScanCodeBar, setShowScanCodeBar] = React.useState(false)
    const [scanned, setScanned] = React.useState(false);
    const [hasPermission, setHasPermission] = React.useState(null);
    const [vlTotalTroca, setVlTotalTroca] = React.useState(0)
    const [haver, setHaver] = React.useState(0)
    const [flag_haver, setFlag_haver] = React.useState(0)
    const [showTrocaProd, setShowTrocaProd] = React.useState(false)
    const [itemsTroca, setItemsTroca] = React.useState([])
    const [showlistaTroca, setShowlistaTroca] = React.useState(false)
    const [listaTrocaProd, setListaTrocaProd] = React.useState([])
    //const [showExcluirItemTroca, setShowExcluirItemTroca] = React.useState(false)
    const [showModItemTroca, setShowModItemTroca] = React.useState()
    // Executa ao iniciar
    useEffect(() => {
        requestPermission()
        rota = route.params[1]
        ContPessoa = Number(route.params[0].id);
        Atualizar()
        setUser()
    }, []);

    async function requestPermission() {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    }

    const Atualizar = async () => {

        listacpl()
        funcionarioCpl()
        Preencher()
        cmplEmps()
        renderCartaoContaLista()
        renderModalPagList()
        finanCpl().then( res => {setFinanceiro(res)})

    }
    
    const Preencher = async () => {

        var data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": `select FORMAT(a.dt_lancamento, 'dd/MM/yyyy') as dt_lancamento, b.nome, a.nr_nf, a.vl_total, a.obs, a.tp_mov, a.flag_p, a.situacao, a.c_mve, a.c_pessoa, a.c_fun, a.c_mpg, a.c_tcx, a.tp_titulo, a.vl_desc, a.perc_desc, a.vl_efetivo, a.perc_acres, a.vl_acres, a.classe, a.dt_nf, a.c_fun_op, a.hr_lancamento, a.vl_frete, a.libera_correcao, a.c_trm, a.dt_canc, a.hr_canc, a.c_fun_canc, a.data_estoque, a.hora_estoque, a.tp_preco, a.c_fun_desc, a.vl_pro, a.vl_serv, a.vl_efetivo_pro, a.vl_efetivo_serv, a.desc_pro, a.desc_serv, a.total_troca, a.contato, a.c_agrupa, a.c_mve_tro, a.haver, a.flag_haver, a.haverpgto, a.finalidade, a.credito, a.creditopgto, a.outros, a.usa_creditopgto, a.c_nfs, a.loja_ecf, a.caixa_ecf, a.nr_coo, a.estado_cupom, a.cf, a.nome_nfpaulista, a.endereco_nfpaulista, a.numero_nfpaulista, a.compl_nfpaulista, a.bairro_nfpaulista, a.cidade_nfpaulista, a.uf_nfpaulista, a.cep_nfpaulista, a.fone_nfpaulista, a.rg_ie_nfpaulista, a.livre_nfpaulista, a.vl_aprox_ibpt_total, a.NCFe, a.situacao_sat, a.peso, a.vl_desc_extra, a.c_veic, a.c_emp, a.c_fun_saidagarantia, a.c_fun_execucao, a.c_emp_destino, a.cpf_cgc, a.obs_ibpt, a.vl_aprox_ibpt_fed, a.vl_aprox_ibpt_estad, a.vl_aprox_ibpt_muni, a.c_pessoaA, a.usa_haverpgto, a.c_fun_restricao, a.c_fun_libera, a.c_fun_lib_diasatraso, a.c_mve_origem, a.situacao_balanco_ant, a.c_mve_destino, a.ciclo, a.sts, a.c_mve_n, a.c_plc, a.vl_sem_rebate, a.dt_previsao_entre, a.estado_cupom_vinc, a.c_motivocanc, a.obs_frete, a.c_pessoa_transp, a.volume, a.defeito, a.total_troca from cd_mve a, cd_pessoa b where a.c_pessoa = b.c_pessoa and c_mve = '${rota.params[ContPessoa].c_mve}' and classe = 'V'`
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

            setVl_Efetivo(respJson[0].vl_efetivo)
            setVl_Total(respJson[0].vl_total)
            setVl_DescVenda(respJson[0].vl_desc == null ? 0 : respJson[0].vl_desc)
            setVlAcrVenda(respJson[0].vl_acres == null ? 0 : respJson[0].vl_acres)
            setNomeRazao(respJson[0].nome)
            setFinalidade(respJson[0].finalidade)
            setSituação(respJson[0].situacao)
            setDt_lanc(respJson[0].dt_lancamento)
            setTp_preco(respJson[0].tp_preco)
            setContato(respJson[0].contato == null || respJson[0].contato == "null"? "" : respJson[0].contato)
            setC_pessoa(respJson[0].c_pessoa)
            setC_func(respJson[0].c_fun)
            setModalPag(respJson[0].c_mpg)
            setOutrosVenda(respJson[0].outros == null ? 0 : respJson[0].outros)
            setVlFreteVenda(respJson[0].vl_frete == null ? 0 : respJson[0].vl_frete)
            setVlTotalTroca(respJson[0].total_troca[0] == null ? 0 : respJson[0].total_troca[0])
            setHaver(respJson[0].haver == null ? 0 : respJson[0].haver)
            setFlag_haver(respJson[0].flag_haver == null ? 0 : respJson[0].flag_haver)

            if(respJson[0].situacao == 'CANCELADO' || respJson[0].situacao == 'REGISTRADO'){
                setSitAtt(true)
            }

            desconto('', '', respJson[0].vl_total, respJson[0].vl_desc)
        })
        .catch(function (error) {
            console.log(error);
        });

        // Finalidade
        let finalLista = []
        if (ProcuraParam(158, 'par') == "SV"){

            finalLista.push({value: "VE"})
            finalLista.push({value: "OS"})
            finalLista.push({value: "DEVOL_VENDA"})

            if (ProcuraParam(504, 'parE') == "S"){
                finalLista.push({value: "OR"})
            }

            if (ProcuraParam(50, 'par') == "S"){
                finalLista.push({value: "PE"})
            }

            finalLista.push({value: "GARANTIA"})

        } else {
            finalLista.push({value: "VE"})

            if (ProcuraParam(504, 'parE') == "S"){
                finalLista.push({value: "OR"})
            }
            
            if (ProcuraParam(50, 'par') == "S"){
                finalLista.push({value: "PE"})
            }

            finalLista.push({value: "DEVOL_VENDA"})
            
        }

        if (ProcuraParam(640, 'parE') == "S"){
            finalLista.push({value: "TRANSF_EMP"})
            
            if (ProcuraParam(360, 'par') == "S"){
                if (ProcuraParam(674, 'parE') == "SS"){
                    finalLista.push({value: "SS"})
                } else {
                    finalLista.push({value: "CS"})
                }
            }
            
        }
        setFinalidadeList(finalLista)

    }
    const Salvar = () => {

        let podeSalvar = true;

        // Verifica se a data está correta
        let find = '/';
        let re = new RegExp(find, 'g');
        if (Dt_lanc.replace(re, '').length != 8){
            podeSalvar = false;
            alert("Data de Lançamento Incorreta!");
        };

        // Verifica se tem Produtos
        if (Produtos.length == 0){
            podeSalvar = false;
            alert("Inclua os Itens da venda!");
        };

        if (ProcuraParam(519, 'parE') == 'N' && ProcuraParam(518, 'parE') == 'S'){
            if (ValorFinan().toFixed(2) == Number(Vl_Efetivo).toFixed(2) + Number(vlFreteVenda).toFixed(2)){
               
            } else {
                if (Financeiro.length == 0){
                    

                } else {
                    podeSalvar = false
                    alert('Valores não coincidem!')
                }
            }
        } else {
            if (ValorFinan().toFixed(2) == Number(Vl_Efetivo).toFixed(2)){         
      
            } else {
                if (Financeiro.length == 0){

                } else {
                    podeSalvar = false
                    alert('Valores não coincidem!')
                }
            }
        }
        // Salvar no banco
        if (podeSalvar){
            salvarBanco()
        }
    }
    const salvarBanco = async () => {
        
        setLoad(true)

        const caixa = await procurarCaixa().then();
        
        let sql = ""
        let tabela = "cd_mvfinAndam"
        let tp_mov, classe, haverpgto, usa_haverpgto, credito, creditopgto, usa_creditopgto = null

        // Props da Venda
            if (Finalidade == 'DEVOL_VENDA'){
                tp_mov='E';
                classe='C';
                haverpgto=0;
                usa_haverpgto='N';

                credito=0;
                creditopgto=0;
                usa_creditopgto='N';    
            } else {
                if (Finalidade == 'GARANTIA'){
                    tp_mov='S';
                    classe='C';
                    haverpgto=0;
                    usa_haverpgto='N';

                    credito=0;
                    creditopgto=0;
                    usa_creditopgto='N';
                } else {
                    if (Finalidade == 'TRANSF_EMP'){
                        tp_mov='T';
                        classe='C';
                        haverpgto=0;
                        usa_haverpgto='N';

                        credito=0;
                        creditopgto=0;
                        usa_creditopgto='N';

                    } else {
                        tp_mov='S';
                        classe='V';
                        if ((Finalidade == 'OR') || (Finalidade == 'RESGATE_PONTOS')) {
                            haverpgto=0;
                            usa_haverpgto='N';

                            credito=0;
                            creditopgto=0;
                            usa_creditopgto='N';
                        }

                    }

                }
                
            }


        // Financeiro
            sql += `DELETE FROM ${tabela} where c_mve = ${rota.params[ContPessoa].c_mve};`
            for(let i in Financeiro){
                let dataCpl = (Financeiro[i].data).split('/')
                let dataLancCpl = (rota.params[ContPessoa].dt_lancamento).split('/')

                let desc = `Venda ${rota.params[ContPessoa].c_mve} do dia ${rota.params[ContPessoa].dt_lancamento}`
                sql += `INSERT INTO ${tabela} (valor, dt_emissao, dt_venc, c_pessoa, r_p, tp_titulo, vl_juros, vl_desc, vl_outros, situacao, nr_boleto, vl_efetivo, lanc_ccr, lanc_lvcx, c_fun, c_cce, c_plc, nr_doccob, nr_docliq, agencia, nbanco, conta, c_ccr, descricao, consolidado, avulso, c_tcx, c_mve, c_cartao, cpf_cgc_ch, emitente) VALUES (${Financeiro[i].valor}, CONVERT(DATETIME, '${dataLancCpl[2]}-${dataLancCpl[1]}-${dataLancCpl[0]}'), CONVERT(DATETIME, '${dataCpl[2]}-${dataCpl[1]}-${dataCpl[0]}'), ${c_pessoa}, 'R', '${Financeiro[i].tp_titulo}', 0, 0, 0, 'A', ${Financeiro[i].nr_doc_cob == undefined || Financeiro[i].nr_doc_cob == '' ? null : Financeiro[i].nr_doc_cob}, ${Financeiro[i].valor}, '${ProcuraParam(21, 'par')}', '${ProcuraParam(20, 'par')}', ${c_func}, ${ProcuraParam(66, 'par')}, ${ProcuraParam(67, 'par')}, ${Financeiro[i].nr_doc_cob == undefined || Financeiro[i].nr_doc_cob == '' ? null : Financeiro[i].nr_doc_cob}, ${Financeiro[i].nr_doc_liq == undefined || Financeiro[i].nr_doc_liq == '' || Financeiro[i].nr_doc_liq == 'null' ? null : `'${Financeiro[i].nr_doc_liq}'`}, ${Financeiro[i].agencia == undefined || Financeiro[i].agencia == '' || Financeiro[i].agencia == 'null'  ? null : `'${Financeiro[i].agencia}'`}, ${Financeiro[i].nbanco == undefined || Financeiro[i].nbanco == '' ? null : Financeiro[i].nbanco}, ${Financeiro[i].conta == undefined || Financeiro[i].conta == '' ? null : Financeiro[i].conta}, ${ProcuraParam(21, 'par') == 'S' ? ProcuraParam(22, 'par') : 0}, '${desc}', 'N', 'N', ${caixa}, ${rota.params[ContPessoa].c_mve}, '${Financeiro[i].c_cartao == 'P' || Financeiro[i].c_cartao == '' ? "" : Financeiro[i].c_cartao}', ${Financeiro[i].cpf_cnpj == undefined || Financeiro[i].cpf_cnpj == '' ? null : Financeiro[i].cpf_cnpj}, ${Financeiro[i].emitente == undefined || Financeiro[i].emitente == '' || Financeiro[i].emitente == 'null' ? null : `'${Financeiro[i].emitente}'`});`
            }

        // Produtos
            for(let j in Produtos){
                if (Produtos[j].prodAdd == true){
                    // Adicionar
                    sql += `INSERT INTO cd_imve (c_mve, c_pro, qtde, vl_unit, pr_venda1, pr_venda2, pr_venda3, flag_p, pr_custo, vl_desc, perc_desc, vl_efetivo, entregue, vl_total, tp_preco, descricao, margem2, margem3, c_trm, c_depo, especificacao1) VALUES (${rota.params[ContPessoa].c_mve}, ${Produtos[j].c_pro}, ${Produtos[j].qtde}, ${Produtos[j].vl_unitario}, ${Produtos[j].pr_venda1}, ${Produtos[j].pr_venda2}, ${Produtos[j].pr_venda3}, 'N', ${ProcuraParam(709, 'parE') == 'S' ? Produtos[j].pr_medio : Produtos[j].pr_ult_cmp}, ${Produtos[j].vl_desc}, ${Produtos[j].perc_desc}, ${Produtos[j].vl_efetivo}, 'S', ${Produtos[j].vl_unitario * Produtos[j].qtde}, ${Produtos[j].tp_preco}, '${Produtos[j].produto}', ${Produtos[j].margem2}, ${Produtos[j].margem3}, 999, ${Produtos[j].c_depo}, '${Produtos[j].especificacao1 == null || Produtos[j].especificacao1 == '' ? null : Produtos[j].especificacao1}');`
                }
                console.log(Produtos)
                if (Produtos[j].prodAdd == false){
                    // Update
                }

            }
            for(let c in prodExclu){
                if(prodExclu[c].prodAdd == false){
                    // Deletar
                    sql += `DELETE FROM cd_imve WHERE c_pro = ${prodExclu[c].c_pro} and c_mve = ${rota.params[ContPessoa].c_mve};`
                }
            }
        
        // Troca
        for (let k in trocaExclu){
            if (trocaExclu[k].addTroca == false)
            sql += `DELETE FROM cd_tro where c_pro = ${trocaExclu[k].c_pro} and c_mve = ${rota.params[ContPessoa].c_mve};`
        }
            for(let t in itemsTroca){
                // verifica se tem algum produto na troca
                if (itemsTroca.length > 0){
                    if(itemsTroca[t].addTroca == true){
                        sql += `INSERT INTO cd_tro (c_mve, c_pro ,qtde, vl_unit ,vl_total, vl_efetivo, c_imve, flag_p, p1, total_p1, p2, total_p2, p3, total_p3, pr_custo) VALUES (${rota.params[ContPessoa].c_mve}, ${itemsTroca[t].c_pro} ,${itemsTroca[t].qtde}, ${itemsTroca[t].vl_unitario} ,${itemsTroca[t].vl_unitario * itemsTroca[t].qtde}, ${itemsTroca[t].vl_efetivo}, 0, 'N', ${itemsTroca[t].pr_venda1}, ${itemsTroca[t].pr_venda1 * itemsTroca[t].qtde}, ${itemsTroca[t].pr_venda2}, ${itemsTroca[t].pr_venda2 * itemsTroca[t].qtde}, ${itemsTroca[t].pr_venda3}, ${itemsTroca[t].pr_venda3 * itemsTroca[t].qtde}, ${itemsTroca[t].custo_tabela});`;
                    }
                }    
            }
        
        // Venda
            let dataLanc = Dt_lanc.split('/')
            sql += `UPDATE cd_mve set c_pessoa = ${c_pessoa}, c_fun = ${Number(c_func)}, dt_lancamento = CONVERT(DATETIME, '${dataLanc[2]}-${dataLanc[1]}-${dataLanc[0]}'), finalidade = '${Finalidade}', vl_total = ${vl_Total}, contato = '${Contato}', flag_p = 'N', c_mpg = ${modalPag == 'P'? null : modalPag}, c_tcx = ${caixa}, tp_titulo = '${getTp_titulo()}', vl_efetivo = ${Vl_Efetivo}, tp_preco = ${tp_preco}, vl_desc = ${Number(vl_DescVenda)}, perc_desc = ${percDisc}, vl_acres = ${Number(vlAcrVenda)}, perc_acres = ${(vlAcrVenda * 100) / vl_Total}, c_fun_op = ${c_user}, vl_frete = ${vlFreteVenda}, vl_outros = ${outrosVenda}, hr_lancamento = CONVERT(DATETIME, '${`${("0" + DataHr.getHours()).slice(-2)}:${("0" + DataHr.getMinutes()).slice(-2)}`}'), c_trm = 999, tp_mov = ${tp_mov != null ? `'${tp_mov}'` : null}, classe = ${classe != null ? `'${classe}'` : null}, haver = ${haver == undefined ? null : haver},total_troca = ${vlTotalTroca == undefined ? null : vlTotalTroca } , flag_haver = ${flag_haver != null ? `'${flag_haver}'` : null}, haverpgto = ${haverpgto == undefined ? null : haverpgto}, usa_haverpgto = ${usa_haverpgto != null ? `'${usa_haverpgto}'` : null}, credito = ${credito == undefined ? null : credito}, creditopgto = ${creditopgto == undefined ? null : creditopgto}, usa_creditopgto = ${usa_creditopgto != null ? `'${usa_creditopgto}'` : null} where c_mve = ${rota.params[ContPessoa].c_mve};`

        var data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": sql
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
            let respJson = (JSON.parse(JSON.stringify(response.data)));
            setLoad(false)

            if (respJson == "Transaction committed"){
                alert('As alterações foram salvas!')

                // Coloca os produtos como já gravados no Banco de Dados
                for(let j in Produtos){
                    if (Produtos[j].prodAdd == true){
                        Produtos[j].prodAdd = false
                    }
                }

            } else {
                alert('Algo deu errado, tente novamente!')
            }

        })
        .catch(function (error) {
            console.log(error);
            alert("[ERRO]")
            setLoad(false)
        }); 
    }

    // Capturar o usuario
    const setUser = async () => {
        setC_user(await AsyncStorage.getItem('@c_username'))
    }

    // Pega o ultimo caixa aberto
    const procurarCaixa = async () => {
        setLoad(true)
        var data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": `SELECT TOP (1) c_tcx, c_fun, dt_abert, hr_abert, dt_fech, hr_fech FROM cd_tcx WHERE (dt_fech IS NULL)`
        });
    
        var config = {
            method: 'post',
            url: await AsyncStorage.getItem('@api'),
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };
    
        return axios(config)
        .then(function (response) {
            setLoad(false)
            let respJson = (JSON.parse(JSON.stringify(response.data)).recordset);
            return respJson[0].c_tcx
        })
        .catch(function (error) {
            console.log(error);
            alert("[ERRO]")
            setLoad(false)
        });
    }

    // Carrega os cartões e as contas
    const renderCartaoContaLista = async () => {

        // Cartão
        var data = JSON.stringify({
        "banco": await AsyncStorage.getItem('@banco'),
        "sql": `SELECT c_cartao, nome FROM cd_cartao WHERE (ativo = 'S')`
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
            setCartaoLista(respJson)
        })
        .catch(function (error) {
            console.log(error);
        });

        // Contas
        var data = JSON.stringify({
        "banco": await AsyncStorage.getItem('@banco'),
        "sql": `SELECT c_ccr, nome, banco, ativo FROM cd_ccr where ativo = 'S'`
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
            setContaLista(respJson)
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    // Atualizar cartões
    const AttCC = () => {
        for(let i=0; i < Financeiro.length; i++){
            if (Financeiro[i].tp_titulo == "CC") {
                Financeiro[i].c_cartao = modFinanCartao
            }
        }
    }

    // Completa Empresas
    const cmplEmps = async () => {
        var data = JSON.stringify({
          "banco": await AsyncStorage.getItem('@banco'),
          "sql": `select c_emp, nome_pop from cd_emp`
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
            setEmps(respJson)
        })
        .catch(function (error) {
            console.log(error);
        });
      }

    // Completa as Listas
    const listacpl = () => {
        // Produtos
        const prodCpl = async () => {
            let data = JSON.stringify({
                "banco": await AsyncStorage.getItem('@banco'),
                "sql": `SELECT	a.c_imve, a.c_mve, a.c_pro, b.descricao as produto, a.qtde, a.vl_unit, a.vl_efetivo, a.vl_desc FROM cd_imve a, cd_pro b where c_mve = ${rota.params[ContPessoa].c_mve} and a.c_pro = b.c_pro and ativo ='S'`
            });
            let config = {
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
                let prodAux = []
                for(let i = 0; i <= respJson.length-1; i++){
                    prodAux.push({id: respJson[i].c_pro, produto: respJson[i].produto, qtde: respJson[i].qtde, vl_efetivo: respJson[i].vl_efetivo, c_pro: respJson[i].c_pro, vl_unitario: respJson[i].vl_unit, vl_desc: respJson[i].vl_desc, prodAdd: false})
                }
                setProdutos(prodAux)
    
            })
            .catch(function (error) {
                console.log(error);
            });
        }

        // Produtos troca
        const prodTrocaCpl = async () => {
            let data = JSON.stringify({
                "banco": await AsyncStorage.getItem('@banco'),
                "sql": `SELECT a.c_tro, a.c_mve, a.c_depo, a.c_pro, b.descricao, a.qtde, a.vl_unit, a.vl_total, a.vl_efetivo, a.c_imve, a.flag_p, a.p1, a.p2, a.p3, a.total_p1, a.total_p2, a.total_p3, a.pr_custo, c.tp_preco FROM cd_tro a, cd_pro b, cd_mve c where a.c_mve = ${rota.params[ContPessoa].c_mve} and c.c_mve = ${rota.params[ContPessoa].c_mve} and b.c_pro = a.c_pro`
            });
            let config = {
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
                let lista = [];
                
                for(let val of respJson){

                    let aux = {
                        c_pro: val.c_pro,
                        id: val.c_pro,
                        produto: val.descricao,
                        qtde: val.qtde,
                        vl_efetivo: val.vl_efetivo,
                        vl_unitario: val.vl_unit,
                        pr_venda1: val.p1,
                        pr_venda2: val.p2,
                        pr_venda3: val.p3,
                        c_depo: val.c_depo,
                        tp_preco: val.tp_preco,
                        custo_tabela: val.pr_custo,
                        addTroca: false
                    }

                    lista.push(aux)
                }

                setItemsTroca(lista)
    
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    
        prodCpl()
        prodTrocaCpl()

    }
    // Flatlist
    const myKeyExtractor = (item) => {
        return String(item.id)
    }

    // Renders
        // Produtos
    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: '#2c3b76',
                    margin: 2,
                    padding: 5
                }}
                onPress={() => {
                    if (showProdutos){
                        setItemParaExcluir(item)
                        setShowExcluirItem(true)
                    }
                }}
            >   
                <Text style={styles.TextProduto}>{`${item.qtde}   ${item.produto}`}</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    paddingHorizontal: 10
                }}>
                    <Text style={styles.TextProduto}>{'R$ ' + String(Number(item.vl_efetivo).toFixed(2))}</Text>
                </View>
            </TouchableOpacity>
        )
    }

        // Produto
    const renderProdAdd = ({item}) => {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: '#2c3b76',
                    margin: 2,
                    padding: 5
                }}
                onPress={()=>{
                    prodAtual = item;
                    let vlunit = Number(item.vl_efetivo);
                    
                    setDescricao(item.produto);
                    setQtde(1);
                    setVlUnitario(Number(item.vl_efetivo).toFixed(2));
                    setObs('');

                    if(ProcuraParam(91, 'par') == 'CALCULAR'){
                        if (item.desconto > 0){
                            setVlDesc((Number(item.desconto) / 100 * vlunit).toFixed(2));
                            setPercDisc(item.desconto);
                            
                        } else {
            
                            if (tp_preco == 1) {
                                if (item.vl_desc != null) {
                                setVlDesc(item.vl_desc.toFixed(2));
                                setPercDisc((Number(item.vl_desc) * 100 / vlunit).toFixed(2));
                                } else {
                                setVlDesc(0);
                                setPercDisc(0);
                                }
                            } else if (tp_preco == 2) {
                                if (item.vl_desc2 != null) {
                                setVlDesc(item.vl_desc2.toFixed(2));
                                setPercDisc((Number(item.vl_desc2) * 100 / vlunit).toFixed(2));
                                } else {
                                setVlDesc(0);
                                setPercDisc(0);
                                }
                            } else if (tp_preco == 3) {
                                if (item.vl_desc3 != null) {
                                    setVlDesc(item.vl_desc3.toFixed(2));
                                    setPercDisc((Number(item.vl_desc3) * 100 / vlunit).toFixed(2));
                                } else {
                                    setVlDesc(0);
                                    setPercDisc(0);
                                }
                            }
            
                            }
            
                        } else {
                            setVlDesc(0);
                            setPercDisc(0);
                        }

                    setEmprEstq(1);
                    setShowPesqProd(false)
                    setShowPropItems(true)
                }}
            >   
                <Text style={styles.TextProduto}>{`${item.produto}`}</Text>
                <Text style={styles.TextProduto}>{'R$ ' + String(Number(item.vl_efetivo).toFixed(2))}</Text>
            </TouchableOpacity>
        )
    }

    // Lista produtos de troca
    const renderAddItemTroca = ({item}) => {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: '#2c3b76',
                    margin: 2,
                    padding: 5
                }}
                onPress={()=>{
                    prodAtual = item;
                    let vlunit = Number(item.vl_efetivo);
                    
                    setDescricao(item.produto);
                    setQtde(1);
                    setVlUnitario(Number(item.vl_efetivo).toFixed(2));
                    setEmprEstq(1);

                    setShowlistaTroca(false)
                    setShowPropItemsTroca(true)
                 

                }}
            >   
                <Text style={styles.TextProduto}>{`${item.produto}`}</Text>
                <Text style={styles.TextProduto}>{'R$ ' + String(item.vl_efetivo.toFixed(2))}</Text>
            </TouchableOpacity>
        )
    }

    // Pegar cor 

    const getColor = async (c_cor) => {
        setLoad(true)

        let data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": `select * from cd_cor where c_cor=${c_cor}`
        });
        let config = {
            method: 'post',
            url: await AsyncStorage.getItem('@api'),
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };

        return axios(config)
        .then(function (response) {
            let respJson = (JSON.parse(JSON.stringify(response.data)).recordset);
            return respJson
            setLoad(false)
        })
        .catch(function (error) {
            console.log(error);
            alert("[ERRO]")
            setLoad(false)
        });

    }

    // Financeiro
    async function finanCpl() {
        let tabela

        if (rota.params[ContPessoa].situacao == 'EM ANDAMENTO'){
            tabela = "cd_mvfinAndam"
        } else {
            tabela = "cd_mvfin"
        }

        let data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": `select tp_titulo, nbanco, agencia, conta, nr_docliq, nr_doccob, emitente, cpf_cgc_ch, c_cartao, valor, FORMAT(dt_venc, 'dd/MM/yyyy') as dt_venc from ${tabela} where c_mve = ${rota.params[ContPessoa].c_mve}`
        });
        let config = {
            method: 'post',
            url: await AsyncStorage.getItem('@api'),
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };

        return axios(config)
        .then(function (response) {
            let respJson = (JSON.parse(JSON.stringify(response.data)).recordset);
            let finanAux = []
            for(let i = 0; i <= respJson.length-1; i++){
                finanAux.push({
                    valor: respJson[i].valor, 
                    data: respJson[i].dt_venc, 
                    tp_titulo: respJson[i].tp_titulo, 
                    id: i,
                    nbanco: respJson[i].nbanco,
                    agencia: respJson[i].agencia,
                    conta: respJson[i].conta,
                    nr_doc_liq: respJson[i].nr_docliq,
                    nr_doc_cob: respJson[i].nr_doccob,
                    emitente: respJson[i].emitente,
                    cpf_cnpj: respJson[i].cpf_cgc_ch,
                    c_cartao: respJson[i].c_cartao,
                    c_ccr: respJson[i].c_ccr
                })

            }
            return finanAux;

        })
        .catch(function (error) {
            console.log(error);
        });

    }

    const finanLista = () => {
         return (Financeiro.map( item => {
            return (
                <TouchableOpacity
                    style={{
                        backgroundColor: '#2c3b76',
                        margin: 2,
                        padding: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                    disabled={sitAtt}
                    key={item.id}
                    onPress={() => {
                        setFinanItem(item)
                        setModFinanValor(item.valor)
                        setModFinanData(item.data)
                        setModFinanTp_titulo(item.tp_titulo)
                        setModFinanNbanco(item.nbanco)
                        setModFinanAgencia(item.agencia)
                        setModFinanConta(item.conta)
                        setModFinanNr_doc_liq(item.nr_doc_liq)
                        setModFinanNrCob(item.nr_doc_cob)
                        setModFinanEmitente(item.emitente)
                        setModFinanCpf_cgc(item.cpf_cnpj)
                        setModFinanCartao(item.c_cartao)
                        setModFinanContaBanc(item.c_ccr)
                        setShowModFinan(true);
                    }}
                >
                    <Text style={styles.TextProduto}>{item.data}</Text>
                    <Text style={styles.TextProduto}>{item.tp_titulo}</Text>
                    <Text style={styles.TextProduto}>{'R$ ' + String(Number(item.valor).toFixed(2)).replace('.', ',')}</Text>
                </TouchableOpacity>
            )
        }))
    }

    // Outros
    const addoutros = () => {
        if (ProcuraParam(529, 'parE') == 'S'){
          return(
            <View>
                <Text>Valor Outros</Text>
                <TextInput
                    style={styles.Input}
                    value={String(outrosVenda)}
                    placeholder="Outros"
                    editable={!sitAtt}
                    keyboardType="decimal-pad"
                    onChangeText={(text) => {
                        var numsStr = text.replace(/[^0-9||.]/g,'');
                        setOutrosVenda(numsStr)
                        attVlEfetivo(vl_Total, vl_DescVenda, vlAcrVenda, numsStr, vlFreteVenda, 0, 0, vlTotalTroca)
                        setMudou(true)
                    }}
                />
            </View>
          )
        }
    }

    // Frete
    const addFrete = () => {
        if (ProcuraParam(518, 'parE') == 'S'){
            return(
                <View>
                    <Text>Valor Frete</Text>
                    <TextInput
                        style={styles.Input}
                        value={String(vlFreteVenda)}
                        placeholder="Frete"
                        editable={!sitAtt}
                        keyboardType="decimal-pad"
                        onChangeText={(text) => {
                            var numsStr = text.replace(/[^0-9||.]/g,'');
                            setVlFreteVenda(numsStr)
                            if (ProcuraParam(519, 'parE') == 'S') {
                                attVlEfetivo(vl_Total, vl_DescVenda, vlAcrVenda, outrosVenda, numsStr, 0, 0, vlTotalTroca)
                                setMudou(true)
                            }
                        }}
                    />
                </View>
            )
        }
    }

    //troca
    const addVlTroca = () => {
        if (ProcuraParam(362, 'par') == 'S'){
          return(
            <View>
                <Text>Valor da Troca</Text>
                <TextInput
                    style={styles.Input}
                    value={String(vlTotalTroca.toFixed(2))}
                    placeholder="Valor Troca"
                    editable={false}
                />

                <View style={{
                    alignItems: 'flex-end'
                }}>
                    <Text style={{marginTop: -5}}>Haver</Text>
                    <TextInput
                        style={styles.InputHaver}
                        value={String(haver.toFixed(2))}
                        placeholder="Valor Troca"
                        editable={false}
                    />
                </View>
            </View>
          )
        }
    }

    // Pessoa
    const renderPessoa = ({item}) => {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: '#2c3b76',
                    margin: 2,
                    padding: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
                onPress={() => {
                    setMudou(true)
                    if (clFunc == 'C'){
                        setNomeRazao(item.name)
                        setC_pessoa(item.c_pessoa)
                        setShowtrocarPessoa(false)
                        
                    } else if (clFunc == 'F'){
                        setFuncionario(item.name)
                        setC_func(item.c_pessoa)
                        setShowtrocarPessoa(false)
                    }
                }}
                onLongPress={() => {
                    setShowtrocarPessoa(false)
                    navigation.navigate('PessoaCadastro', [{id: item.id}, {params: pesquisaPessoa}])
                }}
            >
                <Text style={styles.TextProduto} >{item.name}</Text>
            </TouchableOpacity>
        )
    }

    const renderProductList = () => {
        return emps.map((product, key) => {
          return <Picker.Item key={key} label={product.nome_pop} value={product.c_emp} />
        })
    }
    const obsItem = () => {
        if (ProcuraParam(764, 'parE') == 'S') {
          return(
            <TextInput
                style={styles.InputMemo}
                value={obs}
                placeholder="Observações"
                onChangeText={(text)=>{
                    setObs(text)
                }}
                multiline={true}
            />
          )
        }
    }

    // Custom View Produtos
    const showProdutosCustomView = () => {
        return (
            <View style={{width: '100%', height: '100%'}}>

                <View 
                    style={{ height: 55, marginBottom: 20}}
                >
                    <TextInput
                        style={styles.nomePesquisar}
                        value={pesquisarProd}
                        placeholder="Pesquisar"
                        onChangeText={(text) => {
                            setPesquisarProd(text)
                        }}
                    />
                    
                    <View
                        style={{
                            alignItems: 'flex-end',
                        }}
                    >
                        <TouchableOpacity
                            style={styles.ButtonPessoa}
                            onPress={()=>{pesquisarProduto()}}
                            onLongPress={()=>{
                                if (pesquisarProdPor == 'CODEBAR'){
                                  // Escanear codigo de barras
                                  setShowScanCodeBar(true)
                                  setScanned(false)
                                }
                            }}
                        > 

                            <Ionicons name="ios-search" size={25} color="white" />    
                        </TouchableOpacity>
                    </View>
                        
                </View>
                
                <Picker
                    selectedValue={pesquisarProdPor}
                    style={styles.selectPop}
                    onValueChange={(itemValue, itemIndex) => {
                        setPesquisarProdPor(itemValue)
                    }}
                >
                    <Picker.Item label="PRODUTO" value="PRODUTO" />
                    <Picker.Item label="CODIGO" value="CODIGO" />
                    <Picker.Item label="CODIGO DE BARRAS" value="CODEBAR" />
                </Picker>

                <FlatList
                    data={Produtos}
                    style={styles.lista}
                    renderItem={renderItem}
                    keyExtractor={myKeyExtractor}
                />
                 <View style={styles.ViewNextVolt}>
                    <TouchableOpacity 
                        style={{
                        height: 50,
                        borderRadius: 20, 
                        alignItems: 'center', 
                        justifyContent: 'center',     
                        backgroundColor: '#2c3b76',
                        width:'80%',
                        }}
                        onPress={() => {
                            setShowProdutos(false);
                        }}
                    >
                        <Text style={styles.TextNext}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    // Custom View Modificar Financeiro
    const showCustomViewModFinan = () => {

        return(
        <View style={{height: '100%', width: '100%'}}>

            <ScrollView>
                <Text>Data</Text>
                <MaskInput
                    value={modFinanData}
                    placeholder='Data de Lançamento'
                    keyboardType= 'numeric'
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setModFinanData(masked);
                    }}
                    mask={Masks.DATE_DDMMYYYY}
                />

                <Text>Tipo de Título</Text>
                <Picker
                selectedValue={modFinanTp_titulo}
                style={styles.select}
                onValueChange={(itemValue, itemIndex) => {
                    setModFinanTp_titulo(itemValue)
                    setModFinanNbanco('')
                    setModFinanAgencia('')
                    setModFinanConta('')
                    setModFinanNr_doc_liq('')
                    setModFinanNrCob('')
                    setModFinanEmitente('')
                    setModFinanCpf_cgc('')
                    setModFinanCartao('P')
                    setModFinanContaBanc('P')
                }}>
                    <Picker.Item label="DI" value="DI" />
                    <Picker.Item label="BO" value="BO" />
                    <Picker.Item label="CH" value="CH" />
                    <Picker.Item label="CP" value="CP" />
                    <Picker.Item label="CC" value="CC" />
                    <Picker.Item label="CA" value="CA" />
                    <Picker.Item label="NP" value="NP" />
                    <Picker.Item label="DP" value="DP" />
                </Picker>

                <Text>Valor</Text>
                <TextInput
                    style={styles.Input}
                    value={String(modFinanValor)}
                    placeholder="Valor"
                    keyboardType="decimal-pad"
                    onChangeText={(text) => {
                        var numsStr = text.replace(/[^0-9||.]/g,'');
                        setModFinanValor(numsStr)
                    }}
                />

                {cplDadosModFinan()}

            </ScrollView>

        </View>
        )
    }

    // Add ou salvar item Finan
    const salvarAddItemFinan = () => {
        setMudou(true)

        if (Object.keys(finanItem).length == 0){
            // Add
            let obj = {
                "agencia": modFinanAgencia,       
                "c_cartao": modFinanCartao,    
                "c_ccr": modFinanContaBanc,
                "conta": modFinanConta,
                "cpf_cnpj": modFinanCpf_cgc,
                "data": modFinanData,
                "emitente": modFinanEmitente,
                "id": (Financeiro.length+numExc+1),
                "nbanco": modFinanNbanco,
                "nr_doc_cob": modFinanNrCob,
                "nr_doc_liq": modFinanNr_doc_liq,
                "tp_titulo": modFinanTp_titulo,
                "valor": modFinanValor,
            }
            
            Financeiro.push(obj)
        } else {
            // Salvar
            if (modFinanCartao != 'P' && modFinanCartao != undefined && modFinanCartao != ''){
                setShowSalvarParcelas(true)
            }

            Financeiro[Financeiro.indexOf(finanItem)].agencia = modFinanAgencia
            Financeiro[Financeiro.indexOf(finanItem)].c_cartao = modFinanCartao
            Financeiro[Financeiro.indexOf(finanItem)].c_ccr = modFinanContaBanc
            Financeiro[Financeiro.indexOf(finanItem)].conta = modFinanConta
            Financeiro[Financeiro.indexOf(finanItem)].cpf_cnpj = modFinanCpf_cgc
            Financeiro[Financeiro.indexOf(finanItem)].emitente = modFinanEmitente
            Financeiro[Financeiro.indexOf(finanItem)].nbanco = modFinanNbanco
            Financeiro[Financeiro.indexOf(finanItem)].nr_doc_cob = modFinanNrCob
            Financeiro[Financeiro.indexOf(finanItem)].nr_doc_liq = modFinanNr_doc_liq
            Financeiro[Financeiro.indexOf(finanItem)].tp_titulo = modFinanTp_titulo
            Financeiro[Financeiro.indexOf(finanItem)].data = modFinanData
            Financeiro[Financeiro.indexOf(finanItem)].valor = modFinanValor
        }
    }

    const excluirItemFinan = () => {
        setMudou(true)
        if (Object.keys(finanItem).length != 0) {
            let aux = Financeiro
            aux.splice(aux.indexOf(finanItem), 1);
            setFinanceiro(aux)
            numExc++
        }
    }

    //Completar Banco
    const cplDadosModFinan = () => {
        if (modFinanTp_titulo == 'CH' || modFinanTp_titulo == 'CP'){
            return(
                <View>

                <Text>Número do banco</Text>
                <TextInput
                    style={styles.Input}
                    value={String(modFinanNbanco)}
                    placeholder="Número do banco"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        setModFinanNbanco(text)
                    }}
                />

                <Text>Agência</Text>
                <TextInput
                    style={styles.Input}
                    value={String(modFinanAgencia)}
                    placeholder="Agência"
                    onChangeText={(text) => {
                        setModFinanAgencia(text)
                    }}
                />

                <Text>Conta</Text>
                <TextInput
                    style={styles.Input}
                    value={String(modFinanConta)}
                    placeholder="Conta"
                    onChangeText={(text) => {
                        setModFinanConta(text)
                    }}
                />

                <Text>Número do Cheque</Text>
                <TextInput
                    style={styles.Input}
                    value={String(modFinanNr_doc_liq)}
                    placeholder="Número do Cheque"
                    onChangeText={(text) => {
                        setModFinanNr_doc_liq(text)
                    }}
                />  

                <Text>Emitente</Text>
                <TextInput
                    style={styles.Input}
                    value={String(modFinanEmitente)}
                    placeholder="Emitente"
                    onChangeText={(text) => {
                        setModFinanEmitente(text)
                    }}
                /> 

                <Text>CPF/CNPJ do Emitente</Text>
                <TextInput
                    style={styles.Input}
                    value={String(modFinanCpf_cgc)}
                    placeholder="CPF/CNPJ"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        setModFinanCpf_cgc(text)
                    }}
                /> 

                </View>
            )
        } else if (modFinanTp_titulo == 'BO'){
            return(
                <View>
                <Text>Número de Cobrança</Text>
                <TextInput
                    style={styles.Input}
                    value={String(modFinanNrCob)}
                    placeholder="Número de Cobrança"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        setModFinanNrCob(text)
                    }}
                /> 
                </View>
            )
        } else if (modFinanTp_titulo == 'CC'){
            return(
                <View>
                <Text>Banco</Text>
                <Picker
                    selectedValue={modFinanCartao}
                    style={styles.select}
                    onValueChange={(itemValue, itemIndex) => {
                        setModFinanCartao(itemValue)
                    }}>
                    <Picker.Item label="Escolha o Cartão" value="P" />
                    {
                        cartaoLista.map((product) => {
                        return <Picker.Item key={product.c_cartao} label={product.nome} value={product.c_cartao} />
                        })
                    }
                </Picker>
                </View>
            )
        } else if (modFinanTp_titulo == 'DP'){
            return(
                <View>
                <Text>Conta</Text>
                <Picker
                    selectedValue={modFinanContaBanc}
                    style={styles.select}
                    onValueChange={(itemValue, itemIndex) => {
                        setModFinanContaBanc(itemValue)
                    }}>
                    <Picker.Item label="Escolha a Conta" value="P" />
                    {
                        contaLista.map((product) => {
                        return <Picker.Item key={product.c_ccr} label={product.nome} value={product.c_ccr} />
                        })
                    }
                </Picker>
                </View>
            )
        }

    }

    // Procura e adiciona as modalidades de pagamento
    const renderModalPagList = async () => {

        var data = JSON.stringify({
        "banco": await AsyncStorage.getItem('@banco'),
        "sql": `select c_mpg, descricao, tp_preco from cd_mpg`
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
            setPagList(respJson)

        })
        .catch(function (error) {
            console.log(error);
        });

    }

    // Calcula o desconto
    const desconto = (a, text, txt, desc, prod) => {
        if (prod){
            if (a == '%') {
                let descporc = (Number(text) / 100 * Number(vlUnitario))
                setVlDesc(descporc.toFixed(2))
          
            } else if (a == '$') {
                let descporc = (Number(text) * 100 / Number(vlUnitario))
                setPercDisc(descporc.toFixed(2))
          
            } else {
                let descporc = (Number(desc) * 100 / txt)
                setPercDisc(descporc.toFixed(2))
            }

        } else {
            if (a == '%') {
                let descporc = (Number(text) / 100 * vl_Total)
                setVl_DescVenda(descporc.toFixed(2))
          
            } else if (a == '$') {
                let descporc = (Number(text) * 100 / vl_Total)
                setVl_PercVenda(descporc.toFixed(2))
          
            } else {
                let descporc = (Number(desc) * 100 / txt)
                setVl_PercVenda(descporc.toFixed(2))
            }

        }
    
    }

    // Verifica Valor total do Financeiro
    const ValorFinan = () => {
        let vlTt = 0

        for(let i=0; i < Financeiro.length; i++){
            vlTt += parseFloat(Financeiro[i].valor)
        }

        return vlTt

    }

    // Pega Valor restante
    const valorMax = () => {
        if (ProcuraParam(519, 'parE') == 'N' && ProcuraParam(518, 'parE') == 'S'){
            return Number(Vl_Efetivo - ValorFinan() + Number(vlFreteVenda)).toFixed(2)
        } else {
            return Number(Vl_Efetivo - ValorFinan()).toFixed(2)
        }
    }

    // Excluir Item
    const excluirItem = () => {
        setMudou(true);
        let aux = Produtos;
        aux.splice(aux.indexOf(itemParaExcluir), 1);
        setProdutos(aux);
        prodExclu.push(itemParaExcluir);
        setVl_Total(vl_Total - itemParaExcluir.vl_efetivo);
        attVlEfetivo(vl_Total - itemParaExcluir.vl_efetivo, vl_DescVenda, vlAcrVenda, outrosVenda, vlFreteVenda, 0, 0, vlTotalTroca);
    }

    // Excluir Item Troca
    const excluirItemTroca = () => {
        setMudou(true);
        let aux = itemsTroca;
        aux.splice(aux.indexOf(itemParaExcluir), 1);
        setItemsTroca(aux);
        trocaExclu.push(itemParaExcluir);
        setVlTotalTroca(vlTotalTroca - itemParaExcluir.vl_efetivo)
        attVlEfetivo(vl_Total + itemParaExcluir.vl_efetivo , vl_DescVenda, vlAcrVenda, outrosVenda, vlFreteVenda, 0, 0, vlTotalTroca);
        
    }

    // Preenche o funcionário
    const funcionarioCpl = async () => {
        var data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": `select c_fun, nome from cd_fun where c_fun = ${rota.params[ContPessoa].c_fun}`
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
            if (respJson.length > 0){
                try {
                    setFuncionario(respJson[0].nome)
                } catch (error) {
                    setFuncionario('')
                    console.log(error)  
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    // Atualizar Venda al mudar o tipo de preco
    const modTpPreco = (tp_preco) => {
        attValoresProdutos(tp_preco)
    }

    // Atualiza os valores dos produtos
    const attValoresProdutos = async (tp_preco) => {


        for (let i = 0; i < Produtos.length; i++){

            var data = JSON.stringify({
                "banco": await AsyncStorage.getItem('@banco'),
                "sql": `select c_pro, pr_venda1, pr_venda2, pr_venda3 from cd_pro where c_pro = ${Produtos[i].c_pro} and ativo = 'S'`
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
                let aux = Produtos
                if (tp_preco == 1){
                    aux[i].vl_unitario = respJson[0].pr_venda1
                } else if (tp_preco == 2){
                    aux[i].vl_unitario = respJson[0].pr_venda2
                } else if (tp_preco == 3){
                    aux[i].vl_unitario = respJson[0].pr_venda3
                }

                aux[i].vl_efetivo = (Number(aux[i].vl_unitario) * Number(aux[i].qtde)) - Number(aux[i].vl_desc)
                setProdutos(aux)
            })
            .catch(function (error) {
                console.log(error);
            });
        }

    }
    // Pesquisar Produto
    const pesquisarProduto = async (pesq, tp) => {
        setLoad(true)
        let sql

        if (pesq == undefined || pesq == null) {

            if (pesquisarProdPor == 'PRODUTO'){
                let v = pesquisarProd.split(';')
                let sqlWhere = '';
                
                for (let i in v){
                    sqlWhere += `descricao like '%${v[i]}%'`
                    if(v.length-1 != i){
                        sqlWhere += ' AND ' 
                    }
                }
                
                sql = `select c_pro, descricao, ref_fabricante, qtde_estq, pr_venda1, pr_venda2, pr_venda3, c_pessoa, custo_tabela, pr_medio, pr_ult_cmp, tipo, Ean as ean, digito, desconto, vl_desc, vl_desc2, vl_desc3 from cd_pro where ${sqlWhere} and ativo = 'S'`
            } else if (pesquisarProdPor == 'CODIGO'){
                sql = `select c_pro, descricao, ref_fabricante, qtde_estq, pr_venda1, pr_venda2, pr_venda3, c_pessoa, custo_tabela, pr_medio, pr_ult_cmp, tipo, Ean as ean, digito, desconto, vl_desc, vl_desc2, vl_desc3 from cd_pro where c_pro = ${pesquisarProd} and ativo ='S'`
            } else if (pesquisarProdPor == 'CODEBAR'){
                sql = `select c_pro, descricao, ref_fabricante, qtde_estq, pr_venda1, pr_venda2, pr_venda3, c_pessoa, custo_tabela, pr_medio, pr_ult_cmp, tipo, Ean as ean, digito, desconto, vl_desc, vl_desc2, vl_desc3 from cd_pro where ean + ISNULL(digito, '') like '%${pesquisarProd}%' and ativo = 'S'`
            }

        } else {

            if (pesquisarProdPor == 'PRODUTO'){
                let v = pesq.split(';')
                let sqlWhere = '';
                
                for (let i in v){
                    sqlWhere += `descricao like '%${v[i]}%'`
                    if(v.length-1 != i){
                        sqlWhere += ' AND ' 
                    }
                }

                sql = `select c_pro, descricao, ref_fabricante, qtde_estq, pr_venda1, pr_venda2, pr_venda3, c_pessoa, custo_tabela, pr_medio, pr_ult_cmp, tipo, Ean as ean, digito, desconto, vl_desc, vl_desc2, vl_desc3 from cd_pro where ${sqlWhere} and ativo = 'S'`
            } else if (pesquisarProdPor == 'CODIGO'){
                sql = `select c_pro, descricao, ref_fabricante, qtde_estq, pr_venda1, pr_venda2, pr_venda3, c_pessoa, custo_tabela, pr_medio, pr_ult_cmp, tipo, Ean as ean, digito, desconto, vl_desc, vl_desc2, vl_desc3 from cd_pro where c_pro = ${pesq} and ativo = 'S'`
            } else if (pesquisarProdPor == 'CODEBAR'){
                sql = `select c_pro, descricao, ref_fabricante, qtde_estq, pr_venda1, pr_venda2, pr_venda3, c_pessoa, custo_tabela, pr_medio, pr_ult_cmp, tipo, Ean as ean, digito, desconto, vl_desc, vl_desc2, vl_desc3 from cd_pro where ean + ISNULL(digito, '') like '%${pesq}%' and ativo = 'S'`
            }

        }
        
        var data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": sql
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
            let aux = []
            for(let i = 0; i <= respJson.length-1; i++){

                if (tp_preco == 1){
                    aux.push({id: respJson[i].c_pro, 
                        produto: respJson[i].descricao, 
                        vl_efetivo: respJson[i].pr_venda1, 
                        c_pro: respJson[i].c_pro,
                        pr_venda1: respJson[i].pr_venda1,
                        pr_venda2: respJson[i].pr_venda2,
                        pr_venda3: respJson[i].pr_venda3,
                        pr_medio: respJson[i].pr_medio,
                        pr_ult_cmp: respJson[i].pr_ult_cmp,
                        tp_preco: 1,
                        ean: respJson[i].ean,
                        digito: respJson[i].digito,
                        tipo: respJson[i].tipo,
                        ref: (respJson[i].ref_fabricante == null ? '' : respJson[i].ref_fabricante),
                        desconto: respJson[i].desconto, 
                        vl_desc: respJson[i].vl_desc, 
                        vl_desc2: respJson[i].vl_desc2, 
                        vl_desc3: respJson[i].vl_desc3,
                        custo_tabela: respJson[i].custo_tabela
                    })
                } else if (tp_preco == 2){
                    aux.push({id: respJson[i].c_pro, 
                        produto: respJson[i].descricao, 
                        vl_efetivo: respJson[i].pr_venda2, 
                        c_pro: respJson[i].c_pro,
                        pr_venda1: respJson[i].pr_venda1,
                        pr_venda2: respJson[i].pr_venda2,
                        pr_venda3: respJson[i].pr_venda3,
                        pr_medio: respJson[i].pr_medio,
                        pr_ult_cmp: respJson[i].pr_ult_cmp,
                        tp_preco: 2,
                        ean: respJson[i].ean,
                        digito: respJson[i].digito,
                        tipo: respJson[i].tipo,
                        ref: (respJson[i].ref_fabricante == null ? '' : respJson[i].ref_fabricante),
                        desconto: respJson[i].desconto, 
                        vl_desc: respJson[i].vl_desc, 
                        vl_desc2: respJson[i].vl_desc2, 
                        vl_desc3: respJson[i].vl_desc3,
                        custo_tabela: respJson[i].custo_tabela
                    })
                } else if (tp_preco == 3){
                    aux.push({id: respJson[i].c_pro, 
                        produto: respJson[i].descricao, 
                        vl_efetivo: respJson[i].pr_venda3, 
                        c_pro: respJson[i].c_pro,
                        pr_venda1: respJson[i].pr_venda1,
                        pr_venda2: respJson[i].pr_venda2,
                        pr_venda3: respJson[i].pr_venda3,
                        pr_medio: respJson[i].pr_medio,
                        pr_ult_cmp: respJson[i].pr_ult_cmp,
                        tp_preco: 3,
                        ean: respJson[i].ean,
                        digito: respJson[i].digito,
                        tipo: respJson[i].tipo,
                        ref: (respJson[i].ref_fabricante == null ? '' : respJson[i].ref_fabricante),
                        desconto: respJson[i].desconto, 
                        vl_desc: respJson[i].vl_desc, 
                        vl_desc2: respJson[i].vl_desc2, 
                        vl_desc3: respJson[i].vl_desc3,
                        custo_tabela: respJson[i].custo_tabela
                    })
                }

            }

            if (tp == 'troca'){
                // Se for troca
                setListaTrocaProd(aux);
                setShowlistaTroca(true);
      
            } else {
                // Se for para Adicionar Item
                setPesqProd(aux);
                setShowPesqProd(true)
            }

            setLoad(false)

        })
        .catch(function (error) {
            console.log(error);
            alert("[ERRO]")
            setLoad(false)
        });
    }   
    // Escanear codigo de barras
    const scanCodeBar = () => {
        if (Platform.OS == "web"){
            return(
                <View style={{width: '100%', height: '100%', backgroundColor: '#2c3b76'}}>
                    <CamBarCodeScanner
                        on={!scanned}
                        clock={200} // ms
                        styleCam={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        }}
                        type={'back'}
                        onScan={(code)=>{
                            handleBarCodeScanned(code)
                        }}
                    />
                </View>
            )
        } else {
            return(
                <View style={{width: '100%', height: '100%', backgroundColor: '#2c3b76'}}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        }}
                    />
                </View>
            )
        }
        
    }
    
    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(false)
        setShowScanCodeBar(false)
        setPesquisarProd(data.replace(/[^0-9]/g,''))
        pesquisarProduto(data.replace(/[^0-9]/g,''))
    };
    // Pesquisa a pessoa e envia para o cadastro
    const propPessoa = async (pessoa) => {
        setLoad(true)
        var data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": `select  c_pessoa, nome, fantasia, fisica_jur, cpf, cgc, rg, FORMAT(dt_nasc, 'dd/MM/yyyy') as dt_nasc, ddd_fone, fone, ddd_celular, celular, ddd_fax, fax, insc_est, indIEDest, insc_mun, cep, bairro, endereco, numero, cidade, uf, compl, e_mail from cd_pessoa where c_pessoa = ${pessoa}`
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
            setLoad(false)
            let respJson = (JSON.parse(JSON.stringify(response.data)).recordset);
            navigation.navigate('PessoaCadastro', [{id: 0}, {params: respJson}]);
        })
        .catch(function (error) {
            console.log(error);
            alert("[ERRO]")
            setLoad(false)
        });
    }

    const pesqMp = async (c_mpg) => {
        if (c_mpg != 'P'){
          var data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": `SELECT c_itensmpg, c_mpg, porcentagem, dias, nr_parcela, tp_titulo FROM cd_itensmpg where c_mpg = ${c_mpg}`
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
              cplFinan(respJson)
      
          })
          .catch(function (error) {
              console.log(error);
          });
        } else {
          setFinanceiro([])
        }
    }
    const cplFinan = (respJson) => {
        let aux = []
        let vlPag = 0
    
        for (let i=0; i < respJson.length; i++) {
          let data = FutureDay(respJson[i].dias)
          let valor
    
          if (ProcuraParam(519, 'parE') == 'N' && ProcuraParam(518, 'parE') == 'S'){
            if (i == respJson.length - 1) {
              // Ultimo
              valor = (Number(Vl_Efetivo) + Number(vlFreteVenda)) - vlPag
              valor = valor.toFixed(2)
            } else {
              // Restante
              valor = (respJson[i].porcentagem / 100) * (Number(Vl_Efetivo) + Number(vlFreteVenda))
              valor = valor.toFixed(2)
              vlPag += Number(valor)
            }
    
          } else {
            if (i == respJson.length - 1) {
              valor = Number(Vl_Efetivo) - vlPag
              valor = valor.toFixed(2)
            } else {
              valor = (respJson[i].porcentagem / 100) * Number(Vl_Efetivo)
              valor = valor.toFixed(2)
              vlPag += Number(valor)
            }
    
          }

          aux.push({
            id: i, 
            data: data, 
            tp_titulo: respJson[i].tp_titulo,
            valor: valor,
            nbanco: '',
            agencia: '',
            conta: '',
            nr_doc_liq: '',
            vl_cheque: '',
            emitente: '',
            cpf_cnpj: '',
            nr_doc_cob: '',
            c_cartao: '',
            c_ccr: ''
          })
        }
        setFinanceiro(aux)
    }
    // retorna quantidade data daqui x dias
    const FutureDay = (x) => {
        var data = new Date();
        data.setDate(data.getDate() + Number(x));
        let dia = data.getDate().toString().padStart(2, '0')
        let mes = (data.getMonth()+1).toString().padStart(2, '0')
        let ano = data.getFullYear();

        return `${dia}/${mes}/${ano}`
    }

 
    // Pesquisar pessoa
    const pesquisarPessoa = async () => {
        let cod
        setLoad(true)
        if (clFunc == 'F'){
            if (pesquisarPor == 'CODIGO') {
                cod = `select c_fun as c_pessoa, nome from cd_fun where c_fun = ${pesquisar}`
            } else if (pesquisarPor == 'NOME'){
                cod = `select c_fun as c_pessoa, nome from cd_fun where nome like '%${pesquisar}%'`
            } else if (pesquisarPor == 'CPF'){
                cod = `select c_fun as c_pessoa, nome, cpf from cd_fun where cpf like '%${pesquisar}%' or cpf like '%${pesquisar}%'`
            } else if (pesquisarPor == 'CNPJ'){
                cod = `select c_fun as c_pessoa, nome, cgc from cd_fun where cgc like '%${pesquisar}%' or cgc like '%${pesquisar}%'`
            }
        } else {
            if (pesquisarPor == 'CODIGO') {
                cod = `select c_pessoa, nome, fantasia, fisica_jur, cpf, cgc, rg, FORMAT(dt_nasc, 'dd/MM/yyyy') as dt_nasc, ddd_fone, fone, ddd_celular, celular, ddd_fax, fax, insc_est, indIEDest, insc_mun, cep, bairro, endereco, numero, cidade, uf, compl, e_mail from cd_pessoa where c_pessoa = ${pesquisar}`
            } else if (pesquisarPor == 'NOME'){
                cod = `select c_pessoa, nome, fantasia, fisica_jur, cpf, cgc, rg, FORMAT(dt_nasc, 'dd/MM/yyyy') as dt_nasc, ddd_fone, fone, ddd_celular, celular, ddd_fax, fax, insc_est, indIEDest, insc_mun, cep, bairro, endereco, numero, cidade, uf, compl, e_mail from cd_pessoa where nome like '%${pesquisar}%'`
            } else if (pesquisarPor == 'CPF'){
                cod = `select c_pessoa, nome, fantasia, fisica_jur, cpf, cgc, rg, FORMAT(dt_nasc, 'dd/MM/yyyy') as dt_nasc, ddd_fone, fone, ddd_celular, celular, ddd_fax, fax, insc_est, indIEDest, insc_mun, cep, bairro, endereco, numero, cidade, uf, compl, e_mail from cd_pessoa where cpf like '%${pesquisar}%' or cpf like '%${pesquisar}%'`
            } else if (pesquisarPor == 'CNPJ'){
                cod = `select c_pessoa, nome, fantasia, fisica_jur, cpf, cgc, rg, FORMAT(dt_nasc, 'dd/MM/yyyy') as dt_nasc, ddd_fone, fone, ddd_celular, celular, ddd_fax, fax, insc_est, indIEDest, insc_mun, cep, bairro, endereco, numero, cidade, uf, compl, e_mail from cd_pessoa where cgc like '%${pesquisar}%' or cgc like '%${pesquisar}%'`
            }
        }

        

        var data = JSON.stringify({
            "banco": await AsyncStorage.getItem('@banco'),
            "sql": cod
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
            setLoad(false)
            let respJson = (JSON.parse(JSON.stringify(response.data)).recordset);
            setPesquisaPessoa(respJson)
            let aux = []
            for(let i = 0; i <= respJson.length-1; i++){
                aux.push({id: respJson[i].c_pessoa, name: respJson[i].nome, c_pessoa: respJson[i].c_pessoa})
            }
            setPessoa(aux)
        })
        .catch(function (error) {
            console.log(error);
            alert("[ERRO]")
            setLoad(false)
        });
    }
    const showPessoaCustomView = () => {
        return(
            <View style={{height: '100%', width: '100%'}}>
                <View 
                    style={{height: 60, marginBottom: 20}}
                >

                    <TextInput
                        style={styles.nomePesquisar}
                        value={pesquisar}
                        placeholder="Pesquisar"
                        onChangeText={(text) => {
                            setPesquisar(text)
                        }}
                    />
                    <View
                        style={{
                            alignItems: 'flex-end',
                        }}
                    >
                        <TouchableOpacity
                            style={styles.ButtonPessoa}
                            onPress={()=>{pesquisarPessoa()}}
                        >
                            <Ionicons name="ios-search" size={25} color="white" />    
                        </TouchableOpacity>
                    </View>
                        
                </View>
                
                <Picker
                    selectedValue={pesquisarPor}
                    style={styles.selectPop}
                    onValueChange={(itemValue, itemIndex) => {
                        setPesquisarPor(itemValue)
                    }}>
                    <Picker.Item label="NOME" value="NOME" />
                    <Picker.Item label="CODIGO" value="CODIGO" />
                    <Picker.Item label="CPF" value="CPF" />
                    <Picker.Item label="CNPJ" value="CNPJ" />
                </Picker>

                <FlatList
                    data={Pessoa}
                    style={styles.listaPop}
                    renderItem={renderPessoa}
                    keyExtractor={myKeyExtractor}
                />

            </View>
        )
    }

    const showCustomViewTrocaProd = () => {
        return(
          <View style={{height: '100%', width: '100%'}}>
                <View 
                    style={{height: 60, marginBottom: 20}}
                >
    
                    <TextInput
                        style={styles.nomePesquisar}
                        value={pesquisarProd}
                        placeholder="Pesquisar"
                        onChangeText={(text) => {
                            setPesquisarProd(text)
                        }}
                    />
                    <View
                        style={{
                            alignItems: 'flex-end',
                        }}
                    >
                        <TouchableOpacity
                            style={styles.ButtonPessoa}
                            onPress={()=>{
                                pesquisarProduto(undefined, 'troca')
                            }}
                            onLongPress={()=>{
                              if (pesquisarPor == 'CODEBAR'){
                                // Escanear codigo de barras
                                setShowScanCodeBar(true)
                                setScanned(false)
                              }
                            }}
                        >
                            <Ionicons name="ios-search" size={25} color="white" />    
                        </TouchableOpacity>
                    </View>
                        
                </View>
    
                <Picker
                    selectedValue={pesquisarPor}
                    style={styles.selectPop}
                    onValueChange={(itemValue, itemIndex) => {
                        setPesquisarPor(itemValue)
                    }}>
                    <Picker.Item label="NOME" value="NOME" />
                    <Picker.Item label="CODIGO" value="CODIGO" />
                    <Picker.Item label="CODIGO DE BARRAS" value="CODEBAR" />
                </Picker>
    
                <FlatList
                    data={itemsTroca}
                    style={styles.listaPop}
                    renderItem={renderItemTroca}
                    keyExtractor={myKeyExtractor}
                />
                
                <View style={styles.ViewNextVolt}>
                    <TouchableOpacity 
                        style={{
                        height: 50,
                        borderRadius: 20, 
                        alignItems: 'center', 
                        justifyContent: 'center',     
                        backgroundColor: '#2c3b76',
                        width: '80%',
                        }}
                        onPress={() => {
                            setShowTrocaProd(false);
                           
                        }}
                    >
                        <Text style={styles.TextNext}>Voltar</Text>
                    </TouchableOpacity>
                </View>
    
            </View>
        )
    }

    const floattostrf = (vl, fffixed, n, nCasas) => {
        return parseFloat(vl).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    }

    // Itens da troca Render
    const renderItemTroca = ({item}) => {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: '#2c3b76',
                    margin: 2,
                    padding: 5
                }}
                onPress={()=>{
                    setShowModItemTroca(true)
                    setItemParaExcluir(item)
                }}
            >
                <Text style={{color: "#FFF"}}>{`${item.qtde}   ${item.produto}`}</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10
                }}>
                    <Text style={{color: "#FFF"}}>{'R$ ' + String(Number(item.vl_unitario).toFixed(2))}</Text>
                    
                    <Text style={{color: "#FFF"}}>{'R$ ' + String(Number(item.vl_efetivo).toFixed(2))}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    // Adicionar Produto
    const addProd = () => {
        setShowPropItems(false);
        let aux1 = false
        let item = prodAtual
        contagem = Number(Produtos.length)

        if (Produtos.length > 0){
            for(let i = 0; i < Produtos.length; i++) {
              if (Produtos[i].id == item.c_pro){
                alert('Este item já foi adicionado')
                aux1 = true
              }
            }
        }

        if (!aux1){

            let aux = {
                c_pro: item.c_pro,
                id: item.c_pro,
                produto: item.produto,
                ean: item.ean,
                qtde: Number(qtde),
                vl_efetivo: (Number(vlUnitario) * Number(qtde)) - vlDesc,
                vl_unitario: parseFloat(vlUnitario),
                vl_desc: vlDesc,
                prodAdd: true,
                pr_venda1: item.pr_venda1,
                pr_venda2: item.pr_venda2,
                pr_venda3: item.pr_venda3,
                pr_medio: item.pr_medio,
                pr_ult_cmp: item.pr_ult_cmp,
                perc_desc: percDisc,
                c_depo: emprEstq,
                margem3: margem3(),
                margem2: margem2(),
                tipo: item.tipo,
                tp_preco: item.tp_preco,
                especificacao1: espec1()
            }
    
            let aux2 = Produtos
            aux2.push(aux)
            setProdutos(aux2)
    
            setVl_Total(vl_Total + aux.vl_efetivo);
            attVlEfetivo(vl_Total + aux.vl_efetivo, vl_DescVenda, vlAcrVenda, outrosVenda, vlFreteVenda, 0, 0, vlTotalTroca);
            desconto('','',vl_Total + aux.vl_efetivo, vl_DescVenda);
            setMudou(true);
        }

        function margem2() {
            if (item.tipo == "P"){
                // Produtos

                let indice_pro = item.vl_efetivo / parseFloat(vlUnitario);

                let vl_desc_rat = indice_pro * vl_DescVenda
                let vl_acr_rat = indice_pro * vlAcrVenda
                let vl_frete_rat = indice_pro * vlFreteVenda
                let vl_outro_rat = indice_pro * outrosVenda
                // vl_troca_rat
                return vl_acr_rat + vl_frete_rat + vl_outro_rat - vl_desc_rat
            } else {
                // Serviços
                return 0
            }

        }

        function margem3() {
            let indice_pro = item.vl_efetivo / parseFloat(vlUnitario);
            let pr_custo = ProcuraParam(709, 'parE') == 'S' ? item.pr_medio : item.pr_ult_cmp
            
            let x = pr_custo * Number(qtde)
            x = x.toFixed(2)
            x = (x + (indice_pro * vlAcrVenda) + (indice_pro * outrosVenda)) - (indice_pro * vl_DescVenda)
            
            if (ProcuraParam(519, 'parE') == 'S'){
                x = (x + indice_pro * vlFreteVenda)
            }
            
            if (ProcuraParam(731, 'parE') == 'NORMAL'){
                // N inverte
                if (x > 0){
                    let aux = ((item.vl_efetivo - x) * 100) / x
                    return aux.toFixed(2)
                } else {
                    return 100.00
                }                
                
            } else {
                //inverte
                let aux = (item.vl_efetivo - x) / item.vl_efetivo
                return aux.toFixed(2)
            }
        }

        function espaco(palavra, tamanho, com_valor){
            
            let f = ''
            let branco = tamanho - palavra;
            for(let i in branco){
                f = f + ' ';
            }
            if (com_valor == false){
                return f
            } else {
                return f + palavra;
            }   
        }

        function pula_linha(mensagem){
            if (mensagem != ''){
                mensagem = mensagem + '\n\r';
            }
            
            return mensagem;
        }
            
        function espec1() {

            let especifica = ''
            // Variaveis auxiliares ou ainda não usadas
            let aux_ean, ean_grapro, tamanho_pro = ''
            
            if (ProcuraParam(273, 'par') == 4){
                contagem = contagem+1;
                especifica = String(contagem) + espaco(String(contagem),3,false);
                
                //Espaço
                especifica = especifica+' ';

                //ref
                especifica = especifica+item.ref+' ';
                    
                if (tamanho_pro == '') {
                   if (ProcuraParam(83, 'par') == 'N'){
                        especifica = especifica + item.produto + espaco(item.produto,29,false)
                    } else {
                        especifica = especifica + (item.produto).substr(1,29) + espaco((item.produto).substr(1,29),29,false);
                        if ((item.produto).substr(30,48) != '') {
                            especifica = pula_linha(especifica);
                            especifica = especifica+(item.produto).substr(30,48)+espaco((item.produto).substr(30,48),48,false);
                        }
                }


                } else {    
                    if (ProcuraParam(83, 'par') == 'N'){
                        especifica = especifica + item.produto + espaco(item.produto,27,false)
                    } else {
                        especifica = especifica + (item.produto).substr(1,26) + espaco((item.produto).substr(1,26),26,false);
                        if ((item.produto).substr(30,45) != '') {
                            especifica = pula_linha(especifica);
                            especifica = especifica+(item.produto).substr(30,45)+espaco((item.produto).substr(30,45),45,false);
                        }
                    }
                    
                    //Tamanho da peça
                    if (tamanho_pro != ''){
                        especifica = especifica+' '+tamanho_pro.substr(1,2);
                    }

                }

                //qtde
                especifica=especifica+Number(qtde)+espaco(String(qtde),7,false);
                //'x'
                especifica=especifica+' x ';
                //valor unitário
                especifica=especifica+ floattostrf(Number(vlUnitario)) + espaco(String(floattostrf(Number(vlUnitario))),8,false);
                especifica=pula_linha(especifica);
                //Espaço
                especifica=especifica+' ';
                if (vlDesc > 0){
                    //palavra Desc
                    especifica=especifica+'Desc';
                    //Espaço
                    especifica=especifica+' ';
                    //valor do desconto
                    especifica=especifica+ floattostrf(vlDesc) + espaco(String(floattostrf(vlDesc)),8,false);
                    //Espaço
                    especifica=especifica+' ';
                } else {
                    for(let i in 16) {
                        especifica=especifica+' ';
                    }
                }

                //valor total do item com o desconto
                especifica=especifica+floattostrf((Number(vlUnitario) * Number(qtde)) - vlDesc)+espaco(floattostrf((Number(vlUnitario) * Number(qtde)) - vlDesc),10,false);
                //Espaço
                especifica=especifica+' ';

                //05/04/2021
                if ((ProcuraParam(51, 'parE') == 'DESCRICAO_VISUREF') && ((item.ref).trim() != '')){
                    especifica=especifica+' Ref: '+item.ref;
                }

                // if ((ProcuraParam(642, 'parE')== 'PRO' || ProcuraParam(642, 'parE') ==  'GRAPRO' )){
                //     item.
                // }

                /* Não usa local
                if trim(local) <> ''  then
                begin
                        if (fm_principal.pe_usa_local_pro = 'PRO') or
                           (fm_principal.pe_usa_local_pro = 'GRAPRO') then
                                especifica:=especifica+' Local: '+local;
                end;
                */

            } else {
                //Contador 3 espaços
                if (ProcuraParam(273, 'par') == 3){
                    contagem=contagem+1;
                    especifica=String(contagem)+')'+espaco(String(contagem),3,false);
                } else {
                    contagem=contagem+1;
                    especifica=String(contagem)+espaco(String(contagem),3,false);
                }
                        
                //Espaço
                especifica=especifica+' ';
                //EAN do Produto aqui
                if (ProcuraParam(273, 'par') == 3){
                    // não coloca ean
                } else {
                    if (ProcuraParam(638, 'parE') == 'S'){
                        aux_ean=ean_grapro;
                    } else {
                        aux_ean=item.ean;
                        
                            if ( tamanho_nr > 0){
                                /*  
                                if (ProcuraParam(172, 'par') = 'EAN8') or
                                    (ProcuraParam(172, 'par') = 'EAN8SEMPRI') then
                                begin
                                        try
                                                aux_ean:=aux_ean+
                                                            copy('00' + Trim(inttostr(cor_nr)),
                                                            Length(inttostr(cor_nr)) + 1, 2 )+
                                                            copy('00' + Trim(inttostr(tamanho_nr)),
                                                            Length(inttostr(tamanho_nr)) + 1, 2 );
                                        except
                                                aux_ean:=ean;
                                        end;
                                end
                                else
                                begin
                                        try
                                                aux_ean:=aux_ean+inttostr(tamanho_nr);
                                        except
                                                aux_ean:=ean;
                                        end;
                                end;
                                if digito_gra <> '' then
                                begin
                                        aux_ean:=aux_ean+digito_gra;
                                end;
                            */
                            
                            } else {
                                
                            }
                            if (item.digito != '' && item.digito != null){
                                aux_ean=aux_ean+item.digito;
                            }


                    }

                    especifica=especifica+aux_ean+espaco(aux_ean,15,false);
                }
                        
                //Espaço
                especifica=especifica+' ';

                if (tamanho_pro == ''){
                    //Descrição do Produto
                    if (ProcuraParam(83, 'par') == 'N'){
                        especifica=especifica+item.produto+espaco(item.produto,29,false)
                    } else {
                        especifica=especifica+(item.produto).substr(1,29)+espaco((item.produto).substr(1,29),29,false);
                        if ((item.produto).substr(30,48) != ''){
                            especifica=pula_linha(especifica);
                            especifica=especifica+(item.produto).substr(30,48)+espaco((item.produto).substr(30,48),48,false);
                        }
                        //especifica:=especifica+descricao+fm_principal.espaco(descricao,60,false);
                    }
                    
                } else {
                    if (ProcuraParam(83, 'par') == 'N'){
                        especifica=especifica+item.produto+espaco(item.produto,27,false)
                    } else {
                        especifica=especifica+(item.produto).substr(1,26)+espaco((item.produto).substr(1,26),26,false);
                        if ((item.produto).substr(30,45) != ''){
                            especifica=pula_linha(especifica);
                            especifica=especifica+(item.produto).substr(30,45)+espaco((item.produto).substr(30,45),45,false);
                        }
                    }
                }

                especifica=pula_linha(especifica);
                //Tamanho da peça
                if (tamanho_pro != ''){
                    especifica=especifica+' '+ tamanho_pro.substr(1,2);
                }
                
                //cor da peça
                if ((ProcuraParam(172, 'par') == 'EAN8') || (ProcuraParam(172, 'par') == 'EAN8SEMPRI') || (ProcuraParam(638, 'parE') == 'S')) { //tennis trip
                    let cor_pro, cor_aux
                    
                    getColor(cor_nr).then(res => {cor_aux = res})

                    if (cor_aux.length > 0){
                        cor_pro=cor_aux[0].descricao
                    } else {
                        cor_pro='';
                    }

                    especifica=especifica+' '+cor_pro.substr(1,20);
                    especifica=pula_linha(especifica);
                }
                
                //qtde
                especifica=especifica+String(qtde)+espaco(String(qtde),7,false);
                //'x'
                especifica=especifica+' x ';
                //OUTRA LINHA
                //OUTRA LINHA
                switch(ProcuraParam(273, 'par')){
                    case 0:
                        especifica=pula_linha(especifica);
                    break;
                    case 1:
                        especifica=pula_linha(especifica);
                    break;
                }
                //valor unitário
                switch(casas_valor){
                    case 0:
                        //especifica:=especifica+floattostrf(vl_unit,fffixed,18,2)+fm_principal.espaco(floattostrf(vl_unit,fffixed,18,2),8,false);
                        switch (ProcuraParam(273, 'par')){
                            case 0:
                                especifica=especifica+'A prazo: '+floattostrf(item.pr_venda2,fffixed,18,2)+espaco(floattostrf(item.pr_venda2,fffixed,18,2),8,false);
                                especifica=especifica+' ';
                                especifica=especifica+'A vista: '+floattostrf(item.pr_venda1,fffixed,18,2)+espaco(floattostrf(item.pr_venda1,fffixed,18,2),8,false);
                            break;
                            case 1:
                                especifica=especifica+'A prazo: '+floattostrf(item.pr_venda2,fffixed,18,2)+espaco(floattostrf(item.pr_venda2,fffixed,18,2),8,false);
                                especifica=especifica+' ';
                                especifica=especifica+'A vista: '+floattostrf(item.pr_venda1,fffixed,18,2)+espaco(floattostrf(item.pr_venda1,fffixed,18,2),8,false);
                            break;
                            case 2:
                                especifica=especifica+floattostrf(Number(vlUnitario),fffixed,18,2)+espaco(floattostrf(Number(vlUnitario),fffixed,18,2),8,false);
                            break;
                            case 3:
                                especifica=especifica+floattostrf(Number(vlUnitario),fffixed,18,2)+espaco(floattostrf(Number(vlUnitario),fffixed,18,2),8,false);
                            break;
                        }

                    break;
                    case 1:
                        //especifica:=especifica+floattostrf(vl_unit,fffixed,18,2)+fm_principal.espaco(floattostrf(vl_unit,fffixed,18,2),8,false);
                        switch(ProcuraParam(273, 'par')){
                            case 0:
                                especifica=especifica+'A prazo: '+floattostrf(item.pr_venda2,fffixed,18,2)+espaco(floattostrf(item.pr_venda2,fffixed,18,2),8,false);
                                especifica=especifica+' ';
                                especifica=especifica+'A vista: '+floattostrf(item.pr_venda1,fffixed,18,2)+espaco(floattostrf(item.pr_venda1,fffixed,18,2),8,false);
                            break;
                            case 1:
                                especifica=especifica+'A prazo: '+floattostrf(item.pr_venda2,fffixed,18,2)+espaco(floattostrf(item.pr_venda2,fffixed,18,2),8,false);
                                especifica=especifica+' ';
                                especifica=especifica+'A vista: '+floattostrf(item.pr_venda1,fffixed,18,2)+espaco(floattostrf(item.pr_venda1,fffixed,18,2),8,false);
                            break;
                            case 2:
                                especifica=especifica+floattostrf(Number(vlUnitario),fffixed,18,2)+espaco(floattostrf(Number(vlUnitario),fffixed,18,2),8,false);
                            break;
                            case 3:
                                especifica=especifica+floattostrf(Number(vlUnitario),fffixed,18,2)+espaco(floattostrf(Number(vlUnitario),fffixed,18,2),8,false);
                            break;
                        }
                    break;
                    case 2:
                        //especifica:=especifica+floattostrf(vl_unit,fffixed,18,2)+fm_principal.espaco(floattostrf(vl_unit,fffixed,18,2),8,false);
                        switch (ProcuraParam(273, 'par')) {
                            case 0:
                                especifica=especifica+'A prazo: '+floattostrf(pr_venda2,fffixed,18,2)+espaco(floattostrf(pr_venda2,fffixed,18,2),8,false);
                                especifica=especifica+' ';
                                especifica=especifica+'A vista: '+floattostrf(pr_venda1,fffixed,18,2)+espaco(floattostrf(pr_venda1,fffixed,18,2),8,false);
                            break;
                            case 1:
                                especifica=especifica+'A prazo: '+floattostrf(pr_venda2,fffixed,18,2)+espaco(floattostrf(pr_venda2,fffixed,18,2),8,false);
                                especifica=especifica+' ';
                                especifica=especifica+'A vista: '+floattostrf(pr_venda1,fffixed,18,2)+fm_principal.espaco(floattostrf(pr_venda1,fffixed,18,2),8,false);
                            break;
                            case 2:
                                especifica=especifica+floattostrf(Number(vlUnitario),fffixed,18,2)+espaco(floattostrf(Number(vlUnitario),fffixed,18,2),8,false);
                            break;
                            case 3:
                                especifica=especifica+floattostrf(Number(vlUnitario),fffixed,18,2)+espaco(floattostrf(Number(vlUnitario),fffixed,18,2),8,false);
                            break;
                        }
                    break;
                    case 3:
                        //especifica:=especifica+floattostrf(vl_unit,fffixed,18,3)+fm_principal.espaco(floattostrf(vl_unit,fffixed,18,3),8,false);
                        switch (ProcuraParam(273, 'par')){
                            case 0:
                                especifica=especifica+'A prazo: '+floattostrf(pr_venda2,fffixed,18,2)+espaco(floattostrf(pr_venda2,fffixed,18,2),8,false);
                                especifica=especifica+' ';
                                especifica=especifica+'A vista: '+floattostrf(pr_venda1,fffixed,18,2)+espaco(floattostrf(pr_venda1,fffixed,18,2),8,false);
                            break;
                            case 1:
                                especifica=especifica+'A prazo: '+floattostrf(pr_venda2,fffixed,18,2)+espaco(floattostrf(pr_venda2,fffixed,18,2),8,false);
                                especifica=especifica+' ';
                                especifica=especifica+'A vista: '+floattostrf(pr_venda1,fffixed,18,2)+espaco(floattostrf(pr_venda1,fffixed,18,2),8,false);
                            break;
                            case 2:
                                especifica=especifica+floattostrf(Number(vlUnitario),fffixed,18,2)+espaco(floattostrf(Number(vlUnitario),fffixed,18,2),8,false);
                            break;
                            case 3:
                                especifica=especifica+floattostrf(Number(vlUnitario),fffixed,18,2)+espaco(floattostrf(Number(vlUnitario),fffixed,18,2),8,false);
                            break;
                        }
                    break;

                }
                
                //OUTRA LINHA
                switch (ProcuraParam(273, 'par')){
                    case 0:
                        especifica=pula_linha(especifica);
                    break;
                    case 1:
                        especifica=pula_linha(especifica);
                    break;
                    case 2:
                        especifica=pula_linha(especifica);
                    break;
                    case 3:
                        //especifica:=fm_principal.pula_linha(especifica);
                    break;
                }

                if (vlDesc > 0){
                    //palavra Desc
                    especifica=especifica+'Desc';
                    //Espaço
                    especifica=especifica+' ';
                    //valor do desconto
                    especifica=especifica+floattostrf(vlDesc,fffixed,18,2)+espaco(floattostrf(vlDesc,fffixed,18,2),8,false);
                    //Espaço
                    especifica=especifica+' ';
                } else {
                    for(let i in 16){
                        especifica=especifica+' ';
                    }
                }

                //valor total do item com o desconto
                especifica=especifica+floattostrf((Number(vlUnitario) * Number(qtde)) - vlDesc,fffixed,18,2)+espaco(floattostrf((Number(vlUnitario) * Number(qtde)) - vlDesc,fffixed,18,2),10,false);
                //Espaço
                especifica=especifica+' ';

                //05/04/2021
                if ((ProcuraParam(51, 'parE') == 'DESCRICAO_VISUREF') && (String(item.ref).trim() != '')) {
                    especifica=especifica+' Ref: '+item.ref;
                }
                  
                /*
                    Não precisa por enquanto

                    //21/03/2021
                    if trim(local) <> ''  then
                    begin
                            if (fm_principal.pe_usa_local_pro = 'PRO') or
                            (fm_principal.pe_usa_local_pro = 'GRAPRO') then
                                    especifica:=especifica+' Local: '+local;
                    end;
                */
            }

            return especifica
        }

    }

    // Adicionar Produto
    const addProdTroca = () => {
        setShowPropItemsTroca(false);
        let aux1 = false
        let item = prodAtual

        if (itemsTroca.length > 0){
            for(let i = 0; i < itemsTroca.length; i++) {
              if (itemsTroca[i].id == item.c_pro){
                alert('Este item já foi adicionado')
                aux1 = true
              }
            }
        }

        if (!aux1){
            let aux = {
                c_pro: item.c_pro,
                id: item.c_pro,
                produto: item.produto,
                ean: item.ean,
                qtde: Number(qtde),
                vl_efetivo: (Number(vlUnitario) * Number(qtde)) - vlDesc,
                vl_unitario: parseFloat(vlUnitario),
                pr_venda1: item.pr_venda1,
                pr_venda2: item.pr_venda2,
                pr_venda3: item.pr_venda3,
                pr_medio: item.pr_medio,
                pr_ult_cmp: item.pr_ult_cmp,
                c_depo: emprEstq,
                tipo: item.tipo,
                tp_preco: item.tp_preco,
                custo_tabela: item.custo_tabela,
                addTroca: true
            }
    
            let aux2 = itemsTroca
            aux2.push(aux)
            setItemsTroca(aux2)
    
            setVlTotalTroca(vlTotalTroca + aux.vl_efetivo)
            attVlEfetivo(vl_Total, vlDesc, vlAcrVenda, outrosVenda, vlFreteVenda, 0, 0, vlTotalTroca + aux.vl_efetivo);

            setMudou(true);
        }

    }

    //Retorna o picker com o tipo de preço
    const tpPrecoPicker = () => {
        if(ProcuraParam(270, 'par') == '123') {
            return( 
                <Picker
                    selectedValue={tp_preco}
                    style={styles.select}
                    //enabled={!sitAtt}
                    enabled={false}
                    onValueChange={(itemValue, itemIndex) => {
                        setTp_preco(itemValue)
                        //modTpPreco(itemValue)
                        setMudou(true)
                }}>
                    <Picker.Item label="Preço 1" value="1" />
                    <Picker.Item label="Preço 2" value="2" />
                    <Picker.Item label="Preço 3" value="3" />
                </Picker>
            )
            
        } else if (ProcuraParam(270, 'par') == '12') {
            return(
                <Picker
                    selectedValue={tp_preco}
                    style={styles.select}
                    //enabled={!sitAtt}
                    enabled={false}
                    onValueChange={(itemValue, itemIndex) => {
                        setTp_preco(itemValue)
                        //modTpPreco(itemValue)
                        setMudou(true)
                }}>
                    <Picker.Item label="Preço 1" value="1" />
                    <Picker.Item label="Preço 2" value="2" />
                </Picker>
            )
            
        } else if (ProcuraParam(270, 'par') == '1') {
            return(
                <Picker
                    selectedValue={tp_preco}
                    style={styles.select}
                    //enabled={!sitAtt}
                    enabled={false}
                    onValueChange={(itemValue, itemIndex) => {
                        setTp_preco(itemValue)
                        //modTpPreco(itemValue)
                        setMudou(true)
                }}>
                    <Picker.Item label="Preço 1" value="1" />
                </Picker>
            )
            
        }
    }

    // Estoque por empresa
    const estqempr = () => {
        if (ProcuraParam(640, 'parE') == 'S' && ProcuraParam(747, 'parE') == 'S') {
          return(
            <Picker
                selectedValue={emprEstq}
                style={styles.select}
                onValueChange={(itemValue, itemIndex) => {
                    setEmprEstq(itemValue)
                }}>
                {
                  renderProductList()
                }
            </Picker>
          ) 
        }
    }


    // Prop Itens
    const showCustomViewPropItems = () => {
        
        //mudei o height
        return(
          <View style={{width: '100%', height: '90%'}}>
                
            <ScrollView>
                
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#2c3b76',
                        textAlign: 'center'
                    }}
                >{descricao}</Text>

                <TextInput
                    style={styles.Input}
                    value={String(qtde)}
                    placeholder="Quantidade"
                    keyboardType="decimal-pad"
                    onChangeText={(text) => {
                        var numsStr = text.replace(/[^0-9||.]/g,'');
                        setQtde(numsStr)
                    }}
                />
                
                {estqempr()}
                
                <TextInput
                    style={styles.Input}
                    value={String(vlUnitario)}
                    placeholder="Valor Unitário"
                    keyboardType="decimal-pad"
                    onChangeText={(text) => {
                        var numsStr = text.replace(/[^0-9||.]/g,'');
                        setVlUnitario(numsStr)
                        desconto('','',numsStr, vl_DescVenda)
                    }}
                />
                
                <View style={{flexDirection: "row", width: '100%'}}>
                    <Text style={styles.TextInputM}>R$</Text>
                    <TextInput
                        style={styles.InputM}
                        value={String(vlDesc)}
                        placeholder="$ Desconto"
                        keyboardType="decimal-pad"
                        onChangeText={(text) => {
                            var numsStr = text.replace(/[^0-9||.]/g,'');
                            setVlDesc(numsStr)
                            desconto('$', numsStr, '', '', true)
                        }}
                    />
        
                    <Text style={styles.TextInputN}>%</Text>
                    <TextInput
                        style={styles.InputN}
                        value={String(percDisc)}
                        placeholder="% Desconto"
                        keyboardType="decimal-pad"
                        onChangeText={(text) => {
                            var numsStr = text.replace(/[^0-9||.]/g,'');
                            setPercDisc(numsStr)
                            desconto('%', numsStr, '', '', true)
                        }}
                    />
                </View>
    
                {obsItem()}
                <View style={styles.ViewNextAdd}>
                    <TouchableOpacity 
                     style={{
                        height: 60,
                        borderRadius: 20,
                        alignContent: "center",
                        justifyContent: 'center',
                        backgroundColor: '#2c3b76',
                      }}
                    onPress={() => {
                        addProd()
                    }}
                    >
                        <Text style={styles.TextNext}>Adicionar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                       style={{
                        height: 60,
                        borderRadius: 20,      
                        backgroundColor: '#2c3b76',
                        alignContent: "center",
                        justifyContent: 'center',
                        marginRight: 10,
                      }}
                            onPress={() => {
                                setShowPropItems(false);
                            }}
                    >
                        <Text style={styles.TextNext}>Voltar</Text>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
                
          </View>
        )
    }

    // Prop Itens Troca
    const showCustomViewPropItemsTroca = () => {

        return(
          <View style={{width: '100%', height: '90%'}}>
                
            <ScrollView>
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#2c3b76',
                        textAlign: 'center'
                    }}
                >{descricao}</Text>

                <TextInput
                    style={styles.Input}
                    value={String(qtde)}
                    placeholder="Quantidade"
                    keyboardType="decimal-pad"
                    onChangeText={(text) => {
                        var numsStr = text.replace(/[^0-9||.]/g,'');
                        setQtde(numsStr)
                    }}
                />
                
                {estqempr()}
                
                <TextInput
                    style={styles.Input}
                    value={String(vlUnitario)}
                    placeholder="Valor Unitário"
                    keyboardType="decimal-pad"
                    onChangeText={(text) => {
                        var numsStr = text.replace(/[^0-9||.]/g,'');
                        setVlUnitario(numsStr)
                        desconto('','',numsStr, vl_DescVenda)
                    }}
                />
                
                <View style={styles.ViewNextAdd}>
                    <TouchableOpacity 
                    style={{
                        height: 60,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#2c3b76',
                    }}
                    onPress={() => {
                        addProdTroca()
                    }}
                    >
                        <Text style={styles.TextNext}>Adicionar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={{
                    height: 60,
                    borderRadius: 20,      
                    backgroundColor: '#2c3b76',
                    alignContent: "center",
                    justifyContent: 'center',
                    marginRight: 20,
                    
                    }}
                    onPress={() => {
                        setShowPropItemsTroca(false);
                    }}
                    >
                        <Text style={styles.TextNext}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
                
          </View>
        )
    }

    // Atualizar Vl Efetivo
    const attVlEfetivo = (vlTotal, vlDesc, vlAcr, vloutros, vlFrete, soma, sub, vlTotalTroca) => {
        let aux

        if (ProcuraParam(519, 'parE') == 'N' && ProcuraParam(518, 'parE') == 'S') {
            aux = Number(vlTotal) - Number(vlDesc) + Number(vlAcr) + Number(vloutros) - Number(vlTotalTroca)
            setHaver(vlTotalTroca - (Number(vlTotal) - Number(vlDesc) + Number(vlAcr) + Number(vloutros)))
        } else {
            aux = Number(vlTotal) - Number(vlDesc) + Number(vlAcr) + Number(vloutros) + Number(vlFrete) - Number(vlTotalTroca)
            setHaver(vlTotalTroca - (Number(vlTotal) - Number(vlDesc) + Number(vlAcr) + Number(vloutros) + Number(vlFrete)))
        }

        if (aux.toFixed(2) < 0){
            setVl_Efetivo(0.00)
            setFlag_haver('S')
        } else {
            setVl_Efetivo(aux.toFixed(2))
            setHaver(0)
            setFlag_haver('N')
        }

    }
    
    function getTp_titulo(){

        let tp_titulo

        if (Financeiro.length == 0){
            tp_titulo = 'OU'
        } else {
            tp_titulo = Financeiro.length >= 0 ? Financeiro[0].tp_titulo : null 
            for(let i in Financeiro){
                if (tp_titulo != Financeiro[i].tp_titulo){
                    tp_titulo = 'OU'
                }
            }
        }
        
        return tp_titulo

    }

    const showPesqProdCustomView = () => {
        return(
            <View style={{height: 600, width: '100%'}}>
                <FlatList
                    data={pesqProd}
                    style={{
                        backgroundColor: 'white', 
                        paddingTop: 5,
                        width: '100%'
                    }}
                    renderItem={renderProdAdd}
                    keyExtractor={myKeyExtractor}
                />
                <View style={styles.ViewNextVolt}>
                    <TouchableOpacity 
                        style={{
                        height: 50,
                        borderRadius: 20, 
                        alignItems: 'center', 
                        justifyContent: 'center',     
                        backgroundColor: '#2c3b76',
                        width:'80%',
                        }}
                        onPress={() => {
                            setShowPesqProd(false)
                        }}
                    >
                        <Text style={styles.TextNext}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    const listaTrocaCustomView = () => {
        return(
            <View style={{
                width: '100%',
                height: 500,
            }}>
                <FlatList
                    data={listaTrocaProd}
                    style={{
                        paddingTop: 5,
                        backgroundColor: 'white'
                    }}
                    renderItem={renderAddItemTroca}
                    keyExtractor={myKeyExtractor}
                />
                <View style={styles.ViewNextVolt}>
                    <TouchableOpacity 
                        style={{
                        height: 50,
                        borderRadius: 20, 
                        alignItems: 'center', 
                        justifyContent: 'center',     
                        backgroundColor: '#2c3b76',
                        width: '80%',
                        }}
                        onPress={() => {
                            setShowlistaTroca(false)
                        }}
                    >
                        <Text style={styles.TextNext}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    return(
        <View style={styles.container}>

            <StatusBar style="dark" />

            <Loading 
                show={load}
                onDismiss={()=>{
                    setLoad(false)
                }}
            />

            <AwesomeAlert
                show={showtrocarPessoa}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                contentContainerStyle={{width: 450, height: '80%'}}
                customView={showPessoaCustomView()}
                contentStyle={{height: '80%'}}
                onDismiss={() => {
                    setShowtrocarPessoa(false);
                }}
            />

            <AwesomeAlert
                show={showTrocaProd}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                contentContainerStyle={{width: 400, height: '80%'}}
                customView={showCustomViewTrocaProd()}
                contentStyle={{height: '100%'}}
                onDismiss={() => {
                    setShowTrocaProd(false);
                    setMudou(true)
                    
                }}
                onRequestClose={()=>{
                    setShowTrocaProd(false);
                    setMudou(true)
                }}
            />

            <AwesomeAlert
                show={showExcluirItem}
                showProgress={false}
                title="Deseja excluir este item?"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                contentContainerStyle={{width: 450}}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Cancelar"
                confirmText="Excluir"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                    setShowExcluirItem(false)
                }}
                onConfirmPressed={() => {
                    setShowExcluirItem(false)
                    excluirItem()
                }}
                onDismiss={() => {
                    setShowExcluirItem(false)
                }}

                
            />

            <AwesomeAlert
                show={showModItemTroca}
                showProgress={false}
                title="Deseja excluir este item?"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Cancelar"
                confirmText="Excluir"
                confirmButtonColor='#DD6B55'
                onCancelPressed={() => {
                  setShowModItemTroca(false)
                }}
                onConfirmPressed={() => {
                  setShowModItemTroca(false)
                  excluirItemTroca() 
                }}
                onDismiss={() => {
                  setShowModItemTroca(false)
                }}

            />

            <AwesomeAlert
                show={showSalvarParcelas}
                showProgress={false}
                title="Deseja salvar este cartão para todas as parcelas?"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Não"
                confirmText="Sim"
                confirmButtonColor="#2c3b76"
                cancelButtonColor="#8c94b4"
                contentContainerStyle={{width: 450}}
                confirmButtonStyle={{width: 100, alignItems: 'center'}}
                cancelButtonStyle={{width: 100, alignItems: 'center'}}
                onCancelPressed={() => {
                    setShowSalvarParcelas(false)
                }}
                onConfirmPressed={() => {
                    setShowSalvarParcelas(false)
                    AttCC()
                }}
                onDismiss={() => {
                    setShowSalvarParcelas(false)
                }}
            />
   
            <AwesomeAlert
                show={showModFinan}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                confirmButtonStyle={styles.confirmButtonStyle}
                confirmButtonTextStyle={{fontSize: 20}}
                cancelButtonTextStyle={{fontSize: 20}}
                cancelText="Excluir"
                confirmText="Salvar"
                contentContainerStyle={{width: 450, height: '80%'}}
                customView={showCustomViewModFinan()}
                contentStyle={{height: '90%'}}
                onDismiss={() => {
                    setShowModFinan(false);
                }}
                onRequestClose={()=>{
                    setShowModFinan(false);
                }}
                onCancelPressed={()=>{ // Excluir
                    setShowModFinan(false);
                    excluirItemFinan()
                }}
                onConfirmPressed={()=>{ // Salvar
                    setShowModFinan(false);
                    salvarAddItemFinan()
                }}
            />

            <AwesomeAlert
                show={showProdutos}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                contentContainerStyle={{width: 400, height: '80%'}}
               // contentContainerStyle={{width: 450}}
                customView={showProdutosCustomView()}
                contentStyle={{height: '100%'}}
                onDismiss={() => {
                    setShowProdutos(false);
                }}
                onRequestClose={()=>{
                    setShowProdutos(false);
                  }}
            />
            <AwesomeAlert
                show={showPropItems}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                customView={showCustomViewPropItems()}
                contentStyle={{height: '100%'}}
                contentContainerStyle={{width: 450, height: '60%'}}
                onDismiss={() => {
                    setShowPropItems(false);
                }}
                onRequestClose={()=>{
                    setShowPropItems(false);
                }}
            />

            <AwesomeAlert
                show={showPropItemsTroca}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                customView={showCustomViewPropItemsTroca()}
                contentStyle={{height: '100%'}}
                contentContainerStyle={{width: 450, height: '50%'}}
                onDismiss={() => {
                    setShowPropItemsTroca(false);
                }}
                onRequestClose={()=>{
                    setShowPropItemsTroca(false);
                }}
            />

            <AwesomeAlert
                show={showScanCodeBar}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                contentContainerStyle={{width: 450}}
                customView={scanCodeBar()}
                contentStyle={{height: '100%', width: '100%'}}
                onDismiss={() => {  
                setShowScanCodeBar(false);
                setScanned(false);
                }}
                onRequestClose={()=>{
                setShowScanCodeBar(false);
                setScanned(false);
                }}
            />

            <AwesomeAlert
                show={showPesqProd}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                customView={showPesqProdCustomView()}
                contentStyle={{height: '100%'}}
                contentContainerStyle={{width: '80%', height: '80%'}}
                onDismiss={() => {
                    setShowPesqProd(false)
                }}
                onRequestClose={()=>{
                    setShowPesqProd(false)
                }}
            />   

            <AwesomeAlert
                show={showlistaTroca}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                customView={listaTrocaCustomView()}
                contentStyle={{height: '100%'}}
                contentContainerStyle={{width: '80%', height: '70%'}}
                onDismiss={() => {
                    setShowlistaTroca(false)
                }}
                onRequestClose={()=>{
                    setShowlistaTroca(false)
                }}
            />        

            <ScrollView>

                <Text>Nome/Razão</Text>
                <View 
                    style={{height: 60, marginBottom: 20}}
                >
                    <TextInput
                        style={styles.InputPessoa}
                        value={NomeRazao}
                        placeholder="Nome/Razão"
                        multiline={true}
                        editable={!sitAtt}
                    />
                    <View
                        style={{
                            alignItems: 'flex-end',
                            top: 10
                        }}
                    >
                        <TouchableOpacity
                            onLongPress={()=>{propPessoa(c_pessoa)}}
                            style={styles.ButtonPessoa}
                            disabled={sitAtt}
                            onPress={()=>{setClFunc('C'); setShowtrocarPessoa(true)}}
                        >
                            <Ionicons name="ios-search" size={25} color="white" />
                        </TouchableOpacity>
                    </View>
                        
                </View>

                <Picker
                    selectedValue={Finalidade}
                    style={styles.select}
                    enabled={!sitAtt}
                    onValueChange={(itemValue, itemIndex) => {
                        setFinalidade(itemValue)
                        setMudou(true)
                    }}>
                    {
                        FinalidadeList.map( (item, key) => {
                            return <Picker.Item key={key} label={item.value} value={item.value} />
                        })
                    }
                </Picker>

                <Text style={{paddingTop: 10}}>Situação</Text>
                <TextInput
                    style={styles.Input}
                    value={Situação}
                    editable={false}
                    placeholder="Situação"
                />

                <Text>Data de Lançamento</Text>
                <MaskInput
                    value={Dt_lanc}
                    placeholder='Data de Lançamento'
                    keyboardType= 'numeric'
                    editable={!sitAtt}
                    style={styles.Input}
                    onChangeText={(masked, unmasked, obfuscated) => {
                        setDt_lanc(masked);
                        setMudou(true)
                    }}
                    mask={Masks.DATE_DDMMYYYY}
                />

                {tpPrecoPicker()}

                <Text style={{paddingTop: 10}}>Funcionario</Text>
                <View 
                    style={{height: 60, marginBottom: 20}}
                >

                    <TextInput
                        style={styles.InputPessoa}
                        value={funcionario}
                        placeholder="Funcionario"
                        editable={!sitAtt}
                        multiline={true}
                    />
                    <View
                        style={{
                            alignItems: 'flex-end',
                            top: 10
                        }}
                    >
                        <TouchableOpacity
                            onLongPress={()=>{
                                if (funcionario != ''){
                                    propPessoa(c_func)
                                } else {
                                    alert('Funcionário não encontrado')
                                }
                            }}
                            disabled={sitAtt}
                            style={styles.ButtonPessoa}
                            onPress={()=>{setClFunc('F'); setShowtrocarPessoa(true)}}
                        >
                            <Ionicons name="ios-search" size={25} color="white" />   
                        </TouchableOpacity>
                    </View>
                        
                </View>
                
                <Text>Contato</Text>
                <TextInput
                    style={styles.Input}
                    value={Contato}
                    placeholder="Contato"
                    editable={!sitAtt}
                    onChangeText={(text)=>{
                        setContato(text)
                        setMudou(true)
                    }}
                />

                {/* Produtos */}
                <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 20}}>
                    <View style={{flex: 0.1, height: 1, backgroundColor: '#2c3b76'}} />
                    <View>
                        <Text style={{width: 140, textAlign: 'center', fontSize: 25, color: '#2c3b76', fontWeight: 'bold'}}>Produtos</Text>
                    </View>
                    <View style={{flex: 1, height: 1, backgroundColor: '#2c3b76'}} />
                </View>

                <View style = {styles.lista}>
                    {(Produtos.map( item => {
                        return (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#2c3b76',
                                    margin: 2,
                                    padding: 5
                                }}
                                disabled={sitAtt}
                                key={item.id}
                            >   
                                <Text style={styles.TextProduto}>{`${item.qtde}   ${item.produto}`}</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 10
                                }}>
                                    <Text style={styles.TextProduto}>{'R$ ' + String(Number(item.vl_unitario).toFixed(2))}</Text>
                                    <Text style={styles.TextProduto}>{'R$ ' + String(Number(item.vl_efetivo).toFixed(2))}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }))}
                </View>

                <View style={{
                    marginTop: 10,
                    position: 'relative',
                }}>
                    <TouchableOpacity
                        style={{
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#2c3b76',
                        }}
                        onPress={()=>{
                            setShowProdutos(true)
                        }}
                        disabled={sitAtt}
                    >   
                        <Text style={styles.TextNext}>+</Text>
                    </TouchableOpacity>

                    {(Finalidade == 'OS' || Finalidade == 'VE') && (ProcuraParam(362, 'par') == 'S') ? (
                    <TouchableOpacity
                        style={{
                            height: 40,
                            width: 50,
                            position: 'absolute',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#black',
                            right: 0,
                        }}
                        onPress={()=>{
                            setShowTrocaProd(true)
                        }}
                    >   
                        <FontAwesome5 name="people-arrows" size={24} color="white" />
                    </TouchableOpacity>
                    ) : null}
                </View>

                <Text>Valor de Desconto</Text>
                <View style={{flexDirection: "row", width: '100%'}}>
                    <Text style={styles.TextInputM}>R$</Text>
                    <TextInput
                        style={styles.InputM}
                        value={String(vl_DescVenda)}
                        placeholder="$ Desconto"
                        keyboardType="decimal-pad"
                        editable={!sitAtt}
                        onChangeText={(text) => {
                            var numsStr = text.replace(/[^0-9||.]/g,'');
                            setVl_DescVenda(numsStr)
                            desconto('$', numsStr)
                            attVlEfetivo(vl_Total, numsStr, vlAcrVenda, outrosVenda, vlFreteVenda, 0, 0, vlTotalTroca)
                            setMudou(true)
                        }}
                    />

                    <Text style={styles.TextInputN}>%</Text>
                    <TextInput
                        style={styles.InputN}
                        value={String(vl_PercVenda)}
                        placeholder="% Desconto"
                        keyboardType="decimal-pad"
                        editable={!sitAtt}
                        onChangeText={(text) => {
                            var numsStr = text.replace(/[^0-9||.]/g,'');
                            setVl_PercVenda(numsStr)
                            desconto('%', numsStr)
                            attVlEfetivo(vl_Total, Number(numsStr) / 100 * vl_Total, vlAcrVenda, outrosVenda, vlFreteVenda, 0, 0, vlTotalTroca)
                            setMudou(true)
                        }}
                    />
                </View>

                <Text>Valor de Acréscimo</Text>
                <TextInput
                    style={styles.Input}
                    value={String(vlAcrVenda)}
                    placeholder="Valor Acréscimo"
                    keyboardType="decimal-pad"
                    editable={!sitAtt}
                    onChangeText={(text) => {
                        var numsStr = text.replace(/[^0-9||.]/g,'');
                        setVlAcrVenda(numsStr)
                        attVlEfetivo(vl_Total, vl_DescVenda, numsStr, outrosVenda, vlFreteVenda, 0, 0, vlTotalTroca)
                        setMudou(true)
                    }}
                />

                {addoutros()}
                {addFrete()}
                {addVlTroca()}
                
                <Text style={styles.ValueText}>{'R$ ' + String(Number(Vl_Efetivo).toFixed(2)).replace('.', ',')}</Text>
                
                {/* Financeiro */}
                <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 20, paddingBottom: 10}}>
                    <View style={{flex: 0.1, height: 1, backgroundColor: '#2c3b76'}} />
                    <View>
                        <Text style={{width: 160, textAlign: 'center', fontSize: 25, color: '#2c3b76', fontWeight: 'bold'}}>Financeiro</Text>
                    </View>
                    <View style={{flex: 1, height: 1, backgroundColor: '#2c3b76'}} />
                </View>

                <View
                    style={{
                        flexDirection: "row"
                    }}
                >
                    <Picker
                        selectedValue={modalPag}
                        style={styles.selectFisJur}
                        enabled={!sitAtt}
                        onValueChange={(itemValue, itemIndex) => {
                            setModalPag(itemValue)
                            pesqMp(itemValue)
                            setMudou(true)
                        }}>
                        <Picker.Item label="Modalidade de Pagamento" value="P" />
                        {
                            pagList.map((product) => {
                                return <Picker.Item key={product.c_mpg} label={product.descricao} value={product.c_mpg} />
                            })
                        }
                    </Picker>

                    <TouchableOpacity
                        onPress={()=>{pesqMp(modalPag); setMudou(true)}}
                        style={styles.ButtonFinan}
                        disabled={sitAtt}
                    >
                        <Text style={{color: "#FFF", fontSize: 20}}>+</Text>
                    </TouchableOpacity>
                </View>
                    
                <View style = {styles.lista}>
                    {finanLista()}
                </View>

                <TouchableOpacity
                    style={{
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#2c3b76',
                    }}
                    disabled={sitAtt}
                    onPress={()=>{
                        let aux
                        if (ProcuraParam(519, 'parE') == 'N' && ProcuraParam(518, 'parE') == 'S'){
                        aux = Number(Vl_Efetivo) + Number(vlFreteVenda)
                        } else {
                        aux = Number(Vl_Efetivo)
                        }
                        if (Number(aux - ValorFinan()).toFixed(2) > 0){
                            setFinanItem({})
                            setModFinanValor(valorMax())
                            setModFinanData(FutureDay(0))
                            setModFinanTp_titulo('DI')
                            setModFinanNbanco('')
                            setModFinanAgencia('')
                            setModFinanConta('')
                            setModFinanNr_doc_liq('')
                            setModFinanNrCob('')
                            setModFinanEmitente('')
                            setModFinanCpf_cgc('')
                            setModFinanCartao('P')
                            setModFinanContaBanc('P')
                            setShowModFinan(true);
                        } else {
                            alert('Valor Total foi Atingido')
                        }
                    }}
                >
                    <Text style={styles.TextNext}>+</Text>
                </TouchableOpacity>


                {/* End inputs */}
                <View style={{alignItems: "flex-end"}}>
                    <TouchableOpacity 
                        disabled={!Mudou}
                        style={styles.ButtonSave}
                        onPress={()=>{Salvar(); setMudou(false)}}
                    >
                            <Text style={styles.TextSave}>Salvar</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>


        </View>
    )
 
}
