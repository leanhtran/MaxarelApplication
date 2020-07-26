import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import spinner from '../../../resource/loading.gif';
import {myWidth} from '../../utils/dimension'
function LoadingIndicator()  {
    
    return (
        <View style={styles.backGroundStyle}>
            <Image source={spinner} style={styles.image} />
        </View>
    );
}
const styles = StyleSheet.create({
    image: {
        width: (myWidth*10/100),
        height: (myWidth*10/100),
        alignSelf: "center"   
    },

    backGroundStyle:
    {
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
});

export default LoadingIndicator
