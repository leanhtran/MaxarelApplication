import React, { Fragment } from 'react'
import { View, Image, StyleSheet, SafeAreaView, Text, TouchableOpacity, Platform } from 'react-native'
import { Images } from '../../../utils/images'
import { ColorCustom } from '../../../utils/color'
import { ConstantString } from '../../../utils/constant-string'
import PopupLoading from '../../../screens/popupLoading'
import { Constant } from '../../../utils/constant'
import FastImage from 'react-native-fast-image'
import Popup from '../../base_components/AlertCustom'

function NotifyArriveComponent(props) {
    const {
        onSubmit,
        distance,
        articleData,
        isLoading,
        linkImage_0,
        customPopup
    } = props

    const _renderEndTime = () => {
        const day = new Date().getDay()
        const dateArticles = articleData?.dateArticles        
        const currentDate = dateArticles?.find((e) => {
            const daySchedule = new Date(Number(e.endTime)).getDay()
            return daySchedule === day
        })
        console.log('dateArticles',dateArticles);
        
        const endTime = new Date(Number(currentDate?.endTime))
        const getMinutes = endTime?.getMinutes()
        const currentMinutesZero = (getMinutes === 0 ? '00' :  getMinutes) || '00'
        const hour = (endTime.getHours() < 10 ? '0' + endTime.getHours() : endTime.getHours()) || '00'
        
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

    const _renderPrice = () => {
        let price = articleData?.price || 0
        let unitTypeName = articleData?.unitTypeName || 'kg'
        return (
            price !== 0 ?
            price + ConstantString.STR_ICON_EURO + '/' + unitTypeName
            :
            ConstantString.STR_FREE
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

    const _showDialogCard = () => {
        return (
            <View style={styles.Card}>
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

                    <Text style={styles.textDistanceCard}>
                        {`${ConstantString.STR_AVAILABLE} ${ConstantString.STR_UNTIL}${_renderEndTime()}`}
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: ColorCustom.LIGHT_PINK} } />

            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.cardView}>
                            <View style={{flex: 1, width: '100%', alignItems: 'center'}}> 
                                <Text style={styles.textTitleCard}>
                                    Vous allez être prélevé de 20% de votre prix affiché				
                                </Text>
                                
                                <Text style={styles.textPrice}>
                                    {articleData.price ?
                                    articleData.price * 20 / 100
                                    :
                                    0
                                    } €
                                </Text>

                                {_showDialogCard()}
                            </View>


                            <TouchableOpacity onPress={onSubmit} style={styles.btnSubmit}>
                                <Text style={styles.textSubmit}>
                                    J'ai compris
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.titleHeader}>
                            <Text style={styles.textTitle}>
                                Bonne nouvelle !
                            </Text>	
                            <Text style={styles.textTitleDistance}>	
                                Une personne se trouvant à {`${distance ? distance : 0 + ' km'}`} arrive
                            </Text>
                        </View>

                        <View style={{flex: 1, alignItems: 'center'}}>
                            
                        </View>
                    </View>

                    <View style={styles.viewImage}>
                    <Image source={Images.come} style={styles.image}/>

                    <View style={{flexDirection: 'row', height: 50}}>
                        <Text style={styles.textMaxarel}>M</Text>

                        <Text style={styles.textMaxarel}>A</Text>

                        <Text style={styles.textMaxarel}>X</Text>

                        <Text style={styles.textMaxarel}>A</Text>

                        <Text style={styles.textMaxarel}>R</Text>

                        <Text style={styles.textMaxarel}>E</Text>

                        <Text style={styles.textMaxarel}>L</Text>
                    </View>
                    </View>
                </View>

                <Popup ref={customPopup} />
                <PopupLoading visible={isLoading} />
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    container: {
        flex: 1
    },
    header: {
        flex: 3,
    },
    titleHeader: {
        flex: 2, 
        alignItems: 'center', 
        backgroundColor: ColorCustom.LIGHT_PINK, 
        borderBottomLeftRadius: 20, 
        borderBottomRightRadius: 20,
        flexDirection: 'column',
    },
    textTitle: {
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        color: ColorCustom.BROWN,
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10
    },
    textTitleDistance: {
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        color: ColorCustom.BROWN,
        fontSize: 20,
        textAlign: 'center',
    },
    textPrice: {
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 19,
        color: ColorCustom.GREEN,
        textAlign: 'center'
    },
    viewImage: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
    },
    cardView: {
        alignItems: 'center',
        position: 'absolute', 
        bottom: 0, 
        width: '80%', 
        marginBottom: 10,
        alignSelf: 'center',
        flexDirection: 'column',
        zIndex: 1,
        paddingBottom: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textTitleCard: {
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 19,
        color: ColorCustom.BROWN,
        textAlign: 'center',
        marginTop: 10
    },
    btnSubmit: {
        height: 44,
        width: '90%',
        borderRadius: 22,
        borderWidth: 1,
        borderColor: ColorCustom.GREEN,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    textSubmit: {
        color: ColorCustom.GREEN,
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 22,
    },
    textMaxarel: {
        flex: 1,
        textAlign: 'center', 
        color: ColorCustom.GREEN, 
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0, 
        fontSize: 20
    },
    titleCardDialog: {
        fontSize: 16,
        textAlign: "center",
        color: ColorCustom.BROWN,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    Card: {
        flexDirection: 'row',
        width: '90%',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: ColorCustom.WHITE,
        marginTop: 5
    },
    textProductNameCard: {
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 18,
        color: ColorCustom.BROWN
    },
    textAddressCard: {
        color: ColorCustom.GREEN,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 16,
        marginTop: 5
    },
    textDistanceCard: {
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 15,
        color: ColorCustom.BLACK
    },
    rowPesticideCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    imageDialog: {
        height: 90,
        width: '100%'
    },
    colRightBodyCard: {
        width: "60%",
        paddingLeft: 10,
    },
    colLeftBodyCard: {
        flexDirection: 'column',
        width: '40%',
        padding: 5,
    },
    textDescriptionCard: {
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 17
    },
    textPriceCard: {
        color: ColorCustom.GREEN,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 16,
    },
})

export default NotifyArriveComponent
