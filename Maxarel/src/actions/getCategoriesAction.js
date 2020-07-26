import { GET_CATEGORIES, GET_PRODUIT, GET_PRODUIT_BY_CATEGORIESID } from './actiontypes';

export const get_categories = (params,onSuccess, onError) => ({
    type: GET_CATEGORIES,
    params,
    onSuccess,
    onError
})
export const get_produit = (params, onSuccess, onError) => ({
    type: GET_PRODUIT,
    params,
    onSuccess,
    onError
})
export const get_produit_by_categoriesId = (params, onSuccess, onError) => ({
    type: GET_PRODUIT_BY_CATEGORIESID,
    params,
    onSuccess,
    onError
})