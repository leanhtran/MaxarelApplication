import { takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actiontypes'
import { GET_CONDITION_API } from "../api/config";
import { APIRequest } from "../api/api-request";

export function* getCondition(action) {
    try {
        new APIRequest.Builder()
            .get()
            .reqURL(GET_CONDITION_API)
            .response(action.onSuccess)
            .error(action.onError)
            .build()
            .doRequest();
    } catch (error) {
        action.onError(error)
    }
}

export function* watchGetCondition() {
    yield takeLatest(types.GET_CONDITION, getCondition)
}