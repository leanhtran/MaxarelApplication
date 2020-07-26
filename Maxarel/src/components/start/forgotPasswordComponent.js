import React from 'react'
import { 
    StyleSheet, 
    SafeAreaView,
    View,
    TouchableOpacity,
    Text,
    Image,
    Platform
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Popup from '../base_components/AlertCustom';
import { ConstantString } from '../../utils/constant-string';
import { ColorCustom } from '../../utils/color';
import { Images } from '../../utils/images';
import Dialog from 'react-native-dialog';
import PopupLoading from '../../screens/popupLoading';

function ForgotPasswordComponent(props) {

    const {
        setEmail,
        onClickNext,
        isLoading,
        goBack,
        customPopup,
        visibleDialog,
        onSubmitDialog
    } = props

    const _showDialogSucces = () => {
        return (
            <Dialog.Container 
            visible={visibleDialog}
            contentStyle={styles.contentStyle} 
            >
                <Dialog.Title style={styles.textTitle}>Success</Dialog.Title>
                <Dialog.Description style={styles.textDescription}>
                    Un e-mail contenant le nouveau mot de passe vous a été envoyé
                </Dialog.Description>
                <TouchableOpacity onPress={onSubmitDialog} style={styles.btnOKDialog}>
                    <Text style={styles.textOK}>
                        {ConstantString.STR_OK}
                    </Text>
                </TouchableOpacity>
            </Dialog.Container>
        )
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.main}>
                <View style={styles.container}>
                    {_showDialogSucces()}
                    <View style={styles.rowHeader}>
                        <TouchableOpacity onPress={goBack} style={styles.btnBack}>
                            <Image style={styles.imageBack} source={Images.blackBack}/>
                        </TouchableOpacity>
                        <Text 
                            adjustsFontSizeToFit = {true}
                            numberOfLines = {1}
                            style={styles.txtHeader}>{ConstantString.STR_FORGOT_PASSWORD}
                        </Text>
                    </View>

                    <TextField
                        autoCapitalize='none'
                        onChangeText={text => setEmail(text)}
                        label={ConstantString.STR_EMAIL_PLACE_HOLDER}
                        labelTextStyle={{fontFamily: ConstantString.FONT_REGULAR, marginTop: Platform.OS === 'ios' ? 5 : 0,}}
                    />

                    <TouchableOpacity
                        disabled={isLoading}
                        style={styles.btnProchain}
                        onPress={onClickNext}>
                            <Text style={styles.txtProchain}>{ConstantString.STR_SUBMIT}</Text>
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
    main: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight:20,
        paddingTop: 5,
        backgroundColor: ColorCustom.LIGHT_PINK
    },
    container: {
        flex: 1,
        flexDirection: 'column',
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
        left: -10,
        position:'absolute',
        alignSelf:'center'
    },
    imageBack: {
        height: 22,
        width: 13,
    },
    btnProchain: {
        marginTop: 30,
        height: 60,
        width: '100%',
        backgroundColor: '#126E36',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtProchain: {
        color: 'white',
        fontSize: 22,
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    btnOKDialog: {
        alignSelf: 'center',
        height: 50,
        borderTopWidth: 0.5,
        borderColor: ColorCustom.GRAY,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textOK: {
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 17,
        color: ColorCustom.GREEN
    },
    contentStyle: {
        width: '75%',
        padding: 0,
        borderRadius: 15,
        alignItems: 'center',
    },
    textTitle: {
        alignSelf: 'center',
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 20,
        color: ColorCustom.BROWN
    },
    textDescription: {
        textAlign: 'center',
        fontFamily: ConstantString.FONT_LIGHT
    }
})

export default ForgotPasswordComponent
