import { UPDATE_ARTICLE } from './actiontypes';

export const updateArticle = (params, onSuccess, onError) => ({
    type: UPDATE_ARTICLE,
    params,
    onSuccess,
    onError
})