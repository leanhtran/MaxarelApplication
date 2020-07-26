const loginReducer = (state = null, action) => {

    switch (action.type) {
        case "FETCH_USER":
            return { ...state, ...{ userInfo: action.data } }
        default:
            return state
    }
}
export default loginReducer