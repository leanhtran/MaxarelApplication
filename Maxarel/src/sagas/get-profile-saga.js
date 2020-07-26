import { takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actiontypes'
import { GET_PROFILE } from "../api/config";
import { APIRequest } from "../api/api-request";

export function* get_profile(action) {
    try {
        new APIRequest.Builder()
            .get()
            .reqURL(GET_PROFILE)
            .response(action.onSuccess)
            .error(action.onError)
            .build()
            .doRequest();
    } catch (error) {
        action.onError(error)
    }
}

export function* watchGetProfile() {
    yield takeLatest(types.GET_PROFILE, get_profile)
}
