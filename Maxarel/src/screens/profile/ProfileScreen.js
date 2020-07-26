import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ColorCustom } from '../../utils/color';
import { ConstantString } from '../../utils/constant-string'
import React, { useState, useRef, useEffect } from 'react';
import * as getProfileAction from '../../actions/profileAction';
import * as deleteEndPointAction from '../../actions/deleteEndPointAction';
import * as avatarAction from '../../actions/avatarAction';
import * as runFirstTimeActions from '../../actions/runFirstTimeAction';
import { setToken } from '../../api/api-instance';
import { ProfileComponent } from '../../components/home/profile/ProfileComponent';
import { useNavigation } from 'react-navigation-hooks';
import * as updateProfileAction from '../../actions/updateProfileAction'
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import { Constant } from '../../utils/constant';
import { InteractionManager, Platform } from 'react-native';
import { DEVICE_TOKEN } from '../../actions/actiontypes';
import AsyncStorage from '@react-native-community/async-storage';

function ProfileScreen(props) {

    const { navigate } = useNavigation();
    const customPopup = useRef(null);
    const [profileData, setProfileData] = useState();
    const [visibleModal, setVisibleModal] = useState(false)
    const [avatar, setAvatar] = useState('')
    const [imageBase64, setImageBase64] = useState('')
    const [isLoadingImage, setIsLoadingImage] = useState(false)
    const [visibleDiadlogQuestionUpload, setVisibleDiadlogQuestionUpload] = useState(false)
    const [profileImage, setProfileImage] = useState('')
    const [isLoadingPopup, setIsLoadingPopup] = useState(false)
    const [isLoading, setisLoading] = useState(false)

    useEffect(() => {
        setisLoading(true)
        getProfileFunction();
        getAvatar()
    }, [])

    const getAvatar = () => {
        setIsLoadingImage(true)
        props.actions.avatarAction.getAvatar(_onSuccessGetAvatar, _onErrorGetAvatar)
    }

    const _onSuccessGetAvatar = (data) => {
        setIsLoadingImage(false)
        setProfileImage(Constant.urlLocal + data.result)
        setAvatar(Constant.urlLocal + data.result)
        console.log('avt',Constant.urlLocal + data.result);
    }

    const _onErrorGetAvatar = (data) => {
        setIsLoadingImage(true)
    }

    function getProfileFunction() {
        props.actions.get_profile.getProfile(_onGetProfileSucces, _onGetProfileError)
    }

    const _onGetProfileSucces = (data) => {
        setisLoading(false)
        console.log(data.result);
        props.actions.updateProfile.isUpdateProfile(data.result)
        if (data && data.result)
            setProfileData(data.result)
    }

    const _onGetProfileError = (error) => {
        setisLoading(false)
        if(data.error && data.error.message && data.error.details){
            customPopup.current.tip({
                title: data.error.message,
                content: [
                    data.error.details
                ],
                btn: {
                    text: ConstantString.STR_OK,
                    style: {
                        color: ColorCustom.GREEN,
                        fontWeight: '500',
                    },
                    callback: () => {
                        navigate('RegisterScreen');
                    },
                },
            });
        } else {
            customPopup.current.alert(ConstantString.CONNECT_SERVER_ERROR)
        }
        console.log("GET PROFILE ERROR: ", error)
    }

    const editProfile = () => {
        navigate('EditProfile',{
            'profileData': props.updateProfile
        })
    }

    const getDeviceToken = async () => {
        try {
            const deviceToken = await AsyncStorage.getItem(DEVICE_TOKEN);
            deleteDeviceToken(deviceToken)
        } catch (e) {
            console.log('Get device token error: ', e);
        }
    };

    const deleteDeviceToken = (deviceToken) => {
        const checkOS = Platform.OS === 'ios' ? '0' : '1'
        const params = {
            articleId: 0,
            tokenDevice: deviceToken,
            os: Number(checkOS),
            distance: "string"
        }
        props.actions.delete_end_point.delete_end_point(params, _onSuccesDelete, _onErrorDelete)
    }

    async function _logoutApp() {
        getDeviceToken()
        props.actions.updateProfile.isUpdateProfile({})
        props.actions.runFirstTimeActions.runFirstTime({})
        navigate('Start');
    }

    const _onSuccesDelete = () => {
        setToken("");
        console.log('Success Delete End Point');
    }

    const _onErrorDelete = () => {
        console.log('Error Delete End Point');
    }

    function _logoutFunction() {
        customPopup.current.confirm({
            title: ConstantString.STR_SIGNOUT,
            content: [ConstantString.STR_SIGNOUT_CONFIRM],
            ok: {
                text: ConstantString.STR_OK,
                style: {
                    color: ColorCustom.AZURERADIANCE,
                    fontWeight: '500'
                },
                callback: () => {
                    _logoutApp()
                }
            },
            cancel: {
                text: ConstantString.STR_CANCEL,
                style: {
                    color: ColorCustom.AZURERADIANCE,
                    fontWeight: 'bold'
                },
                callback: () => {
                    return;
                }
            }
        })
    }

    const _changePassword = () => {
        navigate('ChangePassword')
    }

    useEffect(() => {
        setProfileData(props.updateProfile)
    },[props.updateProfile])


    let arrayImage = []
    const _selectImageLibary = (type) => {
        ImagePicker.openPicker({
            width: 120,
            height: 120,
        }).then(image => {
            if (type === "PROFILE_IMAGE") {
                const pathImage = Platform.OS === "ios" ? `file://${image.path}` : image.path;
                ImgToBase64.getBase64String(pathImage).then(base64String => {
                    setImageBase64(base64String)
                    arrayImage.push[base64String]
                    setVisibleModal(false)
                    Platform.OS === 'ios' ?
                    InteractionManager.runAfterInteractions(() => {
                        setTimeout(() => {
                            setVisibleDiadlogQuestionUpload(true)
                        }, 500)
                    })
                    :
                    setVisibleDiadlogQuestionUpload(true)
                }).catch(err => {
                    setVisibleModal(false)
                    customPopup.current.alert(ConstantString.STR_CHOOSE_IMAGE_ERROR_MESSAGE);
                });
            }
        });
    }

    const _takeImageLibary = (type) => {
        ImagePicker.openCamera({
            width: 120,
            height: 120,
        }).then(image => {
            if (type === "PROFILE_IMAGE") {
                const pathImage = image.path;
                ImgToBase64.getBase64String(pathImage).then(base64String => {
                    setImageBase64(base64String)
                    arrayImage.push[base64String]
                    setVisibleModal(false)
                    Platform.OS === 'ios' ?
                    InteractionManager.runAfterInteractions(() => {
                        setTimeout(() => {
                            setVisibleDiadlogQuestionUpload(true)
                        }, 500)
                    })
                    :
                    setVisibleDiadlogQuestionUpload(true)
                }).catch(err => {
                    setVisibleModal(false)
                    customPopup.current.alert(ConstantString.STR_CHOOSE_IMAGE_ERROR_MESSAGE)
                });
            }
        });
    }

    const cancelDialogQuestion = () => {
        setVisibleDiadlogQuestionUpload(false)
        InteractionManager.runAfterInteractions(() => {
            setImageBase64('')
        })
    }

    const submitDialogQuestion = () => {
        setVisibleDiadlogQuestionUpload(false)
        Platform.OS === 'ios' ?
        InteractionManager.runAfterInteractions(() => {
            setIsLoadingPopup(true)
        })
        :
        setIsLoadingPopup(true)
        const params = {
            base64: imageBase64
        }
        props.actions.avatarAction.updateAvatar(params, _onSuccessUpdateImage, _onErrorUpdateImage)
    }

    const _onSuccessUpdateImage = (data) => {
        setIsLoadingPopup(false)
        Platform.OS === 'ios' ?
        InteractionManager.runAfterInteractions(() => {
            customPopup.current.alert("Mettre à jour l'image d'avatar avec succès")
        })
        :
        customPopup.current.alert("Mettre à jour l'image d'avatar avec succès")
        getAvatar()
    }

    const _onErrorUpdateImage = (data) => {
        setIsLoadingPopup(false)
        Platform.OS === 'ios' ?
        InteractionManager.runAfterInteractions(() => {
            customPopup.current.alert("Échec de la mise à jour de l'image de l'avatar")
        })
        :
        customPopup.current.alert("Échec de la mise à jour de l'image de l'avatar")
        setAvatar(profileImage)
        setImageBase64('')
    }

    const _viewImage = () => {
        
    }

    return (
        <ProfileComponent
            profileData={profileData}
            logoutFunction={_logoutFunction}
            customPopup={customPopup} 
            editProfile={editProfile}
            changePassword={_changePassword}
            visibleModal={visibleModal}
            setVisibleModal={setVisibleModal}
            selectImageLibary={_selectImageLibary}
            takeImageLibary={_takeImageLibary}
            imageBase64={imageBase64}
            avatar={avatar}
            isLoadingImage={isLoadingImage}
            visibleDiadlogQuestionUpload={visibleDiadlogQuestionUpload}
            setVisibleDiadlogQuestionUpload={setVisibleDiadlogQuestionUpload}
            cancelDialogQuestion={cancelDialogQuestion}
            submitDialogQuestion={submitDialogQuestion}
            isLoading={isLoading}
            isLoadingPopup={isLoadingPopup}
            viewImage={_viewImage}
            />
    );
}

const mapStateToProps = (state) => {
    return {
        updateProfile: state.updateProfile.profile
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            avatarAction: bindActionCreators(avatarAction, dispatch),
            updateProfile: bindActionCreators(updateProfileAction, dispatch),
            get_profile: bindActionCreators(getProfileAction, dispatch),
            delete_end_point: bindActionCreators(deleteEndPointAction, dispatch),
            runFirstTimeActions: bindActionCreators(runFirstTimeActions, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
