import { GET_HISTORY_ARTICLE, GET_PRODUCT_BY_INPUT_TEXT, GET_HISTORY_ARTICLE_VENDEUR, CREATE_ARTICLE } from './actiontypes';

export const getHistoryArticle = (params, onSuccess, onError) => ({
    type: GET_HISTORY_ARTICLE,
    params,
    onSuccess,
    onError
})

export const getProductByInputText = (params, onSuccess, onError) => ({
    type: GET_PRODUCT_BY_INPUT_TEXT,
    params,
    onSuccess,
    onError
})

export const getHistoryArticleVendeur = (params, onSuccess, onError) => ({
    type: GET_HISTORY_ARTICLE_VENDEUR,
    params,
    onSuccess,
    onError
})

export const createArticle = (data) => ({
    type: CREATE_ARTICLE,
    data
})