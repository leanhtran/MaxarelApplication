import { takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actiontypes';
import {CHANGE_PASSWORD_API} from "../api/config";
import {APIRequest} from "../api/api-request";

export function* changePassword(action) {
  try {
    let json = JSON.stringify(action.params);
    new APIRequest.Builder()
      .post()
      .reqURL(CHANGE_PASSWORD_API)
      .jsonParams(json)
      .response(action.onSuccess)
      .error(action.onError)
      .build()
      .doRequest();
  } catch (error) {
    action.onError(error)
  }
}

export function* watchChangePassword() {
  yield takeLatest(types.CHANGE_PASSWORD, changePassword)
}