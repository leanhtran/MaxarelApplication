import React, { useEffect, useState, useRef } from 'react'
import { InteractionManager, StyleSheet, Platform } from 'react-native'
import DetailArticleComponent from '../../../components/home/acheteur-page/detailArticle/detailArticleComponent'
import * as getArticleByIdAction from '../../../actions/getArticleByIdAction';
import * as sendDtCustomerAction from '../../../actions/sendDtCustomerAction';
import { useNavigationParam, useNavigation } from 'react-navigation-hooks';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callMaxarel } from '../../../utils/callMaxrel';
import { ColorCustom } from '../../../utils/color';
import { ConstantString } from '../../../utils/constant-string';
import AsyncStorage from '@react-native-community/async-storage';
import { DEVICE_TOKEN } from '../../../actions/actiontypes';

function DetailArticleScreen(props) {
    const customPopup = useRef(null);
    const {goBack, navigate} = useNavigation()
    const articleId = useNavigationParam('articleId')
    const distance = useNavigationParam('distance')
    const position = useNavigationParam('paramPosition')
    const suppliedId = useNavigationParam('suppliedId')
    const datePicker = useNavigationParam('datePicker')
    const isActive = useNavigationParam('isActive')
    const [articleData, setArticleData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [visibleDiadlog, setVisibleDiadlog] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [visibleDiadlogCard, setVisibleDiadlogCard] = useState(false)
    const [linkImage_0, setLinkImage_0] = useState('')
    const [visibleFullImage, setVisibleFullImage] = useState(false)
    const [isLoadingCondition, setIsLoadingCondition] = useState(false)

    useEffect(() => {
        const params = {
            articleId: articleId
        }
        props.actions.get_article_by_id.getArticleById(params, _onSuccess, _onError)
    },[])

    const _onSuccess = data => {
        setArticleData(data.result)
        setIsLoading(false)       
        setLinkImage_0(data.result?.listImages[0])
    }

    const _onError = (data) => {
        setIsLoading(false)
        customPopup.current.alert(ConstantString.CONNECT_SERVER_ERROR)
    }

    const _goBack = () => {
        goBack()
    }

    const _onJArrive = () => {
        setVisibleDiadlog(true)
    }

    const _submitDialog = () => {
        setVisibleDiadlog(false)
        Platform.OS === 'ios' ? 
        InteractionManager.runAfterInteractions(() => {
            setVisibleDiadlogCard(true)
        })
        :
        setVisibleDiadlogCard(true)
    }

    const _cancelDialog = () => {
        setVisibleDiadlog(false)
    }

    const _setChecked = () => {
        setIsChecked(!isChecked)
    }

    const getToken = async () => {
        try {
            const deviceToken = await AsyncStorage.getItem(DEVICE_TOKEN);
            getDeviceToken(deviceToken)
        } catch (e) {
            console.log('Get device token error: ', e);
        }
    };

    const getDeviceToken = (deviceToken) => {
        const checkOS = Platform.OS === 'ios' ? '0' : '1'
        const params = {
            articleId: articleId,
            tokenDevice: deviceToken,
            os: Number(checkOS),
            distance: _renderDistance()
        }
        props.actions.send_dt_customer.send_device_token_customer(params, _onSuccessSend, _onErrorSend)
    }

    const _submitDialogCard = () => {
        setVisibleDiadlogCard(false)
        getToken()
    }

    const _onSuccessSend = (data) => {
        navigate('LocationDetail',{
            'currentPosition': position,
            'providerPosition': {
                latitude: Number(articleData.lat),
                longitude: Number(articleData.lng)
            },
            'postalAddress': articleData.postalAddress,
            'precisions': articleData.precisions
        })
        console.log("Succes Send DT customer");
    }

    const _onErrorSend = (data) => {
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
                        navigate('DetailArticle');
                    },
                },
            });
        } else {
            customPopup.current.alert(ConstantString.CONNECT_SERVER_ERROR)
        }
        console.log("Error Send DT customer")
    }

    const _cancelDialogCard = () => {
        setVisibleDiadlogCard(false)
    }
    
    const _renderDistance = () => {
        return (
            distance < 1 ?
            (distance * 1000) + ' m'
            :
            Math.round(distance) + ' km'
        )
    }

    const _callMaxarel = () => {
        callMaxarel()
    }

    return (
        <DetailArticleComponent 
            articleData={articleData}
            goBack={_goBack}
            isLoading={isLoading}
            onJArrive={_onJArrive}
            visibleDiadlog={visibleDiadlog}
            submitDialog={_submitDialog}
            cancelDialog={_cancelDialog}
            isChecked={isChecked}
            setChecked={_setChecked}
            renderDistance={_renderDistance}
            distance={distance}
            visibleDiadlogCard={visibleDiadlogCard}
            submitDialogCard={_submitDialogCard}
            cancelDialogCard={_cancelDialogCard}
            linkImage_0={linkImage_0}
            callMaxarel={_callMaxarel}
            visibleFullImage={visibleFullImage}
            setVisibleFullImage={setVisibleFullImage}
            customPopup={customPopup}
            suppliedId={suppliedId}
            datePicker={datePicker}
            isActive={isActive}
            isLoadingCondition={isLoadingCondition}
            setIsLoadingCondition={setIsLoadingCondition}
        />
    )
}

const styles=StyleSheet.create({
})

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            get_article_by_id: bindActionCreators(getArticleByIdAction, dispatch),
            send_dt_customer: bindActionCreators(sendDtCustomerAction, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailArticleScreen);