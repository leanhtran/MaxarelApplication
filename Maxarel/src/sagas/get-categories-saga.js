import { put, call, fork, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actiontypes'
import { GET_CATEGORIES_API } from "../api/config";
import { APIRequest } from "../api/api-request";

export function* get_categories(action) {
    try {
        new APIRequest.Builder()
            .get()
            .reqURL(GET_CATEGORIES_API)
            .response(action.onSuccess)
            .paramsGet(action.params)
            .error(action.onError)
            .build()
            .doRequest();
    } catch (error) {
        action.onError(error)
    }
}

export function* watchCategories() {
    yield takeLatest(types.GET_CATEGORIES, get_categories)
}