import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d5def2',   
    padding: 10
  },
  Opts: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#2c3b76',
    marginBottom: 10
  },
  Text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  },
  TextTitulo: {
    fontSize:30,
      fontWeight: 'bold',
      color: '#FFF',
      textShadowColor:'black',
      textShadowOffset:{width: 1, height: 1},
      textShadowRadius:20,
      paddingBottom: 20
  }
});
  