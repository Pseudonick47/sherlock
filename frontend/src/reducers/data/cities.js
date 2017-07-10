import {
    CITIES_FETCH_FAILED,
    CITIES_FETCH_REQUEST,
    CITIES_INSERT_FAILED,
    CITIES_INSERT_SUCCEEDED,
    CITIES_RECEIVED,
} from '../../constants';

import { createReducer } from '../../utils/misc';

const initialState = {
    data: [],
    fetchError: false,
    fetchErrorMessage: null,
    id: null,
    insertError: false,
    insertErrorMessage: null,
    isFetching: false,
    
};

export default createReducer(initialState, {
    [CITIES_FETCH_FAILED]: (state, payload) =>
        Object.assign({}, state, {
            fetchError: true,
            fetchErrorMessage: payload,
            isFetching: false,
        }),
    [CITIES_FETCH_REQUEST]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
        }),
    [CITIES_INSERT_FAILED]: (state, payload) =>
        Object.assign({}, state, {
            insertError: true,
            insertErrorMessage: payload,
        }),
    [CITIES_INSERT_SUCCEEDED]: (state, payload) =>
        Object.assign({}, state, {
            id: payload,
            insertError: false,
        }),
    [CITIES_RECEIVED]: (state, payload) =>
        Object.assign({}, state, {
            data: payload,
            isFetching: false,
        }),
});