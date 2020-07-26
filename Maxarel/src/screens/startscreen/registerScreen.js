import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, InteractionManager} from 'react-native';
import { useNavigation } from "react-navigation-hooks";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RegisterComponent from '../../components/start/registerComponent';
import * as registerActions from '../../actions/registerAction';
import * as mapAction from '../../actions/mapAction';
import { checkEmpty, checkEmailValidate } from '../../utils/validations';
import { ConstantString } from '../../utils/constant-string';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { ColorCustom } from '../../utils/color';

function RegisterScreen (props) {
    const customPopup = useRef(null);
    const {goBack, navigate} = useNavigation()
    const [isProfessional, setisProfessional] = useState(false)
    const detailProfessionalData = {
        artisan: true,
        ferme: false,
        monasteryAbbaye: false,
        association: false
    }
    const [detailProfessional, setDetailProfessional] = useState(detailProfessionalData)
    const initialState = {
        fullName: '',
        email: '',
        password: '',
        supplierId: 2,
        phone: '',
        postalAddress: '',
        lat: 0,
        lng: 0,
        isPrecisions: false,
        precisions: ''
    }
    const [user, setUser] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const [visibleDiadlog, setVisibleDiadlog] = useState(false)
    const [isDisable, setIsDisable] = useState(false) // disable button get location by google map
    const [comfirmPassword, setComfirmPassword] = useState('')

    const _setArtisan = () => {
        setDetailProfessional({artisan: true, ferme: false, monasteryAbbaye: false, association: false})
        setUser({...user, supplierId: 3})
    }
    const _setFerme = () => {
        setDetailProfessional({artisan: false, ferme: true, monasteryAbbaye: false, association: false})
        setUser({...user, supplierId: 4})
    }
    const _setMonastery = () => {
        setDetailProfessional({artisan: false, ferme: false, monasteryAbbaye: true, association: false})
        setUser({...user, supplierId: 5})
    }
    const _setAssociation = () => {
        setDetailProfessional({artisan: false, ferme: false, monasteryAbbaye: false, association: true})
        setUser({...user, supplierId: 6})
    }

    const _onClickRegister = () => {
        const locationData = props.locationInfo.locationInfo
        setUser({
            ...user,
            postalAddress: locationData.address,
            lat: locationData.lat,
            lng: locationData.lng
        })
        if(
            checkEmpty(user.email) || checkEmpty(user.password) || !user.email || !user.password
        ) {
            customPopup.current.alert(ConstantString.EMAIL_EMPTY_ALERT);
        }
        else if(locationData.address === undefined) {
            customPopup.current.alert(ConstantString.STR_ADDRESS_EMPTY_ALERT);
        }
        else if(checkEmpty(user.fullName)|| !user.fullName) {
            customPopup.current.alert(ConstantString.STR_FULLNAME_EMPTY_ALERT);
        }
        else if(isProfessional && (checkEmpty(user.phone)|| !user.phone)) {
            customPopup.current.alert(ConstantString.STR_PHONE_NUMBER_EMPTY_ALERT);
        }
        else if (!checkEmailValidate(user.email)) {
            customPopup.current.alert(ConstantString.INVALID_EMAIL);
        }
        else if (user.password.length < 8 || user.password.length > 16) {
            customPopup.current.alert(ConstantString.STR_CHECK_PASSWORD_ALERT)
        }
        else if (user.password.trim() !== comfirmPassword.trim()) {
            customPopup.current.alert(ConstantString.STR_NEW_PASSWORD_NOT_MATCH)
        }
        else {
            const params = {
                ...user,
                postalAddress: locationData.address,
                lat: locationData.lat,
                lng: locationData.lng
            }
            props.actions.register.register(params, _onSucces, _onError);
            setIsLoading(true)
        }
    }

    const _onSucces = (data) => {
        setVisibleDiadlog(true)
        setIsLoading(false)
    }

    const _setVisibleFalse = () => {
        setVisibleDiadlog(false),
        goBack()
    }

    const _onError = (data) => {
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
                        navigate('RegisterScreen');
                    },
                },
            });
        } else {
            customPopup.current.alert(ConstantString.CONNECT_SERVER_ERROR)
        }
    }

    const btnSetIsProfessionalTrue = () => {
        setisProfessional(true)
        setUser({...user, supplierId: 3})
    }
    const btnSetIsProfessionalFalse = () => {
        setisProfessional(false)
        setUser({...user, supplierId: 2})
    }
    const _onLogin = () => {
        navigate('Login')
    }

    const _goBack = () => {
        goBack()
    }

    const _getLocation = () => {
        setIsDisable(true)
        let options = {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 1000
        };
    
        if (Platform.OS === 'android') {
            options = {
            enableHighAccuracy: false,
            timeout: 30000
            }
        }
        
        Geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude
                const longitude = position.coords.longitude
                const currentLocation = {lat: latitude, lng: longitude}
                Geocoder.init(ConstantString.KEY_GG_API, {language : "en"})
                Geocoder.from(currentLocation.lat,currentLocation.lng)
                .then(json => {
                    const arrayData = json.results[0].address_components
                    let addressYourPosition = ''
                    for(let i = 1 ; i < arrayData.length; i++) {
                        if(i === arrayData.length - 1) {
                            addressYourPosition = addressYourPosition + arrayData[i].long_name
                        }
                        else addressYourPosition = addressYourPosition + arrayData[i].long_name + ', '
                    }
                    navigate('LocationScreen', {
                        'position': currentLocation,
                        'defaultValue': addressYourPosition
                    })
                    setIsDisable(false)
                })
                .catch(error => {
                    console.log('error',error);
                    
                    setIsDisable(false)
                    setIsLoading(false)
                    InteractionManager.runAfterInteractions(() => {
                        customPopup.current.alert(ConstantString.STR_ALERT_TIME_OUT)
                    })
                })
            },
            (error) => {
                console.log('error',error);
                customPopup.current.alert(ConstantString.STR_ALERT_TIME_OUT)
                setIsDisable(false)
                setIsLoading(false)
            },
            options
        )
        
    }

    const _btnSwitchPrecisions =  (isOn) => {
        setUser({...user, isPrecisions: isOn, precisions: ''})
    }

    return (
        <RegisterComponent
            onLogin={_onLogin}
            btnSetIsProfessionalTrue={btnSetIsProfessionalTrue}
            btnSetIsProfessionalFalse={btnSetIsProfessionalFalse}
            isProfessional={isProfessional}
            setUser={setUser}
            user={user}
            onClickRegister={_onClickRegister}
            goBack={_goBack}
            customPopup={customPopup}
            isLoading={isLoading}
            detailProfessional={detailProfessional}
            setArtisan={_setArtisan}
            setFerme={_setFerme}
            setMonastery={_setMonastery}
            setAssociation={_setAssociation}
            getLocation={_getLocation}
            locationInfo = {props.locationInfo}
            visibleDiadlog={visibleDiadlog}
            setVisibleFalse={_setVisibleFalse}
            isDisable={isDisable}
            setComfirmPassword={setComfirmPassword}
            btnSwitchPrecisions={_btnSwitchPrecisions}
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
            register: bindActionCreators(registerActions, dispatch),
            get_location: bindActionCreators(mapAction, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
