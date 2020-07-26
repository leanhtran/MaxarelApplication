import React, { useEffect } from 'react';
import { useNavigation } from "react-navigation-hooks";
import SplashScreen from 'react-native-splash-screen';
import StartComponent from '../../components/start/startComponent';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { USER_TOKEN } from '../../api/config';
import { setToken } from '../../api/api-instance';

function StartScreen(props) {
    const { navigate } = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 3000)
        // _checkLogin()
    },[])

    useEffect(() => {
        const notify = props.isNotify
        if(!props.profileData.addressEmail && notify.articleId && !notify.foreground) {
            if(notify.typeId === '1') {
                navigate('NotifyEvaluation', {
                "articleId" : notify.articleId
                })
            }
            console.log('isNotify start',notify);
        }
    },[props.isNotify])

    const _onProvider = () => {
        navigate('Login')
    }
    const _onCustomer = () => {
        navigate('HistoryArticle', {
            'isCustomer': true
        })
    }

    const _checkLogin = async () => {
        try {
            const token = await AsyncStorage.getItem(USER_TOKEN);
            if (token !== null) {
                setToken(token)
                navigate('Home')
            }
        } catch (e) {
            console.log('Get token error: ', e)
        }
    }

    return (
        <StartComponent
            onProvider={_onProvider}
            onCustomer={_onCustomer}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        profileData: state.updateProfile.profile,
        isNotify: state.isFirstTime.isFirstTime
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);