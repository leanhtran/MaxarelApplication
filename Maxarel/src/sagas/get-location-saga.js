import { put, call, fork, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actiontypes'
import {get_location_action} from '../actions/mapAction'

export function* get_location(action) {
    try {
        yield put(get_location_action(action.data))
    } catch (error) {
        console.log("error", error)
    }
}

export function* watchGetLocation() {
    yield takeLatest(types.GET_LOCATION_GOOGLE_MAP, get_location)
}