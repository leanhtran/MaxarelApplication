import { takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actiontypes';
import { UPDATE_ARTICLE_API } from "../api/config";
import {APIRequest} from "../api/api-request";

export function* updateArticle(action) {
    try {
		let json = action.params;
        new APIRequest.Builder()
            .put()
			.reqURL(UPDATE_ARTICLE_API)
            .jsonParams(json)
            .response(action.onSuccess)
            .error(action.onError)
            .build()
            .doRequest();
    } catch (error) {
        action.onError(error)
    }
}

export function* watchUpdateArticle() {
    yield takeLatest(types.UPDATE_ARTICLE, updateArticle)
}