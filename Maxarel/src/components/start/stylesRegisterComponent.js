import {StyleSheet, Platform} from 'react-native'
import { myWidth, myHeight } from '../../utils/dimension'
import { ColorCustom } from '../../utils/color'
import { ConstantString } from '../../utils/constant-string'


export const styles=StyleSheet.create({
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
        paddingBottom: 10,
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
        fontSize: 35,
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
        backgroundColor: '#7A3707',
        borderRadius: 30,
        marginTop: 30,
        justifyContent: 'center'
    },
    txtInscription: {
        fontSize: 22,
        textAlign: 'center',
        color: 'white',
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    btnSeconnecter: {
        height: 60,
        width: '100%',
        backgroundColor: '#126E36',
        borderRadius: 30,
        justifyContent: 'center',
        marginTop: 30,
    },
    txtSeconnecter: {
        color: 'white',
        fontSize: 22,
        alignSelf: 'center',
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    textField: {
        marginTop: 10,
        height: 60,
        width: '100%',
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
        width: '85%'
    },
    colAddress: {
        flexDirection: 'column',
        width: '100%'
    },
    textFooter: {
        marginTop: 16,
        width: '100%',
        fontFamily: ConstantString.FONT_ITALIC,
        marginTop: Platform.OS === 'ios' ? 15 : 10,
        fontSize: 16,
        color: ColorCustom.GRAY,
        paddingLeft: 30,
    },
    detailAddressContainer: {
        borderWidth: 1,
        borderColor: ColorCustom.GREEN,
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
        padding: 7,
        borderRadius: 5,
        flexDirection: 'row',
    },
    textQuestionDetailAddress: {
        fontFamily: ConstantString.FONT_ITALIC,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 16,
        flex: 4,
    },
    detailAddressInputStyle: {
        height: 60,
        borderColor: 'gray',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: ColorCustom.GREEN,
        paddingLeft: 8,
        color: ColorCustom.BLACK,
        textAlignVertical: 'top',
        width: '100%',
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 15 : 10,
        fontSize: 16
    },
})