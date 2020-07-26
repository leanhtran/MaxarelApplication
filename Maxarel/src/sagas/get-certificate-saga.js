import { takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actiontypes'
import { GET_CERTIFICATE_API } from "../api/config";
import { APIRequest } from "../api/api-request";

export function* getCertificate(action) {
    try {
        new APIRequest.Builder()
            .get()
            .reqURL(GET_CERTIFICATE_API)
            .response(action.onSuccess)
            .error(action.onError)
            .build()
            .doRequest();
    } catch (error) {
        action.onError(error)
    }
}

export function* watchGetCertificate() {
    yield takeLatest(types.GET_CERTIFICATE, getCertificate)
}