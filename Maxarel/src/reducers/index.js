import { combineReducers } from 'redux';
import loginReducers from './login-reducers';
import mapInfoReducer from './mapInfo-reducer';
import updateProfileReducer from './isUpdateProfileReducer';
import isCreateArticleReducer from './isCreateArticleReducer';
import isUpdateArticleReducer from './isUpdateArticleReducer';
import isFirstTimeReducer from './isFirstTimeReducer';

const allReducers = combineReducers({
    login: loginReducers,
    mapInfo: mapInfoReducer,
    updateProfile: updateProfileReducer,
	createArticle:isCreateArticleReducer,
    updateArticle: isUpdateArticleReducer,
    isFirstTime: isFirstTimeReducer,
})
export default allReducers