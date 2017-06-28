import { 
    RECEIVE_COUNTRIES,
    FETCH_COUNTRIES_REQUEST,
    FETCH_COUNTRIES_FAILED,
    INSERT_CITY_SUCCEEDED,
    INSERT_CITY_FAILED,
} from '../constants';

import { createReducer } from '../utils/misc';

const initialState = {
    data: [],
    isFetching: false,
    error: false,
    message: '',
    insert_error: false,
};

export default createReducer(initialState, {
    [RECEIVE_COUNTRIES]: (state, payload) =>
        Object.assign({}, state, {
            data: payload,
            isFetching: false,
        }),
    [FETCH_COUNTRIES_REQUEST]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
        }),
    [FETCH_COUNTRIES_FAILED]: (state) =>
        Object.assign({}, state, {
            isFetching: false,
            error: true,
        }),
    [INSERT_CITY_SUCCEEDED]: (state) =>
        Object.assign({}, state, {
            insert_error: false,
        }),
    [INSERT_CITY_FAILED]: (state, payload) =>
        Object.assign({}, state, {
            insert_error: true,
            message: payload.message,
        }),
});
