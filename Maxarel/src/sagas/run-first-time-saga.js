import { takeLatest, put } from 'redux-saga/effects';
import * as types from '../actions/actiontypes';
import { isFirstTime } from '../actions/runFirstTimeAction';

export function* runFirstTime(actions) {
  try {
      yield put(isFirstTime(actions.data))
  } catch (error) {
      console.log('error',error)
  }
}

export function* watchRunFirstTime() {
  yield takeLatest(types.RUN_FIRST_TIME, runFirstTime)
}