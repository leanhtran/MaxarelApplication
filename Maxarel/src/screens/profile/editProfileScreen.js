import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet} from 'react-native';
import { useNavigation, useNavigationParam } from "react-navigation-hooks";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkEmpty } from '../../utils/validations';
import { ConstantString } from '../../utils/constant-string';
import Geolocation from '@react-native-community/geolocation';
import { ColorCustom } from '../../utils/color';
import EditProfileComponent from '../../components/home/profile/EditProfileComponent';
import * as locationActions from '../../actions/mapAction';
import * as updateProfileAction from '../../actions/updateProfileAction';
import * as getProfileAction from '../../actions/profileAction';

//--------------------------------------------------------

function EditProfileScreen (props) {
    const {
        locationInfo
    } = props
    const customPopup = useRef(null);
    const profileData = useNavigationParam('profileData')
    const {goBack, navigate} = useNavigation()
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const initialStateProfile = {
        fullName: profileData.fullName,
        postalAddress: profileData.addressPostal,
        phone: profileData.phone,
        lat: profileData.lat,
        lng: profileData.lng
    }

    const [profile, setProfile] = useState(initialStateProfile)
    const [isLoading, setIsLoading] = useState(false)
    const [isDisable, setIsDisable] = useState(false) // disable button get location by google map

    const _onSubmit = () => {
        if(checkEmpty(profile.fullName)|| !profile.fullName) {
            customPopup.current.alert(ConstantString.STR_FULLNAME_EMPTY_ALERT);
        }
        else {
            setIsLoading(true)
            const params = profile
            console.log(params);
            props.actions.updateProfile.updateProfile(params, _onSuccesUpdate, _onErrorUpdate)
        }
    }

    const _onSuccesUpdate = (data) => {
        props.actions.get_profile.getProfile(_onGetProfileSucces, _onGetProfileError)
    }

    const _onGetProfileSucces = (data) => {
        navigate('ProfileScreen')
        setIsLoading(false)
        props.actions.updateProfile.isUpdateProfile(data.result)
    }

    const _onGetProfileError = (data) => {

    }

    const _onErrorUpdate = (data) => {
        setIsLoading(false)        
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
                        navigate('EditProfileScreen');
                    },
                },
            });
        } else {
            customPopup.current.alert(ConstantString.CONNECT_SERVER_ERROR)
        }
    }

    const _goBack = () => {
        goBack()
    }

    const getLocation = () => {
        // setIsDisable(true)
        // setIsLoading(true)
        // let options = {
        //     enableHighAccuracy: false,
        //     timeout: 30000,
        //     maximumAge: 1000
        // };
    
        // if (Platform.OS === 'android') {
        //     options = {
        //     enableHighAccuracy: false,
        //     timeout: 30000
        //     }
        // }
        
        // Geolocation.getCurrentPosition(
        //     (position) => {
                // setIsDisable(false)
        //         setIsLoading(false)
        //         const latitude = position.coords.latitude
        //         const longitude = position.coords.longitude
        //         const currentLocation = {lat: latitude, lng: longitude}
                navigate('LocationProfile', {
                    'position': {lat: Number(profileData.lat), lng: Number(profileData.lng)},
                    'defaultValue': profile.postalAddress
                })
        //     },
        //     (error) => {
        //         alert(ConstantString.STR_ALERT_TIME_OUT)
        //         setIsDisable(false)
        //         setIsLoading(false)
        //     },
        //     options
        // )
        
    }

    useEffect(() => {
        props.actions.actionLocation.get_location({});
    },[])

    useEffect(() => {
        if(locationInfo.locationInfo.address !== undefined) {
            const location = locationInfo.locationInfo
            setProfile({...profile, postalAddress: location.address, lat: location.lat, lng: location.lng})
        }
    },[locationInfo])

    return (
        <EditProfileComponent
            onSubmit={_onSubmit}
            goBack={_goBack}
            isLoading={isLoading}
            profile={profile}
            setProfile={setProfile}
            setConfirmPassword={setConfirmPassword}
            customPopup={customPopup}
            isDisable={isDisable}
            getLocation={getLocation}
        />
    );
}

const mapStateToProps = (state) => {
    return {
        locationInfo: state.mapInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            get_profile: bindActionCreators(getProfileAction, dispatch),
            updateProfile: bindActionCreators(updateProfileAction, dispatch),
            actionLocation: bindActionCreators(locationActions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
