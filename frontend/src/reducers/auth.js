import jwtDecode from 'jwt-decode';

import { createReducer } from '../utils/misc';

import {
    USER_LOGIN_FAILED,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCEEDED,
    USER_LOGOUT,
    USER_REGISTER_FAILED,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCEEDED,
} from '../constants/index';

const initialState = {
    fetchError: false,
    fetchErrorMessage: '',
    isAuthenticated: false,
    isAuthenticating: false,
    isFetching: false,
    isRegistered: false,
    isRegistering: false,
    loginStatusText: null,    
    registerStatusText: null,
    user: null,
};

export default createReducer(initialState, {
    [USER_LOGIN_FAILED]: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticated: false,
            isAuthenticating: false,
            loginStatusText: `Authentication Error: ${payload.status} ${payload.statusText}`,
            user: null,
        }),
    [USER_LOGIN_REQUEST]: (state) =>
        Object.assign({}, state, {
            isAuthenticating: true,
            loginStatusText: null,
        }),
    [USER_LOGIN_SUCCEEDED]: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticated: true,
            isAuthenticating: false,
            loginStatusText: 'You have been successfully logged in.',
            user: jwtDecode(payload),
        }),
    [USER_LOGOUT]: (state) =>
        Object.assign({}, state, {
            isAuthenticated: false,
            loginStatusText: 'You have been successfully logged out.',
            user: null,
        }),
    [USER_REGISTER_FAILED]: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticated: false,
            registerStatusText: `Register Error: ${payload.status} ${payload.statusText}`,
            user: null,
        }),
    [USER_REGISTER_REQUEST]: (state) =>
        Object.assign({}, state, {
            isRegistering: true,
        }),
    [USER_REGISTER_SUCCEEDED]: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticated: true,
            isAuthenticating: false,
            isRegistering: false,
            registerStatusText: 'You have been successfully logged in.',
            user: jwtDecode(payload),
        }),
});
