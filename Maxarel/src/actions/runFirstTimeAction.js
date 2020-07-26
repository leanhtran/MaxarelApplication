import { RUN_FIRST_TIME, IS_FIRST_TIME } from "./actiontypes"

export const runFirstTime = (data) => ({
    type: RUN_FIRST_TIME,
    data
})

export const isFirstTime = (data) => ({
    type: IS_FIRST_TIME,
    data
})