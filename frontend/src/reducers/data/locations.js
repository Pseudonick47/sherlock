import {
    LOCATIONS_FETCH_FAILED,
    LOCATIONS_FETCH_REQUEST,
    LOCATIONS_INSERT_FAILED,
    LOCATIONS_INSERT_SUCCEEDED,
    LOCATIONS_RECEIVED,
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
    [LOCATIONS_FETCH_FAILED]: (state, payload) =>
        Object.assign({}, state, {
            fetchError: true,
            fetchErrorMessage: payload,
            isFetching: false,
        }),
    [LOCATIONS_FETCH_REQUEST]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
        }),
    [LOCATIONS_INSERT_FAILED]: (state, payload) =>
        Object.assign({}, state, {
            insertError: true,
            insertErrorMessage: payload,
        }),
    [LOCATIONS_INSERT_SUCCEEDED]: (state, payload) =>
        Object.assign({}, state, {
            id: payload,
            insertError: false,
        }),
    [LOCATIONS_RECEIVED]: (state, payload) =>
        Object.assign({}, state, {
            data: payload,
            isFetching: false,
        }),
});