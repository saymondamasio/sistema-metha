import React from 'react';
import { View, Modal, Image, Platform } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

export const Loading = (prop) => {

    const load = () => {
        return(
          <View>
            <Image source={require('../Imagens/Loading.gif')}
                style={{width: 30, height: 30}}
            /> 
          </View>
        )
    }

    if (Platform.OS == 'web'){
        if (prop.show == true){
            return (
                <View 
                    style={{
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(52,52,52,0.6)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        zIndex: 99
                    }}
                    onStartShouldSetResponder={() => {
                        prop.onDismiss()
                    }}
                >
                    <View style={{
                        padding: 10,
                        backgroundColor: '#2c2d2d',
                        borderRadius: 5
                    }}>
                        <Modal
                            onRequestClose={()=>{prop.onDismiss()}}
                            style={{
                                backgroundColor: '#2c2d2d',
                                borderColor: '#2c2d2d'
                            }}
                        >
                            {load()}
                        </Modal>
                    </View>
        
                </View>
            );
        } else {
            return <View></View>;
        }

    } else {
        return (
            <AwesomeAlert
                show={prop.show}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={false}
                customView={load()}
                contentContainerStyle={{backgroundColor: '#2c2d2d'}}
                onDismiss={() => {
                    prop.onDismiss()
                }}
            />
        );
        
    }
    
}