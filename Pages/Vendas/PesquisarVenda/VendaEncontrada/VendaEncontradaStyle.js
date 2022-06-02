import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#d5def2', 
      padding: 20
    },
    ViewNext: {
      paddingTop: 50,
      alignItems: 'flex-end',
    },
    ButtonNext: {
      height: 60,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue'
    },
    TextNext: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#fff',
      padding: 0,
      paddingHorizontal: 10,
    },
    dadosBase:{
      display: 'flex',
      height: 100,
      flexDirection: 'row',
      alignItems: 'center'
    },
    Input: {
      position:'relative',
      height: 60, 
      width: '100%',
      borderColor: 'black',
      borderWidth: 1,
      fontSize: 20,
      paddingLeft: 20,
      top: 10,
      marginBottom: 20,
      backgroundColor: '#f1f4fb',
      color: 'black'
    },
    select: {
      position:'relative',
      color: 'white',
      width:'100%',
      height: 60,
      backgroundColor: '#2c3b76',
    },
    ButtonSave: {
      backgroundColor: '#2c3b76',
      width: "40%",
      height: 60,
      marginTop: 30,
      justifyContent: 'center',
      alignItems: 'center'
    },
    TextSave: {
      color: 'white',
      fontSize: 30,
    },
    ViewPos: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 30
    },
    ButtonLoc: {
      backgroundColor: '#2c3b76',
      width: 50,
      height: 50,
      alignContent: 'center',
      justifyContent: 'center',
    },
    TextPos: {
      textAlign: 'center',
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
    },
    ButtonPessoa: {
      backgroundColor: '#2c3b76',
      position: 'absolute',
      width: 50,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center'
    },
    InputPessoa: {
      height: 60, 
      width: '100%',
      borderColor: 'black',
      borderWidth: 1,
      fontSize: 20,
      paddingLeft: 20,
      paddingRight: 70,
      top: 10,
      marginBottom: 20,
      backgroundColor: '#f1f4fb',
      position: 'absolute',
      color: 'black'
    },
    lista: {
      marginVertical: 5,
      borderWidth: 2,
      borderColor: "#2c3b76",
      padding: 2,
    },
    TextProduto: {
      color: '#fff'
    },
    ValueText: {
      fontWeight: 'bold',
      fontSize: 25,
      color: '#2c3b76',
      fontFamily: '',
      textAlign: 'right',
      paddingTop: 10
    },
    nomePesquisar: {
      height: 60, 
      width: "100%",
      borderColor: 'black',
      borderWidth: 1,
      fontSize: 20,
      paddingLeft: 20,
      paddingRight: 70,
      marginBottom: 20,
      backgroundColor: '#f1f4fb',
      color: 'black',
      position: 'absolute'
    },
    listaPop: {
      borderWidth: 2,
      borderColor: "#2c3b76",
      padding: 3,
    },
    selectPop: {
      position:'relative',
      color: 'white',
      height: 60,
      backgroundColor: '#2c3b76',
    },
    ProdFin: {
      backgroundColor: '#2c3b76',
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10
    },
    InputMemo: {
      position:'relative',
      width: '100%',
      borderColor: 'black',
      borderWidth: 1,
      fontSize: 20,
      padding: 12,
      paddingLeft: 20,
      top: 10,
      marginBottom: 20,
      backgroundColor: '#f1f4fb',
      color: "black",
      textAlign: 'left',
      textAlignVertical: "top"
    },
    InputM: {
      position:'relative',
      height: 60, 
      width: '50%',
      borderColor: 'black',
      borderWidth: 1,
      fontSize: 20,
      paddingLeft: 45,
      top: 10,
      marginBottom: 20,
      backgroundColor: '#f1f4fb',
      color: "black",
    },
    TextInputM: {
      fontSize: 20,
      position: "absolute",
      zIndex: 10,
      top: 10,
      paddingLeft: 10,
      height: 60, 
      textAlignVertical: "center",
    },
    InputN: {
      position:'relative',
      height: 60, 
      width: '50%',
      borderColor: 'black',
      borderWidth: 1,
      fontSize: 20,
      paddingRight: 45,
      top: 10,
      textAlign: "right",
      marginBottom: 20,
      backgroundColor: '#f1f4fb',
      color: "black",
    },
    TextInputN: {
      fontSize: 20,
      position: "absolute",
      zIndex: 10,
      top: 10,
      left: '100%',
      marginLeft: -30,
      height: 60, 
      textAlignVertical: "center",
    },
    selectFisJur: {
      position:'relative',
      color: 'white',
      width:'90%',
      height: 30,
      backgroundColor: '#2c3b76',
      marginBottom: 5
    },
    ButtonFinan: {
      backgroundColor: '#2c3b76',
      width: '10%',
      height: 30,
      justifyContent: 'center',
      alignItems: 'center'
    },
    confirmButtonStyle: {
      width: 100,
      alignItems: 'center',
      backgroundColor: '#2c3b76'
    },
    InputHaver: {
      position:'relative',
      height: 40, 
      width: '30%',
      borderColor: 'black',
      borderWidth: 1,
      fontSize: 20,
      paddingRight: 10,
      marginBottom: 20,
      top: 5,
      backgroundColor: '#f1f4fb',
      textAlign: 'right',
      color: 'black'
    }, 
    ViewNextAdd: {
      flexDirection: 'row-reverse',
      paddingHorizontal: 10,
      marginTop: 30,
      alignItems: 'center',
      justifyContent: 'center',
  },
  ViewNextVolt: {
      alignItems: 'center',
      marginTop: 50,
  },
});
  