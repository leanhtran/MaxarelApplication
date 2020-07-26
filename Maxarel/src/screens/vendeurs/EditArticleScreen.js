import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import * as getUnitType from '../../actions/getUnitType';
import * as getCategoriesAction from '../../actions/getCategoriesAction';
import * as getProductByCategoryId from '../../actions/getProductAction';
import * as updateArticle from '../../actions/updateArticleAction';
import { checkEmpty } from '../../utils/validations';
import { CreateArticleLogicComponent } from '../../components/home/vendeurs/CreateArticleLogicComponent';
import * as getHistoryArticleAction from '../../actions/getHistoryArticleAction';
import * as getProfileAction from '../../actions/profileAction';
import { getDateByDay } from '../../utils/getDateByDay';
import { ConstantString } from '../../utils/constant-string';
import { Constant } from '../../utils/constant';
import ImgToBase64 from 'react-native-image-base64';
import { InteractionManager } from 'react-native';
import * as getCertificateAction from '../../actions/getCertificateAction'

function EditArticleScreen(props) {
	const articleData = useNavigationParam('articleData');
	const {
        userInfo
	} = props

	useEffect(() => {
        console.log('articleData', articleData);
        
		articleData.listImages.map((image, index) => {
			imageToBase64(Constant.urlLocal+image, index);
		})
	},[])
    const [certificationData, setCertificationData] = useState([])
    const customPopup = useRef(null);
    const { goBack } = useNavigation();
	const [unitTypeName, setUnitTypeName] = useState(articleData.unitTypeName);
	const [unitType, setUnitType] = useState([])
    const [isPesticides, setPesticides] = useState(articleData.isPesticides);
    const [isCashPaymentMethod, setCashPaymentMethod] = useState(articleData.isCash);
    const [isCBPaymentMethod, setCBPaymentMethod] = useState(articleData.isCB);
    const [isChequePaymentMethod, setChequePaymentMethod] = useState(articleData.isCheque);
	const [isCertification, setCertification] = useState(articleData.certificationName ? true : false);
    const [isComePick, setComePick] = useState(articleData.comePick);
    const [isShowModalProduct1, setShowModalProduct1] = useState(false);
    const [isShowModalProduct2, setShowModalProduct2] = useState(false);
    const [product1Base64, setProduct1Base64] = useState('');
    const [product2Base64, setProduct2Base64] = useState('');
    const [query, setQuery] = useState('');
    const [visibleDiadlog, setVisibleDiadlog] = useState(false);
    const [isCheckedCondition, setCheckCondition] = useState(false);
    const [listProductSearch, setListProductSearch] = useState([])
    const [priceSuggestion, setPriceSuggestion] = useState(articleData.priceSuggestion);
    const [productId, setProductId] = useState(articleData.productId);
    const [productName, setProductName] = useState(articleData.productName);
    const [categoryId, setCategoryId] = useState(articleData.categoryId);
    const [descrition, setDescrition] = useState(articleData.description);
    const [quantity, setQuantity] = useState(articleData.quantity);
    const [unitTypeId, setUnitTypeId] = useState(articleData.unitTypeId);
    const [quantityUnitTypeId, setQuantityUnitTypeId] = useState(articleData.unitTypeId);
    const [certificationName, setCertificationName] = useState({
        name: articleData.certificationName,
        id: articleData.certificationId,
        image: articleData.imageCertification
    })
    const dropdownProductComponent = useRef({})
    const [price, setPrice] = useState(articleData.price);
    const [debutDate, setDebutDate] = useState(_renderDebutDate(articleData))
    const [endHour, setEndHour] = useState(articleData.dateArticles[0].endHours);
    const [endMinute, setEndMinute] = useState(articleData.dateArticles[0].endMinute);
    const [isLoading, setLoading] = useState(false);
    const [isSchedule, setIsSchedule] = useState(articleData.isSchedule)
    const [currentDate, setCurrentDate] = useState([])
    const [visibleDiadlogSuccess, setVisibleDiadlogSuccess] = useState(false)
    const [arraySelectedDay, setArraySelectedDay] = useState(convertArraySelectedDay(articleData.dateArticles))
	const [totalCount, setTotalCount] = useState(0);
	const [categoryName, setCategoryName] = useState(articleData.categoryName);
	const [quantityUnitTypeName, setQuantityUnitTypeName] = useState(articleData.quantityUnitTypeName);
    const [timeOfSchedule, setTimeOfSchedule] = useState(convertTimeOfSchedule(articleData.dateSchedule));
    const [isLimitedDescription, setIsLimitedDescription] = useState(false)
    const [isEmporter, setIsEmporter] = useState(articleData.isEmporter)
    const [isApporterContenants, setIsApporterContenants] = useState(articleData.isApporterContenants)
    const [isLydia, setIsLydia] = useState(articleData.isLydia)
    const [endTime, setEndTime] = useState(_renderEndTime(articleData))
    const [modalProduct, setModalProduct] = useState(false)
    const [listProduct, setListProduct] = useState([]);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false)
    const [topPosition, setTopPosition] = useState(100)
    const [isLoadingCondition, setIsLoadingCondition] = useState(false)

	const customState = {
		unitTypeName, setUnitTypeName,
		isPesticides, setPesticides,
		isCashPaymentMethod, setCashPaymentMethod,
		isCBPaymentMethod, setCBPaymentMethod,
		isChequePaymentMethod, setChequePaymentMethod,
		isCertification, setCertification,
		isComePick, setComePick,
		isShowModalProduct1, setShowModalProduct1,
		isShowModalProduct2, setShowModalProduct2,
		product1Base64, setProduct1Base64,
		product2Base64, setProduct2Base64,
		query, setQuery,
		visibleDiadlog, setVisibleDiadlog,
		isCheckedCondition, setCheckCondition,
		priceSuggestion, setPriceSuggestion,
		productId, setProductId,
		productName, setProductName,
		categoryId, setCategoryId,
		descrition, setDescrition,
		quantity, setQuantity,
		unitTypeId, setUnitTypeId,
		quantityUnitTypeId, setQuantityUnitTypeId,
		certificationName, setCertificationName,
		price, setPrice,
		debutDate, setDebutDate,
		endHour, setEndHour,
		endMinute, setEndMinute,
		isLoading, setLoading,
		isSchedule, setIsSchedule,
		timeOfSchedule, setTimeOfSchedule,
		currentDate, setCurrentDate,
		visibleDiadlogSuccess, setVisibleDiadlogSuccess,
		arraySelectedDay, setArraySelectedDay,
		totalCount, setTotalCount,
		categoryName,
		unitType, setUnitType,
        quantityUnitTypeName,
        isLimitedDescription,setIsLimitedDescription,
        isEmporter,setIsEmporter,
        isApporterContenants,setIsApporterContenants,
        isLydia,setIsLydia,
        endTime,setEndTime,
        listProductSearch,setListProductSearch,
        isLoadingSearch,
        certificationData,setCertificationData,
        topPosition,setTopPosition,
        isLoadingCondition,setIsLoadingCondition
	}

	function _onUpdateArticleClick() {
        let startTime = debutDate ? new Date(debutDate) : new Date()
        let endHour = Number(endTime?.slice(0,2))
        let endMinute = Number(endTime?.slice(3))
		if((quantity == 0 || !quantity)) {
            customPopup.current.alert(ConstantString.STR_EMPTY_QUANTITY);
        }
        else if(!isComePick && !isEmporter && !isApporterContenants) {
            customPopup.current.alert(ConstantString.STR_COME_PICK_OR_TAKEAWAY)
        }
        else if(price !== '' && Number(price) !== 0 && !isCashPaymentMethod && !isCBPaymentMethod && !isChequePaymentMethod && !isLydia) {
            customPopup.current.alert(ConstantString.STR_ALERT_PAYMENT_METHOD_IS_NULL)
        }
        else if(isSchedule && (arraySelectedDay.length === 0 || !arraySelectedDay)) {
            customPopup.current.alert(ConstantString.STR_EMPTY_DAY_OF_WEEK);
        } 
        else if(!isSchedule && (endTime === '')) {
            customPopup.current.alert(ConstantString.STR_EMPTY_END_TIME)
        }
        else if(isLimitedDescription) {
            customPopup.current.alert(ConstantString.STR_LIMITED_DESCRIPTION)
        }
        else if(endHour == startTime.getHours() && endMinute == startTime.getMinutes()) {
            customPopup.current.alert(ConstantString.STR_ALERT_ENDTIME_SMALLER_STARTTIME)
        }
        else if(isSchedule) {
            let isTrue = true
            arraySelectedDay.map((e) => {
                if(!e.startTime) {
                    isTrue = false
                    customPopup.current.alert(ConstantString.STR_EMPTY_TIME)
                }
                else if(e.endTime === e.startTime) {
                    isTrue = false
                    customPopup.current.alert(ConstantString.STR_ALERT_ENDTIME_SMALLER_STARTTIME)
                }
            })
            if(isTrue) {
                setVisibleDiadlog(true)
            }
        }
        else {
            _updateArticleFunction();
        }

    };

    function _renderDebutDate(articleData) {
        const debutDate = new Date(Number(articleData.dateArticles[0].startTime))
        if(articleData.isSchedule) {
            return new Date
        } 
        else {
            return debutDate
        }
    }

    function _renderEndTime(articleData) {
        const endTime = articleData.dateArticles[0].endTime
        if(articleData.isSchedule) {
            return ''
        } 
        else {
            const hour = new Date(Number(endTime)).getHours()
            const minute = new Date(Number(endTime)).getMinutes()
            return (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)
        }
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

    const _updateArticleFunction = () => {
        setVisibleDiadlog(false);
        InteractionManager.runAfterInteractions(() => {
            setLoading(true);
        })
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
        let paramCreateArticle = {
			id: articleData.id,
            price: price === '' ? 0 : price,
            quantity: quantity,
            isPesticides: isPesticides,
            certificationId: certificationName.id,
            description: descrition,
            comePick: isComePick,
            unitTypeId: unitTypeId,
            quantityUnitTypeId: quantityUnitTypeId,
            dateArticles: currentDateParams.sort(compare),
			userId: articleData.userId,
            paymentMethod: {
                isCash: isCashPaymentMethod,
                isCB: isCBPaymentMethod,
                isCheque: isChequePaymentMethod,
                isLydia: isLydia
            },
            isSchedule: isSchedule,
            isEmporter: isEmporter,
            isApporterContenants: isApporterContenants,
			isActive: true,
			listImages:[
				product1Base64,
				product2Base64
			]
        }
        props.actions.articleAction.updateArticle(paramCreateArticle, _updateArticleSuccess, _updateArticleError);
    }

    const _updateArticleSuccess = (data) => {
		const paramsPage = {
			PageIndex: 1,
			PageSize: 100,
		}
        props.actions.get_history_article_vendeur.getHistoryArticleVendeur(paramsPage, _onSuccesGetHistoryReducer, _onErrorGetHistoryReducer)
	}
	
    const _onSuccesGetHistoryReducer = (data) => {
        setVisibleDiadlogSuccess(true)
        setLoading(false)
        props.actions.get_history_article_vendeur.createArticle(data.result.results)
	}
	

    const _onErrorGetHistoryReducer = (data) => {

    }
	
	const _updateArticleError = (error) => {
        setLoading(false)
        if (error && error.error) {
            customPopup.current.alert(error.error.details)
        } else {
            customPopup.current.alert(ConstantString.CONNECT_SERVER_ERROR);
        }
	}
	
	const _submitDialogSuccess = () => {        
        setVisibleDiadlogSuccess(false)
        goBack()
	}
	
	function convertArraySelectedDay(arrayDay){
        let arr = []
        if(!arrayDay) return;
        else if(isSchedule) {
            arrayDay.map((item) => {
                console.log('effect', item);
                const dateEndTime = new Date(Number(item.endTime))
                let dateStartTime = new Date(Number(item.startTime))
                let endTime = dateEndTime.getHours() + ":" + dateEndTime.getMinutes()
                let startTime = dateStartTime.getHours() + ":" + dateStartTime.getMinutes()
                let day = new Date(parseInt(item.startTime)).getDay()
                arr.push({
                    day: day,
                    endHours: item.endHours,
                    endMinute: item.endMinute,
                    endTime: endTime,
                    startTime: startTime
                })
            })
            return arr
        }
        else if (!isSchedule) {
            return []
        }
        
	}

	function convertTimeOfSchedule(timeOfSchedule) {
		var date    = new Date(parseInt(timeOfSchedule)),
		hours   = date.getHours(),
		minutes = date.getMinutes();

		return ("0" + hours).slice(-2) + ':' + ("0" + minutes).slice(-2);
	}

	function imageToBase64(pathImage, index) {
		ImgToBase64.getBase64String(pathImage).then(base64String => {
			if(index === 0) {
				setProduct1Base64(base64String);
            }
			else setProduct2Base64(base64String);
		}).catch(err => {
			customPopup.current.alert(ConstantString.STR_CHOOSE_IMAGE_ERROR_MESSAGE);
		});
	}

    const _onSchedule = (isOn) => {
        const isProffesional = props.updateProfile?.supplierType || false
        if(isProffesional) {
            setIsSchedule(isOn)
        }
        else {
            customPopup.current.alert(ConstantString.STR_ALERT_NOT_PROFESSIONAL)
        }
    }

    const _onComePick = (isOn) => {
        setComePick(isOn)
    }

    const _onEmporter = (isOn) => {
        setIsEmporter(isOn)
    }
    
    const _onApporterContenants = (isOn) => {
        setIsApporterContenants(isOn)
    }

    const _onChangeInputSearch = () => {

    }

	return (
        <CreateArticleLogicComponent
			actions={props.actions}
			goBack={goBack}
			customPopup={customPopup}
			{...customState}
            isReadOnly={true}
            onSchedule={_onSchedule}
			onActionClick = {_onUpdateArticleClick}
            onAction = {_updateArticleFunction}
            onComePick={_onComePick}
            onEmporter={_onEmporter}
            onApporterContenants={_onApporterContenants}
            modalProduct={modalProduct}
            setModalProduct={setModalProduct}
            listProduct={listProduct}
            setListProduct={setListProduct}
            profileData={props.updateProfile}
            onChangeInputSearch={_onChangeInputSearch}
            dropdownProductComponent={dropdownProductComponent}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        updateProfile: state.updateProfile.profile
	}
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
			get_history_article_vendeur: bindActionCreators(getHistoryArticleAction, dispatch),
            categoryAction: bindActionCreators(getCategoriesAction, dispatch),
            unitTypeAction: bindActionCreators(getUnitType, dispatch),
            productAction: bindActionCreators(getProductByCategoryId, dispatch),
            articleAction: bindActionCreators(updateArticle, dispatch),
            getCertificateAction: bindActionCreators(getCertificateAction, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditArticleScreen);
