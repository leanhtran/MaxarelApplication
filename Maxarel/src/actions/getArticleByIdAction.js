import { GET_ARTICLE_BY_ID, CREATE_ARTICLE_BY_USER } from './actiontypes';

export const getArticleById = (params, onSuccess, onError) => ({
    type: GET_ARTICLE_BY_ID,
    params,
    onSuccess,
    onError
})

export const createArticleByUser = (params, onSuccess, onError) => ({
    type: CREATE_ARTICLE_BY_USER,
    params,
    onSuccess,
    onError
})