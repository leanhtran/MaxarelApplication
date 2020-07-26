import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    Modal,
    TextInput,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
	TouchableHighlight,
	ActivityIndicator,
    FlatList,
    Platform,
} from 'react-native';
import Dialog from "react-native-dialog";
import { Images } from "../../../utils/images";
import DatePicker from 'react-native-datepicker'
import { CheckBox } from 'react-native-elements';
import { Card } from 'react-native-shadow-cards';
import { ColorCustom } from '../../../utils/color';
import Popup from '../../base_components/AlertCustom';
import ToggleSwitch from 'toggle-switch-react-native';
import { useNavigation } from "react-navigation-hooks";
import ModalDropdown from 'react-native-modal-dropdown';
import { myHeight, myWidth } from "../../../utils/dimension";
import { ConstantString } from '../../../utils/constant-string';
import DropdownLazyLoading from '../../componentcommun/drop-down-lazy-loading';
import { arrayDay } from '../../../utils/arrayDayOfWeek';
import PopupLoading from '../../../screens/popupLoading';
import { Constant } from '../../../utils/constant';
import { styles } from './StylesCreateArticle'
import { renderDayMultiLanguage } from '../../../utils/renderDayMultiLanguage';
import LoadingScreen from '../../../screens/loadingScreen';
import FastImage from 'react-native-fast-image';
import GetConditionScreen from '../../../screens/startscreen/getConditionScreen';

