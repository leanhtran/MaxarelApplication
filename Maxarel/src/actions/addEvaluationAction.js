import { ADD_EVALUATION } from './actiontypes';

export const addEvaluation = (params, onSuccess, onError) => ({
    type: ADD_EVALUATION,
    params,
    onSuccess,
    onError
})