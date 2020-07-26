import { REGISTER } from "./actiontypes"

export const register = (params, onSuccess, onError) => ({
    type: REGISTER,
    params,
    onSuccess,
    onError
})