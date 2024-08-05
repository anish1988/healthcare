export const setUserInfo = ({userData}) =>{
    return setLocalStorage('userData',userData)
}

export const setLocalStorage = (key, userData) => {
    if (!key || typeof window === 'undefined') {
        return ''
    }
    //console.log("Key dand User Data",key,userData);
    return localStorage.setItem(key, JSON.stringify(userData))
}

export const getFromLocalStorage = (key) => {
    if (!key || typeof window === 'undefined') {
        return ''
    }
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
      //  console.log(`Key: ${key}, Value: ${value}`);
      }
   // console.log("get item feom local storage",localStorage.getItem(JSON.stringify(key)));
    return localStorage.getItem(key)
}
