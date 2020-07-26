import { GET_PROFILE } from './actiontypes';

export const getProfile = (onSuccess, onError) => ({
    type: GET_PROFILE,
    onSuccess,
    onError
})