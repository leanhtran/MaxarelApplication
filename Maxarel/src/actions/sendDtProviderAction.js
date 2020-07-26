import { SEND_DT_PROVIDER } from "./actiontypes"

export const sendDeviceTokenProvider = (params, onSuccess, onError) => ({
    type: SEND_DT_PROVIDER,
    params,
    onSuccess,
    onError
})