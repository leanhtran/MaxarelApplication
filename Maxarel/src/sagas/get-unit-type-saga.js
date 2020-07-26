import { takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actiontypes'
import { GET_UNIT_TYPE } from "../api/config";
import { APIRequest } from "../api/api-request";

export function* get_unit_type(action) {
    try {
        new APIRequest.Builder()
            .get()
            .reqURL(GET_UNIT_TYPE)
            .response(action.onSuccess)
            .error(action.onError)
            .build()
            .doRequest();
    } catch (error) {
        action.onError(error)
    }
}

export function* watchGetUnitType() {
    yield takeLatest(types.GET_UNIT_TYPE, get_unit_type)
}
