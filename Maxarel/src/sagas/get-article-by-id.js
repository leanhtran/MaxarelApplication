import {takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actiontypes'
import { GET_ARTICLE_BY_ID_API, CREATE_ARTICLE_BY_USER } from "../api/config";
import { APIRequest } from "../api/api-request";

export function* get_article_by_id(action) {
    try {
        new APIRequest.Builder()
            .get()
            .reqURL(GET_ARTICLE_BY_ID_API)
            .response(action.onSuccess)
            .error(action.onError)
            .paramsGet(action.params)
            .build()
            .doRequest();
    } catch (error) {
        action.onError(error)
    }
}

export function* watchGetArticleById() {
    yield takeLatest(types.GET_ARTICLE_BY_ID, get_article_by_id)
}

export function* create_article_by_user(action) {
    try {
        let json = JSON.stringify(action.params);
        new APIRequest.Builder()
            .post()
            .reqURL(CREATE_ARTICLE_BY_USER)
            .jsonParams(json)
            .response(action.onSuccess)
            .error(action.onError)
            .build()
            .doRequest();
    } catch (error) {
        action.onError(error)
    }
}

export function* watchCreateArticleByUser() {
    yield takeLatest(types.CREATE_ARTICLE_BY_USER, create_article_by_user)
}