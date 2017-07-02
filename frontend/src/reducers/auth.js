import jwtDecode from 'jwt-decode';

import { createReducer } from '../utils/misc';
import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    TOURS_SUCCESS,
    TOUR_SUCCESS,
    PROFILE_SUCCESS,
    COMMENT_SUCCESS,
} from '../constants/index';

const initialState = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
    isRegistering: false,
    isRegistered: false,
    registerStatusText: null,
    isLoading: true,
    toures: [],
    name: null,
    description: null,
    locations: [],
    photos: [],
    rating: null,
    commentIds: [],
    userPhoto: "",
    userId: null,
    comment: null,
    likes: null,
    dislikes: null,
    current: null,
};

export default createReducer(initialState, {
    [LOGIN_USER_REQUEST]: (state) =>
        Object.assign({}, state, {
            isAuthenticating: true,
            statusText: null,
        }),
    [LOGIN_USER_SUCCESS]: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: true,
            token: payload.token,
            userName: jwtDecode(payload.token).email,
            statusText: 'You have been successfully logged in.',
        }),
    [LOGIN_USER_FAILURE]: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: false,
            token: null,
            userName: null,
            statusText: `Authentication Error: ${payload.status} ${payload.statusText}`,
        }),
    [LOGOUT_USER]: (state) =>
        Object.assign({}, state, {
            isAuthenticated: false,
            token: null,
            userName: null,
            statusText: 'You have been successfully logged out.',
        }),
    [REGISTER_USER_SUCCESS]: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: true,
            isRegistering: false,
            token: payload.token,
            userName: jwtDecode(payload.token).email,
            registerStatusText: 'You have been successfully logged in.',
        }),
    [REGISTER_USER_REQUEST]: (state) =>
        Object.assign({}, state, {
            isRegistering: true,
        }),
    [REGISTER_USER_FAILURE]: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticated: false,
            token: null,
            userName: null,
            registerStatusText: `Register Error: ${payload.status} ${payload.statusText}`,
        }),
    [TOUR_SUCCESS]: (state, payload) =>
        Object.assign({}, state, {
            name: payload.name,
            description: payload.description,
            locations: payload.locations,
            photos: payload.photos,
            rating: payload.rating,
            commentIds: payload.commentIds,
        }),
    [TOURS_SUCCESS]: (state, payload) =>
        Object.assign({}, state, {
            tours: payload,
            isLoading: false,
        }),
    [PROFILE_SUCCESS]: (state, payload) =>
	Object.assign({}, state, {
	    userName: jwtDecode(payload.token).email,
	    isLoading:false,
	    statusText: "Your profile",
        }),
    [COMMENT_SUCCESS]: (state, payload) =>
        Object.assign({}, state, {
            userPhoto: payload.userPhoto,
            userId: payload.userId,
            userName: payload.userName,
            comment: payload.comment,
            likes: payload.likes,
            current: payload.current,
            dislikes: payload.dislikes,
        }),
    
});
