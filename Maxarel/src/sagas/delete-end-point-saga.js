import { takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actiontypes';
import {DELETE_END_POINT_API} from "../api/config";
import {APIRequest} from "../api/api-request";

export function* delete_end_point(action) {
    try {
        let json = JSON.stringify(action.params);
        new APIRequest.Builder()
            .post()
            .reqURL(DELETE_END_POINT_API)
            .jsonParams(json)
            .response(action.onSuccess)
            .error(action.onError)
            .build()
            .doRequest();
    } catch (error) {
        action.onError(error)
    }
}

export function* watchDeleteEndPoint() {
    yield takeLatest(types.DELETE_END_POINT, delete_end_point)
}