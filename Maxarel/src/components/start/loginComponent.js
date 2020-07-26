import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform,
    SafeAreaView
} from 'react-native';
import { ColorCustom } from '../../utils/color';
import Popup from '../base_components/AlertCustom';
import { TextField } from 'react-native-material-textfield';
import { ConstantString } from '../../utils/constant-string';
import { Images } from '../../utils/images';
import { myHeight, myWidth } from '../../utils/dimension';
import PopupLoading from '../../screens/popupLoading';

function LoginComponent(props) {

    const { 
        isLoading, 
        setEmail, 
        setPassword, 
        onClickLogin, 
        onRegister, 
        customPopup, 
        goBack,
        onClickForgotPassword
    } = props

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.main}>
                <View style={styles.container}>
                    <View style={styles.rowHeader}>
                        <TouchableOpacity onPress={goBack} style={styles.btnBack}>
                            <Image style={styles.imageBack} source={Images.blackBack}/>
                        </TouchableOpacity>
                        <Text 
                            adjustsFontSizeToFit = {true}
                            numberOfLines = {1}
                        style={styles.txtHeader}>{ConstantString.STR_TITLE_LOGIN}</Text>
                    </View>
                        <TextField
                            autoCapitalize='none'
                            onChangeText={text => setEmail(text)}
                            label={ConstantString.STR_EMAIL_PLACE_HOLDER}
                            labelTextStyle={{fontFamily: ConstantString.FONT_REGULAR, marginTop: Platform.OS === 'ios' ? 5 : 0,}}
                        />

                        <TextField
                            onChangeText={text => setPassword(text)}
                            secureTextEntry={true}
                            label={ConstantString.STR_PASSWORD_PLACE_HOLDER}
                            labelTextStyle={{fontFamily: ConstantString.FONT_REGULAR, marginTop: Platform.OS === 'ios' ? 5 : 0,}}
                        />

                    <TouchableOpacity style={styles.btnForgot} onPress={onClickForgotPassword}>
                        <Text style={styles.txtForgot}>{ConstantString.STR_FORGOT_PASSWORD}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        disabled={isLoading}
                        style={styles.btnLogIn}
                        onPress={onClickLogin}>
                        <Text style={styles.txtLogIn}>{ConstantString.STR_TITLE_LOGIN}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        disabled={isLoading}
                        style={styles.btnCreate}
                        onPress={onRegister} >
                        <Text style={styles.txtCreate}>{ConstantString.STR_TITLE_REGISTER}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <PopupLoading visible={isLoading} />
            <Popup ref={customPopup} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: ColorCustom.LIGHT_PINK
    },  
    scrollview: {
        flex: 1,
    },
    main: {
        flex: 1,
        flexDirection: 'column',
        height: myHeight,
        width: myWidth,
        paddingLeft: 20,
        paddingRight:20,
        paddingTop: 5,
        backgroundColor: ColorCustom.LIGHT_PINK
    },
    container: {
        flexDirection: 'column',
    },
    footer: {
        flex: 1,
        marginTop: 40,
        flexDirection: "column",
        alignItems: 'center'
    },
    rowHeader: {
        width:'100%',
        height: 60,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center', 
        marginBottom: 10
    },
    txtHeader: {
        fontSize: 32,
        height: Platform.OS === "ios" ? 30 : 60,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        color: ColorCustom.BROWN,
        textAlign:"center",
        textAlignVertical:"center",
        justifyContent: 'center',
        alignSelf:'center'   
    },
    btnBack: {
        height: 30,
        width: 30,
        zIndex: 1,
        justifyContent: 'center',
        left: 0,
        position:'absolute',
        alignSelf:'center',
    },
    imageBack: {
        height: 22,
        width: 13,
    },
    btnCreate: {
        marginTop: 30,
        height: 60,
        width: '100%',
        backgroundColor: '#7A3707',
        borderRadius: 30,
        justifyContent: 'center'
    },
    txtCreate: {
        fontSize: 22,
        alignSelf: 'center',
        color: 'white',
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    btnLogIn: {
        height: 60,
        width: '100%',
        backgroundColor: '#126E36',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtLogIn: {
        color: 'white',
        fontSize: 22,
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    btnForgot: {
        marginTop: 15
    },
    txtForgot: {
        textAlign: 'center',
        marginTop: 8,
        color: "#126E36",
        fontSize: 17,
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
})

export default LoginComponent