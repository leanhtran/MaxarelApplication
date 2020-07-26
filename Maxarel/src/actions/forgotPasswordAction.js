import { FORGOT_PASSWORD } from './actiontypes';

export const forgot_password_action = (params, onSuccess, onError) => ({
    type: FORGOT_PASSWORD,
    params,
    onSuccess,
    onError
})