import { takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actiontypes';
import { SEND_DT_PROVIDER_API} from "../api/config";
import {APIRequest} from "../api/api-request";
export function* send_dt_provider(action) {
    try {
        let json = JSON.stringify(action.params);
        new APIRequest.Builder()
            .post()
            .reqURL(SEND_DT_PROVIDER_API)
            .response(action.onSuccess)
            .jsonParams(json)
            .error(action.onError)
            .build()
            .doRequest();
    } catch (error) {
        action.onError(error)
    }
}

export function* watchSendDtProvider() {
    yield takeLatest(types.SEND_DT_PROVIDER, send_dt_provider)
}