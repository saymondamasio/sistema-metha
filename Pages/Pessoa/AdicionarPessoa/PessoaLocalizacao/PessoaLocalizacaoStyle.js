import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      backgroundColor: '#d5def2',    
      padding: 10
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
      backgroundColor: '#f1f4fb'
    }
});
  