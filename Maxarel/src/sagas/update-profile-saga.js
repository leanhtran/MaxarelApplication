import { takeLatest, put } from 'redux-saga/effects';
import * as types from '../actions/actiontypes';
import { UPDATE_PROFILE_API} from "../api/config";
import {APIRequest} from "../api/api-request";
import { isUpdateProfile, updateProfileSuccess } from '../actions/updateProfileAction';

export function* update_profile_action(action) {
    console.log('acc',action)
    try {
        let json = JSON.stringify(action.params);
        new APIRequest.Builder()
            .post()
            .reqURL(UPDATE_PROFILE_API)
            .response(action.onSuccess)
            .jsonParams(json)
            .error(action.onError)
            .build()
            .doRequest();
    } catch (error) {
        action.onError(error)
    }
}

export function* watchUpdateProfile() {
    yield takeLatest(types.UPDATE_PROFILE, update_profile_action)
}

export function* is_update_profile_action(action) {
    try {
        yield put(updateProfileSuccess(action.data))
    } catch (error) {
        console.log('error',error)
    }
}

export function* watchIsUpdateProfile() {
    yield takeLatest(types.IS_UPDATE_PROFILE, is_update_profile_action)
}

