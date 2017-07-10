import { browserHistory } from 'react-router';

import {
    USER_LOGIN_FAILED,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCEEDED,
    USER_LOGOUT,
    USER_REGISTER_FAILED,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCEEDED,
} from '../constants/index';

import { parseJSON } from '../utils/misc';

import { 
    get_token,
    create_user,
} from '../utils/http_functions';


export function loginUserFailure(error) {
    localStorage.removeItem('token');
    return {
        type: USER_LOGIN_FAILED,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText,
        },
    };
}

export function loginUserRequest() {
    return {
        type: USER_LOGIN_REQUEST,
    };
}

export function loginUserSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: USER_LOGIN_SUCCEEDED,
        payload: token,
    };
}


export function loginUser(email, password) {
    return function (dispatch) {
        dispatch(loginUserRequest());
        return get_token(email, password)
            .then(parseJSON)
            .then(data => {
                try {
                    dispatch(loginUserSuccess(data));
                    browserHistory.push('/main');
                } catch (e) {
                    alert(e);
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token',
                        },
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure({
                    response: {
                        status: 403,
                        statusText: 'Invalid username or password',
                    },
                }));
            });
    };
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: USER_LOGOUT,
    };
}

export function logoutAndRedirect() {
    return (dispatch) => {
        dispatch(logout());
        browserHistory.push('/');
    };
}

export function redirectToRoute(route) {
    return () => {
        browserHistory.push(route);
    };
}

export function registerUserFailure(error) {
    localStorage.removeItem('token');
    return {
        type: USER_REGISTER_FAILED,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText,
        },
    };
}

export function registerUserRequest() {
    return {
        type: USER_REGISTER_REQUEST,
    };
}

export function registerUserSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: USER_REGISTER_SUCCEEDED,
        payload: token,
    };
}

export function registerUser(email, password, firstName, surname, role) {
    return function (dispatch) {
        dispatch(registerUserRequest());
        return create_user(email, password, firstName, surname, role)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(registerUserSuccess(response.token));
                    browserHistory.push('/main');
                } catch (e) {
                    dispatch(registerUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token',
                        },
                    }));
                }
            })
            .catch(error => {
                dispatch(registerUserFailure({
                    response: {
                        status: 403,
                        statusText: 'User with that email already exists',
                    },
                }
                ));
            });
    };
}
