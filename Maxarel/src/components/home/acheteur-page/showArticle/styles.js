import {StyleSheet, Platform} from 'react-native'
import { ColorCustom } from '../../../../utils/color'
import {myWidth, myHeight} from '../../../../utils/dimension'
import { ConstantString } from '../../../../utils/constant-string'

export const styles=StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: ColorCustom.WHITE
    },
    container :{
        flexDirection: 'column',
        flex: 1
    },
    header: {
        flexDirection: 'column',
        backgroundColor: ColorCustom.WHITE,
        zIndex: -1
    },
    titleHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingLeft: 10,
    },
    textTitle: {
        width: '100%',
        textAlign: 'center',
        padding: 5, 
        fontSize: 20, 
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    belowHeader: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    colLeftHeader: {
        marginLeft: 20,
        width: '40%'
    },
    imageBack :{
        height: 22,
        width: 22,
    },
    btnBack: {
        zIndex: 1,
        position: 'absolute',
        width: 30,
        height: 30,
        left: 10,
        justifyContent: 'center'
    },
    btnCall: {
        zIndex: 1,
        position: 'absolute',
        width: 30,
        height: 30,
        right: 10,
        justifyContent: 'center'
    },
    colRightHeader: {
        width: '45%',
        marginRight: 20,
        marginTop: 67,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
    },
    listContainerStyle: {
        marginLeft: Platform.OS === 'ios' ? 0 : -10, 
        marginRight: Platform.OS === 'ios' ? 0 : 10,
    },
    inputContainerStyle: {
        paddingLeft: 30,
        borderWidth: 1,
        paddingRight: 10
    },
    imageSearchInput: {
        height: 18, 
        width: 18, 
        position: 'absolute', 
        zIndex: 2,
        left: 10,
        top: 11
    },
    imageSearchList: {
        height: 15, 
        width: 15, 
        position: 'absolute', 
        left: 8,
        top: Platform.OS === 'ios' ? 5 : 8,
        zIndex: 2, 
    },
    btnAutoComplete: {
        paddingLeft: 15,
        height: 30,
        justifyContent: 'center',
        backgroundColor: ColorCustom.WHITE,
    },
    listStyle: {
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: 180
    },
    textAutoComplete: {
        fontSize: 14,
        paddingLeft: 15,
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    body: {
        flexDirection: 'column',
        backgroundColor: ColorCustom.LIGHT_GRAY,
        alignItems: 'center',
        zIndex: -1,
        borderTopWidth: 0.5,
        borderColor: "#CCCCCC",
        flex: 1
    },
    viewShadow: {
        width: (myWidth * 100/100),
        alignItems: 'center',
        marginBottom: 20
    },
    flatListItem: {
        width: (myWidth * 90/100),
        maxWidth: 600,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    
    textRangeHeaderFlatList: {
        fontSize: 19,
        color: ColorCustom.WHITE,
        textAlign: 'center',
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    textNameHeaderFlatList: {
        fontSize: 20,
        color: ColorCustom.WHITE,
        width: '70%',
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    textBodyFlatList: {
        fontSize: 14,
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        textAlign: 'center'
    },
    textPrice: {
        fontSize: 20,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        color: ColorCustom.GREEN
    },
    headerFlatList: {
        width: '100%',
        borderWidth: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor:ColorCustom.BROWN,
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    bodyFlatList: {
        flexDirection: "row",
        justifyContent: "center",
        width: '100%',
    },
    colLeftFlatList: {
        width: "50%",
        flexDirection: 'column',
        borderBottomLeftRadius: 15,
    },
    headerImage: {
        width: "100%",
        flexDirection: 'row',
        paddingLeft: 10,
    },
    imageFlatList: {
        height: 130,
        width: '100%',
    },
    detailsImage: {
        width: '100%',
        padding: 15,
        paddingTop: 10,
        alignItems: 'center'
    },
    colRightFlatList: {
        width: "50%",
        flexDirection: 'column',
        paddingHorizontal: 15,
        paddingVertical: 7,
        alignItems: 'center'
    },
    noDataPage: {
        flex: 1,
        justifyContent: 'center',
        position: 'relative',
        zIndex: -1,
        backgroundColor: ColorCustom.LIGHT_GRAY,
        alignItems: 'center'
    },
    imageEmpty: {
        height: 100,
        width: 100
    },
    textNoData: {
        fontSize: 19,
        color: "#A9A9A9",
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    scrollView: {
        height: "100%",
        width: '100%',
        
    },
    rowCertificate : {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    imageCertify: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },
    iconLoadMore: {
        alignItems: 'center',
    },
    flatList: {

    },
    textEndTime: {
        fontSize: 15, 
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    rowEvaluation: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowRate: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    textRate: {
        color: ColorCustom.RED,
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 16,
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
    textCategory: {
        fontSize: 18,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        color: ColorCustom.BROWN,
        textAlign: 'center'
    },
    footerColRightFlatList: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    textProfessional: {
        color: ColorCustom.GRAY,
        fontFamily: ConstantString.FONT_ITALIC,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 17,
    },
    imageFlower: {
        resizeMode: 'contain',
        height: 30,
        width: 30,
        marginLeft: 5
    },
    btnDate: {
        flex: 1,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'gray',
        borderRadius: 3,
        borderWidth: 0.5,
        marginHorizontal: 20,
        marginBottom: 8
    },
    contentStyle: {
        width: '75%',
        padding: 0,
        borderRadius: 15,
        alignItems: 'center'
    },
    titleCardDialog: {
        fontSize: 18,
        textAlign: "center",
        color: ColorCustom.BROWN,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
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
    okTextConditionStyle: { 
        fontSize: 18, 
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        color: ColorCustom.GREEN
    },
    btnBackModal: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignSelf: 'center',
        paddingLeft: 10,
    },
    btnSubmit: {
        alignSelf: 'center',
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    textSubmit: {
        color: ColorCustom.BROWN,
        fontSize: 17,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    btnSearchLocation :{
        borderWidth: 0.5, 
        flex: 1, 
        marginHorizontal: 20, 
        marginBottom: 8, 
        height: 40,
        justifyContent: 'center',
    },
    textSearchLocation :{
        paddingLeft: 35,
    }
})