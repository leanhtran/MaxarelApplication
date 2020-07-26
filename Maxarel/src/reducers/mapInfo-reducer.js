import appState from "./appState"

const mapInfoReducer = (state = appState.map, action) => {
    switch (action.type) {
        case "GET_LOCATION_GOOGLE_MAP_REDUCER":
            return { ...state, ...{ locationInfo: action.data } }
        default:
            return state
    }
}
export default mapInfoReducer