export const CreateArticleComponent = props => {
    const { goBack } = useNavigation();
    const {
		descrition,quantity,
        isLoading,unitType,
        customPopup,isPesticides,
        setPesticides,onPriceChange,
        dataCategories,isCertification,
        setCertification,onQuantityChange,
        onDebutDateSelect,onDescriptionChange,
        isCashPaymentMethod,setCashPaymentMethod,
        isComePick,onComePick,
        isCBPaymentMethod,setCBPaymentMethod,
        isChequePaymentMethod,setChequePaymentMethod,
        onClickItemCategories,onClickItemUnitTypePrice,
        isShowModalProduct1,setShowModalProduct1,
        isShowModalProduct2,setShowModalProduct2,
        product1Base64,product2Base64,
        takeImageLibary,selectImageLibary,
        listProduct,onShowModalListProduct,
        priceSuggestion,productName,
        setCertificationName,debutDate,
        visibleDiadlog,setVisibleDiadlog,
        isCheckedCondition,setCheckCondition,
        isSchedule,onSelectTimeSchedule,
        timeOfSchedule,visibleDiadlogSuccess,
        submitDialogSuccess,arraySelectedDay,
        setArraySelectedDay,setIndexPageCategories,
		isLoadingGetCategories,isReadOnly,
		categoryName,unitTypeName,
		certificationName,price,
		onAction,onActionClick,
        isLimitedDescription,onSchedule,
        isEmporter,onEmporter,
        isApporterContenants,onApporterContenants,
        isLydia,setIsLydia,
        endTime,setEndTime,
        onChangeEndTime,setModalProduct,
        modalProduct,setProductName,
        setProductId,setPriceSuggestion,
        listProductSearch,onChangeInputSearch,
        profileData,isLoadingSearch,
        isLoadingFooterSearch,handleLoadMore,
        closeModalSearch,setCategoryId,
        certificationData,dropdownProductComponent,
        topPosition,setTopPosition,
        isLoadingCondition,setIsLoadingCondition
	} = props;

    const _renderRowCategories = (rowData) => {
        return (
            <TouchableHighlight underlayColor='cornflowerblue'>
                <View style={{ height: 40, justifyContent: 'center', marginLeft: 10 }}>
                    <Text style={{ fontSize: 16 }}>
                        {rowData.name}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    const _onSelectItemCategories = (rowData) => {
        onClickItemCategories(rowData)
        return (
            <Text>
                {rowData.name}
            </Text>
        )
    }

    const _onSelectCertificate = (rowData) => {
        setCertificationName(rowData)
        return (
            <Text>
                {rowData.name}
            </Text>
        );
    }

    const _renderRowUnitTypePrice = (rowData) => {
        return (
            <TouchableHighlight underlayColor='cornflowerblue'>
                <View style={{ height: 40, justifyContent: 'center', width: myWidth * 0.22, paddingLeft: 10 }}>
                    <Text style={{ fontSize: 16 }}>
                        {rowData.name}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    const _onSelectItemUnitTypePrice = (rowData) => {
        onClickItemUnitTypePrice(rowData);
        const { name } = rowData;
        return `${name}`;
    }

    const showModalProduct1 = () => {
        return (
            <View style={styles.loaddingStyle}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    supportedOrientations={['portrait', 'landscape']}
                    isVisible={isShowModalProduct1}>
                    <View style={styles.loaddingViewStyle}>
                        <View style={styles.modalStyle}>
                            <Text style={styles.textTitleModal}>{ConstantString.STR_ADD_PRODUCT_PHOTO}</Text>

                            <View style={styles.textViewModal}>
                                <TouchableOpacity
                                    onPress={() => {
                                        takeImageLibary("PRODUCT1")
                                    }}>
                                    <Text style={styles.textModal}>{ConstantString.STR_TAKE_PHOTO}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.textViewModal}>
                                <TouchableOpacity
                                    onPress={() => {
                                        selectImageLibary("PRODUCT1")
                                    }}>
                                    <Text style={styles.textModal}>{ConstantString.STR_CHOOSE_IN_LIBRARY}</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                onPress={() => setShowModalProduct1(false)}
                                style={styles.viewCanelModal}>
                                <Text style={styles.cancelViewStyle}>{ConstantString.STR_CANCEL}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View >
        )
    }

    const showModalProduct2 = () => {
        return (
            <View style={styles.loaddingStyle}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    supportedOrientations={['portrait', 'landscape']}
                    isVisible={isShowModalProduct2}>
                    <View style={styles.loaddingViewStyle}>
                        <View style={styles.modalStyle}>
                            <Text style={styles.textTitleModal}>{ConstantString.STR_ADD_PRODUCT_PHOTO}</Text>

                            <View style={styles.textViewModal}>
                                <TouchableOpacity
                                    onPress={() => {
                                        takeImageLibary("PHOTO")
                                    }}
                                >
                                    <Text style={styles.textModal}>{ConstantString.STR_TAKE_PHOTO}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.textViewModal}>
                                <TouchableOpacity
                                    onPress={() => {
                                        selectImageLibary("PHOTO")
                                    }}
                                >
                                    <Text style={styles.textModal}>{ConstantString.STR_CHOOSE_IN_LIBRARY}</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                onPress={() => setShowModalProduct2(false)}
                                style={styles.viewCanelModal}>
                                <Text style={styles.cancelViewStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View >
        )
    }

    const showDialogPolyce = () => {
        return (
            <Dialog.Container contentStyle={styles.contentStyleCondition} visible={visibleDiadlog}>
                <Dialog.Title style={styles.textTitleDialog}>{ConstantString.STR_TITLE_CHARTER_MAXAREL}</Dialog.Title>
                <View style={styles.viewCondition}>
                    <View style={styles.viewScrollView}>
                        <ScrollView
                            style={styles.scrollViewDialog}
                            showsVerticalScrollIndicator={false}>
                            {/* <Text style={styles.textConditionContent}>
                            {ConstantString.STR_CHARTER_MAXAREL}
                            </Text> */}
                            <GetConditionScreen isLoading={isLoadingCondition} setIsLoading={setIsLoadingCondition} />
                        </ScrollView>
                    </View>
                    <View style={styles.rowCheckBox}>
                        <View style={{ marginLeft: -10 }}>
                            <CheckBox
                                checked={true}
                                size={24}
                                containerStyle={{ width: 25 }}
                                center
                                checked={isCheckedCondition}
                                onPress={() => setCheckCondition(!isCheckedCondition)}
                            />
                        </View>
                        <TouchableOpacity 
                            style={{ flex: 1 }}
                            onPress={()=> setCheckCondition(!isCheckedCondition)}>
                            <Text style={styles.textQuestionDialog}>
                                {ConstantString.STR_AGREE_CHARTER_MAXAREL}
                        </Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.rowBtn}>

                    <TouchableOpacity
                        style={styles.btnCancel}
                        onPress={() => setVisibleDiadlog(false)}>
                        <Text style={styles.textCancel}>
                            {ConstantString.STR_CANCEL}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btnOk}
                        disabled={!isCheckedCondition}
                        onPress={() => onAction()}
                    >
                        <Text style={[styles.okTextConditionStyle, { color: isCheckedCondition ? ColorCustom.GREEN : '#D9DADF' }]}>
                            {ConstantString.STR_OK}
                        </Text>
                    </TouchableOpacity>

                </View>
            </Dialog.Container>
        )
    }

    const _renderEndTime = () => {
        const endHour = endTime?.slice(0,2)
        const endMinute = endTime?.slice(3)
        return endHour + 'h'+ endMinute
    }

    const _renderStartTime = () => {
        const hourDebut = new Date(debutDate).getHours()
        const hour = new Date().getHours()
        const minute = new Date().getMinutes()
        const minuteDebut = new Date(debutDate).getMinutes()
        return debutDate !== '' ? hourDebut + 'h' + (minuteDebut < 10 ? '0' + minuteDebut : minuteDebut) : hour + 'h' + (minute < 10 ? '0' + minute : minute)
    }

    const _renderStartTimeSchedule = () => {
        if(timeOfSchedule !== undefined) {
            return timeOfSchedule.toString().slice(0,2) + 'h' + timeOfSchedule.toString().slice(3)
        }
    }

    const _renderStartDate = () => {
        if(debutDate !== '') {
            const selectedDate = new Date(debutDate)
            const month = selectedDate.getMonth() + 1
            const date = selectedDate.getDate()
            const year = selectedDate.getFullYear()
            const fullDate = (date < 10 ? '0' + date : date) + '-' + (month < 10 ? '0' + month : month) + '-'  + year
            return fullDate
        }
        else {
            const selectedDate = new Date()
            const month = selectedDate.getMonth() + 1
            const date = selectedDate.getDate()
            const year = selectedDate.getFullYear()
            const fullDate = (date < 10 ? '0' + date : date) + '-' + (month < 10 ? '0' + month : month) + '-'  + year
            return fullDate
        }
    }

    const _renderStyleBtnSelectedDay = (index) => {
        if(arraySelectedDay.findIndex((e) => e.day === index) !== -1) {
            return styles.btnSelectedRowDay
        }
        else return styles.btnRowDay
    }

    const _renderStyleTextDay = index => {
        if(arraySelectedDay.findIndex((e) => e.day === index) !== -1) {
            return styles.textSelectedRowDay
        }
        else return styles.textRowDay
    }
    const _renderRowDay = () => {
        return (
            <View style={styles.rowBtnDay}>
                {
                arrayDay.map((item, index) => {
					return arraySelectedDay.includes(item) ? 
						(
							<View style={styles.viewBtnDay}>
								<TouchableOpacity onPress={() => _onPressDay(index)} style={_renderStyleBtnSelectedDay(index)}>
									<Text style={_renderStyleTextDay(index)}>
										{item}
									</Text>
								</TouchableOpacity>
							</View>
						)
					: (
                        <View style={styles.viewBtnDay}>
                            <TouchableOpacity onPress={() => _onPressDay(index)} style={_renderStyleBtnSelectedDay(index)}>
                                <Text style={_renderStyleTextDay(index)}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                    
					})
                }
            </View>
        )
    }

    const _onPressDay = (value) => {
        console.log('arraySelectedDay',arraySelectedDay)
        const indexOf = arraySelectedDay.findIndex((e) => e.day === value)
        if(indexOf === -1) {
            let item = {
                day: value,
            }
            setArraySelectedDay([...arraySelectedDay, item])
        }
        else {
            let arr = [...arraySelectedDay]
            console.log(arr);
            arr.splice(indexOf,1)
            setArraySelectedDay(arr)
        }
    }
    const showDialogSuccess = () => {        
        return (
            <Dialog.Container contentStyle={styles.contentDialogSuccess} visible={visibleDiadlogSuccess}>
                <Dialog.Title style={styles.textTitleDialog}>Votre annonce est publiée</Dialog.Title>
                <View style={styles.viewCondition}>
                {
                isSchedule ? 
                    <Text style={styles.textContentSuccess}>
                        {ConstantString.STR_ALERT_CREATE_SUCCESS_ON_SCHEDULE}
                    </Text>
                    :
                    <Text style={styles.textContentSuccess}>
                        Votre publication sera automatiquement publiée {_renderStartTime()} le {_renderStartDate()} et annulée  {_renderEndTime()}
                    </Text>
                }
                </View>
            
                <TouchableOpacity
                    style={{marginTop: 20 , width: '100%', height: 45, justifyContent: "center", alignItems: 'center', borderColor: "gray", borderTopWidth: 0.5 }}
                    onPress={submitDialogSuccess}
                >
                    <Text style={styles.okTextConditionStyle}>
                        {ConstantString.STR_OK}
                    </Text>
                </TouchableOpacity>
            </Dialog.Container>
        )
    }

	const _renderFooter = () => {
		return(
			isLoadingGetCategories ? <ActivityIndicator size='large' color='gray' /> : <Text></Text>
		)
	}

    const _renderFooterItemSearch = () => {
        return(
			isLoadingFooterSearch ? <ActivityIndicator size='large' color='gray' /> : null
		)
    }

    const _renderRowCertificate = (certificationData) => {
        const linkImage = Constant.urlLocal.concat(certificationData.image)
        return (
            <TouchableHighlight underlayColor='cornflowerblue'>
                <View style={styles.btnCertificate}>
                    <FastImage
                        style={styles.certificate}
                        source={{
                            uri: linkImage,
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    
                    <Text style={{ fontSize: 16 }}>
                        {certificationData.name}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    const _setProductName = (item) => {
        setProductName(item.name)
        setModalProduct(false)
        setProductId(item.id)
        setCategoryId(item.categoryId)
        setPriceSuggestion(item.priceSuggestion)
    }

    const _keyExtractor = (item, index) => String(index)

    const ItemFlatList = (item, index) => {
        return(
            <TouchableOpacity 
                onPress={() => _setProductName(item)} 
                style={[styles.btnProductName, {borderBottomWidth: index === listProductSearch.length - 1 ? 0 : 0.5}]}
            >
                <Text>
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
    }

    const compareDay = (a, b) => {
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

    const compareProduct = (a, b) => {
        const nameA = a.name
        const nameB = b.name
        
        let comparison = 0;
        if (nameA > nameB) {
            comparison = 1;
        } else if (nameA < nameB) {
            comparison = -1;
        }
        return comparison;
    }
    
    const _renderTimeOfSchedule = (item) => {
        return item.startTime
    }

    const _renderEndTimeSchedule = (item) => {
        return item.endTime
    }

    const ItemDatePicker = (item, index) => {
        return (
            <View style={{flexDirection: 'row', borderBottomWidth: 1, borderColor: ColorCustom.LIGHT_GRAY_1, paddingBottom: 5}}>
                <View style={{flex: 0.5}}>
                    {
                        index === 0 && 
                        <Text style={styles.titleCalendar}>
                            {ConstantString.STR_DAY}
                        </Text>
                    }

                    <Text style={styles.textDayDatePicker}>
                        {renderDayMultiLanguage(item.day)}
                    </Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>
                    {
                        index === 0 && 
                        <Text style={styles.titleCalendar}>
                            {ConstantString.STR_TITLE_START}
                        </Text>
                    }
                    <View style={{flexDirection: 'row'}}>
                        <DatePicker 
                            style={styles.btnTime}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            placeholder={ConstantString.STR_START_TIME}
                            mode={'time'}
                            is24Hour={true}
                            locale={'fr_GB'}
                            customStyles={{
                                dateInput: {
                                    borderWidth: 0
                                },
                                placeholderText: {
                                    color: ColorCustom.DARK_GRAY,
                                    fontSize: 14,
                                    fontFamily: ConstantString.FONT_ITALIC,
                                    marginTop: Platform.OS === 'ios' ? 5 : 0,
                                },
                            }}
                            showIcon={false}
                            date={_renderTimeOfSchedule(item)}
                            onDateChange={(date) => {
                                // setEndTime(date, item)
                                onSelectTimeSchedule(date, item.day)}
                            } 
                        />
                    </View>
                </View>

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                    {
                        index === 0 && 
                        <Text style={styles.titleCalendar}>
                            Fin
                        </Text>
                    }
                    </View>

                    <View style={{flexDirection: 'row', flex: 1}}>
                        <DatePicker 
                            style={styles.btnTime}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            placeholder={ConstantString.STR_END_TIME}
                            mode={'time'}
                            locale={'fr_GB'}
                            customStyles={{
                                dateInput: {
                                    borderWidth: 0
                                },
                                placeholderText: {
                                    color: ColorCustom.DARK_GRAY,
                                    fontSize: 14,
                                    fontFamily: ConstantString.FONT_ITALIC,
                                    marginTop: Platform.OS === 'ios' ? 5 : 0,
                                },
                            }}
                            is24Hour={true}
                            showIcon={false}
                            date={_renderEndTimeSchedule(item)}
                            onDateChange={(date) => onChangeEndTime(date, item.day)}
                        />
                    </View>
                </View>
            </View>
        )
    }

    const _renderProduct = () => {
        return(
            <Modal transparent={true} visible={modalProduct} animationType="fade">
                <TouchableOpacity activeOpacity={1} onPress={closeModalSearch} style={{flex: 1, alignItems: 'center'}}>
                    <View style={[styles.modalContainer, {marginTop: topPosition}]}>
                            <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
                                <Image source={Images.search} style={{position: 'absolute', left: 5, width: 20, height: 20, resizeMode: 'contain'}} />

                                <TextInput 
                                    autoFocus={true}
                                    style={styles.inputSearchDropdown}
                                    placeholder={ConstantString.STR_SEARCH}
                                    onChangeText={onChangeInputSearch}
                                />
                            </View>

                            {
                                isLoadingSearch ?
                                <View style={{paddingVertical: 15, alignItems: 'center', justifyContent: 'center'}}>
                                    <ActivityIndicator size='large' color='gray' />
                                </View>
                                :
                                <>
                                {
                                    listProductSearch.length > 0 ?
                                    <FlatList
                                        style={{height: listProductSearch.length > 4 ? 170 : 'auto', minHeight: 80}}
                                        showsVerticalScrollIndicator={false}
                                        data={listProductSearch.sort(compareProduct)}
                                        keyExtractor={_keyExtractor}
                                        renderItem={({ item, index }) => ItemFlatList(item, index)}
                                        onEndReachedThreshold={1}
                                        onEndReached={handleLoadMore}
                                        ListFooterComponent={_renderFooterItemSearch}
                                    />
                                    :
                                    <View style={{paddingVertical: 15, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={Images.empty} style={styles.imageEmpty} />

                                        <Text style={{color: ColorCustom.DARK_GRAY, fontSize: 16}}>
                                            {ConstantString.STR_NO_DATA}
                                        </Text>
                                    </View>
                                }
                                </>
                            }
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    const _renderDefaultCertificate = () => {
        return (
            <Text>
                {certificationName?.name || '...'}
            </Text>
        )
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>

            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.btnBack}
                    onPress={() => goBack()}
                >
                    <Text style={styles.textBtnBack}>
                        {ConstantString.STR_BACK}
                    </Text>
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Text style={styles.titleTextStyle}>{ConstantString.STR_TITLE_ARTICLE}</Text>
                </View>
            </View>

            <ScrollView
                onMomentumScrollEnd={() => {
                    dropdownProductComponent.current.measure( (fx, fy, width, height, px, py) => {
                        setTopPosition(py + height)
                    })
                }}
                showsVerticalScrollIndicator={false}>
                <View style={styles.containerForm}>
                    <DropdownLazyLoading
						disabled ={isReadOnly}
                        style={[styles.categoriesDropDownStyle, {opacity: isReadOnly ? 0.5 : 1}]}
                        textStyle={{ fontSize: 18 }}
                        dropdownStyle={{ width: myWidth - 40, marginLeft: -6 }}
                        showsVerticalScrollIndicator={false}
                        options={dataCategories}
                        renderRow={_renderRowCategories}
                        defaultValue={categoryName}
						renderButtonText={(rowData) => _onSelectItemCategories(rowData)}
						onScrollToTop={() => {
							setIndexPageCategories();
						}}
						renderFooter = {_renderFooter}
                    />
                <View style={{ height: 10, width: myWidth }} />
                    
                <TouchableOpacity ref={dropdownProductComponent} disabled={isReadOnly} onPress={onShowModalListProduct} style={[styles.certificateContainer, {opacity: isReadOnly ? 0.5 : 1}]}>
                    <View style={{ height: 44, width: '95%', justifyContent: 'center' }}>
                        <Text style={{paddingLeft: 10, fontSize: 17}}>
                            {productName}
                        </Text>
                    </View>
                    <Image style = {styles.imageArrowDropDownCertificate}
                            source={Images.imgDropDown}/>
                </TouchableOpacity>

                <View style={styles.imageProductContainer}>
                    <View style={{ flex: 1, height: 120, marginRight: 5 }}>
                            <View>
                                <Image
                                    style={styles.productStyle}
                                    source={product1Base64 ? { uri: 'data:image/jpeg;base64,' + product1Base64 } : Images.productDefault}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowModalProduct1(true)}
                                    style={styles.cameraIconStyle}>
                                    <Image
                                        style={styles.cameraImageStyle}
                                        source={Images.camera}
                                    />

                                </TouchableOpacity>
                            </View>
                    </View>

                    <View style={{ flex: 1, height: 120, marginLeft: 5 }}>
                            <View>
                                <Image
                                    style={styles.productStyle}
                                    source={product2Base64 ? { uri: 'data:image/jpeg;base64,' + product2Base64 } : Images.productDefault}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowModalProduct2(true)}
                                    style={styles.cameraIconStyle}>
                                    <Image
                                        style={styles.cameraImageStyle}
                                        source={Images.camera}
                                    />
                                </TouchableOpacity>
                            </View>
                    </View>

                </View>

                    <Text style={{color: 'red', paddingLeft: 10, height: 15, fontFamily: ConstantString.FONT_REGULAR, marginTop: 10, marginBottom: -10}}>
                        { 
                            isLimitedDescription?
                            "* 500 caractères maximum"
                            : 
                            null
                        }
                    </Text> 

                <TextInput
                    returnKeyType='next'
                    placeholder={ConstantString.STR_DESCRIPTION}
                    placeholderTextColor={ColorCustom.GRAY}
                    keyboardType="default"
                    multiline={true}
                    // maxLength={500}
                    defaultValue={descrition}
                    style={styles.descriptionInputStyle}
                    onChangeText={text => onDescriptionChange(text)}
                />
                
                <View style={styles.quantityContainer}>
                    <TextInput
                        keyboardType='default'
                        style={styles.quantityInputStyle}
                        placeholder={ConstantString.STR_QUANTITY + ' ' + ConstantString.STR_AVAILABLE.toLowerCase() + 's'}
                        placeholderTextColor={ColorCustom.GRAY}
                        defaultValue={quantity.toString()}
                        onChangeText={text => onQuantityChange(text)}
                    />
                </View>

                <Card
                    elevation={4}
                    style={styles.rawItemCardStyle}>

                    <Text style={styles.textLabelStyle}>{ConstantString.STR_COME_PICK}</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 5 }}>
                        <ToggleSwitch
                            isOn={isComePick}
                            disabled={false}
                            onColor={ColorCustom.TOGGLE_ON}
                            offColor={ColorCustom.RED}
                            onToggle={isOn => onComePick(isOn)}
                        />
                    </View>
                </Card>

                <Card
                    elevation={4}
                    style={styles.rawItemCardStyle}>
                    <Text style={styles.textLabelStyle}>{ConstantString.STR_TAKEAWAY}</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 5 }}>
                        <ToggleSwitch
                            isOn={isEmporter}
                            onColor={ColorCustom.TOGGLE_ON}
                            offColor={ColorCustom.RED}
                            onToggle={isOn => onEmporter(isOn)}
                        />
                    </View>
                </Card>

                <Card
                    elevation={4}
                    style={styles.rawItemCardStyle}>
                    <Text style={styles.textLabelStyle}>{ConstantString.STR_BRING_YOUR_CONTAINERS}</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 5 }}>
                        <ToggleSwitch
                            isOn={isApporterContenants}
                            onColor={ColorCustom.TOGGLE_ON}
                            offColor={ColorCustom.RED}
                            onToggle={isOn => onApporterContenants(isOn)}
                        />
                    </View>
                </Card>

                <Card
                    elevation={4}
                    style={styles.rawItemCardStyle}>
                    <Text style={styles.textLabelStyle}>{ConstantString.STR_IS_PESTICIDE}</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 5 }}>
                        <ToggleSwitch
                            isOn={isPesticides}
                            onColor={ColorCustom.TOGGLE_ON}
                            offColor={ColorCustom.RED}
                            onToggle={isOn => setPesticides(isOn)}
                        />
                    </View>
                </Card>

                {
                    profileData.supplierType &&
                    <Card
                    elevation={4}
                    style={styles.rawItemCardStyle}>
                        <Text style={styles.textLabelStyle}>{ConstantString.STR_CERTIFICATIONS}</Text>
                        <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 5 }}>
                            <ToggleSwitch
                                isOn={isCertification}
                                disabled={false}
                                onColor={ColorCustom.TOGGLE_ON}
                                offColor={ColorCustom.RED}
                                onToggle={isOn => setCertification(isOn)}
                            />
                        </View>
                    </Card>
                }

                {
                    profileData.supplierType &&
                    <View style={[styles.certificateContainer, { opacity: isCertification ? 1 : 0.3 }]}>
                        <View style={{ height: 44, width: '100%', }}>
                            <ModalDropdown
                                disabled={!isCertification}
                                style={styles.certificateDropdownStyle}
                                textStyle={{ fontSize: 18, paddingLeft: 8, width: '100%', height: '100%',textAlignVertical: 'center' }}
                                showsVerticalScrollIndicator={false}
                                options={certificationData}
                                renderRow={_renderRowCertificate}
                                defaultValue={_renderDefaultCertificate()}
                                renderButtonText={(rowData) => _onSelectCertificate(rowData)}
                            />
                        </View>

                        <Image style = {styles.imageArrowDropDownCertificate}
                                source={Images.imgDropDown}/>
                    </View>
                }
                

                <View style={styles.priceContainer}>
                    <View style={{flex: 6, flexDirection: 'row', alignItems: 'center'}}>
                        <TextInput
                            style={styles.priceStyle}
                            placeholder={ConstantString.STR_PRICE}
                            placeholderTextColor={ColorCustom.GRAY}
                            returnKeyType='next'
                            keyboardType='numeric'
                            defaultValue={price.toString()}
                            onChangeText={text => onPriceChange(text)}
                        />

                        <Text style={styles.textEuro}>
                            {ConstantString.STR_ICON_EURO + ' /   '}
                        </Text>
                        
                        <View style={{flex: 1, marginRight: 20, justifyContent: 'center' }}>
                            <ModalDropdown
                                style={styles.untilTypePriceStyle}
                                textStyle={{ fontSize: 18, paddingLeft: 8, paddingRight: 20, width: '100%', height: '100%', textAlignVertical: 'center' }}
                                showsVerticalScrollIndicator={false}
                                options={unitType}
                                renderRow={_renderRowUnitTypePrice}
                                defaultValue={unitTypeName ? unitTypeName : unitType[0]?.name || '...'}
                                renderButtonText={(rowData) => _onSelectItemUnitTypePrice(rowData)}
                            />

                            <Image style = {styles.imageArrowDropDownCertificate}
                                source={Images.imgDropDown}/>
                        </View>
                    </View>
                    <View style={styles.priceSuggestContainer}>
                        <Text style={styles.priceSuggestTitleStyle}>
                            {ConstantString.STR_CURRENT_PRICE}
                        </Text>

                        <Text style={styles.priceSuggestTextStyle}>
                        {
                            priceSuggestion !== 0 ?
                            priceSuggestion
                            : 
                            '--'
                        }
                        </Text>
                    </View>
                </View>

                <Card
                    elevation={4}
                    style={styles.rawPaymentMethodContainer}>
                    <View style={{ alignItems: 'flex-start', width: '100%', marginLeft: 5 }}>
                        <Text style={styles.titlePaymentStyle}>
                            {ConstantString.STR_PAYMENT_METHOD}
                        </Text>
                    </View>

                    <View style={styles.paymentActionContainer}>
                        <View style={{ flex: 1, marginLeft: 5 }}>
                            <CheckBox
                                containerStyle={styles.checkboxStyle}
                                size={22}
                                title={ConstantString.STR_CASH_METHOD}
                                checked={isCashPaymentMethod}
                                onPress={() => setCashPaymentMethod(!isCashPaymentMethod)}
                            />
                        </View>

                        <View style={{ flex: 1, marginHorizontal: 5 }}>
                            <CheckBox
                                containerStyle={styles.checkboxStyle}
                                size={22}
                                title={ConstantString.STR_CB_METHOD}
                                checked={isCBPaymentMethod}
                                onPress={() => setCBPaymentMethod(!isCBPaymentMethod)}
                            />
                        </View>
                    </View>

                    <View style={styles.paymentActionContainer}>
                        <View style={{ flex: 1, marginHorizontal: 5 }}>
                            <CheckBox
                                containerStyle={styles.checkboxStyle}
                                size={22}
                                title={ConstantString.STR_LYDIA}
                                checked={isLydia}
                                onPress={() => setIsLydia(!isLydia)}
                            />
                        </View>

                        <View style={{ flex: 1, marginRight: 5 }}>
                            <CheckBox
                                containerStyle={styles.checkboxStyle}
                                size={22}
                                title={ConstantString.STR_CHEQUE_METHOD}
                                checked={isChequePaymentMethod}
                                onPress={() => setChequePaymentMethod(!isChequePaymentMethod)}
                            />
                        </View>
                    </View>

                </Card>

                <Card
                    elevation={4}
                    style={styles.rawItemCardStyle}>

                    <Text style={styles.textLabelStyle}>{ConstantString.STR_CALENDAR}</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 5 }}>
                        <ToggleSwitch
                            isOn={isSchedule}
                            disabled={false}
                            onColor={ColorCustom.TOGGLE_ON}
                            offColor={ColorCustom.RED}
                            onToggle={isOn => onSchedule(isOn)}
                        />
                    </View>
                </Card>

                <Card
                    elevation={4}
                    style={styles.createDateContainer}
                >
                    <Text style={[styles.createDateTitleStyle, {borderBottomWidth: isSchedule ? 0 : 1}]}>
                        {ConstantString.STR_TITLE_DATE}
                    </Text>

                    { 
                        isSchedule ?
                        <>
                            {_renderRowDay()} 
                            <FlatList
                                style={styles.flatListDatePicker}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={_keyExtractor}
                                data={arraySelectedDay.sort(compareDay)}
                                renderItem={({ item, index }) => ItemDatePicker(item, index)}
                            />  
                        </>
                        :
                        <View style={{flexDirection: 'row'}}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.titleCalendar}>
                                    {ConstantString.STR_TITLE_START}
                                </Text>

                                <DatePicker
                                    style={styles.btnDate}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateInput: {
                                            borderWidth: 0
                                        }
                                    }}
                                    showIcon={false}
                                    format="DD/MM/YYYY HH:mm"
                                    minDate={new Date()}
                                    maxDate={new Date(Date.now() + Constant.minisecondSevenDay)}
                                    mode={'datetime'}
                                    date={debutDate}
                                    is24Hour={true}
                                    locale={'fr_GB'}
                                    onDateChange={(date) => {
                                        setEndTime(date.slice(11))
                                        onDebutDateSelect(date)
                                    }} 
                                />
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 5 }}>
                                <View style={{ flex: 1, alignItems: 'center' }} >
                                    <Text style={styles.titleCalendar}>
                                        Fin
                                    </Text>
                                </View>

                                <View style={{flexDirection: 'row', flex: 1}}>
                                    <DatePicker 
                                        style={styles.btnTime}
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        placeholder={ConstantString.STR_END_TIME}
                                        mode={'time'}
                                        locale={'fr_GB'}
                                        customStyles={{
                                            dateInput: {
                                                borderWidth: 0
                                            },
                                            placeholderText: {
                                                color: ColorCustom.DARK_GRAY,
                                                fontSize: 14,
                                                fontFamily: ConstantString.FONT_ITALIC,
                                                marginTop: Platform.OS === 'ios' ? 5 : 0,
                                            },
                                        }}
                                        is24Hour={true}
                                        showIcon={false}
                                        date={endTime}
                                        onDateChange={(date) => onChangeEndTime(date)}
                                    />
                                </View>
                            </View>
                        </View>
                    }

                    {
                    !profileData.supplierType && 
                    <>
                        { 
                            (isSchedule && arraySelectedDay.length > 0) || !isSchedule &&
                            <Text style={styles.textSmaller5Hours}>
                                * maximum 5h
                            </Text>
                        }
                    </>
                    }
                </Card>

                <TouchableOpacity
                    disabled={isLoading}
                    style={styles.createButtonStyle}
                    onPress={() => onActionClick()}
                >
                    <Text style={styles.createTextButtonStyle}>
                        {ConstantString.STR_TITLE_PUBLIC}
                    </Text>
                </TouchableOpacity>

                </View>
            </ScrollView>

            {_renderProduct()}
            <PopupLoading visible={isLoading} />
            <Popup ref={customPopup} />
            {showDialogPolyce()}
            {showDialogSuccess()}
            {isShowModalProduct1 ? showModalProduct1() : null}
            {isShowModalProduct2 ? showModalProduct2() : null}
        </SafeAreaView>
    );
};
