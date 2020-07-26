import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigation } from "react-navigation-hooks";
import * as getHistoryArticleAction from '../../actions/getHistoryArticleAction';
import * as sendDtProviderAction from '../../actions/sendDtProviderAction';
import * as quicklyCreateArticle from '../../actions/quicklyCreateArticleAction';
import { HistoryArticleVenduerComponent } from '../../components/home/vendeurs/HistoryArticleVenduerComponent'
import { InteractionManager, Platform } from 'react-native';
import { ConstantString } from '../../utils/constant-string';
import { getDateByDay } from '../../utils/getDateByDay';
import { checkEmpty } from '../../utils/validations';
import * as getArticleByIdAction from '../../actions/getArticleByIdAction';
import { DEVICE_TOKEN } from '../../actions/actiontypes';
import AsyncStorage from '@react-native-community/async-storage';
import { Constant } from '../../utils/constant';
import { changeFormatDate } from '../../utils/changeFormatDate';
import * as deleteArticleActions from '../../actions/deleteArticleAction'

function HistoryArticleVendeurScreen(props) {
    const customPopup = useRef(null);
    const { navigate } = useNavigation();
    const [isLoading, setLoading] = useState(false);
    const [historyArticleVendeurData, setHistoryArticleVendeurData] = useState([]);
    const [isRefresing, setIsRefreshing] = useState(false);
    const [isSchedule, setIsSchedule] = useState(false)
    const [arraySelectedDay, setArraySelectedDay] = useState([])
    const [debutDate, setDebutDate] = useState('')
    const [endHour, setEndHour] = useState('');
    const [endMinute, setEndMinute] = useState('');
    const [arrayArticleId, setArrayArticleId] = useState([])
    const [visibleDialogQuicklyPost, setVisibleDialogQuicklyPost] = useState(false)
    const [isLoadingPopup, setIsLoadingPopup] = useState(false)
    const [endTime, setEndTime] = useState('')
	const [timeOfSchedule, setTimeOfSchedule] = useState('')
    const [isModalDeleteArticle, setIsModalDeleteArticle] = useState(false)
    const [visibleAddButton, setVisibleAddButton] = useState(false)
    const [isDeleteArticle, setIsDeleteArticle] = useState(false)
    const [isUpdateArticle, setIsUpdateArticle] = useState(false)
    const [isFirst, setIsFirst] = useState(true)
    
    const paramsPage = {
        PageIndex: 1,
        PageSize: 100,
    }

    const getToken = async () => {
        try {
            const deviceToken = await AsyncStorage.getItem(DEVICE_TOKEN);
            getTokenDevice(deviceToken)
        } catch (e) {
            console.log('Get device token error: ', e);
        }
    };

    const getTokenDevice = (deviceToken) => {
        const checkOSEnum = Platform.OS === 'ios' ? '0' : '1'
        const params = {
            tokenDevice: deviceToken,
            osEnum: Number(checkOSEnum)
        }
        console.log(params)
        props.actions.sendDtProvider.sendDeviceTokenProvider(params, _onSuccesSendDt, _onErrorSendDt)
    }

    const _onSuccesSendDt = () => {
        console.log('Send device token provider')
    }

    const _onErrorSendDt = () => {
        console.log('Error Send device token provider')
    }

    useEffect(() => {
        setLoading(true);
        getArticleFunction();
        getToken()
    }, [])

    function getArticleFunction(){
        props.actions.get_history_article_vendeur.getHistoryArticleVendeur(paramsPage, _onSuccesGetHistoryArticleVendeur, _onErrorGetHistoryArticleVendeur)
    }

    const _onSuccesGetHistoryArticleVendeur = (data) => {
        setLoading(false);
        setIsRefreshing(false);
        if (data.result.results.length !== 0) {
            setHistoryArticleVendeurData(data.result.results)
        }
        else setHistoryArticleVendeurData([])
    }

    const _onErrorGetHistoryArticleVendeur = (data) => {
        setHistoryArticleVendeurData([])
        setLoading(false);
        setIsRefreshing(false);
        InteractionManager.runAfterInteractions(() => {
            customPopup.current.alert(ConstantString.CONNECT_SERVER_ERROR)
        })
    }

    const _onAddArticle = () => {
        _resetData()
        _resetService()
        navigate("ArticleScreen")
    }

    const _onRefresh = () => {
        setIsRefreshing(true)
        getArticleFunction();
    }

    const onSelectedBox = (item) => {
        let arr = [...arrayArticleId]
        let indexOf = arr.indexOf(item.id)
        if(indexOf !== -1) {
            arr.splice(indexOf,1)
            setArrayArticleId(arr)
        }
        else setArrayArticleId([...arrayArticleId, item.id])
    }

    const _onDebutDateSelect = (value) => {
        const currentDate = new Date(changeFormatDate(value))
        if (new Date().getTime() - currentDate.getTime() >= 0) {
            setDebutDate(new Date());
            if (Platform.OS === 'android') {
                customPopup.current.alert(ConstantString.STR_CHOOSE_DATE_MESSAGE)
            }
        } else {
            setDebutDate(currentDate)
        }
    };
    const _onSelectTimeSchedule = (data, day) => {
        let arr = [...arraySelectedDay]
        let indexOf = -1
        arr.map((e, index) => {
            if(e.day === day) {
                indexOf = index
            }
        })
        arr[indexOf].startTime = data
        arr[indexOf].endTime = data
        setArraySelectedDay(arr)
    }
    

    const compare = (a, b) => {
        const dayA = a.day
        const dayB = b.day
        
        let comparison = 0;
        if (dayA > dayB) {
            comparison = 1;
        } else if (dayA < dayB) {
            comparison = -1;
        }
        return comparison;
    }

    const _submitDialogQuicklyPost = () => {
        setVisibleDialogQuicklyPost(false)
        let currentDateParams = []
        const miniSecondOneDay = Constant.miniSecondOneDay
        const miniSecondOneMinute = Constant.miniSecondOneMinute
        const array = [...arraySelectedDay.sort(compare)]
        const miniSecondDebutDate = debutDate.length === 0 ? Date.now() : Date.parse(debutDate)
        if(isSchedule) {
            array.map((item) => {
                const fullDay = getDateByDay(item.day)
                let miniDateParams = new Date(fullDay + ' ' + item.startTime).getTime()
                if(miniDateParams + miniSecondOneMinute < Date.now() && item === new Date().getDay()) {
                    miniDateParams = miniDateParams + 7 * miniSecondOneDay
                }
                currentDateParams.push({
                    startTime: miniDateParams,
                    endHours: item.endHours,
                    endMinute: item.endMinute,
                    endTime: item.endTime
                })
            })
        }
        else {
            currentDateParams.push({
                startTime: miniSecondDebutDate,
                endHours: endHour,
                endMinute: endMinute,
                endTime: ''
            })
        }        
        _quicklyCreateArticle(currentDateParams)
    }

    const _quicklyCreateArticle = (currentDateParams) => {
        let startTime = debutDate ? new Date(debutDate) : new Date()
        let endHour = Number(endTime?.slice(0,2))
        let endMinute = Number(endTime?.slice(3))
        setVisibleDialogQuicklyPost(false)
        if(!isSchedule && (endTime === '')) {
            InteractionManager.runAfterInteractions(() => {
                customPopup.current.alert(ConstantString.STR_EMPTY_END_TIME);
            })
        }
        else if(isSchedule && (arraySelectedDay.length === 0 || !arraySelectedDay)) {
            InteractionManager.runAfterInteractions(() => {
                customPopup.current.alert(ConstantString.STR_EMPTY_DAY_OF_WEEK)
            })
        }
        else if(!isSchedule && (endHour == startTime.getHours() && endMinute == startTime.getMinutes())) {
            customPopup.current.alert(ConstantString.STR_ALERT_ENDTIME_SMALLER_STARTTIME)
        }
        else if(isSchedule) {
            let isTrue = true
            arraySelectedDay.map((e) => {
                if(!e.startTime) {
                    isTrue = false
                    InteractionManager.runAfterInteractions(() => {
                        customPopup.current.alert(ConstantString.STR_EMPTY_TIME)
                    })
                }
                else if(e.endTime === e.startTime) {
                    isTrue = false
                    InteractionManager.runAfterInteractions(() => {
                        customPopup.current.alert(ConstantString.STR_ALERT_ENDTIME_SMALLER_STARTTIME)
                    })
                }
            })
            if(isTrue) {
                InteractionManager.runAfterInteractions(() => {
                    setIsLoadingPopup(true)
                })
                const params = {
                    articleId: arrayArticleId,
                    dateArticles: currentDateParams,
                    isSchedule: isSchedule
                }
                props.actions.quicklyCreateArticle.quicklyCreateArticle(params, _onSuccessCreate, _onErrorCreate)
            }
        }
        else {
            InteractionManager.runAfterInteractions(() => {
                setIsLoadingPopup(true)
            })
            const params = {
                articleId: arrayArticleId,
                dateArticles: currentDateParams,
                isSchedule: isSchedule
            }
            props.actions.quicklyCreateArticle.quicklyCreateArticle(params, _onSuccessCreate, _onErrorCreate)
        }
    }

    const _onSuccessCreate = (data) => {
        props.actions.get_history_article_vendeur.getHistoryArticleVendeur(paramsPage, _onSuccesGetHistoryReducer, _onErrorGetHistoryReducer)
    }

    const _onSuccesGetHistoryReducer = (data) => {
        const dataSuccess = data.result.results
        _resetService()
        _resetData()
        setIsLoadingPopup(false)
        props.actions.get_history_article_vendeur.createArticle(dataSuccess)
    }

    const _onErrorGetHistoryReducer = (data) => {
        setIsLoadingPopup(false)
        InteractionManager.runAfterInteractions(() => {
            customPopup.current.alert(ConstantString.CONNECT_SERVER_ERROR)
        })
    }

    const _onErrorCreate = (data) => {
        setIsLoadingPopup(false)
        InteractionManager.runAfterInteractions(() => {
            customPopup.current.alert(ConstantString.CONNECT_SERVER_ERROR)
        })
    }

    useEffect(() => {
        setIsFirst(false)
        if(!isFirst) {
            setHistoryArticleVendeurData(props.historyArticleData)
        }
    },[props.historyArticleData])

    const _onEditArticle = (item) => {
        _resetData()
        _resetService()
        setIsLoadingPopup(true)
        const params = {
            articleId: item.id
        }
        props.actions.get_article_by_id.getArticleById(params, _onSuccess, _onError)
	}
	
	const _onSuccess = data => {
        setLoading(false)
		navigate("EditArticleScreen", {
			'articleData': data.result
        })
        setIsLoadingPopup(false)
    }
	
	const _onError = (data) => {
        InteractionManager.runAfterInteractions(() => {
            customPopup.current.alert(ConstantString.CONNECT_SERVER_ERROR)
        })
	}
    
    useEffect(() => {
        const notify = props.isNotify
        if(notify.articleId && !notify.foreground) {
            if(notify.typeId === '1') {
                navigate('NotifyEvaluation', {
                "articleId" : notify.articleId
                })
            }
            else{
                navigate('NotifyArrive', {
                    'distance': notify.distance,
                    'articleId': notify.articleId
                })
            }
        }
    },[props.isNotify])

    const _onCancelQuickPost = () => {
        _resetData()
        setVisibleDialogQuicklyPost(false)
    }

    const findIndexOf = (day) => {
        let arr = arraySelectedDay
        let indexOf = -1
        arr.map((e, index) => {
            if(e.day === day) {
                indexOf = index
            }
        })
        return indexOf
    }

    const _onChangeEndTime = (date, day) => {
        const moment = new Date()
        const momentDateLocal = moment.toLocaleDateString()
        const dateDebut = new Date(debutDate)
        const miniSecond5Hours = Constant.miniSecondFiveHours
        const miniEndTime = new Date(momentDateLocal + ' ' + date).getTime()
        const miniStartTime = new Date(debutDate ? (momentDateLocal + ' ' + dateDebut.getHours() + ':' + dateDebut.getMinutes()) : (momentDateLocal + ' ' + moment.getHours() + ':' + moment.getMinutes())).getTime()
        const indexOfTime = findIndexOf(day)
        const liveTime = miniEndTime - miniStartTime
        const liveHour = liveTime / Constant.miniSecondOneHours
        let arr = [...arraySelectedDay]
        if(!isSchedule) {
            if(!props.profileData.supplierType && (liveTime > miniSecond5Hours)) {
                setVisibleDialogQuicklyPost(false)
                InteractionManager.runAfterInteractions(() => {
                    customPopup.current.alert(ConstantString.STR_NOT_GREATER_5_HOURS)
                })
            }
            else if((liveTime === 0) || (liveTime < 0) ) {
                setVisibleDialogQuicklyPost(false)
                InteractionManager.runAfterInteractions(() => {
                    customPopup.current.alert(ConstantString.STR_ALERT_ENDTIME_SMALLER_STARTTIME)
                })
            }
            else {
                setEndTime(date)
                setEndHour(Math.floor(liveHour))
                setEndMinute(Math.ceil((liveHour - Math.floor(liveHour)) * 60))
            }
        }
        else {
            const miniStartTimeSchedule = new Date(momentDateLocal + ' ' + arraySelectedDay[indexOfTime].startTime).getTime()
            const liveTimeSchedule = miniEndTime - miniStartTimeSchedule
            const liveHourSchedule = liveTimeSchedule / Constant.miniSecondOneHours
            if(!props.profileData.supplierType && (liveTimeSchedule > miniSecond5Hours)) {
                setVisibleDialogQuicklyPost(false)
                InteractionManager.runAfterInteractions(() => {
                    customPopup.current.alert(ConstantString.STR_NOT_GREATER_5_HOURS)
                })
            }
            else if((liveTimeSchedule === 0) || (liveTimeSchedule < 0) ) {
                setVisibleDialogQuicklyPost(false)
                InteractionManager.runAfterInteractions(() => {
                    customPopup.current.alert(ConstantString.STR_ALERT_ENDTIME_SMALLER_STARTTIME)
                })
            }
            else {
                console.log('Math.floor(liveHourSchedule)',Math.floor(liveHourSchedule));
                
                arr[indexOfTime].endTime = date
                arr[indexOfTime].endHours = Math.floor(liveHourSchedule)
                arr[indexOfTime].endMinute = Math.ceil((liveHourSchedule - Math.floor(liveHourSchedule)) * 60)
                setArraySelectedDay(arr)
            }
        }
    }

    const onSchedule = (isOn) => {
        props.profileData.supplierType ?
        setIsSchedule(isOn)
        :
        customPopup.current.alert(ConstantString.STR_ALERT_NOT_PROFESSIONAL)
    }

    const _resetData = () => {
        setEndTime('')
        setIsSchedule(false)
        setArraySelectedDay([])
        setArrayArticleId([])
        setTimeOfSchedule('')
        setDebutDate(new Date())
    }

    const _resetService = () => {
        setIsDeleteArticle(false)
        setIsUpdateArticle(false)
    }

    const _onDeleteArticle = () => {
        if(historyArticleVendeurData.length === 0) {
            customPopup.current.alert(ConstantString.STR_ALERT_EMPTY_DATA)
        }
        else {
            setIsDeleteArticle(true)
            setIsUpdateArticle(false)
        }
        _resetData()
    }

    const _updateArticle = () => {
        if(historyArticleVendeurData.length === 0) {
            customPopup.current.alert(ConstantString.STR_ALERT_EMPTY_DATA)
        }
        else {
            setIsUpdateArticle(true)
            setIsDeleteArticle(false)
        }
        _resetData()
    }

    const onCancel = () => {
        _resetService()
        _resetData()
    }

    const onSubmit = () => {
        if(arrayArticleId.length === 0) {
            customPopup.current.alert(ConstantString.STR_PLEASER_CHOOSE_PUBLICATION)
        }
        else {
            if(isUpdateArticle) {
                setVisibleDialogQuicklyPost(true)
            }
            else if(isDeleteArticle) {
                setIsModalDeleteArticle(true)
            }
        }
    }

    const submitDeleteArticle = () => {
        setIsModalDeleteArticle(false)
        setIsLoadingPopup(true)
        props.actions.deleteArticleActions.deleteArticleAction(arrayArticleId, _onSuccessDeleteArticle, _onErrorDeleteArticle)
    }

    const _onSuccessDeleteArticle = (data) => {
        props.actions.get_history_article_vendeur.getHistoryArticleVendeur(paramsPage, _onSuccesGetHistoryReducer, _onErrorGetHistoryReducer)
    }

    const _onErrorDeleteArticle = () => {
        setIsLoadingPopup(false)
        InteractionManager.runAfterInteractions(() => {
            customPopup.current.alert(ConstantString.CONNECT_SERVER_ERROR)
        })
    }

    const onCancelDeleteArticle = () => {
        _resetData()
        setIsModalDeleteArticle(false)
    }

    return (
        <HistoryArticleVenduerComponent
            isLoading={isLoading}
            onAddArticle={_onAddArticle}
            isRefresing={isRefresing}
            onRefresh={_onRefresh}
            historyArticleVendeurData={historyArticleVendeurData}
            onSelectedBox={onSelectedBox}
            arrayArticleId={arrayArticleId}
            visibleDialogQuicklyPost={visibleDialogQuicklyPost}
            setVisibleDialogQuicklyPost={setVisibleDialogQuicklyPost}
            isSchedule={isSchedule}
            setIsSchedule={setIsSchedule}
            arraySelectedDay={arraySelectedDay}
            setArraySelectedDay={setArraySelectedDay}
            debutDate={debutDate}
            setEndHour={setEndHour}
            setEndMinute={setEndMinute}
            onDebutDateSelect={_onDebutDateSelect}
            onSelectTimeSchedule={_onSelectTimeSchedule}
            customPopup={customPopup}
            submitDialogQuicklyPost={_submitDialogQuicklyPost}
            onEditArticle = {_onEditArticle}
            isLoadingPopup={isLoadingPopup}
            onCancelDialogQuickPost={_onCancelQuickPost}
            endTime={endTime}
            onChangeEndTime={_onChangeEndTime}
            timeOfSchedule={timeOfSchedule}
            setEndTime={setEndTime}
            profileData={props.profileData}
            onSchedule={onSchedule}
            onDeleteArticle={_onDeleteArticle}
            submitDeleteArticle={submitDeleteArticle}
            isModalDeleteArticle={isModalDeleteArticle}
            onCancelDeleteArticle={onCancelDeleteArticle}
            visibleAddButton={visibleAddButton}
            setVisibleAddButton={setVisibleAddButton}
            updateArticle={_updateArticle}
            isDeleteArticle={isDeleteArticle}
            isUpdateArticle={isUpdateArticle}
            onCancel={onCancel}
            onSubmit={onSubmit}
        />
    );
}

const mapStateToProps = (state) => {
    return {
        profileData: state.updateProfile.profile,
        isNotify: state.isFirstTime.isFirstTime,
        historyArticleData: state.createArticle.createArticle
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            deleteArticleActions: bindActionCreators(deleteArticleActions, dispatch),
            quicklyCreateArticle: bindActionCreators(quicklyCreateArticle, dispatch),
            get_history_article_vendeur: bindActionCreators(getHistoryArticleAction, dispatch),
			sendDtProvider: bindActionCreators(sendDtProviderAction, dispatch),
			get_article_by_id: bindActionCreators(getArticleByIdAction, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryArticleVendeurScreen);