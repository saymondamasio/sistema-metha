import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#d5def2', 
        padding: 20
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
    ButtonNext: {
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3b76',
    },
    TextNext: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        padding: 10
    },
});
  