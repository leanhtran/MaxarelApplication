import { LOGIN } from './actiontypes';
export const login = (params, onSuccess, onError) => ({
    type: LOGIN,
    params,
    onSuccess,
    onError
})