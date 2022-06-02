import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#d5def2',
      padding: 20
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
      backgroundColor: '#f1f4fb'
    },
    Button: {
      backgroundColor: '#2c3b76',
      width: '40%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center'
    },
    ProcurarView: {
      display: 'flex',
      alignItems: 'flex-end'
    },
    TextButton: {
      color: 'white',
      fontSize: 25
    }
});
  