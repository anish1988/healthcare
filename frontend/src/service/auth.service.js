import {userData, authKey} from '../constant/storageKey';
import {decodeToken} from '../utils/jwt';
import { getFromLocalStorage, setLocalStorage } from '../utils/local-storage';
export const setUserInfo = ({ accessToken }) => {
    return setLocalStorage(authKey, accessToken);
}

export const getUserInfo = () => {
    const authToken = getFromLocalStorage(userData);
   // console.log("Auth Token Data",JSON.parse(authToken));
    const parseuserDatas = JSON.parse(authToken);
   // console.log("Auth Token Data authToken",parseuserDatas?.accessToken);
    if (parseuserDatas) {
        const decodedToken = decodeToken(parseuserDatas?.accessToken);
        return decodedToken
    } else {
        return null
    }
}
export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(userData);
    return !!authToken;
}
export const loggedOut = () => {
    return localStorage.removeItem(userData)
}
