import appState from './appState'

const updateProfileReducer = (state = appState.updateProfile, action) => {
    switch (action.type) {
        case 'UPDATE_PROFILE_SUCCESS': {
            return {...state, profile: action.data}
        }
        default: return state
    }
}

export default updateProfileReducer