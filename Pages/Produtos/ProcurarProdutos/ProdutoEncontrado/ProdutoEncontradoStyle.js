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
      padding: 10
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
      backgroundColor: '#f1f4fb'
    },
    InputEan: {
      position:'relative',
      height: 60, 
      width: '80%',
      borderColor: 'black',
      borderWidth: 1,
      fontSize: 20,
      paddingLeft: 20,
      top: 10,
      marginBottom: 20,
      backgroundColor: '#f1f4fb',     
    },
    InputCod: {
      position:'relative',
      height: 60, 
      width: '20%',
      borderColor: 'black',
      borderWidth: 1,
      fontSize: 20,
      paddingLeft: 10,
      top: 10,
      marginBottom: 20,
      backgroundColor: '#f1f4fb',
    },
    select: {
      position:'relative',
      color: 'white',
      width:'100%',
      height: 60,
      backgroundColor: '#2c3b76',
      marginBottom: 5,
    },
   
    ButtonSave: {
      backgroundColor: '#2c3b76',
      width: "40%",
      height: 60,
      justifyContent: 'center',
      alignItems: 'center'
    },
    TextSave: {
      color: 'white',
      fontSize: 30,
      marginBottom: 10,
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
    //-----------------------------------//
    TextPos: {
      textAlign: 'center',
      color: '#fff',
      fontWeight: 'bold',
        fontSize: 30
    },
    ButtonProduto: {
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
        color: "black"
    },
    grupoPesquisar: {
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
    selectPop: {
        position:'relative',
        color: 'white',
        height: 30,
        backgroundColor: '#2c3b76',
    },
    listaPop: {
        borderWidth: 2,
        borderColor: "#2c3b76",
        padding: 3,
   }, 
});
  