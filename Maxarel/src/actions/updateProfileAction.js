import { UPDATE_PROFILE, IS_UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS } from "./actiontypes"

export const updateProfile = (params, onSuccess, onError) => ({
    type: UPDATE_PROFILE,
    params,
    onSuccess,
    onError
})

export const isUpdateProfile = (data) => ({
    type: IS_UPDATE_PROFILE,
    data
})

export const updateProfileSuccess = data => ({
    type: UPDATE_PROFILE_SUCCESS,
    data
})
