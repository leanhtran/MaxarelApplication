import { takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actiontypes';
import { GET_AVATAR_API, UPDATE_AVATAR_API} from "../api/config";
import {APIRequest} from "../api/api-request";

export function* getAvatar(action) {
  try {
    new APIRequest.Builder()
      .get()
      .reqURL(GET_AVATAR_API)
      .response(action.onSuccess)
      .error(action.onError)
      .build()
      .doRequest();
  } catch (error) {
    action.onError(error)
  }
}

export function* watchGetAvatar() {
  yield takeLatest(types.GET_AVATAR, getAvatar)
}

export function* updateAvatar(action) {
  try {
    let json = JSON.stringify(action.params);
    new APIRequest.Builder()
      .post()
      .reqURL(UPDATE_AVATAR_API)
      .jsonParams(json)
      .response(action.onSuccess)
      .error(action.onError)
      .build()
      .doRequest();
  } catch (error) {
    action.onError(error)
  }
}

export function* watchUpdateAvatar() {
  yield takeLatest(types.UPDATE_AVATAR, updateAvatar)
}