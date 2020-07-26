import React, { useState } from 'react'
import LocationProfileComponent from '../../components/home/profile/locationProfileComponent'
import { useNavigationParam, useNavigation } from 'react-navigation-hooks'
import { useEffect } from 'react'
import * as locationActions from '../../actions/mapAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function LocationProfileScreen(props) {
    const [titleCurrentPosition, setTitleCurrentPosition] = useState('Your location')
    const position = useNavigationParam('position')
    const defaultValue = useNavigationParam('defaultValue')
    const {goBack, navigate} = useNavigation()
    const [currentPosition, setCurrentPosition] = useState({
        latitude: position.lat,
        longitude: position.lng,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
        })
    
        
    const _setDefaultValue = () => {
        return defaultValue
    }

    const _submitPosition = () => {
        const addressData = {
            address: titleCurrentPosition,
            lat: currentPosition.latitude,
            lng: currentPosition.longitude
        }
        try {
            props.actions.actionLocation.get_location(addressData);
            goBack()
        } catch (error) {

        }
    }

    const _goBack = () => {
        goBack()
    }

    const _setCurrentPosition = (data) => {
        setCurrentPosition({...currentPosition, latitude: data.lat, longitude: data.lng})
    }

    useEffect(() => {
        setTitleCurrentPosition(defaultValue)
    },[])
    return (
        <LocationProfileComponent 
        goBack={_goBack}
        setDefaultValue={_setDefaultValue}
        currentPosition={currentPosition}
        setCurrentPosition={_setCurrentPosition}
        titleCurrentPosition={titleCurrentPosition}
        setTitleCurrentPosition={setTitleCurrentPosition}
        submitPosition={_submitPosition}
        />
    )
}

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            actionLocation: bindActionCreators(locationActions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationProfileScreen);