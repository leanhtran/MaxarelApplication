import React from 'react'
import { 
    View, 
    StyleSheet, 
    TouchableOpacity,
    Image,
    Text,
    SafeAreaView
} from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { ColorCustom } from '../../../utils/color';
import { ConstantString } from '../../../utils/constant-string';
import { Images } from '../../../utils/images';
import { Platform } from 'react-native';


function LocationProfileComponent(props) {
    const {
        goBack,
        setDefaultValue,
        currentPosition,
        setCurrentPosition,
        titleCurrentPosition,
        setTitleCurrentPosition,
        submitPosition
    } = props
    const _renderBtnBack = () => {
        return (
            <View>
                <TouchableOpacity 
                onPress={goBack} 
                style={styles.btnBack}>
                    <Image style={styles.imageBack} source={Images.blackBack} />
                </TouchableOpacity>
            </View>

        )
    }

    const _renderBtnSubmit = () => {
        return (
            <TouchableOpacity 
            onPress={submitPosition} 
            style={styles.btnSubmit}>
                <Text style={styles.textSubmit}>{ConstantString.STR_SUBMIT}</Text>
            </TouchableOpacity>
        )

    }

    const yourLocation = { description: titleCurrentPosition, geometry: { location: { lat: currentPosition.latitude, lng: currentPosition.longitude } } };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    minLength={2}
                    returnKeyType={'search'}
                    listViewDisplayed={'false'}
                    fetchDetails={true}
                    renderDescription={row => row.description}
                    getDefaultValue={setDefaultValue}
                    onPress={(data, details = null) => {
                        setTitleCurrentPosition(data.description);
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
                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    renderLeftButton={() => _renderBtnBack()}
                    renderRightButton={() => _renderBtnSubmit()}
                />
                <View style={{flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1}}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={StyleSheet.absoluteFillObject}
                        initialRegion={currentPosition}
                        region={currentPosition}
                    >
                        <Marker
                            coordinate={{
                                latitude: currentPosition.latitude,
                                longitude: currentPosition.longitude
                            }}
                            title={titleCurrentPosition}
                        />
                    </MapView>
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: ColorCustom.LIGHT_GRAY
    },
    container: {
        flexDirection: 'column',
        zIndex: 10,
        flex: 1
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
    map: {
        ...StyleSheet.absoluteFillObject
    }
})

export default LocationProfileComponent
