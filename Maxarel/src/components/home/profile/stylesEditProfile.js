import {StyleSheet, Platform} from 'react-native'
import { ColorCustom } from '../../../utils/color'
import { ConstantString } from '../../../utils/constant-string'

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: ColorCustom.LIGHT_PINK
    },
    scrollView: {
        flex: 1,
        backgroundColor: ColorCustom.LIGHT_PINK,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        padding: 20,
        paddingTop: 5,
        backgroundColor: ColorCustom.LIGHT_PINK
    },
    rowHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        width: '100%',
        justifyContent:'center',
    },
    txtHeader: {
        fontSize: 30,
        height: Platform.OS === "ios" ? 30 : 60,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        color: ColorCustom.BROWN,
        textAlign:"center",
        textAlignVertical:"center",
        justifyContent: 'center',
        alignSelf:'center',
    },
    btnBack: {
        height: 30,
        width: 30,
        position: 'absolute',
        zIndex: 1,
        justifyContent: 'center',
        left: 0,
    },
    imageBack: {
        height: 22,
        width: 13,
    },  
    rowBtn: {
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'center'
    },
    btnParticulier: {
        height: 40,
        width: '45%',
        borderWidth: 3,
        borderColor: ColorCustom.GREEN,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        justifyContent: 'center',
        borderRightWidth: 0
    },
    txtParticulier: {
        fontSize: 13,
        textAlign: 'center',
        color: '#126E36',
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    btnProfessional: {
        backgroundColor: 'white',
        height: 40,
        width: '45%',
        borderWidth: 3,
        borderColor: ColorCustom.GREEN,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'center'
    },
    txtProfessional: {
        fontSize: 13,
        textAlign: 'center',
        color: '#126E36',
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },  
    detailProfessional: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    },
    btnArtisan: {
        height: 40,
        width: '20%',
        borderWidth: 2,
        borderColor: ColorCustom.GREEN,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        justifyContent: 'center',
    },
    textDetailProfessional: {
        fontSize: 11,
        textAlign: 'center',
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    btnFerme: {
        height: 40,
        width: '20%',
        borderWidth: 2,
        borderColor: ColorCustom.GREEN,
        justifyContent: 'center',
        borderLeftWidth: 0,
    },
    btnMonastery: {
        height: 40,
        width: '20%',
        borderWidth: 2,
        borderColor: ColorCustom.GREEN,
        justifyContent: 'center',
        borderLeftWidth: 0,
        borderRightWidth: 0
    },
    btnAssociation: {
        height: 40,
        width: '20%',
        borderWidth: 2,
        borderColor: ColorCustom.GREEN,
        justifyContent: 'center',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    btnInscription: {
        height: 60,
        width: '100%',
        backgroundColor: ColorCustom.BROWN,
        borderRadius: 30,
        marginTop: 30,
        justifyContent: 'center'
    },
    txtInscription: {
        fontSize: 22,
        textAlign: 'center',
        color: ColorCustom.WHITE,
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    textField: {
        marginTop: 10,
        height: 60,
        width: '100%',
    },
    heightTextField: {
        top: 17
    },
    btnLocation: {
        marginTop: 20,
        borderBottomWidth: 0.5,
        height: 60,
        width: '100%',
        backgroundColor: ColorCustom.LIGHT_PINK,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: ColorCustom.GRAY,
    },
    imageLocation: {
        height: 22,
        width: 22,
    },
    textAddress: {
        paddingLeft: 10,
        color: ColorCustom.GRAY,
        fontSize: 16,
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    imagePrev: {
        width: 9,
        height: 15,
        position: 'absolute',
        right: 15,
    },
    descriptionAddress: {
        fontSize: 14,
        paddingLeft: 10,
        color: ColorCustom.GRAY,    
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        width: '85%',
        color: ColorCustom.BLACK
    },
    colAddress: {
        flexDirection: 'column',
        width: '100%'
    }
})