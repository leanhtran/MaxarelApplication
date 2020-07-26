import { GET_CONDITION } from './actiontypes';

export const getCondition = (onSuccess, onError) => ({
    type: GET_CONDITION,
    onSuccess,
    onError
})