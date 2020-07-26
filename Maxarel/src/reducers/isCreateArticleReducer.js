import appState from './appState'

const isCreateArticleReducer = (state = appState.createArticle, action) => {
    switch (action.type) {
        case 'IS_CREATE_ARTICLE': {
            return {...state, createArticle: action.data}
        }
        default: return state
    }
}

export default isCreateArticleReducer