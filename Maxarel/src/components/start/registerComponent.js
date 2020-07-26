import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, Platform } from 'react-native'
import Modal from 'react-native-modal'
import Popup from '../base_components/AlertCustom'
import { TextField } from 'react-native-material-textfield'
import { ConstantString } from '../../utils/constant-string'
import { ColorCustom } from '../../utils/color'
import { Images } from '../../utils/images'
import { styles } from './stylesRegisterComponent'
import { SafeAreaView } from 'react-native'
import Dialog from "react-native-dialog";
import PopupLoading from '../../screens/popupLoading'
import ToggleSwitch from 'toggle-switch-react-native'


function RegisterComponent(props) {
    const { 
        onLogin,
        btnSetIsProfessionalTrue,
        btnSetIsProfessionalFalse,
        isProfessional,
        setUser,
        user,
        onClickRegister,
        goBack,
        isLoading,
        customPopup,
        setArtisan,
        setFerme,
        setMonastery,
        setAssociation,
        detailProfessional,
        getLocation,
        locationInfo,
        visibleDiadlog,
        setVisibleFalse,
        isDisable,
        setComfirmPassword,
        btnSwitchPrecisions,
    } = props
    

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Dialog.Container visible={visibleDiadlog}>
                        <Dialog.Title>{`Bienvenue sur Maxarel, `} 
                            <Dialog.Title style={{color: ColorCustom.GREEN, fontFamily: ConstantString.FONT_BOLD, marginTop: Platform.OS === 'ios' ? 5 : 0, fontSize: 20}}>
                                {user.fullName + '!'}
                            </Dialog.Title>
                        </Dialog.Title>
                        <Dialog.Description>
                            Inscription réussie. Un email vous a été envoyé pour valider votre compte 
                        </Dialog.Description>
                        <Dialog.Button 
                            color={ColorCustom.GREEN} 
                            bold={true} 
                            label={ConstantString.STR_OK} 
                            onPress={setVisibleFalse}/>
                    </Dialog.Container>
                    <View style={styles.rowHeader}>
                        <TouchableOpacity onPress={goBack} style={styles.btnBack}>
                            <Image style={styles.imageBack} source={Images.blackBack}/>
                        </TouchableOpacity>
                        <Text style={styles.txtHeader}>{ConstantString.STR_TITLE_REGISTER}</Text>
                    </View>
                        
                    <View style={styles.textField}>
                        <TextField 
                            contentInset={styles.textField}
                            onChangeText={text => {setUser({...user,fullName: text})}}
                            label={ConstantString.STR_PLACE_HOLDER_NAME + ' *'}
                            labelTextStyle={{fontFamily: ConstantString.FONT_REGULAR, marginTop: Platform.OS === 'ios' ? 5 : 0,}}
                        />
                    </View>

                    <View style={styles.textField}>
                        <TextField 
                            autoCapitalize='none'
                            contentInset={styles.textField}
                            onChangeText={text => {setUser({...user,email: text})}}
                            label={ConstantString.STR_EMAIL_PLACE_HOLDER + ' *'}
                            labelTextStyle={{fontFamily: ConstantString.FONT_REGULAR, marginTop: Platform.OS === 'ios' ? 5 : 0,}}
                        />
                    </View>
                    
                    <View style={styles.textField}>
                        <TextField 
                            contentInset={styles.textField}
                            keyboardType='numeric'
                            onChangeText={text => {setUser({...user,phone: text})}}
                            label={
                                isProfessional?
                                ConstantString.STR_PHONE_NUMBER + ' *'
                                :
                                ConstantString.STR_PHONE_NUMBER
                            }
                            labelTextStyle={{fontFamily: ConstantString.FONT_REGULAR, marginTop: Platform.OS === 'ios' ? 5 : 0,}}
                        />
                    </View>

                    <View style={styles.textField}>
                        <TextField 
                            contentInset={styles.textField}
                            secureTextEntry = {true}
                            onChangeText={text => {setUser({...user,password: text})}}
                            label={ConstantString.STR_PASSWORD_PLACE_HOLDER + ' *'}
                            labelTextStyle={{fontFamily: ConstantString.FONT_REGULAR, marginTop: Platform.OS === 'ios' ? 5 : 0,}}
                        />
                    </View>

                    <View style={styles.textField}>
                        <TextField
                            secureTextEntry = {true}
                            onChangeText={text => setComfirmPassword(text)}
                            label={ConstantString.STR_CONFIRM_PASSWORD + ' *'}
                            labelTextStyle={{fontFamily: ConstantString.FONT_REGULAR, marginTop: Platform.OS === 'ios' ? 5 : 0,}}
                        />
                    </View>
                    
                    <TouchableOpacity onPress={getLocation} disabled={isDisable} style={styles.btnLocation} elevation={10}>
                        <Image style={styles.imageLocation} source={Images.location}/>
                        <View style={styles.colAddress}>
                            <Text style={styles.textAddress}>{ConstantString.STR_ADDRESS + ' *'}</Text>
                            {locationInfo.locationInfo.address ? 
                            <Text style={[styles.descriptionAddress, {color: ColorCustom.BLACK}]}>{locationInfo.locationInfo.address}</Text>
                            :
                            <Text style={styles.descriptionAddress}>Choisissez un emplacement sur la carte</Text>
                            }
                        </View>
                        <Image style={styles.imagePrev} source={Images.blackPrev}/>
                    </TouchableOpacity>

                    <View style={styles.detailAddressContainer}>
                        <Text style={styles.textQuestionDetailAddress}>
                            {ConstantString.STR_QUESTION_DETAILS_ADDRESS}
                        </Text>

                        <View style={{ flex: 1,alignItems: 'flex-end', paddingRight: 5 }}>
                            <ToggleSwitch
                                isOn={user.isPrecisions}
                                disabled={false}
                                onColor={ColorCustom.TOGGLE_ON}
                                offColor={ColorCustom.RED}
                                onToggle={isOn => btnSwitchPrecisions(isOn)}
                            />
                        </View>
                    </View>

                    {
                        user.isPrecisions ?
                        <TextInput
                            returnKeyType='next'
                            placeholder={ConstantString.STR_DETAILS_ADDRESS}
                            placeholderTextColor={ColorCustom.GRAY}
                            keyboardType="default"
                            multiline={true}
                            style={styles.detailAddressInputStyle}
                            onChangeText={text => setUser({...user, precisions: text})}
                        />
                        : 
                        null
                    }

                    <View style={styles.rowBtn}>
                        <TouchableOpacity 
                            style={[styles.btnParticulier, {backgroundColor: isProfessional ? ColorCustom.WHITE : ColorCustom.GREEN }]}
                            onPress={btnSetIsProfessionalFalse}
                            activeOpacity={1}
                        >
                            <Text 
                                style={[styles.txtParticulier, {color: isProfessional ? ColorCustom.GREEN : ColorCustom.WHITE }]}>
                                {ConstantString.STR_PARTIULIER}
                            </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            style={[styles.btnProfessional, {backgroundColor: isProfessional ?  ColorCustom.GREEN : ColorCustom.WHITE}]}
                            onPress={btnSetIsProfessionalTrue}
                            activeOpacity={1}
                        >
                            <Text 
                                style={[styles.txtProfessional, {color: isProfessional ? ColorCustom.WHITE : ColorCustom.GREEN }]}>
                                {ConstantString.STR_PROFESSIONAL}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {isProfessional ? 
                        <View style={styles.detailProfessional}>
                            <TouchableOpacity 
                                style={[styles.btnArtisan, {backgroundColor: detailProfessional.artisan ? ColorCustom.GREEN : ColorCustom.WHITE }]}
                                onPress={setArtisan}
                                activeOpacity={1}
                            >
                                <Text 
                                    style={[styles.textDetailProfessional, {color: detailProfessional.artisan ? ColorCustom.WHITE : ColorCustom.GREEN }]}
                                >
                                    {ConstantString.STR_ARTISAN}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={setFerme}
                                style={[styles.btnFerme, {backgroundColor: detailProfessional.ferme ? ColorCustom.GREEN : ColorCustom.WHITE }]}
                                activeOpacity={1}
                            >
                                <Text style={[styles.textDetailProfessional, {color: detailProfessional.ferme ? ColorCustom.WHITE : ColorCustom.GREEN }]}>
                                    {ConstantString.STR_FERME}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={setMonastery}
                                style={[styles.btnMonastery, {backgroundColor: detailProfessional.monasteryAbbaye ? ColorCustom.GREEN : ColorCustom.WHITE }]}
                                activeOpacity={1}
                            >   
                                <Text style={[styles.textDetailProfessional, {color: detailProfessional.monasteryAbbaye ? ColorCustom.WHITE : ColorCustom.GREEN }]}>
                                    {ConstantString.STR_MONASTERY_ABBAYE}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={setAssociation}
                                style={[styles.btnAssociation, {backgroundColor: detailProfessional.association ? ColorCustom.GREEN : ColorCustom.WHITE }]}
                                activeOpacity={1}
                            >
                                <Text style={[styles.textDetailProfessional, {color: detailProfessional.association ? ColorCustom.WHITE : ColorCustom.GREEN }]}>
                                    {ConstantString.STR_ASSOCIATION}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        :
                        null
                    }
                                    
                    <TouchableOpacity style={styles.btnInscription} onPress={onClickRegister}>
                        <Text style={styles.txtInscription}>{ConstantString.STR_TITLE_REGISTER}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnSeconnecter} onPress={onLogin}>
                        <Text style={styles.txtSeconnecter}>{ConstantString.STR_TITLE_LOGIN}</Text>
                    </TouchableOpacity>

                    <Text style={styles.textFooter}>
                        * {ConstantString.STR_MANDATORY_INFORMATION}
                    </Text>
                </View>
                
                <PopupLoading visible={isDisable} />
                <PopupLoading visible={isLoading} />
                <Popup ref={customPopup} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default RegisterComponent
