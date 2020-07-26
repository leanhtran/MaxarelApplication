import { GET_CERTIFICATE } from './actiontypes';

export const getCertificate = (onSuccess, onError) => ({
    type: GET_CERTIFICATE,
    onSuccess,
    onError
})