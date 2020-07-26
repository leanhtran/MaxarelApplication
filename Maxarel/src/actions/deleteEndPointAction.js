import { DELETE_END_POINT } from './actiontypes';
export const delete_end_point = (params, onSuccess, onError) => ({
    type: DELETE_END_POINT,
    params,
    onSuccess,
    onError
})