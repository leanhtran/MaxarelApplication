import { 
    StyleSheet, 
    } from 'react-native'
import {STATUSBAR_HEIGHT} from '../../../utils/theme'
import { ColorCustom } from '../../../utils/color'
export default StyleSheet.create({
    container: {
        margin: 20
    },
    header: {
        flexDirection: 'row',
        marginTop: STATUSBAR_HEIGHT
    },

    body : {
        flexDirection: 'column',
        marginTop: 30
    },

    btnBack: {
        height: 30,
        width: 70,
        flexDirection: 'row',
        marginLeft: -15
    },
    txtBack: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
    },
    imageBack: {
        height: 25,
        width: 30,
        marginTop: 2
    },
    btnCategories: {
        alignSelf: 'center',
        width: '70%',
        borderRadius: 5,
        borderWidth: 2,
        marginBottom: 20, 
        borderColor: "#D5D5D5"
    },
    btnImage: {
        height: 85,
        width: 110,
        marginBottom: 20,
        marginTop: 10
    }, 
    stImage: {
        width: '100%',
        height: 90
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 20
    },
    btnDropdownUnit: {
        width: '30%',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#D5D5D5",
        height: 51
    },
    btnPickerInRowPrice: {
        width: '47%',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#D5D5D5",
        height: 51
    },
    tfInRow: {
        width: '30%',
    },
    tfInRowPrice: {
        width: '47%',
        height: 50
    },
    btnPublier: {
        height: 60,
        backgroundColor: ColorCustom.GREEN,
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 20
    },
    txtPublier: {
        color: 'white',
        fontSize: 25,
        alignSelf: 'center'
    },
    stTextField: {
        top: -10
    },
    stContainerDropdown: {
        borderColor: '#D2D2D2',
        borderWidth: 2, 
        borderRadius:5,
        height: 50
    },
    stText: {
        fontSize: 18,
    },
    txtHeader: {
        marginLeft: 10,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: "bold"
    },
    colLeftPrice: {
        height: 80,
        width: '50%', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    areaCurrentPrice: {
        width: '40%',
        height: 80,
        borderColor: ColorCustom.GREEN,
        borderWidth: 2, 
        borderRadius:5,
    },
    textAreaCurrentPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: ColorCustom.GREEN,
        alignSelf: 'center'
    },
    rowPayment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 10
    },
    colLeftPayment: {
        width: '25%',
    },
    colRigthPayment: {
        width: '75%',
        flexDirection: 'row',
        justifyContent: "flex-end",
    },
    btnCes: {
        height: 50,
        width: '30%',
        borderWidth: 2,
        borderColor: "#005000",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
    },
    textPayment: {
        fontSize: 17,
        fontWeight: "bold",
        textAlign: 'center',
    },
    btnCB: {
        height: 50,
        width: '30%',
        borderWidth: 2,
        borderColor: "#005000",
        justifyContent: 'center',
        borderRightWidth: 0,
        borderLeftWidth: 0,
    },
    btnMoney: {
        height: 50,
        width: '30%',
        borderWidth: 2,
        borderColor: "#005000",
        justifyContent: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    btnDate: {
        maxWidth: 200,
        marginTop: 5, 
        marginBottom: 20, 
        width: '100%'
    },
    rowDebutDate: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    colLeftDebutDate: {
        width: '50%',
        maxWidth: 200
    },
    colRightDebutDate: {
        width: '50%',
        flexDirection: 'column',
        maxWidth: 300
    },
    rowBelowDebutDate: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    txtDebutDate: {
        alignSelf: 'center',
        marginRight: 50,
        fontSize: 17
    },
    pickerDebutDate: {
        width: '48%',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#D5D5D5",
        height: 51
    },
    txtFin: {
        fontSize: 17,
        alignSelf: 'center'
    }

    ,
    dropDownListCategory : {
        width: '100%',
        backgroundColor: 'white',
        marginTop: 20,
        alignSelf: 'center',
    },

    btnBack: {
        height: 30,
        width: 70,
        flexDirection: 'row',
        marginLeft: -15
    },
})
