import React, { Fragment } from 'react'
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    Image,
    RefreshControl,
    SafeAreaView,
    StatusBar,
    Platform,
} from 'react-native'
import {
    MaterialIndicator
} from 'react-native-indicators'
import { Dropdown } from 'react-native-material-dropdown'
import { Images } from '../../../../utils/images'
import FastImage from 'react-native-fast-image'
import Autocomplete from 'react-native-autocomplete-input'
import { styles } from './styles'
import LoadingScreen from '../../../../screens/loadingScreen'
import { ColorCustom } from '../../../../utils/color'
import { ConstantString } from '../../../../utils/constant-string'
import { Constant } from '../../../../utils/constant'
import Popup from '../../../base_components/AlertCustom'
import EvaluationComponent from '../evaluationComponent'
import { renderCertificateImage } from '../../../../utils/renderCertificateImage'
import DatePicker from 'react-native-datepicker'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
import { renderFullDayMultiLanguage } from '../../../../utils/renderFullDayMultiLanguage'
import Dialog from 'react-native-dialog'
import PopupLoading from '../../../../screens/popupLoading'
import Modal from 'react-native-modal'
import { STATUSBAR_HEIGHT } from '../../../../utils/theme'

function HistoryArticleComponent(props) {
    const {
        goBack,
        title,
        filterArticleData,
        selectedFilter,
        historyArticleData,
        valueFilter,
        _setValueFilter,
        onChangeTextInputProduct,
        productData,
        setProductId,
        isLoading,
        currentValue,
        handleLoadMore,
        loadingScroll,
        onRefresh,
        isRefreshing,
        scrollFlatList,
        setArticleId,
        customPopup,
        callMaxarel,
        isCustomer,
        onDatePicker,
        datePicker,
        visibleDialogRememberProduct,
        cancelDialogCard,
        submitDialogCard,
        visiblePopupLoading,
        setCurrentPosition,
        visibleModalSearch,
        setVisibleModalSearch,
        titleCurrentPosition,
        setTitleCurrentPosition,
        paramPosition,
        defaultPosition
    } = props

    const _renderEndTime = item => {
        const miniSecondEndTime = Number(item.endTime)
        const endTime = new Date(miniSecondEndTime)
        const getMinutes = endTime.getMinutes()
        const currentMinutesZero = getMinutes === 0 ? '00' : getMinutes
        const hour = endTime.getHours() < 10 ? '0' + endTime.getHours() : endTime.getHours()
        if (getMinutes < 10 && getMinutes !== 0) {
            return (
                hour + 'h0' + currentMinutesZero
            )
        }
        else {
            return (
                hour + 'h' + currentMinutesZero
            )
        }
    }

    const _renderPrice = (item) => {
        return (
            item.price !== 0 ?
            item.price + ConstantString.STR_ICON_EURO + '/' + item.unitType
            :
            ConstantString.STR_FREE
        )
    }

    const renderFooter = () => {
        return (
            loadingScroll ?
                <MaterialIndicator style={styles.iconLoadMore} color={ColorCustom.GREEN} />
                :
                null
        )
    }

    const _renderImage = (item) => {
        let linkImage = Constant.urlLocal.concat(item.listImages[0])
        return (
            <FastImage
                style={styles.imageFlatList}
                source={{
                    uri: linkImage,
                    priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
        )

    }

    const _renderDistance = (distance) => {
        return (
            distance < 1 ?
            (distance * 1000) + ' m'
            :
            Math.round(distance) + ' km'
        )
    }

    const _renderFullDay = () => {
        const day = renderFullDayMultiLanguage(new Date(datePicker).getDay())
        return day
    }

    const _renderStartTime = (item) => {
        const startTime = new Date(Number(item.debutDateSchedule))
        const startHour = startTime.getHours()
        const startMinute = startTime.getMinutes()
        return `${(startHour < 10 ? '0' + startHour : startHour)}h${(startMinute < 10 ? '0' + startMinute : startMinute)}`
    }

    const _renderRecovery = (item) => {
        if(item.comePick) {
            return ConstantString.STR_COME_PICK
        }
        else if(item.isApporterContenants) {
            return ConstantString.STR_BRING_YOUR_CONTAINERS
        }
        else if(item.isEmporter) {
            return ConstantString.STR_TAKEAWAY
        }
    }

    const _showDialogRememberProduct = () => {
        return (
            <Dialog.Container 
                visible={visibleDialogRememberProduct}
                contentStyle={styles.contentStyle} 
            >
            <Dialog.Title style={styles.titleCardDialog}>Produit non disponible</Dialog.Title>

            <View>
                <Text style={{textAlign: 'center', paddingHorizontal: 10}}>
                    Souhaitez-vous recevoir une notification lorsque ce produit est disponible ?
                </Text>
            </View>

            <View style={styles.rowButtonCard}>
                <TouchableOpacity
                    style={styles.btnCancel}
                    onPress={cancelDialogCard}
                >
                    <Text style={styles.textCancel}>
                        {ConstantString.STR_CANCEL}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnOK}
                    onPress={submitDialogCard}
                >
                    <Text style={styles.okTextConditionStyle}>
                        {ConstantString.STR_OK}
                    </Text>
                </TouchableOpacity>
            </View>
        </Dialog.Container>
        )
    }

    const _renderBtnBack = () => {
        return (
            <View>
                <TouchableOpacity 
                onPress={() => setVisibleModalSearch(false)} 
                style={styles.btnBackModal}>
                    <Image style={styles.imageBack} source={Images.blackBack} />
                </TouchableOpacity>
            </View>

        )
    }

    const yourLocation = { description: defaultPosition, geometry: { location: { lat: paramPosition.latitude, lng: paramPosition.longitude} } }

    const setDefaultValue = () => {
        return defaultPosition
    }

    const _renderModalSearchLocation = () => {
        return(
            <Modal style={{margin: 0}} animationIn={'fadeIn'} visible={visibleModalSearch}>
                <View style={{flex: 1 , paddingTop: STATUSBAR_HEIGHT}}>
                    <GooglePlacesAutocomplete
                        placeholder={ConstantString.STR_SEARCH}
                        autoFocus={true}
                        minLength={2}
                        returnKeyType={'search'}
                        listViewDisplayed={'false'}
                        fetchDetails={true}
                        renderDescription={row => row.description}
                        getDefaultValue={setDefaultValue}
                        onPress={(data, details = null) => {
                            setTitleCurrentPosition(data.description)
                            setCurrentPosition(details.geometry.location)
                        }}
                        predefinedPlaces={[yourLocation]}
                        query={{
                            key: ConstantString.KEY_GG_API,
                            language: 'en',
                        }}
                        styles={{
                            textInputContainer: {
                                width: '100%',
                                zIndex: 1,
                                height: 50,
                                backgroundColor: ColorCustom.LIGHT_GRAY,
                                alignItems: 'center',
                                borderTopWidth: 0
                            },
                            textInput: {
                                zIndex: 1,
                                height: 40,
                                alignSelf: 'center',
                                marginTop: 10,
                                marginBottom: 10,
                                position: 'relative',
                                color: ColorCustom.BLACK
                            },
                            description: {
                                fontFamily: ConstantString.FONT_BOLD,
                                marginTop: Platform.OS === 'ios' ? 5 : 0,
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb',
                                zIndex: 1
                            },
                            listView: {
                                borderWidth: 0.5,
                                borderColor: ColorCustom.LIGHT_GRAY,
                                backgroundColor: ColorCustom.WHITE,
                                zIndex: 2,
                            },
                        }}
                        debounce={200}
                        renderLeftButton={() => _renderBtnBack()}
                    />
                </View>
            </Modal>
        )
    }

    const _renderBody = () => {
        return (
            historyArticleData?.length === 0 ?
                <View style={styles.noDataPage}>
                    <Image source={Images.empty} style={styles.imageEmpty} />
                    <Text style={styles.textNoData}>{ConstantString.STR_NO_DATA}</Text>
                </View>
                :
                <FlatList
                    style={styles.flatList}
                    data={historyArticleData}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    onScrollToIndexFailed={() => { }}
                    ref={scrollFlatList}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.viewShadow}>
                                <TouchableOpacity
                                    style={[styles.flatListItem, { marginTop: index === 0 ? 20 : 0 }]}
                                    activeOpacity={1}
                                    onPress={() => setArticleId(item)}
                                >
                                    <View style={[styles.headerFlatList,{opacity: item.isActive ? 1 : 0.5}]}>
                                        <Text style={styles.textNameHeaderFlatList}>{item.productName}</Text>
                                        
                                        {
                                            (typeof item.distance === 'number') ?
                                            <Text style={styles.textRangeHeaderFlatList}>{((typeof item.distance === 'number') ? _renderDistance(item.distance) : '0 km')}</Text>
                                            :
                                            <TouchableOpacity onPress={() => callMaxarel()} style={styles.btnCall}>
                                                <Image source={Images.phone} style={styles.imageBack}/>
                                            </TouchableOpacity>
                                        }
                                    </View>

                                    <View style={styles.bodyFlatList}>
                                        <View style={styles.colLeftFlatList}>
                                            <View style={styles.headerImage}>
                                                {_renderImage(item)}
                                            </View>
                                            <View style={styles.detailsImage}>
                                                
                                                <View style={styles.rowCertificate}>
                                                    <Text style={[styles.textCategory, {color: item.isActive ? ColorCustom.BROWN : ColorCustom.INACTIVE}]}>{item.category}</Text>
                                                </View>
                                                    
                                                <Recovery item={item} />
                                                
                                                <Text style={[styles.textPrice, {color: item.isActive ? ColorCustom.GREEN : ColorCustom.INACTIVE}]}>{_renderPrice(item)} </Text>
                                                
                                                {
                                                    item.isGood &&
                                                    <View style={styles.rowEvaluation}>
                                                        <Text style={styles.textRate}>
                                                            {ConstantString.STR_GOOD_EVALUATION} !
                                                        </Text>

                                                        <Image source={Images.flower} style={styles.imageFlower} />
                                                    </View>
                                                }
                                            </View>
                                        </View>
                                        <View style={styles.colRightFlatList}>
                                            <View style={styles.footerColRightFlatList}>
                                                {
                                                    item.certificationName?
                                                    <Image style={styles.imageCertify} source={renderCertificateImage(item.certificationName)} />
                                                    :
                                                    null
                                                }

                                                <Text style={[styles.textEndTime, {color: item.isActive ? ColorCustom.BLACK : ColorCustom.BLUE_PAYMENT}]}>
                                                    {ConstantString.STR_AVAILABLE}
                                                </Text>
                                                
                                                <Text style={[styles.textEndTime, { color: item.isActive ? ColorCustom.BLACK : ColorCustom.BLUE_PAYMENT}]}>
                                                    {item.isActive ? `${ConstantString.STR_UNTIL} ${_renderEndTime(item)}` : `${_renderFullDay()} ${ConstantString.STR_TO} ${_renderStartTime(item)}`}
                                                    {}
                                                </Text>
                                            </View>

                                                {
                                                    (typeof item.distance === 'number') ?
                                                    null
                                                    :
                                                    <Text style={{color: ColorCustom.GRAY, fontFamily: ConstantString.FONT_BOLD, fontSize: 16}}>
                                                        {ConstantString.STR_ID}: {item.id}
                                                    </Text>
                                                }

                                                {
                                                    item.suppliedId !== 2 ? 
                                                    <Text style={styles.textProfessional}>
                                                        {ConstantString.STR_PROFESSIONAL}
                                                    </Text> 
                                                    : 
                                                    null
                                                }
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                    ListFooterComponent={renderFooter()}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={2}
                    onEndReached={handleLoadMore}
                />
        )
    }
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.titleHeader}>
                        {
                            isCustomer &&
                            <TouchableOpacity style={styles.btnBack} onPress={goBack}>
                                <Image source={Images.blackBack} style={styles.imageBack} />
                            </TouchableOpacity>
                        }
                        
                        <Text style={styles.textTitle}>
                            {title.toUpperCase()}
                        </Text>
                    </View>

                    <View style={styles.belowHeader}>
                        <View style={styles.colLeftHeader}>
                            <Dropdown
                                data={filterArticleData}
                                value={valueFilter}
                                onChangeText={_setValueFilter}
                                dropdownPosition={1}
                            />
                        </View>

                        <DatePickerComponent 
                            selectedFilter={selectedFilter}
                            datePicker={datePicker}
                            onDatePicker={onDatePicker}
                        />

                        {
                            selectedFilter === 0 ?
                            <TouchableOpacity activeOpacity={0.3} onPress={() => setVisibleModalSearch(true)} style={styles.btnSearchLocation}>
                                <Image source={Images.search} style={styles.imageSearchInput} />

                                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.textSearchLocation}>
                                    {titleCurrentPosition}
                                </Text>
                            </TouchableOpacity>
                            :
                            null
                        }
                    </View>
                </View>

                <View style={styles.body}>
                    {isLoading ?
                        <LoadingScreen />
                        :
                        _renderBody()
                    }
                </View>
                
                <AutocompleteSearch 
                    selectedFilter={selectedFilter}
                    productData={productData}
                    currentValue={currentValue}
                    onChangeTextInputProduct={onChangeTextInputProduct}
                    setProductId={setProductId}
                />

                <Popup ref={customPopup} />
                <PopupLoading visible={visiblePopupLoading} popupColor={ColorCustom.WHITE} />
                {_renderModalSearchLocation()}
                {_showDialogRememberProduct()}
            </View>
        </SafeAreaView>
    )
}

