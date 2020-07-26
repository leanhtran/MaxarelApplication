import {StyleSheet, Platform} from 'react-native'
import { myHeight, myWidth } from '../../../../utils/dimension'
import { ColorCustom } from '../../../../utils/color'
import { ConstantString } from '../../../../utils/constant-string'

export const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: ColorCustom.WHITE
    },
    scrollView: {
        flex: 1,
    },
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: ColorCustom.WHITE
    },
    header: {
        flexDirection: 'row',
        paddingLeft: 10,
        alignItems: 'center',
        backgroundColor: ColorCustom.LIGHT_PINK,
        paddingTop: 12,
        paddingBottom: 12,
    },
    textHeader: {
        width: '100%',
        textAlign: 'center',
        fontSize: 22,
        color: ColorCustom.BROWN,
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    imageBack: {
        height: 22,
        width: 14,
    },
    btnBack: {
        height: 30,
        width: 30,
        position: 'absolute',
        zIndex: 1,
        justifyContent: 'center',
        left: 10,
    },
    btnCall: {
        height: 25,
        width: 25,
        position: 'absolute',
        zIndex: 1,
        justifyContent: 'center',
        left: 30,
    },
    body: {
        flexDirection: 'column',
        flex: 1,
        marginTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 30,
    },
    textBody: {
        fontSize: 17,
        marginTop: 10,
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    textPrice: {
        fontSize: 21,
        color: ColorCustom.GREEN,
        fontWeight: 'bold',
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    rowPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    rowBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    rowDetailHeader: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: ColorCustom.LIGHT_GRAY_1,
    },
    textDetailHeader: {
        fontSize: 17,
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        color: ColorCustom.GRAY
    },
    textRow: {
        fontSize: 17,
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    textEndTime: {
        fontSize: 18,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        color: ColorCustom.GREEN,
        textAlign: 'right',
        flex: 1,
    },
    rowCertify: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    colLeftBody: {
        flex: 3,
    },
    colRightBody: {
        flex: 4,
    },
    imageBody: {
        height: 30,
        width: 30,
    },
    viewImageProduct: {
        height: 275,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    imageProduct: {
        width: '100%',
        height: 275     
    },
    imageCertify: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
        marginLeft: 5
    },
    imagePaymentMethod: {
        height: 38,
        width: 50,
        marginTop: 20,
        zIndex: -1,
        resizeMode: 'contain'
    },
    rowPayment: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 50,
        alignItems: 'center',
    },
    imageTickPayment: {
        height: 18,
        width: 18,
        position: 'absolute',
        right: 3,
        top: 10,
        zIndex: 1
    },
    viewImagePayment: {
        width: 60
    },
    lightGray: {
        borderBottomWidth: 5,
        borderColor: ColorCustom.LIGHT_GRAY, 
        marginLeft: -20, 
        marginRight: -20, 
        marginTop: 10
    },
    viewDistance: {
        position: 'absolute',
        zIndex: 1,
        top: 5,
        right: 5,
        backgroundColor: ColorCustom.LIGHT_PINK,
        justifyContent: 'center',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: ColorCustom.BROWN,
        paddingVertical: 5,
        paddingHorizontal: 8
    },
    textDistance: {
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        color: ColorCustom.BROWN,
        fontSize: 20,
    },
    rowArrive: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginRight: -20,
        alignItems: 'center'
    },
    btnArrive: {
        width: '60%',
        height: 55,
        backgroundColor: '#126E36',
        justifyContent: 'center', 
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingHorizontal: 20,
    },
    textCategoryName: {
        fontSize: 19,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        color: ColorCustom.BROWN,
        width: '50%',
    },
    textArrive: {
        color: 'white',
        fontSize: 22,
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    rowRate: {
        marginTop:5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    greenCircle: {
        height: 15,
        width: 15,
        borderRadius: 7.5,
        backgroundColor: ColorCustom.MOUNTAIN_MEADOW,
        marginRight: 5
    },
    yellowCircle: {
        height: 15,
        width: 15,
        borderRadius: 7.5,
        backgroundColor: ColorCustom.SUNGLOW,
        marginRight: 5
    },
    orangeCircle: {
        height: 15,
        width: 15,
        borderRadius: 7.5,
        backgroundColor: ColorCustom.ORANGE,
        marginRight: 5
    },
    redCircle: {
        height: 15,
        width: 15,
        borderRadius: 7.5,
        backgroundColor: ColorCustom.TORCH_RED,
        marginRight: 5
    },
    dialogContainer: {
        height: myHeight,
        width: myWidth,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dialogContent: {
        backgroundColor: ColorCustom.SWISSCOFFEE,
        width: myWidth * 0.8,
        height: 300,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTitleDialog: {
        fontSize: 20,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        color: ColorCustom.BROWN
    },
    viewCondition: {
        width: '100%',
        borderColor: ColorCustom.GRAY,
    },
    viewScrollView: {
        borderRadius: 3,
        borderWidth: 0.5,
        width: '90%',
        height: 250,
        borderColor: ColorCustom.GRAY,
        alignSelf: 'center'
    },
    scrollViewDialog: {
        width: '100%',
        paddingHorizontal: 10
    },
    textConditionContent :{
        fontFamily: ConstantString.FONT_LIGHT,
        fontSize: 19,
        paddingHorizontal: 8,
        paddingVertical: 5
    },
    textQuestionDialog: {
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 17,
        textAlign: 'justify',
        color: ColorCustom.BLUE_PAYMENT
    },
    okTextConditionStyle: { 
        fontSize: 18, 
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        color: ColorCustom.GREEN
    },
    rowCheckBox: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    titleCardDialog: {
        fontSize: 16,
        textAlign: "center",
        color: ColorCustom.BROWN,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    Card: {
        width: '90%',
    },
    cardDialog: {
        flexDirection: 'column',
    },
    headerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: ColorCustom.GREEN,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    bodyCard: {
        flexDirection: 'row',
        padding: 10
    },
    textProductNameCard: {
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 18,
        color: ColorCustom.BROWN
    },
    textAddressCard: {
        color: ColorCustom.GREEN,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 16,
        marginTop: 5
    },
    textDistanceCard: {
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 17,
        color: ColorCustom.WHITE
    },
    rowPesticideCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    imageDialog: {
        height: 100,
        width: '100%'
    },
    imageBodyCard: {
        width: 20,
        height: 20
    },
    colRightBodyCard: {
        width: "60%",
        paddingLeft: 10
    },
    colLeftBodyCard: {
        flexDirection: 'column',
        width: '40%',
    },
    textDescriptionCard: {
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 17
    },
    textPriceCard: {
        color: ColorCustom.GREEN,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 16,
    },
    contentStyle: {
        width: '90%',
        padding: 0,
        borderRadius: 15,
        alignItems: 'center'
    },
    contentStyleCondition: {
        width: '90%',
        padding: 0,
        alignItems: 'center',
        borderRadius: 15
    },
    rowButton: {
        height: 50, 
        width: "100%", 
        flexDirection: 'row', 
        borderTopColor: 'black', 
        borderTopWidth: 0.5,
    },
    rowButtonCard: {
        marginTop: 20,
        height: 50, 
        width: "100%", 
        flexDirection: 'row', 
        borderTopColor: ColorCustom.GRAY,
        borderTopWidth: 0.5
    },
    btnCancel: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: 'center', 
        borderRightWidth: 0.5, 
        borderRightColor: 'gray'
    },
    btnOK: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: 'center', 
        borderLeftColor: "gray",
        borderLeftWidth: 0.5
    },
    textCancel: {
        fontSize: 18, 
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0, 
        color: ColorCustom.BROWN
    },
    viewDetail: {
        justifyContent: 'center',
    },
    rowTitle: {
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 19,
        marginTop: 10,
        color: ColorCustom.BROWN
    },
    textColRight: {
        color: ColorCustom.BLACK,
        fontSize: 17,
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    viewDescription: {
        flexDirection: 'column',
    },
    itemValueStyle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginHorizontal: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 7
    },
    textValueEvaluationStyle: {
        marginHorizontal: 5
    },
    rowEvaluationItemStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    nameRowEvaluationTextStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: ColorCustom.FERN_GREEN,
    },
    rowContentStyle: {
        flex: 4,
        flexDirection: 'row',
        paddingRight: 10,
        alignItems: 'center'
    },
    fullImage: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
    btnBackFullImage: {
        flexDirection: 'row',
        zIndex: 1,
    },
    textProfessional: {
        color: ColorCustom.GRAY,
        fontFamily: ConstantString.FONT_ITALIC,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 19
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowEvaluation: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10
    },
    textRate: {
        color: ColorCustom.RED,
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 20,
        fontWeight: 'bold'
    },
    imageFlower: {
        resizeMode: 'contain',
        height: 35,
        width: 35,
        marginLeft: 5
    },
    textFooter: {
        color: ColorCustom.GRAY,
        fontFamily: ConstantString.FONT_ITALIC,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 17,
        marginTop: 20
    }
})