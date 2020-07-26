import React, { Fragment } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Modal,
    Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ColorCustom } from '../../../utils/color';
import { Images } from '../../../utils/images'
import { ConstantString } from '../../../utils/constant-string';
import Popup from '../../base_components/AlertCustom';
import { myWidth } from '../../../utils/dimension';
import Dialog from 'react-native-dialog';
import LoadingScreen from '../../../screens/loadingScreen';
import PopupLoading from '../../../screens/popupLoading';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
export const ProfileComponent = props => {

    const { 
        profileData, 
        logoutFunction, 
        customPopup,
        editProfile,
        changePassword,
        visibleModal,
        setVisibleModal,
        selectImageLibary,
        takeImageLibary,
        imageBase64,
        avatar,
        isLoadingImage,
        visibleDiadlogQuestionUpload,
        cancelDialogQuestion,
        submitDialogQuestion,
        isLoading,
        isLoadingPopup,
        viewImage
    } = props;

    const showDialogQuestionUpload = () => {
        return (
            <Dialog.Container 
            visible={visibleDiadlogQuestionUpload}
            contentStyle={styles.contentStyle} 
        >
            <Dialog.Title style={styles.titleCardDialog}>{ConstantString.STR_UPDATE_PROFILE_PHOTO}</Dialog.Title>
            
            <View style={{alignItems: 'center'}}>
                <Text>
                    {ConstantString.STR_QUESTION_UPDATE_PROFILE_PHOTO}
                </Text>
            </View>

            <View style={styles.rowButtonCard}>
                <TouchableOpacity
                    style={styles.btnCancel}
                    onPress={cancelDialogQuestion}
                >
                    <Text style={styles.textCancel}>
                        {ConstantString.STR_CANCEL}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnOK}
                    onPress={submitDialogQuestion}
                >
                    <Text style={styles.okTextConditionStyle}>
                        {ConstantString.STR_OK}
                    </Text>
                </TouchableOpacity>
            </View>
        </Dialog.Container>
        )
    }

    const showModalUploadImage = () => {        
        return (
            <View style={styles.loaddingStyle}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    supportedOrientations={['portrait', 'landscape']}
                    isVisible={visibleModal}>
                    <View style={styles.loaddingViewStyle}>
                        <View style={styles.modalStyle}>
                            <Text style={styles.textTitleModal}>{ConstantString.STR_UPDATE_PROFILE_PHOTO}</Text>

                            {/* <View style={styles.textViewModal}>
                                <TouchableOpacity onPress={viewImage}>
                                    <Text style={styles.textModal}>View Image...</Text>
                                </TouchableOpacity>
                            </View> */}

                            <View style={styles.textViewModal}>
                                <TouchableOpacity
                                    onPress={() => {
                                        takeImageLibary("PROFILE_IMAGE")
                                    }}>
                                    <Text style={styles.textModal}>{ConstantString.STR_TAKE_PHOTO}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.textViewModal}>
                                <TouchableOpacity
                                    onPress={() => {
                                        selectImageLibary("PROFILE_IMAGE")
                                    }}>
                                    <Text style={styles.textModal}>{ConstantString.STR_CHOOSE_IN_LIBRARY}</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                onPress={() =>setVisibleModal(false)}
                                style={styles.viewCanelModal}>
                                <Text style={styles.cancelViewStyle}>{ConstantString.STR_CANCEL}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View >
        )
    }

    const _renderImage = () => {
        const pathImage = imageBase64 !== '' ? ('data:image/jpeg;base64,' + imageBase64) : avatar
        return (
            <FastImage
                style={styles.avatar}
                source={{
                    uri: pathImage,
                    priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
        )
    }

    return (
        <Fragment>
            
            <SafeAreaView style={{ flex: 0, backgroundColor: ColorCustom.BLUE} } />

            <SafeAreaView style={styles.safeAreaContainer}>
            {
            isLoading ?
                <LoadingScreen />
            :
                <ScrollView style={{flex: 1}}>
                    <View style={styles.container}>
                        <LinearGradient
                            colors={[
                                ColorCustom.BLUE,
                                ColorCustom.BLUE,
                                ColorCustom.BLUE
                            ]}
                            style={styles.header}>
                            <View style={styles.header}>
                                <Text style={styles.nameStyle}>
                                    {profileData && profileData.fullName ? profileData.fullName : ""}
                                </Text>
                            </View>
                        </LinearGradient>
                        
                        {visibleModal ? showModalUploadImage() : null}
                        <TouchableOpacity style={styles.btnUploadImage} onPress={() => setVisibleModal(true)}>
                            <View style={styles.viewCamreraAvatar}>
                                <Image
                                    style={styles.cameraImageStyle}
                                    source={Images.cameraAvatar}
                                />
                            </View>

                            {
                                isLoadingImage ? 
                                <Image style={styles.avatar} source={Images.avatar} />
                                :
                                _renderImage()
                            }
                        </TouchableOpacity>
                        
                            <View style={styles.body}>
                                <Text style={styles.supplierTextStyle}>{profileData && profileData.supplierName ? profileData.supplierName : ""}</Text>
                                <View style={styles.bodyContainer}>
                                    <View style={styles.viewInfo}>
                                        <View style={styles.rawItemStyle}>
                                            <Text style={styles.titleTextStyle}>{ConstantString.STR_EMAIL_PLACE_HOLDER}</Text>
                                            <Text style={styles.infoTextStyle}>{profileData && profileData.addressEmail ? profileData.addressEmail : ""}</Text>
                                        </View>

                                        <View style={styles.rawItemStyle}>
                                            <Text style={styles.titleTextStyle}>{ConstantString.STR_PHONE_NUMBER}</Text>
                                            <Text style={styles.infoTextStyle}>{profileData && profileData.phone ? profileData.phone : ""}</Text>
                                        </View>

                                        <View style={styles.rawItemStyle}>
                                            <Text style={styles.titleTextStyle}>{ConstantString.STR_ADDRESS}</Text>
                                            <Text style={styles.infoTextStyle}>{profileData && profileData.addressPostal ? profileData.addressPostal : ""}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.viewBtnUpdate}>
                                        <TouchableOpacity onPress={editProfile} style={styles.rawEditProfile}>
                                            <Text style={styles.textEditProfile}>{ConstantString.STR_EDIT_PROFILE}</Text>
                                            {/* <Image source={Images.edit} style={styles.imageEdit} /> */}
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={changePassword} style={styles.rawEditProfile}>
                                            <Text style={styles.textEditProfile}>{ConstantString.STR_CHANGE_PASSWORD}</Text>
                                            {/* <Image source={Images.edit} style={styles.imageEdit} /> */}
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity
                                        style={styles.itemLogoutStyle}
                                        onPress={() => logoutFunction()}
                                    >
                                        <Text style={styles.logoutItemStyle} >{ConstantString.STR_LOGOUT_TEXT}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                    </View>
                </ScrollView>
            }
            </SafeAreaView>
            
            <PopupLoading visible={isLoadingPopup} popupColor={ColorCustom.WHITE} />
            {showDialogQuestionUpload()}
            <Popup ref={customPopup} />
        </Fragment>
            
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: ColorCustom.LIGHT_GRAY
    },
    container: {
        flex: 1,
        backgroundColor: ColorCustom.LIGHT_GRAY
    },
    header: {
        height: 200,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    nameStyle: {
        position: 'absolute',
        bottom: 2,
        marginLeft: 160,
        color: "white",
        fontSize: 25,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    body: {
        flex: 1,
        backgroundColor: ColorCustom.LIGHT_GRAY
    },
    bodyContainer: {
        paddingHorizontal: 20,
        marginTop: 60,
        flex: 1
    },
    rawItemStyle: {
    },
    rawEditProfile: {
        flexDirection: 'row',
        marginTop: 20,
        paddingBottom: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemLogoutStyle: {
        height: 50,
        borderColor: ColorCustom.BLUE,
        borderWidth: 1,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginVertical: 20
    },
    titleTextStyle: {
        marginRight: 10,
        fontSize: 17,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    textEditProfile: {
        marginRight: 10,
        fontSize: 18,
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        color: ColorCustom.BLUE
    },
    infoTextStyle: {
        fontSize: 17,
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        color: ColorCustom.GRAY,
        marginTop: 5
    },
    logoutItemStyle: {
        color: ColorCustom.BLUE,
        fontSize: 18,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        textTransform: 'uppercase'
    },
    supplierTextStyle: {
        position: 'absolute',
        left: 160,
        top: 8,
        fontSize: 18,
        color: ColorCustom.MOUNTAIN_MEADOW,
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    imageEdit: {
        width: 15,
        height: 15
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
        backgroundColor: 'rgba(00, 00, 00, 0.3)'
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
        fontSize: 22,
        color: ColorCustom.COPPERCANYON,
        marginBottom: 15,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    textModal: {
        fontSize: 18,
        color: ColorCustom.DARK_GREEN,
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    textViewModal: {
        marginRight: 30,
        borderBottomWidth: 0.5,
        borderBottomColor: ColorCustom.GRAY,
        marginVertical: 10,
    },
    cancelViewStyle: {
        fontSize: 20,
        marginTop: 10,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        color: ColorCustom.AZURERADIANCE
    },
    viewCanelModal: {
        position: 'absolute',
        right: 30,
        bottom: 20,
    },
    btnUploadImage: {
        width: 120,
        height: 120,
        zIndex: 1,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: ColorCustom.LIGHT_GRAY,
        marginBottom: 10,
        alignSelf: 'flex-start',
        left: 30,
        position: 'absolute',
        marginTop: 140,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorCustom.LIGHT_GRAY
    },
    avatar: {
        width: 115,
        height: 115,
        borderRadius: 62.5,
    },
    contentStyle: {
        width: '90%',
        padding: 0,
        borderRadius: 15,
        alignItems: 'center',
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
    cameraImageStyle: {
        width: 15,
        height: 15,
        resizeMode: 'stretch',
    },
    viewCamreraAvatar: {
        backgroundColor: ColorCustom.WHITE, 
        alignItems: 'center', 
        zIndex: 1, 
        position: 'absolute', 
        bottom: 0, 
        right: 5, 
        borderRadius: 35, 
        width: 25, 
        height: 25, 
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: ColorCustom.LIGHT_GRAY
    },
    viewBtnUpdate: {
        marginVertical: 15,
        paddingHorizontal: 20
    },
    viewInfo: {
        padding: 20,
        marginTop: 30,
        backgroundColor: ColorCustom.WHITE,
        borderRadius: 10,
        height: 230,
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});
