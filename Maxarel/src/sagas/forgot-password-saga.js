import { takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actiontypes';
import {FORGOT_PASSWORD_API} from "../api/config";
import {APIRequest} from "../api/api-request";

export function* forgot_password(action) {
    try {
        new APIRequest.Builder()
            .post()
            .reqURL(FORGOT_PASSWORD_API)
            .paramsGet(action.params)
            .response(action.onSuccess)
            .error(action.onError)
            .build()
            .doRequest();
    } catch (error) {
        action.onError(error)
    }
}

export function* watchForgot() {
    yield takeLatest(types.FORGOT_PASSWORD, forgot_password)
}