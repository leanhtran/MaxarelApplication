import { takeLatest, put } from 'redux-saga/effects';
import * as types from '../actions/actiontypes'
import { GET_HISTORY_ARTICLE_API, GET_PRODUCT_BY_INPUT_TEXT_API, GET_HISTORY_ARTICLE_VENDEUR_API } from "../api/config";
import { APIRequest } from "../api/api-request";
import { isCreateArticle } from '../actions/isCreteArticle';

export function* get_history_article(action) {
    try {
        new APIRequest.Builder()
            .get()
            .reqURL(GET_HISTORY_ARTICLE_API)
            .response(action.onSuccess)
            .paramsGet(action.params)
            .error(action.onError)
            .build()
            .doRequest();
    } catch (error) {
        action.onError(error)
    }
}

export function* watchGetHistoryArticle() {
    yield takeLatest(types.GET_HISTORY_ARTICLE, get_history_article)
}

export function* get_history_article_vendeur(action) {
    try {
        new APIRequest.Builder()
            .get()
            .reqURL(GET_HISTORY_ARTICLE_VENDEUR_API)
            .response(action.onSuccess)
            .paramsGet(action.params)
            .error(action.onError)
            .build()
            .doRequest();
    } catch (error) {
        action.onError(error)
    }
}

export function* watchGetHistoryArticleVendeur() {
    yield takeLatest(types.GET_HISTORY_ARTICLE_VENDEUR, get_history_article_vendeur)
}

export function* get_product_by_input_text(action) {
    try {
        new APIRequest.Builder()
            .get()
            .reqURL(GET_PRODUCT_BY_INPUT_TEXT_API)
            .response(action.onSuccess)
            .paramsGet(action.params)
            .error(action.onError)
            .build()
            .doRequest();
    } catch (error) {
        action.onError(error)
    }
}

export function* watchGetProductByInputText() {
    yield takeLatest(types.GET_PRODUCT_BY_INPUT_TEXT, get_product_by_input_text)
}

export function* createAriticle(action) {
    try {
        yield put(isCreateArticle(action.data))
    } catch (error) {
        console.log("error", error)
    }
}

export function* watchCreateArticle() {
    yield takeLatest(types.CREATE_ARTICLE, createAriticle)
}