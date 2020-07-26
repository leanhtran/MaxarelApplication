import React from 'react'
import { 
  View, 
  Text, 
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native'
import { ConstantString } from '../../../utils/constant-string'
import { ColorCustom } from '../../../utils/color';
import { Images } from '../../../utils/images';
import Popup from '../../base_components/AlertCustom';
import { myWidth } from '../../../utils/dimension';
import PopupLoading from '../../../screens/popupLoading';
import Dialog from 'react-native-dialog';

function NotifyEvaluationComponent(props) {
  const {
    accueilEvaluation,
    quantityEvaluation,
    priceEvaluation,
    setAccueilEvaluation,
    setQuantityEvaluation,
    setPriceEvaluation,
    onSend,
    goBack,
    customPopup,
    visibleDialog,
    callMaxarel,
    visibleModalCall,
    cancelDialogCall,
    submitDialogCall
  } = props


  const _onPressOrderOne = (index) => {
    setAccueilEvaluation(index)
  }

  const _renderStyleOrderOne = (index, color) => {
    if(index === accueilEvaluation) {
      return [styles.itemSelectValueStyle, {backgroundColor: color}]
    }
    else return [styles.itemValueStyle, {borderColor: color}]
  }

  const _onPressOrderTwo = (index) => {
    setQuantityEvaluation(index)
  }

  const _renderStyleOrderTwo = (index, color) => {
    if(index === quantityEvaluation) {
      return [styles.itemSelectValueStyle, {backgroundColor: color}]
    }
    else return [styles.itemValueStyle, {borderColor: color}]
  }

  const _onPressOrderThree = (index) => {
    setPriceEvaluation(index)
  }

  const _renderStyleOrderThree = (index, color) => {
    if(index === priceEvaluation) {
      return [styles.itemSelectValueStyle, {backgroundColor: color}]
    }
    else return [styles.itemValueStyle, {borderColor: color}]
  }

  const _renderModalCallMaxarel = () => {
    return (
        <Dialog.Container 
                visible={visibleModalCall}
                contentStyle={styles.contentStyle}
            >
            <Dialog.Title style={styles.titleCardDialog}>Contacter Maxarel</Dialog.Title>
            <View style={styles.bodyCard}>
              <Text style={styles.textBody}>
                Voulez-vous appeler Maxarel ?
              </Text>
            </View>

            <View style={styles.rowButtonCard}>
                <TouchableOpacity
                  style={styles.btnCancel}
                  onPress={cancelDialogCall}
                  >
                  <Text style={styles.textCancel}>
                      {ConstantString.STR_CANCEL}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnOK}
                    onPress={submitDialogCall}
                >
                    <Text style={styles.okTextConditionStyle}>
                        {ConstantString.STR_OK}
                    </Text>
                </TouchableOpacity>
            </View>
        </Dialog.Container>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.cardView}>
                      <View style={styles.containerCard}>
                        <View style={styles.rowAccueil}>
                          <View style={styles.colLeftCard}>
                            <Text style={styles.textPrice}>
                              {ConstantString.STR_ACCUEIL}			
                            </Text>
                          </View>

                          <View style={styles.colRightCard}>
                            <View style={styles.rowEvaluation}>
                              <TouchableOpacity onPress={() => _onPressOrderOne(1)} style={_renderStyleOrderOne(1,ColorCustom.MOUNTAIN_MEADOW)}>
                                
                              </TouchableOpacity>

                              <TouchableOpacity onPress={() => _onPressOrderOne(2)} style={_renderStyleOrderOne(2,ColorCustom.SUNGLOW)}>
                                
                              </TouchableOpacity>

                              <TouchableOpacity onPress={() => _onPressOrderOne(3)} style={_renderStyleOrderOne(3,ColorCustom.ORANGE)}>
                                
                              </TouchableOpacity>

                              <TouchableOpacity onPress={() => _onPressOrderOne(4)} style={_renderStyleOrderOne(4,ColorCustom.TORCH_RED)}>
                                
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>

                        <View style={styles.rowAccueil}>
                          <View style={styles.colLeftCard}>
                            <Text style={styles.textPrice}>
                              {ConstantString.STR_QUANTITY}			
                            </Text>
                          </View>

                          <View style={styles.colRightCard}>
                            <View style={styles.rowEvaluation}>
                              <TouchableOpacity onPress={() => _onPressOrderTwo(5)} style={_renderStyleOrderTwo(5,ColorCustom.MOUNTAIN_MEADOW)}>
                                
                              </TouchableOpacity>

                              <TouchableOpacity onPress={() => _onPressOrderTwo(6)} style={_renderStyleOrderTwo(6,ColorCustom.SUNGLOW)}>
                                
                              </TouchableOpacity>

                              <TouchableOpacity onPress={() => _onPressOrderTwo(7)} style={_renderStyleOrderTwo(7,ColorCustom.ORANGE)}>
                                
                              </TouchableOpacity>

                              <TouchableOpacity onPress={() => _onPressOrderTwo(8)} style={_renderStyleOrderTwo(8,ColorCustom.TORCH_RED)}>
                                
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>

                        <View style={styles.rowAccueil}>
                          <View style={styles.colLeftCard}>
                            <Text style={styles.textPrice}>
                              {ConstantString.STR_PRICE}			
                            </Text>
                          </View>

                          <View style={styles.colRightCard}>
                            <View style={styles.rowEvaluation}>
                              <TouchableOpacity onPress={() => _onPressOrderThree(9)} style={_renderStyleOrderThree(9,ColorCustom.MOUNTAIN_MEADOW)}>
                                
                              </TouchableOpacity>

                              <TouchableOpacity onPress={() => _onPressOrderThree(10)} style={_renderStyleOrderThree(10,ColorCustom.SUNGLOW)}>
                                
                              </TouchableOpacity>

                              <TouchableOpacity onPress={() => _onPressOrderThree(11)} style={_renderStyleOrderThree(11,ColorCustom.ORANGE)}>
                                
                              </TouchableOpacity>

                              <TouchableOpacity onPress={() => _onPressOrderThree(12)} style={_renderStyleOrderThree(12,ColorCustom.TORCH_RED)}>

                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View>
                        <TouchableOpacity onPress={onSend} style={styles.btnSend}>
                          <Text style={styles.textSend}>
                            {ConstantString.STR_SEND}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={callMaxarel} style={styles.btnCallMaxarel}>
                          <Text style={{fontFamily: ConstantString.FONT_REGULAR, marginTop: Platform.OS === 'ios' ? 5 : 0, fontSize: 15, textAlign: 'center', color: ColorCustom.GREEN}}>
                            Signaler un abus
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    
                    <View style={styles.titleHeader}>
                      <View style={styles.rowTitle}>
                        <TouchableOpacity onPress={goBack} style={styles.btnBack}>
                            <Image style={styles.imageBack} source={Images.blackBack}/>
                        </TouchableOpacity>

                        <Text style={styles.textTitle}>
                          {ConstantString.STR_TITLE_EVALUATION}	
                        </Text>	
                      </View>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        
                    </View>
                </View>
                <View style={styles.viewImage}>
                    <Image source={Images.come} style={styles.image}/>

                    <View style={{flexDirection: 'row', height: 50}}>
                      <Text style={styles.textMaxarel}>M</Text>

                      <Text style={styles.textMaxarel}>A</Text>

                      <Text style={styles.textMaxarel}>X</Text>

                      <Text style={styles.textMaxarel}>A</Text>

                      <Text style={styles.textMaxarel}>R</Text>

                      <Text style={styles.textMaxarel}>E</Text>
                      
                      <Text style={styles.textMaxarel}>L</Text>
                    </View>
                </View>
            </View>

            {_renderModalCallMaxarel()}
            <PopupLoading visible={visibleDialog} />
            <Popup ref={customPopup} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  safeArea: {
      flex: 1,
  },
  container: {
      flex: 1
  },
  header: {
      flex: 3,
  },
  titleHeader: {
      flex: 2, 
      backgroundColor: ColorCustom.LIGHT_PINK, 
      borderBottomLeftRadius: 20, 
      borderBottomRightRadius: 20,
      paddingTop: 15,
  },
  textTitle: {
      fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
      color: ColorCustom.BROWN,
      fontSize: 20,
      textAlign: 'center',
      width: myWidth - 60
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
  textPrice: {
      fontFamily: ConstantString.FONT_BOLD,
      marginTop: Platform.OS === 'ios' ? 5 : 0,
      fontSize: 18,
      color: ColorCustom.GREEN,
  },
  viewImage: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  cardView: {
      position: 'absolute', 
      bottom: 0, 
      width: myWidth * 0.85, 
      marginBottom: 10,
      alignSelf: 'center',
      flexDirection: 'column',
      zIndex: 1,
      justifyContent: 'center',
      paddingBottom: 10,
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
  btnSubmit: {
      height: 44,
      width: '40%',
      borderRadius: 22,
      borderWidth: 1,
      borderColor: ColorCustom.GREEN,
      alignItems: 'center',
      justifyContent: 'center',
  },
  textSubmit: {
      color: ColorCustom.GREEN,
      fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
      fontSize: 20
  },
  colLeftCard: {
    flex: 1,
    marginLeft: 20,
  },
  colRightCard: {
    flex: 2,
    marginRight: 20,
    alignItems: 'flex-end'
  },
  rowEvaluation: {
    flexDirection: 'row'
  },
  itemValueStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3
  },
  itemSelectValueStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowAccueil: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center'
  },
  containerCard: {
    justifyContent: 'center',
    flex: 1,
    marginVertical: 15
  },
  btnSend: {
    width: '90%',
    height: 44,
    backgroundColor: ColorCustom.GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 22,
  },
  textSend: {
    fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    fontSize: 20,
    color: ColorCustom.WHITE
  },
  rowTitle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textMaxarel: {
    flex: 1,
    textAlign: 'center', 
    color: ColorCustom.GREEN, 
    fontFamily: ConstantString.FONT_BOLD,
    marginTop: Platform.OS === 'ios' ? 5 : 0, 
    fontSize: 20
  },
  btnCallMaxarel: {
    borderWidth: 1,
    borderColor: ColorCustom.GREEN,
    borderRadius: 30,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5
  },
  contentStyle: {
    width: '85%',
    padding: 0,
    borderRadius: 15,
    alignItems: 'center'
  },
  titleCardDialog: {
    fontSize: 16,
    textAlign: "center",
    color: ColorCustom.BROWN,
    fontFamily: ConstantString.FONT_BOLD,
    marginTop: Platform.OS === 'ios' ? 5 : 0,
  },
  bodyCard: {
      flexDirection: 'row',
      padding: 10
  },
  rowButtonCard: {
      marginTop: 20,
      height: 50, 
      width: "100%", 
      flexDirection: 'row', 
      borderTopColor: ColorCustom.GRAY,
      borderTopWidth: 0.5
  },
  btnOK: {
      flex: 1, 
      justifyContent: "center", 
      alignItems: 'center', 
      borderLeftColor: "gray",
      borderLeftWidth: 0.5
  },
  textBody :{
    fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    fontSize: 16,
    textAlign: 'center'
  },
  okTextConditionStyle: { 
    fontSize: 18, 
    fontFamily: ConstantString.FONT_BOLD,
    marginTop: Platform.OS === 'ios' ? 5 : 0,
    color: ColorCustom.GREEN
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
  }
})

export default NotifyEvaluationComponent
