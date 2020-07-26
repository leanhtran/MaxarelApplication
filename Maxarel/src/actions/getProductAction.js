import { GET_PRODUIT_BY_CATEGORIESID } from './actiontypes';

export const get_produit_by_categoriesId = (params, onSuccess, onError) => ({
    type: GET_PRODUIT_BY_CATEGORIESID,
    params,
    onSuccess,
    onError
})