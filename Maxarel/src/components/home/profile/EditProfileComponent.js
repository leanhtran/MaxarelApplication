import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, Platform } from 'react-native'
import Modal from 'react-native-modal'
import { TextField } from 'react-native-material-textfield'
import { ConstantString } from '../../../utils/constant-string'
import { ColorCustom } from '../../../utils/color'
import { Images } from '../../../utils/images'
import { SafeAreaView } from 'react-native'
import Dialog from "react-native-dialog";
import { styles } from './stylesEditProfile'
import Popup from '../../base_components/AlertCustom'
import PopupLoading from '../../../screens/popupLoading'



function EditProfileComponent(props) {
    const { 
        onSubmit,
        goBack,
        isLoading,
        profile,
        setProfile,
        customPopup,
        isDisable,
        getLocation,
    } = props
    
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <View style={styles.rowHeader}>
                        <TouchableOpacity onPress={goBack} style={styles.btnBack}>
                            <Image style={styles.imageBack} source={Images.blackBack}/>
                        </TouchableOpacity>
                        <Text style={styles.txtHeader}>{ConstantString.STR_EDIT_PROFILE}</Text>
                    </View>
                        
                    <View style={styles.textField}>
                        <TextField
                            value={profile.fullName}
                            contentInset={styles.textField}
                            onChangeText={text => {setProfile({...profile, fullName: text})}}
                            label={ConstantString.STR_PLACE_HOLDER_NAME}
                            labelTextStyle={{fontFamily: ConstantString.FONT_REGULAR, marginTop: Platform.OS === 'ios' ? 5 : 0,}}
                        />
                    </View>

                    <View style={styles.textField}>
                        <TextField
                            value={profile.phone}
                            keyboardType='numeric'
                            contentInset={styles.textField}
                            onChangeText={text => {setProfile({...profile, phone: text})}}
                            label={ConstantString.STR_PHONE_NUMBER}
                            labelTextStyle={{fontFamily: ConstantString.FONT_REGULAR, marginTop: Platform.OS === 'ios' ? 5 : 0,}}
                        />
                    </View>

                    <TouchableOpacity onPress={getLocation} disabled={isDisable} style={styles.btnLocation} elevation={10}>
                        <Image style={styles.imageLocation} source={Images.location}/>
                        <View style={styles.colAddress}>
                            <Text style={styles.textAddress}>{ConstantString.STR_ADDRESS}</Text>
                            <Text style={styles.descriptionAddress}>{profile.postalAddress}</Text>
                        </View>
                        <Image style={styles.imagePrev} source={Images.blackPrev}/>
                    </TouchableOpacity>
                                    
                    <TouchableOpacity style={styles.btnInscription} onPress={onSubmit}>
                        <Text style={styles.txtInscription}>{ConstantString.STR_SAVE_PROFILE}</Text>
                    </TouchableOpacity>

                    <PopupLoading visible={isLoading} />
                    <Popup ref={customPopup} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EditProfileComponent
