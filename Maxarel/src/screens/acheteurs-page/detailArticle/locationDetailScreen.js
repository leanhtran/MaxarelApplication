import React, {useState} from 'react'
import LocationDetailComponent from '../../../components/home/acheteur-page/detailArticle/locationDetailComponent'
import { useNavigationParam, useNavigation } from 'react-navigation-hooks'

function LocationDetailScreen() {
    const {goBack, navigate} = useNavigation()
    const currentPosition = useNavigationParam('currentPosition')
    const providerPosition = useNavigationParam('providerPosition')
    const postalAddress = useNavigationParam('postalAddress')
    const precisions = useNavigationParam('precisions')
    const [isShowDetailAddress, setIsShowDetailAddress] = useState(false)

    const _goBack = () => {
        goBack()
    }

    const _showDetailAddress = () => {
        setIsShowDetailAddress(!isShowDetailAddress)
    }

    return (
        <LocationDetailComponent 
            providerPosition={providerPosition}
            currentPosition={currentPosition}
            goBack={_goBack}
            postalAddress={postalAddress}
            showDetailAddress={_showDetailAddress}
            isShowDetailAddress={isShowDetailAddress}
            precisions={precisions}
        />
    )
}

export default LocationDetailScreen

