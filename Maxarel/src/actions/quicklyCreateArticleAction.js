import { QUICKLY_CREATE_ARTICLE } from './actiontypes';

export const quicklyCreateArticle = (params, onSuccess, onError) => ({
    type: QUICKLY_CREATE_ARTICLE,
    params,
    onSuccess,
    onError
})