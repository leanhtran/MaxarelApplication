import { takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actiontypes';
import { ADD_EVALUATION_API} from "../api/config";
import {APIRequest} from "../api/api-request";

export function* addEvaluation(action) {
  try {
    let json = JSON.stringify(action.params);
    new APIRequest.Builder()
      .post()
      .reqURL(ADD_EVALUATION_API)
      .jsonParams(json)
      .response(action.onSuccess)
      .error(action.onError)
      .build()
      .doRequest();
  } catch (error) {
    action.onError(error)
  }
}

export function* watchAddEvaluation() {
  yield takeLatest(types.ADD_EVALUATION, addEvaluation)
}