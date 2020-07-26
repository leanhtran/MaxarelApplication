import React from 'react'
import { 
    StyleSheet, 
    SafeAreaView, 
    View, 
    TouchableOpacity, 
    Image,
    Text,
    Platform
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { myHeight } from '../../../../utils/dimension';
import { ColorCustom } from '../../../../utils/color';
import { ConstantString } from '../../../../utils/constant-string';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Images } from '../../../../utils/images';
import { callMaxarel } from '../../../../utils/callMaxrel';

function LocationDetailComponent(props) {
    const {
        currentPosition,
        providerPosition,
        goBack,
        showDetailAddress,
        isShowDetailAddress,
        precisions,
        postalAddress
    } = props

    const _renderRegion = () => {
        return (
            {
            ...currentPosition,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }
        )
    }

    const _callMaxarel = () => {
        callMaxarel()
    }

    return (
        <SafeAreaView style={{flex: 1, height: myHeight, backgroundColor: ColorCustom.LIGHT_GRAY }}>
            <View style={styles.container}>
                <View style={styles.rowHeader}>
                    <TouchableOpacity onPress={goBack} style={styles.btnBack}>
                        <Image source={Images.blackBack} style={styles.imageBack}/>
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>
                        {ConstantString.STR_TITLE_MAP}
                    </Text>
                </View>

                {/* <TouchableOpacity onPress={() => _callMaxarel()} style={styles.callContainer}>
                    <Image source={Images.phone} style={styles.phone} />

                    <View>
                        <Text style={{color: ColorCustom.WHITE, fontFamily: ConstantString.FONT_ITALIC}}>
                            J'ai du mal à trouver
                        </Text>

                        <Text style={{color: ColorCustom.WHITE, fontFamily: ConstantString.FONT_BOLD, fontSize: 16}}>
                            Contacter le vendeur
                        </Text>
                    </View>
                </TouchableOpacity> */}

                <View style={styles.detailAddressContainer}>

                    {
                        isShowDetailAddress ?
                        <Text style={styles.textDetailAddress} onPress={showDetailAddress}>
                            {
                                precisions?
                                precisions
                                :
                                postalAddress
                            }
                        </Text>
                        :
                        <TouchableOpacity onPress={showDetailAddress} style={styles.btnDetailAddress}>
                            <Text style={styles.textBtnDetailAddress}>
                                {ConstantString.STR_DETAILS_ADDRESS}
                            </Text>
                        </TouchableOpacity>
                    }
                </View>

                <View style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={StyleSheet.absoluteFillObject}
                        initialRegion={_renderRegion()}
                        region={_renderRegion()}
                        showsUserLocation
                        followsUserLocation={true}
                    >
                        <Marker
                            coordinate={{
                                latitude: providerPosition.latitude,
                                longitude: providerPosition.longitude
                            }}
                            title='Provider Location'
                        />
                        <MapViewDirections
                            origin={currentPosition}
                            destination={providerPosition}
                            apikey={ConstantString.KEY_GG_API}
                            strokeWidth={3}
                            strokeColor={ColorCustom.GREEN}
                        />
                    </MapView>
                </View>
                
                
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height: myHeight,
        zIndex: 10,
        flex: 1
    },
    rowHeader: {
        flexDirection: 'row',
        paddingVertical: 10,
        backgroundColor: ColorCustom.LIGHT_GRAY,
        zIndex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: ColorCustom.GRAY
    },
    textHeader: {
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 20,
        textAlign: "center",
        paddingLeft: 30,
        paddingRight: 30,
        color: ColorCustom.BROWN
    },
    imageBack: {
        width: 14,
        height: 22
    },
    btnBack: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignSelf: 'center',
        paddingLeft: 10,
        position: 'absolute',
        left: 0,
        zIndex: 1
    },
    btnSubmit: {
        alignSelf: 'center',
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    textSubmit: {
        color: ColorCustom.BROWN,
        fontSize: 17,
        fontFamily: ConstantString.FONT_BOLD,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
    },
    phone :{
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginRight: 10
    },
    callContainer: {
        position: 'absolute',
        zIndex: 1,
        right: 5,
        bottom: 55,
        padding: 10,
        backgroundColor: ColorCustom.GREEN,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    detailAddressContainer: {
        position: 'absolute',
        zIndex: 1,
        bottom: 0,
        width: '100%',
        backgroundColor: ColorCustom.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    btnDetailAddress: {
        height: 40,
        backgroundColor: ColorCustom.LIGHT_GREEN,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: ColorCustom.GREEN
    },
    textBtnDetailAddress :{
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 16,
        color: ColorCustom.BLACK
    },
    textDetailAddress: {
        fontFamily: ConstantString.FONT_REGULAR,
        marginTop: Platform.OS === 'ios' ? 5 : 0,
        fontSize: 17,
        textAlign: 'center'
    }
})

export default LocationDetailComponent
