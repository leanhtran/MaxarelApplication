import { GET_LOCATION_GOOGLE_MAP_REDUCER, GET_LOCATION_GOOGLE_MAP} from './actiontypes';

export const get_location_action = (data) => {
    return{
        type: GET_LOCATION_GOOGLE_MAP_REDUCER,
        data
    }
}

export const get_location= (data) => {
    return{
        type: GET_LOCATION_GOOGLE_MAP,
        data
    }
}