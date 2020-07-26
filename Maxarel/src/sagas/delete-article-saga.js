import { takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actiontypes';
import { DELETE_ARTICLE_API} from "../api/config";
import {APIRequest} from "../api/api-request";

export function* deleteArticleSaga(action) {
    try {
        let json = JSON.stringify(action.params);
        new APIRequest.Builder()
            .delete()
            .reqURL(DELETE_ARTICLE_API)
            .jsonParams(json)
            .response(action.onSuccess)
            .error(action.onError)
            .build()
            .doRequest();
    } catch (error) {
        action.onError(error)
    }
}

export function* watchDeleteArticleSaga() {
    yield takeLatest(types.DELETE_ARTICLE, deleteArticleSaga)
}