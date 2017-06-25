import { 
    RECEIVE_PROTECTED_DATA, 
    FETCH_PROTECTED_DATA_REQUEST,
    RECEIVE_COUNTRIES,
    FETCH_COUNTRIES_REQUEST
} from '../constants';

import { createReducer } from '../utils/misc';

const initialState = {
    data: null,
    isFetching: false,
    loaded: false,
};

export default createReducer(initialState, {
    [RECEIVE_PROTECTED_DATA]: (state, payload) =>
        Object.assign({}, state, {
            data: payload.data,
            isFetching: false,
            loaded: true,
        }),
    [FETCH_PROTECTED_DATA_REQUEST]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
        }),
    [RECEIVE_COUNTRIES]: (state, payload) =>
        Object.assign({}, state, {
            data: payload.data,
            isFetching: false,
            loaded: true,
        }),
    [FETCH_COUNTRIES_REQUEST]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
        }),
});
