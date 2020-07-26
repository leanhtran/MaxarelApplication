import appState from './appState'

const isFirstTimeReducer = (state = appState.isFirstTime, action) => {
    switch (action.type) {
        case 'IS_FIRST_TIME': {
            return {...state, isFirstTime: action.data}
        }
        default: return state
    }
}

export default isFirstTimeReducer