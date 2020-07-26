import appState from './appState'

const isCreateArticleReducer = (state = appState.updateArticle, action) => {
    switch (action.type) {
        case 'UPDATE_ARTICLE': {
            return {...state, updateArticle: action.data}
        }
        default: return state
    }
}

export default isCreateArticleReducer