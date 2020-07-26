import React from 'react'
import { 
    View, 
    Image,
    TouchableOpacity,
    Text,
    ScrollView,
    SafeAreaView,
} from 'react-native'
import { styles } from './styles'
import { Images } from '../../../../utils/images'
import { ConstantString } from '../../../../utils/constant-string'
import { SliderBox } from "react-native-image-slider-box";
import FastImage from 'react-native-fast-image'
import { ColorCustom } from '../../../../utils/color'
import LoadingScreen from '../../../../screens/loadingScreen'
import { Constant } from '../../../../utils/constant'
import Dialog from "react-native-dialog";
import { CheckBox } from 'react-native-elements'
import { Card } from 'react-native-shadow-cards';
import EvaluationComponent from '../evaluationComponent'
import { renderFullDayMultiLanguage } from '../../../../utils/renderFullDayMultiLanguage'
import { renderCertificateImage } from '../../../../utils/renderCertificateImage'
import Popup from '../../../base_components/AlertCustom'
import { Fragment } from 'react'
import GetConditionScreen from '../../../../screens/startscreen/getConditionScreen'

function DetailArticleComponent(props) {
    const {
        articleData,
        goBack,
        isLoading,
        onJArrive,
        visibleDiadlog,
        submitDialog,
        cancelDialog,
        isChecked,
        setChecked,
        renderDistance,
        distance,
        visibleDiadlogCard,
        submitDialogCard,
        linkImage_0,
        cancelDialogCard,
        callMaxarel,
        visibleFullImage,
        setVisibleFullImage,
        customPopup,
        suppliedId,
        datePicker,
        isActive,
        setIsLoadingCondition,
        isLoadingCondition
    } = props
    


    const onPressImage = (index) => {
        setVisibleFullImage(true)
    }

    const _renderImage = () => {
        let arrayImage 
        if(articleData.listImages.length === 2) {
            arrayImage = [Constant.urlLocal + articleData.listImages[0], Constant.urlLocal + articleData.listImages[1]]
        } else arrayImage = [Constant.urlLocal + articleData.listImages, Images.productDefault]
        return (
            <SliderBox 
                sliderBoxHeight={275}
                images={arrayImage}
                parentWidth={410}
                ImageComponent={FastImage}
                dotColor={ColorCustom.GREEN}
                inactiveDotColor={ColorCustom.GRAY_PAYMENT}
                imageLoadingColor={ColorCustom.GREEN}
                resizeMethod={'resize'}
                disableOnPress={true}
                resizeMode={'contain'}
                onCurrentImagePressed={index => onPressImage(index)}
            />
        )
    }

    const _renderImageDialog = () => {
        let linkImage = Constant.urlLocal.concat(linkImage_0)
        return (
            <FastImage
                style={styles.imageDialog}
                source={{
                    uri: linkImage,
                    priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
        )
    }

    const _renderPrice = () => {
        return (
            articleData.price !== 0 ?
            articleData.price + ConstantString.STR_ICON_EURO + '/' + articleData.unitTypeName
            :
            ConstantString.STR_FREE
        )
    }

    const _showDialogPolyce = () => {
        return (
            <Dialog.Container 
                contentStyle={styles.contentStyleCondition} 
                visible={visibleDiadlog}
            >
                <Dialog.Title style={styles.textTitleDialog}>{ConstantString.STR_TITLE_CHARTER_MAXAREL}</Dialog.Title>
                <View style={styles.viewCondition}>
                    <View style={styles.viewScrollView}>
                        <ScrollView
                            style={styles.scrollViewDialog}
                            showsVerticalScrollIndicator={false}>
                            {/* <Text style={styles.textConditionContent}>
                                {ConstantString.STR_CHARTER_MAXAREL}
                            </Text> */}
                            <GetConditionScreen setIsLoading={setIsLoadingCondition} isLoading={isLoadingCondition} />
                        </ScrollView>
                    </View>

                    <View style={styles.rowCheckBox}>
                        <View style={{ marginLeft: -10 }}>
                            <CheckBox
                                checked={true}
                                size={24}
                                containerStyle={{ width: 25 }}
                                center
                                checked={isChecked}
                                onPress={setChecked}
                            />
                        </View>

                        <TouchableOpacity 
                            style={{ flex: 1 }}
                            onPress={setChecked}>
                            <Text style={styles.textQuestionDialog}>
                                {ConstantString.STR_AGREE_CHARTER_MAXAREL}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.rowButton}>
                    <TouchableOpacity
                        style={styles.btnCancel}
                        onPress={cancelDialog}>
                        <Text style={styles.textCancel}>
                            {ConstantString.STR_CANCEL}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btnOK}
                        disabled={!isChecked}
                        onPress={submitDialog}
                    >
                        <Text style={[styles.okTextConditionStyle, { color: isChecked ? ColorCustom.GREEN : '#D9DADF' }]}>
                            {ConstantString.STR_OK}
                        </Text>
                    </TouchableOpacity>

                </View>
            </Dialog.Container>
        )
    }

    const _showDialogCard = () => {
        return (
            <Dialog.Container 
                visible={visibleDiadlogCard}
                contentStyle={styles.contentStyle} 
            >
            <Dialog.Title style={styles.titleCardDialog}>Vous vous apprêtez à aller chercher ce produit</Dialog.Title>
            <Card style={styles.Card} evaluations={8}>
                <View style={styles.cardDialog}>
                    <View style={styles.headerCard}>
                        <Text style={styles.textDistanceCard}>
                            {renderDistance()}
                        </Text>
                        <Text style={styles.textDistanceCard}>
                            {`${ConstantString.STR_AVAILABLE} ${ConstantString.STR_UNTIL}${_renderEndTime()}`}
                        </Text>
                    </View>
                    <View style={styles.bodyCard}>
                        <View style={styles.colLeftBodyCard}>
                            {_renderImageDialog()}
                        </View>

                        <View style={styles.colRightBodyCard}>
                            <Text style={styles.textProductNameCard}>
                                {articleData.productName}
                            </Text>
                            <Text style={styles.textPriceCard}>
                                {_renderPrice()}
                            </Text>
                        </View>
                    </View>
                </View>
            </Card>
            <View style={styles.rowButtonCard}>
                <TouchableOpacity
                    style={styles.btnCancel}
                    onPress={cancelDialogCard}>
                    <Text style={styles.textCancel}>
                        {ConstantString.STR_CANCEL}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnOK}
                    disabled={!isChecked}
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

    const _renderRecovery = () => {
        if(articleData.comePick) {
            return ConstantString.STR_COME_PICK
        }
        if(articleData.isEmporter) {
            return ConstantString.STR_TAKEAWAY
        }
        if(articleData.isApporterContenants) {
            return ConstantString.STR_BRING_YOUR_CONTAINERS
        }
    }

    const _renderStartTime = () => {
        const day = datePicker.getDay()
        const currentDate = articleData.dateArticles.find((e) => {
            const daySchedule = new Date(Number(e.startTime)).getDay()
            return daySchedule === day
        })
        const startTime = new Date(Number(currentDate.startTime))
        const startHour = startTime.getHours()
        const startMinute = startTime.getMinutes()
        return `${(startHour < 10 ? '0' + startHour : startHour)}h${(startMinute < 10 ? '0' + startMinute : startMinute)}`
    }

    const _renderEndTime = () => {
        const day = datePicker.getDay()
        const currentDate = articleData.dateArticles.find((e) => {
            const daySchedule = new Date(Number(e.endTime)).getDay()
            return daySchedule === day
        })
        const endTime = new Date(Number(currentDate.endTime))
        const getMinutes = endTime.getMinutes()
        const currentMinutesZero = getMinutes === 0 ? '00' :  getMinutes
        const hour = endTime.getHours() < 10 ? '0' + endTime.getHours() : endTime.getHours()
        if(getMinutes < 10 && getMinutes !== 0) {
            return (
                ' ' + hour + 'h0' + currentMinutesZero
            )
        }
        else {
            return (
                ' ' + hour + 'h' + currentMinutesZero
            )
        }
    }

    const _renderFullDay = () => {
        const day = renderFullDayMultiLanguage(new Date(datePicker).getDay())
        return day
    }

    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: ColorCustom.LIGHT_PINK} } />

            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={goBack} style={styles.btnBack}>
                            <Image style={styles.imageBack} source={Images.blackBack}/>
                        </TouchableOpacity>
                        <Text style={styles.textHeader}>{articleData.productName}</Text>
                    </View>
                    {isLoading ?
                        <LoadingScreen />
                        :
                        <ScrollView style={styles.scrollView}>
                            <View style={styles.body}>
                                {
                                    typeof distance === 'number' ?
                                    <View style={styles.viewDistance}>
                                        <Text style={styles.textDistance}>
                                            {renderDistance()}
                                        </Text>
                                    </View>
                                    :
                                    null
                                }
                                

                                <View style={styles.viewImageProduct}>
                                {_renderImage()}
                                </View>

                                <View style={styles.rowArrive}>
                                    <View style={styles.priceContainer}>
                                        <Text style={styles.textPrice}>
                                            {_renderPrice()}
                                        </Text>

                                        {
                                            articleData.isCertification &&
                                            <Image style={styles.imageCertify} source={renderCertificateImage(articleData.certificationName)}/>
                                        }
                                    </View>

                                    {
                                        isActive ?
                                        (typeof distance === 'number' ? 
                                        <TouchableOpacity onPress={onJArrive} style={styles.btnArrive}>
                                            <Text style={styles.textArrive}>
                                                {ConstantString.STR_ARRIVE}
                                            </Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={callMaxarel} style={styles.btnArrive}>
                                            <Image source={Images.phone} style={styles.btnCall}/>
                                        </TouchableOpacity>)
                                    :
                                    <TouchableOpacity disabled onPress={onJArrive} style={styles.btnArrive}>
                                        <Text style={[styles.textArrive,{fontSize: 18}]}>
                                            {`${ConstantString.STR_AVAILABLE} ${_renderFullDay()} ${ConstantString.STR_TO} ${_renderStartTime()}`}
                                        </Text>
                                    </TouchableOpacity>
                                    }
                                    
                                </View>
                                    
                                <View style={styles.rowPrice}>
                                    {
                                        suppliedId === 2 ?
                                        null
                                        :
                                        <Text style={styles.textProfessional}>
                                            {ConstantString.STR_PROFESSIONAL}
                                        </Text>
                                    }

                                    {
                                        isActive ?
                                        <Text style={styles.textEndTime}>
                                            {`${ConstantString.STR_AVAILABLE} ${ConstantString.STR_UNTIL}${_renderEndTime()}`}
                                        </Text>
                                        :
                                        <Text style={[styles.textEndTime, {color : ColorCustom.BLUE_PAYMENT}]}>
                                            {`${_renderFullDay()} ${ConstantString.STR_FROM} ${_renderStartTime()} ${ConstantString.STR_TO}${_renderEndTime()}`}
                                        </Text>
                                    }

                                </View>
                                
                                <View style={styles.lightGray}></View>

                                <View style={styles.viewDescription}>
                                    <Text style={styles.rowTitle}>
                                        {ConstantString.STR_DESCRIPTION}
                                    </Text>

                                    <Text style={styles.textColRight}>
                                        {articleData.description}
                                    </Text>
                                </View>

                                <View style={styles.lightGray}></View>

                                <View style={styles.viewDetail}>
                                    <Text style={styles.rowTitle}>
                                        {ConstantString.STR_DETAILS_DU_PRODUIT}
                                    </Text>
                                    
                                    <View style={styles.rowDetailHeader}>
                                        <View style={styles.colLeftBody}>
                                            <Text style={styles.textDetailHeader}>
                                                {ConstantString.STR_RECOVERY}
                                            </Text>
                                        </View>

                                        <View style={styles.colRightBody}>
                                            {
                                                articleData.comePick && 
                                                <Text style={[styles.textColRight, {marginBottom: 5}]}>{ConstantString.STR_COME_PICK}</Text>
                                            }

                                            {
                                                articleData.isEmporter && 
                                                <Text style={[styles.textColRight, {marginBottom: 5}]}>{ConstantString.STR_TAKEAWAY}</Text>
                                            }

                                            {
                                                articleData.isApporterContenants && 
                                                <Text style={styles.textColRight}>{ConstantString.STR_BRING_YOUR_CONTAINERS}</Text>
                                            }
                                        </View>
                                    </View>

                                    <View style={styles.rowDetailHeader}>
                                        <View style={styles.colLeftBody}>
                                            <Text style={styles.textDetailHeader}>
                                                {ConstantString.STR_ID} 
                                            </Text>
                                        </View>

                                        <View style={styles.colRightBody}>
                                            <Text style={styles.textColRight}>
                                                {articleData.id}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.rowDetailHeader}>
                                        <View style={styles.colLeftBody}>
                                            <Text style={styles.textDetailHeader}>
                                                {ConstantString.STR_QUANTITY}
                                            </Text>
                                        </View>
                                        
                                        <View style={styles.colRightBody}>
                                            <Text style={styles.textColRight}>
                                                {articleData.quantity}
                                            </Text>
                                        </View>
                                        
                                    </View>
                                    
                                    {articleData.isPesticides &&
                                    <View style={styles.rowDetailHeader}>
                                        <View style={styles.colLeftBody}>
                                            <Text style={styles.textDetailHeader}>
                                                {ConstantString.STR_IS_PESTICIDE}
                                            </Text>
                                        </View>

                                        <View style={styles.colRightBody}>
                                            <Image style={styles.imageBody} source={Images.tick}/>
                                        </View>
                                    </View>
                                    }

                                    {
                                        articleData.isCertification &&
                                        <View style={styles.rowDetailHeader}>
                                            <View style={styles.colLeftBody}>
                                                <Text style={styles.textDetailHeader}>
                                                    {ConstantString.STR_TITLE_IS_CERTIFICATE}
                                                </Text>
                                            </View>

                                            <View style={styles.colRightBody}>
                                                <Text style={styles.textColRight}>
                                                    {articleData.certificationName}
                                                </Text>
                                            </View>
                                        </View>
                                    }

                                    {
                                        articleData.isGood &&
                                        <View style={styles.rowEvaluation}>
                                            <Text style={styles.textRate}>
                                                {ConstantString.STR_GOOD_EVALUATION} !
                                            </Text>

                                            <Image source={Images.flower} style={styles.imageFlower} />
                                        </View>
                                    }
                                </View>

                                <View style={styles.lightGray}></View>
                                
                                <Text style={styles.rowTitle}>
                                    {ConstantString.STR_PAYMENT_METHOD + ' ' + ConstantString.STR_ACCEPTED}
                                </Text>

                                <View style={styles.rowPayment}>
                                    {articleData.isCash ?
                                        <View style={styles.viewImagePayment}>
                                            <Image style={styles.imagePaymentMethod} source={Images.cash}/>
                                        </View>
                                        :
                                        null
                                    }

                                    {
                                        articleData.isLydia || articleData.isCB ?
                                        <View style={styles.viewImagePayment}>
                                            <Image style={styles.imagePaymentMethod} source={Images.CB}/>
                                        </View>
                                        :
                                        null
                                    }
                                    
                                    {articleData.isCheque ?
                                        <View style={styles.viewImagePayment}>
                                            <Image style={styles.imagePaymentMethod} source={Images.cheque}/>
                                        </View>
                                        :
                                        null
                                    }

                                </View>

                                <Text style={styles.textFooter}>
                                    {ConstantString.STR_TEXT_FOOTER}
                                </Text>
                            </View>

                            {_showDialogPolyce()}
                            {_showDialogCard()}
                            <Popup ref={customPopup} />
                        </ScrollView>
                    }
                </View>
            </SafeAreaView>
        </Fragment>
        
    )
}

export default DetailArticleComponent