const DatePickerComponent = ({selectedFilter, datePicker, onDatePicker}) => {
    return (
        <Fragment>
            {
                selectedFilter === 2 &&
                <DatePicker
                    style={styles.btnDate}
                    confirmBtnText={ConstantString.STR_OK}
                    cancelBtnText={ConstantString.STR_CANCEL}
                    customStyles={{
                        dateInput: {
                            borderWidth: 0
                        }
                    }}
                    is24Hour={true}
                    locale={'fr_GB'}
                    format="DD/MM/YYYY"
                    minDate={new Date()}
                    maxDate={new Date(Date.now() + Constant.minisecondSevenDay)}
                    mode={'date'}
                    date={datePicker}
                    onDateChange={(date) => {
                        onDatePicker(date)
                    }} 
                />
            }
        </Fragment>
    )
}

const AutocompleteSearch = ({selectedFilter, productData, currentValue, onChangeTextInputProduct, setProductId}) => {
    return (
        <Fragment>
        {
            selectedFilter === 1 &&
            <View style={styles.colRightHeader}>
                <Image source={Images.search} style={styles.imageSearchInput} />

                <Autocomplete
                    placeholder={ConstantString.STR_SEARCH}
                    placeholderTextColor={ColorCustom.DARK_GRAY}
                    style={{color: ColorCustom.BLACK, height: 37}}
                    inputContainerStyle={styles.inputContainerStyle}
                    listContainerStyle={styles.listContainerStyle}
                    listStyle={styles.listStyle}
                    data={productData}
                    value={currentValue}
                    onChangeText={onChangeTextInputProduct}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.btnAutoComplete} onPress={() => setProductId(item)}>
                            <Image source={Images.search} style={styles.imageSearchList} />
                            <Text style={styles.textAutoComplete}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    
                />
            </View>
        }
        </Fragment>
    )
}

const Recovery = ({item}) => {
    return (
        <>
            {
                item.comePick &&
                <Text style={[styles.textBodyFlatList, {color: item.isActive ? ColorCustom.BLACK : ColorCustom.INACTIVE}]}>{ConstantString.STR_COME_PICK}</Text>
            }

            {
                item.isEmporter && 
                <Text style={[styles.textBodyFlatList, {color: item.isActive ? ColorCustom.BLACK : ColorCustom.INACTIVE}]}>{ConstantString.STR_TAKEAWAY}</Text>
            }

            {
                item.isApporterContenants &&
                <Text style={[styles.textBodyFlatList, {color: item.isActive ? ColorCustom.BLACK : ColorCustom.INACTIVE}]}>{ConstantString.STR_BRING_YOUR_CONTAINERS}</Text>
            }
        </>
    )
}

export default HistoryArticleComponent
