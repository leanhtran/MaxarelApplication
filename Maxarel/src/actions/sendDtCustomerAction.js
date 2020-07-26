import { SEND_DEVICE_TOKEN_CUSTOMER } from "./actiontypes"

export const send_device_token_customer = (params, onSuccess, onError) => ({
    type: SEND_DEVICE_TOKEN_CUSTOMER,
    params,
    onSuccess,
    onError
})