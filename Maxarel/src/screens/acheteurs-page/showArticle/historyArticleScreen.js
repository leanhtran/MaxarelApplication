import React, { useState,useEffect, useRef } from 'react'
import { 
    Platform, InteractionManager, 
} from 'react-native'
import HistoryArticleComponent from '../../../components/home/acheteur-page/showArticle/historyArticleComponent'
import { useNavigation, useNavigationParam } from "react-navigation-hooks";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getHistoryArticleAction from '../../../actions/getHistoryArticleAction';
import * as rememberProductAction from '../../../actions/rememberProductAction';
import Geolocation from '@react-native-community/geolocation';
import { ConstantString } from '../../../utils/constant-string';
import { Constant } from '../../../utils/constant';
import { callMaxarel } from '../../../utils/callMaxrel'
import { myWidth } from '../../../utils/dimension';
import AsyncStorage from '@react-native-community/async-storage';
import { DEVICE_TOKEN } from '../../../actions/actiontypes';
import Geocoder from 'react-native-geocoding';
import { changeFormatDate } from '../../../utils/changeFormatDate';

function HistoryArticleScreen(props) {
    const {goBack, navigate} = useNavigation()
    const isCustomer = useNavigationParam('isCustomer')
    const customPopup = useRef(null);
    const [selectedFilter, setSelectedFilter] = useState(2)
    const [historyArticleData, setHistoryArticleData] = useState([])
    const [title, setTitle] = useState('Actuellement disponible')
    const [productData, setProductData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentValue, setCurrentValue] = useState('')
    const scrollFlatList = useRef(null)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [isHidden, setIsHidden] = useState(true)
    const [paramPosition, setParamPosition] = useState({latitude: 0, longitude: 0})
    const [isLoadMore, setIsLoadMore] = useState(false)
    const [datePicker, setDatePicker] = useState(new Date())
    const [visibleDialogRememberProduct, setVisibleDialogRememberProduct] = useState(false)
    const [productId, setProductId] = useState('')
    const [visiblePopupLoading, setVisiblePopupLoading] = useState(false)
    const [visibleModalSearch, setVisibleModalSearch] = useState(false)
    const [titleCurrentPosition, setTitleCurrentPosition] = useState('')
    const filterArticleData = [
        {value: ConstantString.STR_LIEU, id: 0},
        {value: ConstantString.STR_PRODUCT, id: 1},
        {value: ConstantString.STR_TODAY, id: 2}
    ]
    const [defaultPosition, setDefaultPosition] = useState('')
    const [valueFilter, setValueFilter] = useState(ConstantString.STR_TODAY)
    const [loadingScroll, setLoadingScroll] = useState(false)
    const [currentPosition, setCurrentPosition] = useState('')
    const [isFirst, setIsFirst] = useState(true)
    const [timeoutSearch, setTimeoutSearch] = useState()
    
    const _renderMomentLocal = () => {
        return Date.now()
    }
    const paramsByProduitId = {
        PageIndex : 1,
        PageSize: Constant.PageSize,
        ProductId: 0,
        CurrentLocation: currentPosition,
        CheckLocation: false
    }
    const paramsByDate = {
        PageIndex : 1,
        PageSize: Constant.PageSize,
        Date: _renderMomentLocal(),
        CurrentLocation: currentPosition,
        CheckLocation: false,
    }
    const paramsByLocation = {
        PageIndex : 1,
        PageSize: Constant.PageSize,
        CurrentLocation: currentPosition,
        CheckLocation: true
    }
    const [params, setParams] = useState(paramsByDate)

    const _goBack = () => {
        goBack()
    }

    //Set params by value filter
    const _setValueFilter = (value) => {
        setValueFilter(value)
        setLoadingScroll(false)
        setDatePicker(new Date())
        if(value === ConstantString.STR_LIEU) {
            setSelectedFilter(0)
            setIsLoading(true)
            setTitle(ConstantString.STR_TITLE_BY_LIEU)
            setParams(paramsByLocation)
        }
        if(value === ConstantString.STR_PRODUCT) {
            setSelectedFilter(1)
        }
        if(value === ConstantString.STR_TODAY) {
            
            setSelectedFilter(2)
            setIsLoading(true)
            setTitle(ConstantString.STR_TITLE_BY_TODAY)
            setParams(paramsByDate)
        }
    }

    const _onDatePicker = (date) => {
        setIsLoading(true)
        const fullDay = changeFormatDate(date)
        let dateParams = Date.parse(fullDay)
        const currentDate = new Date(dateParams).toLocaleDateString()
        if(currentDate === new Date().toLocaleDateString()) {
            dateParams = Date.now()
        }
        const params = {
            ...paramsByDate,
            Date: dateParams
        }
        setDatePicker(new Date(changeFormatDate(date)))
        setParams(params)
    }

    const _getCurrentPosition = () => {
        let options = {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 1000
        }
    
        if (Platform.OS === 'android') {
            options = {
            enableHighAccuracy: false,
            timeout: 30000
            }
        }

        Geolocation.getCurrentPosition(
            (position) => {
                const latitude = JSON.stringify(position.coords.latitude)
                const longitude = JSON.stringify(position.coords.longitude)
                Geocoder.init(ConstantString.KEY_GG_API, {language : "en"})
                Geocoder.from(Number(latitude),Number(longitude))
                .then(json => {
                    const arrayData = json.results[0].address_components
                    let addressYourPosition = ''
                    for(let i = 1 ; i < arrayData.length; i++) {
                        if(i === arrayData.length - 1) {
                            addressYourPosition = addressYourPosition + arrayData[i].long_name
                        }
                        else addressYourPosition = addressYourPosition + arrayData[i].long_name + ', '
                    }
                    setDefaultPosition(addressYourPosition)
                    setTitleCurrentPosition(addressYourPosition)
                    setCurrentPosition(latitude + "," + longitude)
                    setParamPosition({latitude: Number(latitude), longitude: Number(longitude)})
                    const param = {...paramsByDate,CurrentLocation: latitude + "," + longitude}
                    props.actions.get_history_article.getHistoryArticle(param, _onSuccesGetHistoryArticle, _onErrorGetHistoryArticle)
                })
                .catch(error => {
                })                
            },
            (error) => {
                const param = {...paramsByDate,CurrentLocation: ""}
                props.actions.get_history_article.getHistoryArticle(param, _onSuccesGetHistoryArticle, _onErrorGetHistoryArticle)
                customPopup.current.alert(ConstantString.STR_ALERT_TIME_OUT)
            },
            options
        )
    }

    useEffect(() => {
        
    },[])

    //Call api whenever change params
    useEffect(() => {
        if(isFirst) {
            _getCurrentPosition()
            setIsFirst(false)
        }
        else if(!loadingScroll && !isFirst)
        {
            props.actions.get_history_article.getHistoryArticle(params, _onSuccesGetHistoryArticle, _onErrorGetHistoryArticle)
        }
    },[params])

    const _onSuccesGetHistoryArticle = (data) => {
        setIsLoading(false)
        setLoadingScroll(false)
        setHistoryArticleData(data.result.results)
        if(data.result.results.length === Constant.PageSize) {
            setIsLoadMore(true)
        }
        else setIsLoadMore(false)
    }


    const _onErrorGetHistoryArticle = (data) => {
        setIsLoading(false)
        setHistoryArticleData([])
        customPopup.current.alert(ConstantString.CONNECT_SERVER_ERROR)
    }

    const _onChangeTextInputProduct = text => {
        clearTimeout(timeoutSearch)

        if(text === '') {
            setCurrentValue(text)
            setTimeout(() => {
                setProductData([])
            }, 500)
        }
        if(text !== '') {
            setCurrentValue(text)
            const param = {
                PageIndex: 1,
                PageSize: 100,
                Keyword: text,
                CategoryId: ''
            }
            setTimeoutSearch(setTimeout(() => {
                props.actions.get_history_article.getProductByInputText(param, _onSuccesGetProduct, _onErrorGetProduct)
            }, 2000))
        }
        // clearTimeout(getProduit)
        // text = text.trim()
        // if(text === '') {
        //     setIsHidden(true)
        // }
        // else {  
        //     setIsHidden(false)
        // }
        // setCurrentValue(text)
        // const getProduit = setTimeout(() => {
        // const param = {
        //     PageIndex: 1,
        //     PageSize: 10,
        //     Keyword: text.trim(),
        //     CategoryId: ''
        // }
        // if(text !== '') {
        //     props.actions.get_history_article.getProductByInputText(param, _onSuccesGetProduct, _onErrorGetProduct)
        // }
        // },1000)
    }
    
    const _onSuccesGetProduct = (data) => {
        setProductData(data.result.results)
    }


    const _onErrorGetProduct = (data) => {
    }
    

    const _setProductId = item => {
        setCurrentValue('')
        setIsLoading(true)
        setTitle(item.name)
        setProductData([])
        setProductId(item.id)
        const param = {...paramsByProduitId, ProductId: item.id}        
        props.actions.get_history_article.getHistoryArticle(param, _onSuccesGetProductById, _onErrorGetProductById)
    }

    const _onSuccesGetProductById = (data) => {
        setIsLoading(false)
        setLoadingScroll(false)
        setHistoryArticleData(data.result.results)
        if(data.result.results.length === 0) {
            InteractionManager.runAfterInteractions(() => {
                setVisibleDialogRememberProduct(true)
            })
        }
        if(data.result.results.length === Constant.PageSize) {
            setIsLoadMore(true)
        }
        else setIsLoadMore(false)
    }


    const _onErrorGetProductById = (data) => {
        setIsLoading(false)
        setHistoryArticleData([])
        customPopup.current.alert(ConstantString.CONNECT_SERVER_ERROR)
    }

    const handleLoadMore = () => {
        if(isLoadMore) {
            if (!loadingScroll) {
                setLoadingScroll(true)
                const param = {...params, PageIndex: params.PageIndex + 1}
                setParams(param);
                props.actions.get_history_article.getHistoryArticle(param, _onSuccesLoadMore, _onErrorGetHistoryArticle)
            }
        }
    };


    const _onSuccesLoadMore = (data) => {
        if(data.result.results.length < Constant.PageSize) {
            setLoadingScroll(false)
            setIsLoadMore(false)
            setIsLoading(false)
            if(data.result.results.length > 0) {
                setHistoryArticleData([...historyArticleData.concat(data.result.results)])
            }
        }
        else {
            setIsLoadMore(true)
            setLoadingScroll(false)
            setIsLoading(false)
            setHistoryArticleData([...historyArticleData.concat(data.result.results)])
        }
    }
    

    const onRefresh = () => {
        setIsRefreshing(true)

        let options = {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 1000
        }
    
        if (Platform.OS === 'android') {
            options = {
            enableHighAccuracy: false,
            timeout: 30000
            }
        }

        Geolocation.getCurrentPosition(
            (position) => {
                const latitude = JSON.stringify(position.coords.latitude)
                const longitude = JSON.stringify(position.coords.longitude)
                Geocoder.init(ConstantString.KEY_GG_API, {language : "fr"})
                Geocoder.from(Number(latitude),Number(longitude))
                .then(json => {
                    const arrayData = json.results[0].address_components
                    let addressYourPosition = ''
                    for(let i = 1 ; i < arrayData.length; i++) {
                        if(i === arrayData.length - 1) {
                            addressYourPosition = addressYourPosition + arrayData[i].long_name
                        }
                        else addressYourPosition = addressYourPosition + arrayData[i].long_name + ', '
                    }
                    setDefaultPosition(addressYourPosition)
                    setTitleCurrentPosition(addressYourPosition)
                    setCurrentPosition(latitude + "," + longitude)
                    setParamPosition({latitude: Number(latitude), longitude: Number(longitude)})
                    const param = {...params,CurrentLocation: latitude + "," + longitude, PageIndex: 1}
                    setParams(param)
                    props.actions.get_history_article.getHistoryArticle(param, _onSuccesRefreshing, _onErrorRefreshing)
                })
                .catch(error => customPopup.current.alert(ConstantString.STR_ALERT_TIME_OUT))                
            },
            (error) => {
                customPopup.current.alert(ConstantString.STR_ALERT_TIME_OUT)
            },
            options
        )

        const param = {...params,PageIndex: 1}
        setParams(param)
        props.actions.get_history_article.getHistoryArticle(param, _onSuccesRefreshing, _onErrorRefreshing)
    }

    const _onSuccesRefreshing = (data) => {
        setIsRefreshing(false)
        setLoadingScroll(false)
        setIsLoading(false)
        setHistoryArticleData(data.result.results)
        if(data.result.results.length === Constant.PageSize) {
            setIsLoadMore(true)
        }
        else setIsLoadMore(false)
    }

    const _onErrorRefreshing = () => {
        setIsLoading(false)
        setIsRefreshing(false)
        setLoadingScroll(false)
        customPopup.current.alert(ConstantString.CONNECT_SERVER_ERROR)
    }

    const setArticleId = (item) => {
        navigate('DetailArticle', {
            'articleId': item.id,
            'distance': item.distance,
            'paramPosition': paramPosition,
            'suppliedId': item.suppliedId,
            'datePicker': datePicker,
            'isActive': item.isActive
        })
    }

    const _callMaxarel = () => {
        callMaxarel()
    }

    const _cancelDialog = () => {
        setVisibleDialogRememberProduct(false)
    }

    const getDeviceToken = async () => {
        try {
            const deviceToken = await AsyncStorage.getItem(DEVICE_TOKEN);
            let osEnum = Platform.OS === 'ios' ? '0' : '1'
            const params = {
                productId: productId,
                token: deviceToken,
                osEnum: osEnum
            }
            setVisibleDialogRememberProduct(false)
            InteractionManager.runAfterInteractions(() => {
                setVisiblePopupLoading(true)
            })
            props.actions.rememberProductAction.rememberProduct(params, _onSuccessRemember, _onErrorRemember)
        } catch (e) {
            console.log('Get device token error: ', e);
        }
    }

    const _submitDialog = () => {
        getDeviceToken()
    }

    const _onSuccessRemember = (data) => {
        setVisiblePopupLoading(false)
        InteractionManager.runAfterInteractions(() => {
            customPopup.current.alert(ConstantString.STR_REMEMBER_PRODUCT_SUCCESS)
        })
    }

    const _onErrorRemember = (data) => {
        setVisiblePopupLoading(false)
        InteractionManager.runAfterInteractions(() => {
            customPopup.current.alert(ConstantString.CONNECT_SERVER_ERROR)
        })
    }

    const _setCurrentPosition = (location) => {
        setParams({...paramsByLocation, CurrentLocation: location.lat + ',' + location.lng})
        setVisibleModalSearch(false)
        InteractionManager.runAfterInteractions(() => {
            setIsLoading(true)
        })
    }
    
    return (
            <HistoryArticleComponent 
                goBack={_goBack}
                title={title}
                filterArticleData={filterArticleData}
                selectedFilter={selectedFilter}
                historyArticleData={historyArticleData}
                valueFilter={valueFilter}
                _setValueFilter={_setValueFilter}
                onChangeTextInputProduct={_onChangeTextInputProduct}
                productData={productData}
                setProductId={_setProductId}
                loadingScroll={loadingScroll}
                isLoading={isLoading}
                currentValue={currentValue}
                handleLoadMore={handleLoadMore}
                onRefresh={onRefresh}
                isRefreshing={isRefreshing}
                scrollFlatList={scrollFlatList}
                setArticleId={setArticleId}
                isHidden={isHidden}
                customPopup={customPopup}
                callMaxarel={_callMaxarel}
                isCustomer={isCustomer}
                onDatePicker={_onDatePicker}
                datePicker={datePicker}
                visibleDialogRememberProduct={visibleDialogRememberProduct}
                cancelDialogCard={_cancelDialog}
                submitDialogCard={_submitDialog}
                visiblePopupLoading={visiblePopupLoading}
                setCurrentPosition={_setCurrentPosition}
                visibleModalSearch={visibleModalSearch}
                setVisibleModalSearch={setVisibleModalSearch}
                titleCurrentPosition={titleCurrentPosition}
                setTitleCurrentPosition={setTitleCurrentPosition}
                paramPosition={paramPosition}
                defaultPosition={defaultPosition}
            />
    )
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            get_history_article: bindActionCreators(getHistoryArticleAction, dispatch),
            rememberProductAction: bindActionCreators(rememberProductAction, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryArticleScreen);
