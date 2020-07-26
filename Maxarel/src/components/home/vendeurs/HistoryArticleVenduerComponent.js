import React from 'react';
import {
    Text,
    View,
    Image,
    FlatList,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
    Platform,
} from 'react-native';
import Modal from 'react-native-modal'
import { Images } from '../../../utils/images';
import { Card } from 'react-native-shadow-cards';
import { ColorCustom } from '../../../utils/color';
import ToggleSwitch from 'toggle-switch-react-native';
import { myHeight, myWidth } from '../../../utils/dimension';
import { ConstantString } from '../../../utils/constant-string';
import { CheckBox } from 'react-native-elements';
import Dialog from 'react-native-dialog';
import { arrayHour, arrayMinute } from '../../../utils/arrayHoursAndMinutes';
import DatePicker from 'react-native-datepicker';
import ModalDropdown from 'react-native-modal-dropdown';
import Popup from '../../base_components/AlertCustom';
import { arrayDay } from '../../../utils/arrayDayOfWeek';
import LoadingScreen from '../../../screens/loadingScreen';
import { renderDayMultiLanguage } from '../../../utils/renderDayMultiLanguage';
import PopupLoading from '../../../screens/popupLoading';
import { Constant } from '../../../utils/constant';
import { FloatingAction } from "react-native-floating-action";

