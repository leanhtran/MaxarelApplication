import { REMEMBER_PRODUCT } from "./actiontypes"

export const rememberProduct = (params, onSuccess, onError) => ({
    type: REMEMBER_PRODUCT,
    params,
    onSuccess,
    onError
})