import { DELETE_ARTICLE } from './actiontypes';

export const deleteArticleAction = (params, onSuccess, onError) => ({
    type: DELETE_ARTICLE,
    params,
    onSuccess,
    onError
})