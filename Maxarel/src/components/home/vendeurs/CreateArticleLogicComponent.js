import React, { useEffect, useState } from 'react';
import { ConstantString } from '../../../utils/constant-string';
import { Constant } from '../../../utils/constant';
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import { CreateArticleComponent } from '../../home/vendeurs/CreateArticleComponent';
import { getDateByDay } from '../../../utils/getDateByDay';
import { InteractionManager } from 'react-native';
import { log } from 'react-native-reanimated';
import { changeFormatDate } from '../../../utils/changeFormatDate';

export const CreateArticleLogicComponent = props => {

    const {
		goBack,
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
		customPopup,isReadOnly,
		categoryName,unitTypeName,
		quantityUnitTypeName,selectTimeSchedule,
		onAction,onActionClick,
        isLimitedDescription,setIsLimitedDescription,
        onSchedule,isEmporter,
        setIsEmporter,isApporterContenants,
        setIsApporterContenants,
        isLydia,setIsLydia,
        onComePick,onEmporter,
        onApporterContenants,
        endTime,setEndTime,
        onChangeEndTime,modalProduct,
        setModalProduct,listProductSearch,
        setListProductSearch,onChangeInputSearch,
        profileData,isLoadingSearch,
        handleLoadMore,isLoadingFooterSearch,
        setIsLoadmoreSearch,paramGetProduct,
        setParamGetProduct,getProductByCategoryId,
        certificationData,setCertificationData,
        dropdownProductComponent,
        topPosition,setTopPosition,
        onShowModalListProduct,
        isLoadingCondition,setIsLoadingCondition
	} = props;

    let arrayImage = [];
    const paramsPage = {
        PageIndex: indexPageCategories,
        PageSize: 10,
	}
    useEffect(() => {
		if(!isReadOnly) {
			props.actions.categoryAction.get_categories(paramsPage, _getCategoriesSucces, _getCategoriesError);
        }
        props.actions.getCertificateAction.getCertificate(_onGetCertificateSuccess, _onGetCertificateError)
		props.actions.unitTypeAction.get_unit_type(_getUnitTypeSucces, _getUnitTypeError);
	}, [])
	
	useEffect(() => {
		if(!isReadOnly)
			props.actions.categoryAction.get_categories(paramsPage, _getCategoriesSucces, _getCategoriesError);
	}, [indexPageCategories])

    const _onGetCertificateSuccess = (data) => {
        setCertificationData(data.result)
        dropdownProductComponent.current.measure( (fx, fy, width, height, px, py) => {
            // console.log('Component width is: ' + width)
            // console.log('Component height is: ' + height)
            // console.log('X offset to frame: ' + fx)
            // console.log('Y offset to frame: ' + fy)
            // console.log('X offset to page: ' + px)
            // console.log('Y offset to page: ' + py)
            setTopPosition(py + height)
        })
        if(!isReadOnly) {
            setCertificationName(data?.result[0] || {})
        }
        else if(isReadOnly && !certificationName.name) {
            setCertificationName(data?.result[0] || {})
        }
    }

    const _onGetCertificateError = (data) => {
        console.log('Get Certification Error')
        setCertificationData([])
    }

    const _getCategoriesSucces = (data) => {
        setIsLoadingGetCategories(false);
        const defaultCategory = {id: '', name: ConstantString.STR_CHOOSE_CATEGORY, supplierId: '', supplierName: ''}
        if (data && data.result && data.result.results) {
            if(categoriesData.length === 0) {
                setCategoriesData([defaultCategory, ...categoriesData, ...data.result.results])
            }
            else {
                setCategoriesData([...categoriesData, ...data.result.results]);
            }
            getProductByCategoryId('')
			setTotalCount(data.result.totalCount);
        }
    }

    const _getCategoriesError = (error) => {
		setIsLoadingGetCategories(false);
        setCategoriesData([]);
	}
	
	const _setIndexPageCategories = () => {
		if(isLoadingGetCategories) {
			return;
		}
		if(indexPageCategories * 10 < parseInt(totalCount)) {
			setIsLoadingGetCategories(true);
			setIndexPageCategories(indexPageCategories + 1);
		}
	}
    const _getUnitTypeSucces = (data) => {
        if (data && data.result) {
            setUnitType(data.result)
        }
    }

    const _getUnitTypeError = (data) => {
        setUnitTypeId(0)
    }

    function _onClickItemUnitType(rowData) {
        setQuantityUnitTypeId(rowData.id)
    };

    function _onClickItemCategories(rowData) {
        setCategoryId(rowData.id)
        setParamGetProduct({...paramGetProduct, CategoryId: rowData.id})
        getProductByCategoryId(rowData.id);
    };

    function _onChangeTextProduct(value) {
        if (/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(value) == false) {
            setQuery(value)
            setProductName(value)
        } else {
            return;
        }
    }

    function _itemProductOnclick(item) {
        setQuery("");
        setProductName(item.name);
        setProductId(item.id);
        setPriceSuggestion(item.priceSuggestion)
    }

    function _onClickItemUnitTypePrice(rowData) {
        setUnitTypeId(rowData.id)
    };

    function _onEndHourSelect(value) {
        setEndHour(value);
    };

    function _onEndMinuteSelect(value) {
        setEndMinute(value);
    };

    function _onDebutDateSelect(value) {
        const moment = new Date()
        const fullDay = changeFormatDate(value)
        if (moment.getTime() - new Date(fullDay).getTime() >= 0) {
            setDebutDate(moment);
            if (Platform.OS === 'android') {
                customPopup.current.alert(ConstantString.STR_CHOOSE_DATE_MESSAGE)
            }
        } else {
            setDebutDate(new Date(fullDay))
        }
    };

    function _onQuantityChange(value) {
        setQuantity(value);
    };

    function _onDescriptionChange(value) {
        setDescrition(value)
        if(value.length > 500) {
            setIsLimitedDescription(true)
        }
        else setIsLimitedDescription(false)
    };

    function _onCertificationNameChange(value) {
        setCertificationName(value);
    };

    function _onPriceChange(value) {
        setPrice(value);
    };

    function _selectImageLibary(type) {
        ImagePicker.openPicker({
            width: 200,
            height: 200
        }).then(image => {
            if (type === "PRODUCT1") {
                const pathImage = Platform.OS === "ios" ? `file://${image.path}` : image.path;
                ImgToBase64.getBase64String(pathImage).then(base64String => {
                    setProduct1Base64(base64String)
                    arrayImage.push[base64String]
                    setShowModalProduct1(false)
                }).catch(err => {
                    setShowModalProduct1(false)
                    InteractionManager.runAfterInteractions(() => {
                        customPopup.current.alert(ConstantString.STR_CHOOSE_IMAGE_ERROR_MESSAGE);
                    })
                });
            } else {
                const pathImage = Platform.OS === "ios" ? `file://${image.path}` : image.path;
                ImgToBase64.getBase64String(pathImage).then(base64String => {
                    setProduct2Base64(base64String)
                    arrayImage.push[base64String]
                    setShowModalProduct2(false)
                }).catch(err => {
                    setShowModalProduct2(false)
                    InteractionManager.runAfterInteractions(() => {
                        customPopup.current.alert(ConstantString.STR_CHOOSE_IMAGE_ERROR_MESSAGE);
                    })
                });
            }
        });
    }

    function _takeImageLibary(type) {
        ImagePicker.openCamera({
            width: 200,
            height: 200
        }).then(image => {
            if (type === "PRODUCT1") {
                const pathImage = image.path;
                ImgToBase64.getBase64String(pathImage).then(base64String => {
                    setProduct1Base64(base64String)
                    arrayImage.push[base64String]
                    setShowModalProduct1(false)
                }).catch(err => {
                    setShowModalProduct1(false)
                    InteractionManager.runAfterInteractions(() => {
                        customPopup.current.alert(ConstantString.STR_CHOOSE_IMAGE_ERROR_MESSAGE);
                    })
                });
            } else {
                const pathImage = Platform.OS === "ios" ? `file://${image.path}` : image.path;
                ImgToBase64.getBase64String(pathImage).then(base64String => {
                    setProduct2Base64(base64String)
                    arrayImage.push[base64String]
                    setShowModalProduct2(false)
                }).catch(err => {
                    setShowModalProduct2(false)
                    InteractionManager.runAfterInteractions(() => {
                        customPopup.current.alert(ConstantString.STR_CHOOSE_IMAGE_ERROR_MESSAGE);
                    })
                });
            }
        });
    }

    const _submitDialogSuccess = () => {        
        setVisibleDiadlogSuccess(false)
        setTimeout(() => goBack(), 750)
    }

    const onSelectDay = (index) => {
        const fullDay = getDateByDay(index)
        setCurrentDate(fullDay)
    }

    const onSelectTimeSchedule = (data, day) => {
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
        const isProfessional = profileData?.supplierType || false
        if(!isSchedule) {
            if((liveTime > miniSecond5Hours) && !isProfessional) {
                InteractionManager.runAfterInteractions(() => {
                    customPopup.current.alert(ConstantString.STR_NOT_GREATER_5_HOURS)
                })
            }
            else if((liveTime === 0) || (liveTime < 0) ) {
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
            if((liveTimeSchedule > miniSecond5Hours) && !isProfessional) {
                customPopup.current.alert(ConstantString.STR_NOT_GREATER_5_HOURS)
            }
            else if((liveTimeSchedule === 0) || (liveTimeSchedule < 0) ) {
                customPopup.current.alert(ConstantString.STR_ALERT_ENDTIME_SMALLER_STARTTIME)
            }
            else {
                arr[indexOfTime].endTime = date
                arr[indexOfTime].endHours = Math.floor(liveHourSchedule)
                arr[indexOfTime].endMinute = Math.ceil((liveHourSchedule - Math.floor(liveHourSchedule)) * 60)                
                setArraySelectedDay(arr)
            }
        }
    }

    const _closeModalSearch = () => {
        setIsLoadmoreSearch(false)
        setModalProduct(false)
    }
	return (
        <CreateArticleComponent
            unitType={unitType}
            isPesticides={isPesticides}
            setPesticides={setPesticides}
            dataCategories={categoriesData}
            isCertification={isCertification}
            setCertification={setCertification}
            isCashPaymentMethod={isCashPaymentMethod}
            setCashPaymentMethod={setCashPaymentMethod}
            isCBPaymentMethod={isCBPaymentMethod}
            setCBPaymentMethod={setCBPaymentMethod}
            isChequePaymentMethod={isChequePaymentMethod}
            setChequePaymentMethod={setChequePaymentMethod}
            isComePick={isComePick}
            setComePick={setComePick}
            onPriceChange={_onPriceChange}
            onEndHourSelect={_onEndHourSelect}
            onQuantityChange={_onQuantityChange}
            onEndMinuteSelect={_onEndMinuteSelect}
            onDebutDateSelect={_onDebutDateSelect}
            onDescriptionChange={_onDescriptionChange}
            onClickItemUnitType={_onClickItemUnitType}
            onClickItemCategories={_onClickItemCategories}
            onClickItemUnitTypePrice={_onClickItemUnitTypePrice}
            onCertificationNameChange={_onCertificationNameChange}
            isShowModalProduct1={isShowModalProduct1}
            setShowModalProduct1={setShowModalProduct1}
            isShowModalProduct2={isShowModalProduct2}
            setShowModalProduct2={setShowModalProduct2}
            product1Base64={product1Base64}
            product2Base64={product2Base64}
            selectImageLibary={_selectImageLibary}
            takeImageLibary={_takeImageLibary}
            onChangeTextProduct={_onChangeTextProduct}
            itemProductOnclick={_itemProductOnclick}
            listProduct={listProduct}
            setListProduct={setListProduct}
            query={query}
            setQuery={setQuery}
            productName={productName}
            priceSuggestion={priceSuggestion}
            setCertificationName={setCertificationName}
            isLoading={isLoading}
            debutDate={debutDate}
            customPopup={customPopup}
            visibleDiadlog={visibleDiadlog}
            setVisibleDiadlog={setVisibleDiadlog}
            isCheckedCondition={isCheckedCondition}
            setCheckCondition={setCheckCondition}
            onSelectDay={onSelectDay}
            isSchedule={isSchedule}
            setIsSchedule={setIsSchedule}
            onSelectTimeSchedule={onSelectTimeSchedule}
            timeOfSchedule={timeOfSchedule}
            endHour={endHour}
            endMinute={endMinute}
            submitDialogSuccess={_submitDialogSuccess}
            arraySelectedDay={arraySelectedDay}
            setArraySelectedDay={setArraySelectedDay}
			setIndexPageCategories={_setIndexPageCategories}
			isLoadingGetCategories={isLoadingGetCategories}
			setIsLoadingGetCategories = {setIsLoadingGetCategories}
			isReadOnly ={isReadOnly}
			categoryName={categoryName}
			descrition={descrition}
			quantity = {quantity}
			unitTypeName = {unitTypeName}
			price = {price}
			quantityUnitTypeName = {quantityUnitTypeName}
			selectTimeSchedule = {selectTimeSchedule}
			onActionClick = {onActionClick}
			onAction = {onAction}
			setVisibleDiadlogSuccess={setVisibleDiadlogSuccess}
			visibleDiadlogSuccess={visibleDiadlogSuccess}
            certificationName = {certificationName}
            isLimitedDescription={isLimitedDescription}
            onSchedule={onSchedule}
            isEmporter={isEmporter}
            setIsEmporter={setIsEmporter}
            isApporterContenants={isApporterContenants}
            setIsApporterContenants={setIsApporterContenants}
            isLydia={isLydia}
            setIsLydia={setIsLydia}
            onComePick={onComePick}
            onEmporter={onEmporter}
            onApporterContenants={onApporterContenants}
            endTime={endTime}
            setEndTime={setEndTime}
            onChangeEndTime={_onChangeEndTime}
            modalProduct={modalProduct}
            setModalProduct={setModalProduct}
            setProductName={setProductName}
            setProductId={setProductId}
            setPriceSuggestion={setPriceSuggestion}
            listProductSearch={listProductSearch}
            onChangeInputSearch={onChangeInputSearch}
            profileData={profileData}
            isLoadingSearch={isLoadingSearch}
            isLoadingFooterSearch={isLoadingFooterSearch}
            handleLoadMore={handleLoadMore}
            closeModalSearch={_closeModalSearch}
            setCategoryId={setCategoryId}
            certificationData={certificationData}
            dropdownProductComponent={dropdownProductComponent}
            topPosition={topPosition}
            setTopPosition={setTopPosition}
            onShowModalListProduct={onShowModalListProduct}
            isLoadingCondition={isLoadingCondition}
            setIsLoadingCondition={setIsLoadingCondition}
        />
    );
};

