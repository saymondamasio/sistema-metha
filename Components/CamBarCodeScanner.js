import React, { useState, useEffect, Component } from 'react';
import { Camera } from 'expo-camera';
var Quagga = require('quagga');

let cam
export const CamBarCodeScanner = (prop) => {

    useEffect(() => {

        setTimeout(() => {
            setInterval(async () => {
                if (cam) {
                    let photo = await cam.takePictureAsync({quality: 1});
                    
                    if (prop.on){
                        Quagga.decodeSingle({
                            decoder: {
                                readers: ["code_128_reader","ean_reader"]
                            },
                            src: photo.base64
                        }, function(result){
                            if (result){
                                if(result.codeResult) {
                                    prop.onScan(result.codeResult.code);
                                } else {
                                    console.log("not detected");
                                }
                            }
                        });
                    }
                
                }
            }, prop.clock);
        }, 1000);
    }, []);

    return (
        <Camera 
            ref={ref => {
                cam = ref
            }}
            //autoFocus={Camera.Constants.AutoFocus.on}
            style={prop.styleCam} 
            type={prop.type}
            focusable={true}
        />
    )

}
