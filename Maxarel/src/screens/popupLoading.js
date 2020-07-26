import React from 'react'
import { MaterialIndicator,UIActivityIndicator } from 'react-native-indicators';
import { ColorCustom } from '../utils/color';
import {
  View
} from "react-native";
import Modal from 'react-native-modal'

import Dialog from 'react-native-dialog';

function PopupLoading(props) {
  const { 
    visible,
    popupColor
  } = props
  return (
    <Modal
      style={{margin: 0}}
      transparent={true}
      visible={visible}
    >
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(00, 00, 00, 0.3)'}} >
        <View style={{width: 85, height: 85, backgroundColor: popupColor ? popupColor : ColorCustom.LIGHT_GRAY, borderRadius: 5}}>
          <UIActivityIndicator color={ColorCustom.GREEN} />
        </View>
        
      </View>
    </Modal>
  )
}

export default PopupLoading
