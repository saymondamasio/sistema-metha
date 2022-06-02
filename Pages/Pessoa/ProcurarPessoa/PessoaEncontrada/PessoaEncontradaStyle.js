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
    selectFisJur: {
      position:'relative',
      color: 'white',
      width:'100%',
      height: 60,
      backgroundColor: '#2c3b76',
    },
    FisJur: {
      marginBottom: -50,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
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
    }
});
  