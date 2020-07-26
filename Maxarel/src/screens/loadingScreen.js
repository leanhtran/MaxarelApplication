import React  from 'react';
import {
    MaterialIndicator,
} from 'react-native-indicators';
import { View, StyleSheet } from 'react-native';
import { ColorCustom } from '../utils/color';
import { myHeight } from '../utils/dimension';

function LoadingScreen() {
    return (
        <View style={styles.container}>
            <MaterialIndicator color={ColorCustom.GREEN} />
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default LoadingScreen
