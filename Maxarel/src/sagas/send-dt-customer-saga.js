import { takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actiontypes';
import {SEND_DT_CUSTOMER_API} from "../api/config";
import {APIRequest} from "../api/api-request";
export function* send_dt_customer(action) {
    try {
        let json = JSON.stringify(action.params);
        new APIRequest.Builder()
            .post()
            .reqURL(SEND_DT_CUSTOMER_API)
            .response(action.onSuccess)
            .jsonParams(json)
            .error(action.onError)
            .build()
            .doRequest();
    } catch (error) {
        action.onError(error)
    }
}

export function* watchSendDtCustomer() {
    yield takeLatest(types.SEND_DEVICE_TOKEN_CUSTOMER, send_dt_customer)
}