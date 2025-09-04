import axios from "axios";

export async function getData(uri) {
    try {
        const apiUrl = import.meta.env.VITE_API_URL;

        const response = await axios.get(apiUrl + uri, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getSecurityKey()}`
            }
        });

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function postData(data) {
    try {
        const apiUrl = import.meta.env.VITE_API_URL;

        const response = await axios.post(apiUrl + data.uri, JSON.stringify(data.formData), {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getSecurityKey()}`
            }
        });

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function putData(data) {
    try {
        const apiUrl = import.meta.env.VITE_API_URL;

        const response = await axios.put(apiUrl + data.uri, JSON.stringify(data.formData), {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getSecurityKey()}`
            }
        });

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function deleteData(uri) {
    try {
        const apiUrl = import.meta.env.VITE_API_URL;

        const response = await axios.delete(apiUrl + uri, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getSecurityKey()}`
            }
        });

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function loginPostData(data) {
    try {
        const apiUrl = import.meta.env.VITE_API_URL;

        const response = await axios.post(apiUrl + data.uri, JSON.stringify(data.body), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;
    } catch (error) {
        return error.response;
    }
}

export async function logoutData(uri) {
    try {
            const apiUrl = import.meta.env.VITE_API_URL;

        const response = await axios.post(apiUrl + uri, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getSecurityKey()}`
            }
        });

        return response;
    } catch (error) {
        return error.response;
    }
}

export function SecurityManagement(response) {
    const loginResponse = response;

    const split1 = loginResponse.data.t.split("|")[0];
    const split2 = loginResponse.data.t.split("|")[1];

    sessionStorage.setItem("s1", split1);
    localStorage.setItem("s2", split2);

    return true;
}

export const getSecurityKey = () => {
    const s1 = sessionStorage.getItem("s1");
    const s2 = localStorage.getItem("s2");

    let key = s1 + "|" + s2;

    return key;
}

export const clearSecurity = () => {
    localStorage.clear();
    sessionStorage.clear();
}