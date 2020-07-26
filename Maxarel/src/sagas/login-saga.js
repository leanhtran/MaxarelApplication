import { put, call, fork, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actiontypes';
import {LOGIN_API, REGISTER_API} from "../api/config";
import {APIRequest} from "../api/api-request";
export function* login(action) {
    try {
        let json = JSON.stringify(action.params);
        new APIRequest.Builder()
            .post()
            .reqURL(LOGIN_API)
            .jsonParams(json)
            .response(action.onSuccess)
            .error(action.onError)
            .build()
            .doRequest();
    } catch (error) {
        action.onError(error)
    }
}

export function* watchLogin() {
    yield takeLatest(types.LOGIN, login)
}

export function* register(action) {
    try {
        let json = JSON.stringify(action.params);
        new APIRequest.Builder()
            .post()
            .reqURL(REGISTER_API)
            .jsonParams(json)
            .response(action.onSuccess)
            .error(action.onError)
            .build()
            .doRequest();
    } catch (error) {
        action.onError(error)
    }
}

export function* watchResgister() {
    yield takeLatest(types.REGISTER, register)
}