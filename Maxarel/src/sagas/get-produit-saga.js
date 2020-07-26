import { takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actiontypes'
import { GET_PRODUIT_API, GET_PRODUIT_BY_CATEGORIESID_API} from "../api/config";
import {APIRequest} from "../api/api-request";
export function* get_produit(action) {
    try {
        let json = JSON.stringify(action.params);
        new APIRequest.Builder()
            .get()
            .reqURL(GET_PRODUIT_API)
            .paramsGet(action.params)
            .response(action.onSuccess)
            .error(action.onError)
            .build()
            .doRequest();
    } catch (error) {
        action.onError(error)
    }
}

export function* watchGetProduit() {
    yield takeLatest(types.GET_PRODUIT, get_produit)
}

export function* get_produit_by_categoriesId(action) {
    try {
        let json = JSON.stringify(action.params);
        new APIRequest.Builder()
            .get()
            .reqURL(GET_PRODUIT_BY_CATEGORIESID_API)
            .paramsGet(action.params)
            .response(action.onSuccess)
            .error(action.onError)
            .build()
            .doRequest();
    } catch (error) {
        action.onError(error)
    }
}

export function* watchGetProduitByCategoriesId() {
    yield takeLatest(types.GET_PRODUIT_BY_CATEGORIESID, get_produit_by_categoriesId)
}