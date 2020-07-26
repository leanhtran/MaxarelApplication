import { takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actiontypes';
import { REMEMBER_PRODUCT_API} from "../api/config";
import {APIRequest} from "../api/api-request";

export function* rememberProduct(action) {
    try {
        let json = JSON.stringify(action.params);
        new APIRequest.Builder()
            .post()
            .reqURL(REMEMBER_PRODUCT_API)
            .response(action.onSuccess)
            .jsonParams(json)
            .error(action.onError)
            .build()
            .doRequest();
    } catch (error) {
        action.onError(error)
    }
}

export function* watchRememberProduct() {
    yield takeLatest(types.REMEMBER_PRODUCT, rememberProduct)
}