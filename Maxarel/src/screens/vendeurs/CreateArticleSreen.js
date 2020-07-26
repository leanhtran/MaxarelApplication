import React, { useState, useRef } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigation } from 'react-navigation-hooks';
import * as getUnitType from '../../actions/getUnitType';
import { ConstantString } from '../../utils/constant-string';
import * as getCategoriesAction from '../../actions/getCategoriesAction';
import * as getProductByCategoryId from '../../actions/getProductAction';
import * as createArticleAction from '../../actions/getArticleByIdAction';
import * as getCertificateAction from '../../actions/getCertificateAction'
import { CreateArticleComponent } from '../../components/home/vendeurs/CreateArticleComponent';
import * as getHistoryArticleAction from '../../actions/getHistoryArticleAction';
import { getDateByDay } from '../../utils/getDateByDay';
import { checkEmpty } from '../../utils/validations';

import { CreateArticleLogicComponent } from '../../components/home/vendeurs/CreateArticleLogicComponent';
import { InteractionManager } from 'react-native';
import { Constant } from '../../utils/constant';
import { Images } from '../../utils/images';
function CreateArticleScreen(props) {

    const customPopup = useRef(null);
    const { goBack } = useNavigation();
	const [unitType, setUnitType] = useState([]);
	const [unitTypeName, setUnitTypeName] = useState();
    const [isPesticides, setPesticides] = useState(false);
    const [isCashPaymentMethod, setCashPaymentMethod] = useState(false);
    const [isCBPaymentMethod, setCBPaymentMethod] = useState(false);
    const [isChequePaymentMethod, setChequePaymentMethod] = useState(false);
    const [listProduct, setListProduct] = useState([]);
    const [listProductSearch, setListProductSearch] = useState([])
    const [categoriesData, setCategoriesData] = useState([]);
    const [isCertification, setCertification] = useState(false);
    const [isComePick, setComePick] = useState(false);
    const [isShowModalProduct1, setShowModalProduct1] = useState(false);
    const [isShowModalProduct2, setShowModalProduct2] = useState(false);
    const [product1Base64, setProduct1Base64] = useState('');
    const [product2Base64, setProduct2Base64] = useState('');
    const [query, setQuery] = useState('');
    const [visibleDiadlog, setVisibleDiadlog] = useState(false);
    const [isCheckedCondition, setCheckCondition] = useState(false);
    const [modalProduct, setModalProduct] = useState(false)
    const [priceSuggestion, setPriceSuggestion] = useState(0);
    const [productId, setProductId] = useState(null);
    const [productName, setProductName] = useState(ConstantString.STR_CHOOSE_PRODUCT);
    const [categoryId, setCategoryId] = useState(null);
    const [descrition, setDescrition] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitTypeId, setUnitTypeId] = useState();
	const [quantityUnitTypeId, setQuantityUnitTypeId] = useState(0);
	const [quantityUnitTypeName, setQuantityUnitTypeName] = useState('kg');
    const [certificationName, setCertificationName] = useState({})
    const [certificationData, setCertificationData] = useState([])
    const [price, setPrice] = useState('');
    const [debutDate, setDebutDate] = useState('');
    const [endHour, setEndHour] = useState('H');
    const [endMinute, setEndMinute] = useState('M');
    const [isLoading, setLoading] = useState(false);
    const [isSchedule, setIsSchedule] = useState(false)
    const [timeOfSchedule, setTimeOfSchedule] = useState()
    const [currentDate, setCurrentDate] = useState([])
    const [visibleDiadlogSuccess, setVisibleDiadlogSuccess] = useState(false)
    const [arraySelectedDay, setArraySelectedDay] = useState([])
	const [indexPageCategories, setIndexPageCategories] = useState(1);
	const [isLoadingGetCategories, setIsLoadingGetCategories] = useState(true);
	const [totalCount, setTotalCount] = useState(0);
    const [categoryName, setCategoryName] = useState(ConstantString.STR_CHOOSE_CATEGORY)
    const [isLimitedDescription, setIsLimitedDescription] = useState(false)
    const [isEmporter, setIsEmporter] = useState(false)
    const [isApporterContenants, setIsApporterContenants] = useState(false)
    const [isLydia, setIsLydia] = useState(false)
    const [endTime, setEndTime] = useState('')
    const [timeoutSearch, setTimeoutSearch] = useState(0)
    const [isLoadingSearch, setIsLoadingSearch] = useState(false)
    const [isLoadmoreSearch, setIsLoadmoreSearch] = useState(false)
    const [paramGetProduct, setParamGetProduct] = useState({
        PageIndex: 1,
        PageSize: Constant.PageSize,
        Keyword: '',
        CategoryId: ''
    })
    const [isLoadingFooterSearch, setIsLoadingFooterSearch] = useState(true)
    const dropdownProductComponent = useRef({})
    const [topPosition, setTopPosition] = useState(100)
    const [isLoadingCondition, setIsLoadingCondition] = useState(false)

	const customState = {
		unitType, setUnitType,
		isPesticides, setPesticides,
		isCashPaymentMethod, setCashPaymentMethod,
		isCBPaymentMethod, setCBPaymentMethod,
		isChequePaymentMethod, setChequePaymentMethod,
		listProduct, setListProduct,
		categoriesData, setCategoriesData,
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
		indexPageCategories, setIndexPageCategories,
		isLoadingGetCategories, setIsLoadingGetCategories,
		totalCount, setTotalCount,
		quantityUnitTypeName,categoryName,
		unitType,unitTypeName,
        isEmporter,setIsEmporter,
        isApporterContenants,setIsApporterContenants,
        isLydia,setIsLydia,
        listProductSearch,setListProductSearch,
        isLoadingSearch,setIsLoadingSearch,
        isLoadingFooterSearch,setIsLoadmoreSearch,
        paramGetProduct,setParamGetProduct,
        certificationData,setCertificationData,
        topPosition,setTopPosition,
        isLoadingCondition,
        setIsLoadingCondition
	}
	function _onCreateArticleClick() {
        let startTime = debutDate ? new Date(debutDate) : new Date()
        let endHour = Number(endTime?.slice(0,2))
        let endMinute = Number(endTime?.slice(3))
        if (categoryId == null || productId == null) {
            customPopup.current.alert(ConstantString.STR_CHOOSE_PRODUCT_CATEGORY_MESSAGE)
        } 
        else if((quantity == 0 || !quantity)) {
            customPopup.current.alert(ConstantString.STR_EMPTY_QUANTITY)
        }
        else if(!isComePick && !isEmporter && !isApporterContenants) {
            customPopup.current.alert(ConstantString.STR_COME_PICK_OR_TAKEAWAY)
        }
        else if(price !== '' && Number(price) !== 0 && !isCashPaymentMethod && !isCBPaymentMethod && !isChequePaymentMethod && !isLydia) {
            customPopup.current.alert(ConstantString.STR_ALERT_PAYMENT_METHOD_IS_NULL)
        }
        else if(isSchedule && (arraySelectedDay.length === 0 || !arraySelectedDay)) {
            customPopup.current.alert(ConstantString.STR_EMPTY_DAY_OF_WEEK)
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
            setVisibleDiadlog(true)
        }

    };

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

    const _createArticleFunction = () => {
        setVisibleDiadlog(false);
        InteractionManager.runAfterInteractions(() => {
            setLoading(true)
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
            categoryId: categoryId,
            productId: productId,
            price: price === '' ? 0 : price,
            quantity: quantity,
            isPesticides: isPesticides,
            certificationId: isCertification ? certificationName.id : '',
            description: descrition,
            comePick: isComePick,
            unitTypeId: unitTypeId ? unitTypeId : unitType[0].id,
            quantityUnitTypeId: quantityUnitTypeId,
            dateArticles: currentDateParams.sort(compare),
            listImages: [
                product1Base64,
                product2Base64
            ],
            paymentMethod: {
                isCash: isCashPaymentMethod,
                isCB: isCBPaymentMethod,
                isCheque: isChequePaymentMethod,
                isLydia: isLydia
            },
            isSchedule: isSchedule,
            isEmporter: isEmporter,
            isApporterContenants: isApporterContenants
        }
        console.log('paramCreateArticle',paramCreateArticle.certificationId);
        props.actions.articleAction.createArticleByUser(paramCreateArticle, _createArticleSuccess, _createArticleError);
    }

    const _createArticleSuccess = (data) => {
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
	
	const _createArticleError = (error) => {
        setLoading(false)
        if (error && error.error) {
            alert(error.error.details);
        } else {
            customPopup.current.alert(ConstantString.CONNECT_SERVER_ERROR);
        }
	}
	
	const _submitDialogSuccess = () => {        
        setVisibleDiadlogSuccess(false)
        goBack()
    }

    const _onSchedule = (isOn) => {
        const isProffesional = props.updateProfile.supplierType
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
    
    const _onChangeInputSearch = (text) => {
        setIsLoadingFooterSearch(true)
        setIsLoadmoreSearch(false)
        setIsLoadingSearch(true)
        getProductByText(text)
    }

    function getProductByText(text) {
        clearTimeout(timeoutSearch)
        setTimeoutSearch(setTimeout(() => {
            let params = {
                ...paramGetProduct,
                PageIndex: 1,
                Keyword: text.trim(),
            }
            setParamGetProduct(params)
            props.actions.productAction.get_produit_by_categoriesId(params, _onGetProductSuccess, _onGetProductError)
        }, 2000))
    }

    function getProductByCategoryId(id) {
        let paramGetProduct = {
            PageIndex: 1,
            PageSize: Constant.PageSize,
            Keyword: "",
            CategoryId: id
        }
        setParamGetProduct(paramGetProduct)
        props.actions.productAction.get_produit_by_categoriesId(paramGetProduct, _onGetProductSuccess, _onGetProductError)
    }
    
    const _onGetProductSuccess = (data) => {
        setIsLoadingSearch(false)
        setProductId(null)
        setProductName(ConstantString.STR_CHOOSE_PRODUCT)
        setPriceSuggestion(0)
        if (data.result && data.result.results && data.result.results.length > 0) {
            setListProduct(data.result.results)
            setListProductSearch(data.result.results)
        } else {
            setListProduct([])
            setListProductSearch([])
        }
    }

    const _onGetProductError = (error) => {
        setIsLoadingSearch(false)
        setProductId(null)
        setListProduct([])
        setListProductSearch([])
    }
    

    const handleLoadMore = () => {
        if(!isLoadmoreSearch) {
            setIsLoadingFooterSearch(true)
            setIsLoadmoreSearch(true)
            const params = {
                ...paramGetProduct,
                PageIndex: paramGetProduct.PageIndex + 1,
            }
            setParamGetProduct(params)
            props.actions.productAction.get_produit_by_categoriesId(params, _onGetProductLoadMoreSuccess, _onGetProductLoadMoreError)
        }
    };

    const _onGetProductLoadMoreSuccess = (data) => {
        let arrayListProduct = [...listProduct]
        let arrayListProductSearch = [...listProductSearch]
        data.result.results.map((e) => {
            arrayListProduct.push(e)
            arrayListProductSearch.push(e)
        })
        setListProduct(arrayListProduct)
        setListProductSearch(arrayListProductSearch)
        
        if(data.result.results.length === Constant.PageSize) {
            setIsLoadmoreSearch(false)
        }
        else if(data.result.results.length < Constant.PageSize) {
            setIsLoadingFooterSearch(false)
        }
    }

    const _onGetProductLoadMoreError = (data) => {
        setIsLoadingFooterSearch(false)
    }

    const _onShowModalListProduct = () => {
        setModalProduct(true)
        if(productId != null) {
            const params = {
                ...paramGetProduct,
                PageIndex: 1,
                Keyword: ''
            }
            setParamGetProduct(params)
            props.actions.productAction.get_produit_by_categoriesId(params, _onGetProductWhenClickAgainSuccess, _onGetProductError)
        }
    }

    const _onGetProductWhenClickAgainSuccess = (data) => {
        setIsLoadingSearch(false)
        if (data.result && data.result.results && data.result.results.length > 0) {
            setListProduct(data.result.results)
            setListProductSearch(data.result.results)
        } else {
            setListProduct([])
            setListProductSearch([])
        }
    }

	return (
        <CreateArticleLogicComponent
			actions={props.actions}
			goBack={goBack}
			customPopup={customPopup}
			onActionClick={_onCreateArticleClick}
            onAction={_createArticleFunction}
            isLimitedDescription={isLimitedDescription}
            setIsLimitedDescription={setIsLimitedDescription}
            onSchedule={_onSchedule}
            {...customState}
            onComePick={_onComePick}
            onEmporter={_onEmporter}
            onApporterContenants={_onApporterContenants}
            endTime={endTime}
            setEndTime={setEndTime}
            modalProduct={modalProduct}
            setModalProduct={setModalProduct}
            onChangeInputSearch={_onChangeInputSearch}
            profileData={props.updateProfile}
            handleLoadMore={handleLoadMore}
            isLoadingFooterSearch={isLoadingFooterSearch}
            getProductByCategoryId={getProductByCategoryId}
            dropdownProductComponent={dropdownProductComponent}
            onShowModalListProduct={_onShowModalListProduct}
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
            articleAction: bindActionCreators(createArticleAction, dispatch),
            getCertificateAction: bindActionCreators(getCertificateAction, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticleScreen);
