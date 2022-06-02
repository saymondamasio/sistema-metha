import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      backgroundColor: '#d5def2', 
      padding: 20
    },
    ViewNext: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
    },
    ButtonNext: {
      height: 60,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2c3b76'
    },
    TextNext: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#fff',
      padding: 10
    },
    Input: {
      position:'relative',
      height: 60, 
      width: '100%',
      borderColor: 'black',
      borderWidth: 1,
      fontSize: 30,
      paddingLeft: 20,
      top: 10,
      marginBottom: 20,
      backgroundColor: '#f1f4fb',     
    },
    InputEan: {
      position:'relative',
      height: 60, 
      width: '80%',
      borderColor: 'black',
      borderWidth: 1,
      fontSize: 30,
      paddingLeft: 20,
      top: 10,
      marginBottom: 20,
      backgroundColor: '#f1f4fb',     
    },
    InputDig: {
      position:'relative',
      height: 60, 
      width: '20%',
      borderColor: 'black',
      borderWidth: 1,
      fontSize: 30,
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

    // -----------------------------

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
  