export const HistoryArticleVenduerComponent = props => {

    const {
        isLoading,
        onRefresh,
        isRefresing,
        onAddArticle,
        historyArticleVendeurData,
        onSelectedBox,
        arrayArticleId,
        visibleDialogQuicklyPost,
        setVisibleDialogQuicklyPost,
        isSchedule,
        setIsSchedule,
        debutDate,
        arraySelectedDay,
        setArraySelectedDay,
        setEndHour,
        setEndMinute,
        onDebutDateSelect,
        onSelectTimeSchedule,
        customPopup,
        submitDialogQuicklyPost,
        onEditArticle,
        isLoadingPopup,
        onCancelDialogQuickPost,
        endTime,
        onChangeEndTime,
        timeOfSchedule,
        setEndTime,
        profileData,
        onSchedule,
        onDeleteArticle,
        submitDeleteArticle,
        isModalDeleteArticle,
        onCancelDeleteArticle,
        onCancel,
        onSubmit,
        updateArticle,
        isDeleteArticle,
        isUpdateArticle
    } = props;

    const actions = [
        {
            text: ConstantString.STR_CREATE_ARTICLE,
            icon: Images.plus,
            name: "create",
            position: 1,
            buttonSize: 50,
            textBackground: ColorCustom.BROWN,
            textColor: ColorCustom.WHITE,
            color: ColorCustom.GREEN
        },
        {
            text: ConstantString.STR_DELETE_ARTICLE,
            icon: Images.subStr,
            name: "delete",
            position: 2,
            buttonSize: 50,
            textBackground: ColorCustom.BROWN,
            textColor: ColorCustom.WHITE,
            color: ColorCustom.GREEN
        },
        {
            text: ConstantString.STR_UPDATE_ARTICLE,
            icon: Images.updateIcon,
            name: "update",
            position: 3,
            buttonSize: 50,
            textBackground: ColorCustom.BROWN,
            textColor: ColorCustom.WHITE,
            color: ColorCustom.GREEN
        }
        ]

    const _renderPrice = (item) => {
        return (
            item.price !== 0 ?
            ' ' + item.price + ConstantString.STR_ICON_EURO + '/' + item.unitTypeName
            :
            ' ' + ConstantString.STR_FREE
        )
    }

    const _renderIsEdit = (item) => {
        if(arrayArticleId.indexOf(item.id) !== -1) {
            return true
        } else return false
    }

    const _renderChedule = (item) => {
        let dateSchedule = ''
        let arrayDaySchedule = []
        item.dateArticles.map(e => {
            arrayDaySchedule.push(new Date(Number(e.startTime)).getDay())
        })

        arrayDaySchedule.sort().map((e, index) => {
            if(index === (item.dateArticles.length - 1)) {
                dateSchedule = dateSchedule + renderDayMultiLanguage(e) 
            }
            else dateSchedule = dateSchedule + renderDayMultiLanguage(e) + ', '
        })
        return dateSchedule
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
                    return (
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

    const _renderDialogQuicklyPost = () => {
        return (
            <Dialog.Container 
                visible={visibleDialogQuicklyPost}
                contentStyle={styles.contentStyle} 
            >
                <Dialog.Title style={styles.titleCardDialog}>{ConstantString.STR_QUICK_POST}</Dialog.Title>

                <View style={styles.contentDialog}>
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
                        <Text style={styles.createDateTitleStyle}>
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
                                data={arraySelectedDay.sort(compare)}
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

                                <View style={{flexDirection: 'row'}}>
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
                </View>

                <View style={styles.rowButtonCard}>
                    <TouchableOpacity
                        style={styles.btnCancel}
                        onPress={onCancelDialogQuickPost}
                    >
                        <Text style={styles.textCancel}>
                            {ConstantString.STR_CANCEL}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btnOK}
                        onPress={submitDialogQuicklyPost}
                    >
                        <Text style={styles.okTextConditionStyle}>
                            {ConstantString.STR_TITLE_PUBLIC}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Dialog.Container>
        )
        
    }

    function ItemFlatList(item, index) {
        return (
            <View style={[styles.itemStyle, {width: !isDeleteArticle && !isUpdateArticle ? '90%' : '95%'}, {marginTop: index === 0 ? 20 : 0}, {alignSelf: !isDeleteArticle && !isUpdateArticle ? 'center' : 'flex-start'}]}>
                {
                    isDeleteArticle || isUpdateArticle ?
                    <View style={styles.rowCheckBox}>
                        <CheckBox
                            center
                            containerStyle={styles.checkboxStyle}
                            inputStyle={{backgroundColor: 'blue'}}
                            size={30}
                            checked={_renderIsEdit(item)}
                            onPress={() => onSelectedBox(item)}
                        />
                    </View>
                    :
                    null
                }

                <Card
                    evaluations={5}
                    cornerRadius={8}
                    style={styles.itemListContainer}>
                    <TouchableOpacity 
                    onPress = {() => onEditArticle(item)}
                        activeOpacity = {1}>
                        <View style={styles.headerItemContainer}>
                            <View style={styles.productNameContainer}>
                                <Text style={styles.textTitleStyle}></Text>
                                <Text style={styles.nameProductTextStyle}>{item.productName}</Text>
                            </View>
                            <View style={styles.priceContainer}>
                                <Text style={styles.textTitleStyle}>
                                    <Text style={styles.priceTextStyle}>{_renderPrice(item)}</Text>
                                </Text>
                            </View>
                        </View>

                        <View style={styles.bodyItem}>
                            {
                                item.isSchedule ?
                                <View style={styles.rowSchedule}>
                                    <Text style={styles.labelTextStyle}>{ConstantString.STR_SCHEDULE} </Text>
                                    <Text style={styles.quantityValueStyle}>{_renderChedule(item)}</Text>
                                </View>
                                : null
                            }

                            <View style={styles.descriptionContainer}>
                                <View style={styles.quantityContainer}>
                                    <Text style={styles.labelTextStyle}>{ConstantString.STR_QUANTITY} </Text>
                                    <Text style={styles.quantityValueStyle}>{item.quantity}</Text>
                                </View>
                            </View>

                            <View style={{flexDirection: 'column', width: '90%', marginLeft: 10}}>
                                <Text style={styles.labelTextStyle}>{ConstantString.STR_DESCRIPTION}</Text>
                                <Text style={styles.descriptionTextStyle}>
                                    {item.description}
                                </Text>
                            </View>
                        

                            <View style={styles.evaluationContainer}>

                                <View style={{ flex: 1, marginLeft: 10 }}>

                                    {
                                        item.evaluations.map(element => {
                                            return (
                                                <View style={styles.rowEvaluationItemStyle}>

                                                    <Text style={styles.nameRowEvaluationTextStyle}>{element.name} </Text>

                                                    <View style={styles.rowContentStyle}>

                                                        <View style={styles.itemOneValueStyle}>
                                                            <Text style={styles.textValueEvaluationStyle} numberOfLines={1}>
                                                                {element.evaluationElements[0].count}
                                                            </Text>
                                                        </View>

                                                        <View style={styles.itemTwoValueStyle}>
                                                            <Text style={styles.textValueEvaluationStyle} numberOfLines={1}>
                                                                {element.evaluationElements[1].count}
                                                            </Text>
                                                        </View>

                                                        <View style={styles.itemThreeValueStyle}>
                                                            <Text style={styles.textValueEvaluationStyle} numberOfLines={1}>
                                                                {element.evaluationElements[2].count}
                                                            </Text>
                                                        </View>

                                                        <View style={styles.itemFourValueStyle}>
                                                            <Text style={styles.textValueEvaluationStyle} numberOfLines={1}>
                                                                {element.evaluationElements[3].count}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        </View>
                        <View
                            style={styles.statusContainer}
                        >
                            <Text style={styles.labelTextStyle}>{ConstantString.STR_STATUS}</Text>
                            <View style={styles.toggleSwitchStyle}>
                                <ToggleSwitch
                                    isOn={item.isActive}
                                    disabled={true}
                                    onColor={ColorCustom.TOGGLE_ON}
                                    offColor={ColorCustom.RED}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </Card>
            </View>
        )
    }

    const _keyExtractor = (item, index) => String(index);

    const _selectFloatAction = (name) => {
        switch(name) {
            case 'create': onAddArticle()
            break;
            case 'delete': onDeleteArticle()
            break;
            case 'update' : updateArticle()
            break;
        }
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.header}>
                <Text style={styles.titleStyle}>{ConstantString.STR_TITLE_HISTORY}</Text>
                {
                    isDeleteArticle || isUpdateArticle ?
                    <RowBtnHeader 
                        onCancel={onCancel}
                        onSubmit={onSubmit}
                    />
                    :
                    null
                }
            </View>
            
            {/* {
                arrayArticleId.length > 0 &&
                <TouchableOpacity onPress={onDeleteArticle} style={[styles.addButtonStyle, { right: 80}]}>
                    <Image style={styles.imgAddButtonStyle} source={Images.subStrCircle} />
                </TouchableOpacity>
            } */}

                {
                    isLoading ? 
                    <View style={{flex: 1, backgroundColor: ColorCustom.LIGHT_GRAY}}>
                        <LoadingScreen />
                    </View>
                    :
                    <>
                        {
                            historyArticleVendeurData.length === 0 ?
                                <View style={styles.emptyDataContainer}>
                                    <Image
                                        style={{ height: 100, width: 100 }}
                                        source={Images.empty}
                                    />
                                    <Text style={styles.emptyTextStyle}>{ConstantString.STR_NO_DATA}</Text>

                                    <FloatingAction
                                        buttonSize={60}
                                        actions={actions}
                                        floatingIcon={<Image style={styles.imgAddButtonStyle} source={Images.imgAdd} />}
                                        onPressItem={name => _selectFloatAction(name)}
                                    />
                                </View> 
                                :
                                <View style={styles.listHistoryContainer}>
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        style={styles.flatListStyle}
                                        refreshing={isRefresing}
                                        onRefresh={() => onRefresh()}
                                        data={historyArticleVendeurData}
                                        keyExtractor={_keyExtractor}
                                        renderItem={({ item, index }) => ItemFlatList(item, index)}
                                    />

                                    <FloatingAction
                                        buttonSize={60}
                                        actions={actions}
                                        floatingIcon={<Image style={styles.imgAddButtonStyle} source={Images.imgAdd} />}
                                        onPressItem={name => _selectFloatAction(name)}
                                    />
                                </View>
                        }
                    </>
                }

            <ModalDeleteArticle onSubmit={submitDeleteArticle} onCancel={onCancelDeleteArticle} isVisible={isModalDeleteArticle} />
            {_renderDialogQuicklyPost()}
            <PopupLoading visible={isLoadingPopup} />
            <Popup ref={customPopup} />
        </SafeAreaView>
    );
};


const ModalDeleteArticle = ({onSubmit, onCancel, isVisible}) => {
    return (
        <Modal
            visible={isVisible}
            animationIn={'fadeIn'}
            style={{ margin: 0}}
        >
            <View style={styles.bgModal}>
                <View style={styles.modalDelete}>
                    <Text style={[styles.titleCardDialog, {color: 'black', fontFamily: ConstantString.FONT_REGULAR, paddingHorizontal: 15}]}>
                        Supprimer les publications sélectionnées ?
                    </Text>

                    <View style={styles.rowButtonCard}>
                        <TouchableOpacity
                            style={styles.btnCancel}
                            onPress={onCancel}
                        >
                            <Text style={styles.textCancel}>
                                {ConstantString.STR_CANCEL}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.btnOK}
                            onPress={onSubmit}
                        >
                            <Text style={styles.okTextConditionStyle}>
                                {ConstantString.STR_OK}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const RowBtnHeader = ({onCancel, onSubmit}) => {
    return(
        <View style={styles.rowBtnHeader}>
            <ButtonHeader
                text={ConstantString.STR_CANCEL}
                color={ColorCustom.WHITE}
                textColor={ColorCustom.GREEN}
                onPress={onCancel}
            />

            <ButtonHeader
                text={ConstantString.STR_OK}
                color={ColorCustom.GREEN}
                textColor={ColorCustom.WHITE}
                onPress={onSubmit}
            />
        </View>
    )
}

const ButtonHeader = ({text, color, textColor, onPress}) => {
    return(
        <TouchableOpacity onPress={onPress} style={[styles.btnHeader, {backgroundColor: color}]}>
            <Text style={[styles.textBtnHeader, {color: textColor}]}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: ColorCustom.LIGHT_PINK
    },
    header: {
        paddingTop: 15,
        borderBottomWidth: 0.5,
        borderColor: ColorCustom.DARK_GRAY,
        width: myWidth,
        backgroundColor: ColorCustom.LIGHT_PINK
    },
    addButtonStyle: {
        zIndex: 1,
        position: 'absolute',
        bottom: 30,
        right: 15,
        width: 60,
        height: 60,
    },

    imgAddButtonStyle: {
        zIndex: 1,
        width: 60,
        height: 60,
        resizeMode: 'contain'
    },

    addTextButtonStyle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: ColorCustom.WHITE
    },
    titleStyle: {
        color: ColorCustom.COPPERCANYON,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15
    },
    listHistoryContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: ColorCustom.LIGHT_GRAY,
    },
    itemListContainer: {
        flex: 1,
        alignContent: 'center',
        alignSelf: 'center',
        marginBottom: 20,
        maxWidth: 600
    },
    flatListStyle: {
        flex: 1,
        width: "100%",
        alignSelf: 'center'
    },
    emptyTextStyle: {
        fontSize: 18,
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        color: ColorCustom.DARK_GRAY,
    },
    emptyDataContainer: {
        flex: 1,
        width: myWidth,
        height: myHeight,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: ColorCustom.LIGHT_GRAY
    },
    headerItemContainer: {
        flexDirection: 'row',
        backgroundColor: ColorCustom.GREEN,
        alignItems: 'center',
        paddingVertical: 10,
        height: 'auto',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingHorizontal: 5
    },
    productNameContainer: {
        flex: 2,
        marginLeft: 10,
        marginRight: 5,
        alignItems: 'center',
        flexDirection: "row"
    },
    textTitleStyle: {
        fontSize: 18,
        textAlign: "justify",
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        color: ColorCustom.BLACK
    },
    priceContainer: {
        flex: 1.2,
        alignItems: 'flex-end',
        marginRight: 10
    },
    labelTextStyle: {
        fontSize: 18,
        textAlign: 'justify',
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    descriptionTextStyle: {
        fontWeight: 'normal',
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        flex: 1,
        width: '100%',
        fontSize: 16
    },
    priceTextStyle: {
        color: ColorCustom.WHITE,
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    nameProductTextStyle: {
        flex: 1,
        color: ColorCustom.WHITE,
        fontSize: 19,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    descriptionContainer: {
        paddingVertical: 5,
        paddingLeft: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignSelf: 'center',
    },
    quantityContainer: {
        flexDirection: 'column',
        width: '50%',
        paddingVertical: 5,
        justifyContent: 'center',
    },
    rowSchedule: {
        flexDirection: 'column',
        width: '100%',
        paddingVertical: 5,
        justifyContent: 'center',
        marginLeft: 10
    },
    quantityValueStyle: {
        flex: 1,
        fontSize: 17,
        textAlign: 'justify',
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    statusContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopWidth: 0.5,
        borderColor: ColorCustom.LIGHT_GRAY
    },
    toggleSwitchStyle: {
        flex: 1,
        alignItems: 'flex-end',
    },
    evaluationContainer: {
        flex: 1,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowEvaluationItemStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 1
    },
    nameRowEvaluationTextStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: ColorCustom.FERN_GREEN,
    },
    rowContentStyle: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 10
    },
    itemOneValueStyle: {
        width: 35,
        height: 35,
        borderRadius: 20,
        marginHorizontal: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ColorCustom.MOUNTAIN_MEADOW,
    },
    itemTwoValueStyle: {
        width: 35,
        height: 35,
        borderRadius: 20,
        marginHorizontal: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ColorCustom.SUNGLOW
    },
    itemThreeValueStyle: {
        width: 35,
        height: 35,
        borderRadius: 20,
        marginHorizontal: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ColorCustom.ORANGE,
    },
    itemFourValueStyle: {
        width: 35,
        height: 35,
        borderRadius: 20,
        marginHorizontal: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ColorCustom.TORCH_RED,
    },
    textValueEvaluationStyle: {
        marginHorizontal: 5
    },
    checkboxStyle: {
        flex: 1,
        backgroundColor: ColorCustom.LIGHT_GRAY,
        padding: 0,
        width: 30,
    },
    contentStyle: {
        width: '90%',
        padding: 0,
        borderRadius: 15,
        alignItems: 'center',
    },
    titleCardDialog: {
        fontSize: 20,
        textAlign: "center",
        color: ColorCustom.BROWN,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    rowButtonCard: {
        marginTop: 20,
        height: 50, 
        width: "100%", 
        flexDirection: 'row', 
        borderTopColor: ColorCustom.GRAY,
        borderTopWidth: 0.5,
    },
    btnCancel: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: 'center', 
        borderRightWidth: 0.5, 
        borderRightColor: 'gray'
    },
    btnOK: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: 'center', 
        borderLeftColor: "gray",
        borderLeftWidth: 0.5
    },
    okTextConditionStyle: { 
        fontSize: 18, 
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        color: ColorCustom.GREEN
    },
    textCancel: {
        fontSize: 18, 
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0, 
        color: ColorCustom.BROWN
    },
    rawItemCardStyle: {
        width: '100%',
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40
    },
    textLabelStyle: {
        fontSize: 16,
        paddingLeft: 5,
        fontWeight: 'bold'
    },
    createDateContainer: {
        width: '100%',
        flexDirection: 'column',
        marginVertical: 5,
        paddingBottom: 15,
        paddingHorizontal: 10,
        alignItems: 'center',
        maxHeight: 340
    },
    createDateTitleStyle: {
        fontSize: 20,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        marginBottom: 5,
        paddingLeft: 8,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderColor: ColorCustom.LIGHT_GRAY_1,
        paddingVertical: 5,
        width: '100%',
    },
    titleCalendar: {
        textAlign: 'center', 
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0, 
        fontSize: 15
    },
    btnRowDay: {
        justifyContent: 'center',
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnSelectedRowDay: {
        justifyContent: 'center',
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: ColorCustom.GREEN,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textRowDay: {
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 16
    },
    textSelectedRowDay: {
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 16,
        color: ColorCustom.WHITE
    },
    viewBtnDay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTime: {
        marginTop: 5,
        flex: 1,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'gray',
        borderRadius: 5,
        borderWidth: 1,
        marginHorizontal: 5
    },
    btnDate: {
        marginTop: 5,
        width: '98%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'gray',
        borderRadius: 5,
        borderWidth: 1,
        marginHorizontal: 5
    },
    contentDialog: {
        paddingHorizontal: 10, 
        width: '100%'
    },
    textQuickPost: {
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        color: ColorCustom.FERN_GREEN
    },
    rowCheckBox: {
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: ColorCustom.LIGHT_GRAY
    },
    bodyItem: {
        paddingHorizontal: 5
    },
    textSmaller5Hours: {
        fontFamily: ConstantString.FONT_ITALIC,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        textAlign: 'right',
        color: ColorCustom.GRAY,
        width: '100%',
        paddingRight: 10
    },
    flatListDatePicker: {
        // flex: 1,
        width: '100%'
    },
    textDayDatePicker: {
        color: ColorCustom.GREEN, 
        fontSize: 20, 
        height: 45, 
        lineHeight: 45, 
        // borderWidth: 1, 
        borderRadius: 5, 
        borderColor: ColorCustom.GRAY, 
        marginTop: 5, 
        textAlign: 'center',
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    rowBtnDay :{
        width: '100%',
        height: 50, 
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingBottom: 5,
        borderColor: ColorCustom.LIGHT_GRAY_1
    },
    bgModal: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: ColorCustom.BACKGROUND_MODAL
    },
    modalDelete: {
        backgroundColor: ColorCustom.WHITE, 
        width: '85%', 
        borderRadius: 15,
        paddingTop: 15,
    },
    itemStyle: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    rowBtnHeader: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        backgroundColor: 'white', 
    },
    btnHeader: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center'
    },
    textBtnHeader: {
        fontFamily: ConstantString.FONT_BOLD,
        fontSize: 17,
        marginTop: Platform.OS === 'ios' ? 5 : 0
    }
});
