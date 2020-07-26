import { takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actiontypes';
import { QUICKLY_CREATE_ARTICLE_API} from "../api/config";
import {APIRequest} from "../api/api-request";

export function* quickyCreateArticle(action) {
    try {
        let json = JSON.stringify(action.params);
        new APIRequest.Builder()
            .post()
            .reqURL(QUICKLY_CREATE_ARTICLE_API)
            .response(action.onSuccess)
            .jsonParams(json)
            .error(action.onError)
            .build()
            .doRequest();
    } catch (error) {
        action.onError(error)
    }
}

export function* watchQuickyCreateArticle() {
    yield takeLatest(types.QUICKLY_CREATE_ARTICLE, quickyCreateArticle)
}