import { GET_UNIT_TYPE } from './actiontypes';

export const get_unit_type = (onSuccess, onError) => ({
    type: GET_UNIT_TYPE,
    onSuccess,
    onError
})