import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native'
import { ConstantString } from '../../utils/constant-string';
import { ColorCustom } from '../../utils/color';
import { SafeAreaView } from 'react-native';
import { Images } from '../../utils/images';
function StartComponent(props) {
    const { onProvider, onCustomer } = props
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.main}>
                <View style={styles.above}>
                    <Image source={Images.logoApp} style={styles.image} />
                    <Text style={styles.txtHeader}>{ConstantString.STR_WHO_ARE_YOU}</Text>
                </View>

                <View style={styles.below}>
                    <TouchableOpacity style={styles.btnAcheteurs} onPress={onCustomer}>
                        <Text style={styles.txtAcheteurs}>{ConstantString.ACHTEURS_LABEL}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnVendeurs} onPress={onProvider}>
                        <Text style={styles.txtVendeurs}>{ConstantString.VENDEURS_LABEL}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: ColorCustom.LIGHT_PINK
    },
    main: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: ColorCustom.LIGHT_PINK,
        paddingRight: 20,
        paddingLeft: 20,
    },
    image: {
        height: '50%',
        maxHeight: 180,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 110
    },
    above: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    below: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    txtHeader: {
        fontSize: 30,
        textAlign: 'center',
        position: 'absolute',
        bottom: 40,
        color: ColorCustom.BROWN,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    btnAcheteurs: {
        height: 60,
        width: '100%',
        backgroundColor: ColorCustom.BROWN,
        borderRadius: 30,
        justifyContent: 'center'
    },
    txtAcheteurs: {
        fontSize: 22,
        textAlign: 'center',
        color: 'white',
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    btnVendeurs: {
        height: 60,
        width: '100%',
        backgroundColor: ColorCustom.GREEN,
        borderRadius: 30,
        justifyContent: 'center',
        marginTop: 20
    },
    txtVendeurs: {
        color: 'white',
        fontSize: 22,
        alignSelf: 'center',
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    }
})

export default StartComponent
