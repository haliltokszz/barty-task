import { store, authActions } from "../redux";

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method : any) {
    return (url : string, body : any) => {
        const requestOptions = {
            url,
            method,
            headers: {},
            body
        };
        requestOptions.headers = authHeader(url);

        if (body) {
            requestOptions.headers = { 'Content-Type': 'application/json', ...requestOptions.headers };
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions).then(handleResponse);
    }
}

function authHeader(url : string) {
    const token = authToken();
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL!);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}

function authToken() : string | undefined {
    return store.getState().auth.user?.token;
}

function handleResponse(response : any) {
    return response.text().then( (text : string) => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if ([401, 403].includes(response.status) && authToken()) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                const logout = () => store.dispatch(authActions.logout());
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}