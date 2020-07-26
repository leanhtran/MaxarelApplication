import axios from 'axios';
import { ResponseCode } from "./response-code";
import { BASE_API_URL, USER_TOKEN } from "./config";
import AsyncStorage from '@react-native-community/async-storage';

let axiosInstance = axios.create({
    baseURL: BASE_API_URL,
    timeout: 120000,
});

function setToken(token) {
    storeData(token)
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

}

const storeData = async (token) => {
    try {
        await AsyncStorage.setItem(USER_TOKEN, token)
    } catch (e) {
        console.log("Save token error: ", e)
    }
}

// return request config or request error
axiosInstance.interceptors.request.use(
    async (config) => {
        return config;
    },
    error => Promise.reject(error)
);

// user axios interceptors for change response and error as we want
axiosInstance.interceptors.response.use((response) => {

    let dataResponse = {
        status: response.status,
        meta: response.data.meta,
        data: response.data ? response.data : null,
    };
    return Promise.resolve(response.data);
}, (error) => {
    let errorResponse = {
        status: error.response ? error.response.status : ResponseCode.INTERNAL_SERVER_ERROR,
        meta: error.response && error.response.data && error.response.data.meta ? error.response.data.meta : undefined,
        data: error.response && error.response.data && error.response.data.data ? error.response.data.data : undefined,
    };
    switch (errorResponse.status) {
        case ResponseCode.NOT_FOUND:
            // handle api url not found
            break;
        case ResponseCode.BAD_GATEWAY:
            // handle something went wrong with server
            break;
        case ResponseCode.INTERNAL_SERVER_ERROR:
        // handle server error
        case ResponseCode.TOKEN_INVALID:
            // handle token invalid (here logout user from app if token invalid)
            //store.dispatch(logout());
            //DeviceEventEmitter.emit(notificationKey.LOGOUT, {});
            break;
    }
    return Promise.reject(error.response.data);
});

export {
    axiosInstance,
    setToken
};