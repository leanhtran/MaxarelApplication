const env = {
    dev: 'dev', test: 'test', stg: 'stg', product: 'product', local: 'local', localDaNang: 'localDaNang', customer: 'customer'
};
export const API_URL = {
    local: 'http://172.16.100.250:21021/',
    dev: 'http://172.16.12.148:21021/', 
    test: 'http://172.16.12.148:21021/',
    stg: 'http://172.16.12.148:21021/',
    product: 'http://172.16.12.148:21021/',
    localDaNang: 'http://192.168.0.141:21021/',
    customer: 'http://35.180.253.123/',
};
// change url local
const currentEnv = env.customer;

export const BASE_API_URL = API_URL[currentEnv];
const USER_TOKEN = 'USER_TOKEN';

//URL LOGIN
const LOGIN_API = "/api/TokenAuth/Authenticate";
//URL REGISTER
const REGISTER_API = "/api/services/app/CurrentUser/Register";
//URL GET_CATEGORIES
const GET_CATEGORIES_API = "/api/services/app/Category/GetAllBySupplier";
//URL GET_PRODUIT
const GET_PRODUIT_API = "/api/services/app/Product/GetProductsByParams"
const GET_PRODUIT_BY_CATEGORIESID_API = "/api/services/app/Product/GetAllProduct"
const GET_PRODUCT_BY_INPUT_TEXT_API = "/api/services/app/Product/GetAllProduct"
// URL GET_HISTORY_ARTICLE
const GET_HISTORY_ARTICLE_API = "/api/services/app/Article/GetArticlesByParams"
// URL GET_ARTICLE_BY_ID
const GET_ARTICLE_BY_ID_API = "/api/services/app/Article/GetArticleById"

// URL GET_HISTORY_ARTICLE
export const GET_HISTORY_ARTICLE_VENDEUR_API = "/api/services/app/Article/GetArticleByCurrentUsers";
// URL GET_PRODUCT_BY_API
const CREATE_ARTICLE_BY_USER = "/api/services/app/Article/CreateArticle";

const GET_UNIT_TYPE = "/api/services/app/UnitType/GetAll";
const GET_PROFILE = "/api/services/app/CurrentUser/getProfile";

//URL SEND_DEVICE_TOKEN_CUSTOMER
const SEND_DT_CUSTOMER_API = "/api/services/app/Notification/PushNotification"

//URL FORGOT_PASSWORD
const FORGOT_PASSWORD_API = "/api/services/app/CurrentUser/ForgotPassword"

//URL SEND_DEVICE_TOKEN_PROVIDER
const SEND_DT_PROVIDER_API = "/api/services/app/CurrentUser/SubcribeEnpointAWS"

//URL DELETE_END_POINT
const DELETE_END_POINT_API = "/api/services/app/Notification/DeleteEndpoint"

//URL UPDATE_PROFILE
const UPDATE_PROFILE_API = "/api/services/app/CurrentUser/UpdateProfile"

//URL CHANGE_PASSWORD
const CHANGE_PASSWORD_API = "/api/services/app/CurrentUser/ChangePassword"

//URL QUICKLY_CREATE_ARTICLE
const QUICKLY_CREATE_ARTICLE_API = "/api/services/app/Article/CreateFastArticle"

//URL ADD_EVALUATION
const ADD_EVALUATION_API = "/api/services/app/Article/AddEvaluation"

//URL UPDATE_ARTICLE
const UPDATE_ARTICLE_API = "/api/services/app/Article/UpdateArticle"
//URL UPDATE_AVATAR, GET_AVATAR
const UPDATE_AVATAR_API = "/api/services/app/CurrentUser/UpdateAvatar"
const GET_AVATAR_API = "/api/services/app/CurrentUser/GetAvatar"

//URL REMEMBER_PRODUCT
const REMEMBER_PRODUCT_API = "/api/services/app/Product/RememberProduct"

const DELETE_ARTICLE_API = "/api/services/app/Article/DeleteArticle"

const GET_CERTIFICATE_API = "/api/services/app/Article/GetAllCertification"

const GET_CONDITION_API = "/api/services/app/Article/GetCondition"

export {
    USER_TOKEN,
    LOGIN_API,
    GET_PROFILE,
    REGISTER_API,
    GET_UNIT_TYPE,
    GET_CATEGORIES_API,
    GET_PRODUIT_API,
    GET_PRODUIT_BY_CATEGORIESID_API,
    GET_HISTORY_ARTICLE_API,
    GET_ARTICLE_BY_ID_API,
    CREATE_ARTICLE_BY_USER,
    GET_PRODUCT_BY_INPUT_TEXT_API,
    SEND_DT_CUSTOMER_API,
    FORGOT_PASSWORD_API,
    SEND_DT_PROVIDER_API,
    DELETE_END_POINT_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    QUICKLY_CREATE_ARTICLE_API,
	ADD_EVALUATION_API,
	UPDATE_ARTICLE_API,
    UPDATE_AVATAR_API,
    GET_AVATAR_API,
    REMEMBER_PRODUCT_API,
    DELETE_ARTICLE_API,
    GET_CERTIFICATE_API,
    GET_CONDITION_API
}
