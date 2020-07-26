import { CHANGE_PASSWORD } from './actiontypes';

export const changePassword = (params, onSuccess, onError) => ({
    type: CHANGE_PASSWORD,
    params,
    onSuccess,
    onError
})