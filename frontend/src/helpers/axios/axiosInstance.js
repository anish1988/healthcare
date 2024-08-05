import axios from "axios";
import { getFromLocalStorage } from "../../utils/local-storage";

export const instance = axios.create();

instance.defaults.headers.post['Accept'] = 'application/json';
instance.defaults.timeout = 60000;

instance.interceptors.request.use(function (config) {
    const userData = getFromLocalStorage('userData');
    const parseuserData = JSON.parse(userData);
    //console.log("userdata Access Token",JSON.parse(userData));
    //console.log("userdata Access Token 234",JSON.parse(userData)?.accessToken);
  //  accessTokens = userData?.accessToken;
    if (parseuserData) {
        config.headers.Authorization = parseuserData?.accessToken;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    //console.log("axiosInstance Response",response);
    const responseObj = {
        data: response?.data?.data,
        meta: response?.data?.meta
    }
    return responseObj;
}, function (error) {
    return Promise.reject(error);
});
