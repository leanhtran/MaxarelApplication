import { StyleSheet, Platform } from "react-native";
import { ColorCustom } from "../../../utils/color";
import { ConstantString } from "../../../utils/constant-string";
import { myHeight, myWidth } from "../../../utils/dimension";

export const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1
  },
  containerForm: {
    flex: 1,
    marginHorizontal: 20
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 15,
    justifyContent: 'center'
  },
  imageBack: {
    height: 22,
    width: 14,
  },
  btnBack: {
    height: 30,
    position: 'absolute',
    justifyContent: 'center',
    left: 20,
    paddingHorizontal: 10,
    backgroundColor: ColorCustom.GREEN,
    borderRadius: 6
  },
  textBtnBack: {
    color: ColorCustom.WHITE,
    fontFamily: ConstantString.FONT_REGULAR,
    marginTop: Platform.OS === 'ios' ? 5 : 0,
  },
  titleContainer: {
  },
  titleTextStyle: {
    color: ColorCustom.BROWN,
    fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    fontSize: 20
  },
  dropDownListCategory: {
    width: '100%',
    backgroundColor: ColorCustom.WHITE,
    marginTop: 20,
    alignSelf: 'center',
  },
  textInputStyle: {
    height: 45,
    width: '100%',
    borderColor: ColorCustom.GRAY,
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
    paddingHorizontal: 8
  },
  imageProductContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  },
  cameraIconStyle: {
    width: 40,
    height: 40,
    backgroundColor: ColorCustom.GRAY,
    borderRadius: 20,
    position: 'absolute',
    top: 0, right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  productStyle: {
    width: '100%',
    height: "100%",
    backgroundColor: '#44556d'
  },
  productAutoCompleteStyle: {
    borderRadius: 5,
    fontSize: 16,
    paddingLeft: 8,
    height: 45,
    color: ColorCustom.BLACK
  },
  quantityContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  certificateContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
  },
  priceContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityInputStyle: {
    height: 45,
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    paddingHorizontal: 8,
    color: ColorCustom.BLACK
  },
  untilInputStyle: {
    flex: 1,
    justifyContent: 'center',
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
  },
  certificateDropdownStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  imageArrowDropDownCertificate: {
    position: 'absolute',
    width: 10,
    height: 10,
    right: 10
  },
  textLabelStyle: {
    fontSize: 16,
    paddingLeft: 5,
    fontWeight: 'bold'
  },
  rawItemCardStyle: {
    width: '100%',
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50
  },
  priceSuggestContainer: {
    flex: 4,
    height: 60,
    borderColor: ColorCustom.GREEN,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  priceStyle: {
    flex: 0.7,
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: ColorCustom.GRAY,
    marginRight: 10,
    paddingHorizontal: 8,
    color: ColorCustom.BLACK
  },
  priceSuggestTitleStyle: {
    color: ColorCustom.GREEN,
    fontWeight: 'bold',
    fontSize: 15,
    position: 'absolute',
    top: 2
  },
  priceSuggestTextStyle: {
    color: ColorCustom.RED,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15
  },
  rawPaymentMethodContainer: {
    width: '100%',
    marginVertical: 5,
    alignItems: 'center',
  },
  titlePaymentStyle: {
    fontWeight: 'bold',
    color: ColorCustom.GREEN,
    fontSize: 16,
  },
  paymentActionContainer: {
    height: 56,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: -10
  },
  checkboxStyle: {
    flex: 1,
    backgroundColor: ColorCustom.WHITE,
    width: "100%",
  },
  createDateContainer: {
    width: '100%',
    flexDirection: 'column',
    marginVertical: 5,
    paddingBottom: 15,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  btnDate: {
    marginTop: 5,
    width: '98%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 5
  },
  createButtonStyle: {
    width: "100%",
    height: 60,
    marginVertical: 10,
    backgroundColor: ColorCustom.GREEN,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  createTextButtonStyle: {
    color: 'white',
    fontSize: 22,
    alignSelf: 'center',
    fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
  },
  categoriesDropDownStyle: {
    height: 45,
    paddingLeft: 5,
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5
  },
  untilTypePriceStyle: {
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    justifyContent: 'center',
    width: '100%'
  },
  loaddingStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: ColorCustom.BLACK,
    opacity: 0.5,
  },
  loaddingViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(00, 00, 00, 0)'
  },
  modalStyle: {
    width: myWidth * 0.8,
    height: 220,
    backgroundColor: ColorCustom.WHITE,
    alignSelf: 'center',
    paddingLeft: 15,
    paddingTop: 10,
    borderRadius: 10
  },
  textTitleModal: {
    fontSize: 17,
    color: ColorCustom.COPPERCANYON,
    marginBottom: 15,
    fontWeight: 'bold'
  },
  textModal: {
    fontSize: 15,
    color: ColorCustom.DARK_GREEN,
  },
  textViewModal: {
    marginRight: 30,
    borderBottomWidth: 1,
    borderBottomColor: ColorCustom.GRAY,
    marginVertical: 10,
  },
  cancelViewStyle: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: '900',
    color: ColorCustom.AZURERADIANCE
  },
  viewCanelModal: {
    position: 'absolute',
    right: 30,
    bottom: 20,
  },
  descriptionInputStyle: {
    height: 100,
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 8,
    color: ColorCustom.BLACK,
    textAlignVertical: 'top'
  },
  cameraImageStyle: {
    width: 22,
    height: 22,
    resizeMode: 'stretch'
  },
  productAutoCompleteListStyle: {
    zIndex: 1,
    marginLeft: 0,
    position: 'absolute',
    width: myWidth - 40,
    maxHeight: myHeight * 0.5,
    paddingHorizontal: 8,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  createDateTitleStyle: {
    fontSize: 20,
    fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    flexWrap: 'wrap',
    marginBottom: 5,
    paddingLeft: 8,
    textAlign: 'center',
    borderColor: ColorCustom.LIGHT_GRAY_1,
    paddingVertical: 5,
    width: '100%'
  },
  contentStyleCondition: {
    width: '90%',
    padding: 0,
    alignItems: 'center',
    borderRadius: 15
  },
  contentDialogSuccess: {
    width: '80%',
    padding: 0,
    alignItems: 'center',
    borderRadius: 15
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
  textConditionContent: {
    fontFamily: ConstantString.FONT_LIGHT,
    fontSize: 17,
    paddingHorizontal: 8,
    paddingVertical: 5
  },
  textContentSuccess: {
    fontFamily: ConstantString.FONT_LIGHT,
    fontSize: 17,
    textAlign: 'center',
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
  rowCheckBox: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  rowBtn: {
    height: 50, 
    width: "100%", 
    flexDirection: 'row', 
    borderTopColor: 'black', 
    borderTopWidth: 0.5,
  },
  btnCancel: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: 'center', 
    borderRightWidth: 0.5, 
    borderRightColor: 'gray'
  },
  textCancel: {
    fontSize: 18, 
    fontFamily: ConstantString.FONT_BOLD, 
    marginTop: Platform.OS === 'ios' ? 5 : 0, 
    color: ColorCustom.BROWN
  },
  btnOk: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: 'center', 
    borderLeftColor: "gray", 
    borderLeftWidth: 0.5
  },
  titleCardDialog: {
    fontSize: 16,
    textAlign: "center",
    color: ColorCustom.BROWN,
    fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
  },
  okTextConditionStyle: { 
    fontSize: 18, 
    fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    color: ColorCustom.GREEN
  },
  titleCalendar: {
    textAlign: 'center', 
    fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0, 
    fontSize: 17,
    paddingVertical: 5,
  },
  btnTime: {
    marginTop: 5,
    flex: 1,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 5
  },
  viewBtnDay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnRowDay: {
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnSelectedRowDay: {
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: ColorCustom.GREEN,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textRowDay: {
    fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    fontSize: 16
  },
  textSelectedRowDay: {
    fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    fontSize: 16,
    color: ColorCustom.WHITE
  },
  certificate: {
    height: 30,
    width: 30,
    marginRight: 10,
    resizeMode: 'contain'
  },
  btnCertificate: {
    height: 44, 
    width: myWidth - 40, 
    paddingLeft: 10, 
    flexDirection: 'row',
    alignItems: 'center'
  },
  textEuro: {
    fontSize: 19
  },
  textSmaller5Hours: {
    fontFamily: ConstantString.FONT_ITALIC,
    marginTop: Platform.OS === 'ios' ? 5 : 0,
    textAlign: 'right',
    color: ColorCustom.GRAY,
    width: '100%',
    paddingRight: 10
  },
  btnProductName: {
    width: '100%', 
    height: 40, 
    justifyContent: 'center', 
    paddingLeft: 10, 
    borderBottomWidth: 0.5
  },
  flatListDatePicker: {
    flex: 1,
    width: '100%'
  },
  textDayDatePicker: {
    color: ColorCustom.GREEN, 
    fontSize: 20, 
    height: 45, 
    lineHeight: 45, 
    // borderWidth: 1, 
    borderRadius: 5, 
    borderColor: ColorCustom.GRAY, 
    marginTop: 5, 
    textAlign: 'center',
    fontFamily: ConstantString.FONT_BOLD,
    marginTop: Platform.OS === 'ios' ? 5 : 0,
  },
  rowBtnDay: {
    width: '100%',
    height: 50, 
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center', 
    borderBottomWidth: 1,
    borderColor: ColorCustom.LIGHT_GRAY_1,
    paddingBottom: 5
  },
  inputSearchDropdown: {
    borderBottomWidth: 0.5,
    borderRadius: 5,
    borderColor: ColorCustom.DARK_GRAY,
    paddingLeft: 30,
    width: '100%',
    paddingVertical: 12
  },
  imageEmpty: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  textPleaseSearch: {
    color: ColorCustom.BLUE,
    fontSize: 15,
  },
  modalContainer: {
    width: '90%', 
    backgroundColor: 'white', 
    shadowColor: "#000", 
    borderRadius: 5, 
    marginTop: 100,
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rowModalDropdown: {
    flexDirection: 'row'
  }
})