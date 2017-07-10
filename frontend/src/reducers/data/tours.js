import {
    TOURS_FETCH_FAILED,
    TOURS_FETCH_REQUEST,
    TOURS_INSERT_FAILED,
    TOURS_INSERT_SUCCEEDED,
    TOURS_RECEIVED,
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
    [TOURS_FETCH_FAILED]: (state, payload) =>
        Object.assign({}, state, {
            fetchError: true,
            fetchErrorMessage: payload,
            isFetching: false,            
        }),
    [TOURS_FETCH_REQUEST]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
        }),
    [TOURS_INSERT_FAILED]: (state, payload) =>
        Object.assign({}, state, {
            insertError: true,
            insertErrorMessage: payload,
        }),
    [TOURS_INSERT_SUCCEEDED]: (state, payload) =>
        Object.assign({}, state, {
            id: payload,
            insertError: false,
        }),
    [TOURS_RECEIVED]: (state, payload) =>
        Object.assign({}, state, {
            data: payload,
            isFetching: false,
        }),
});