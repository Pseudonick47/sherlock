import {
    SPECIFIC_TOURS_FETCH_FAILED,
    SPECIFIC_TOURS_FETCH_REQUEST,
    SPECIFIC_TOURS_INSERT_FAILED,
    SPECIFIC_TOURS_INSERT_SUCCEEDED,
    SPECIFIC_TOURS_RECEIVED,
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
    [SPECIFIC_TOURS_FETCH_FAILED]: (state, payload) =>
        Object.assign({}, state, {
            fetchError: true,
            fetchErrorMessage: payload,
            isFetching: false,
        }),
    [SPECIFIC_TOURS_FETCH_REQUEST]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
        }),
    [SPECIFIC_TOURS_INSERT_FAILED]: (state, payload) =>
        Object.assign({}, state, {
            insertError: true,
            insertErrorMessage: payload,
        }),
    [SPECIFIC_TOURS_INSERT_SUCCEEDED]: (state, payload) =>
        Object.assign({}, state, {
            id: payload,
            insertError: false,
        }),
    [SPECIFIC_TOURS_RECEIVED]: (state, payload) =>
        Object.assign({}, state, {
            data: payload,
            isFetching: false,
        }),
});