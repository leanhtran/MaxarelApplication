import { GET_AVATAR, UPDATE_AVATAR } from './actiontypes';

export const getAvatar = ( onSuccess, onError) => ({
    type: GET_AVATAR,
    onSuccess,
    onError
})

export const updateAvatar = ( params, onSuccess, onError) => ({
    type: UPDATE_AVATAR,
    params,
    onSuccess,
    onError
})