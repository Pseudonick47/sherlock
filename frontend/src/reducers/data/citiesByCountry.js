import {
    CITIES_BY_COUNTRY_FETCH_FAILED,
    CITIES_BY_COUNTRY_FETCH_REQUEST,
    CITIES_BY_COUNTRY_RECEIVED,
} from '../../constants';

import { createReducer } from '../../utils/misc';

const initialState = {
    data: [],
    fetchError: false,
    fetchErrorMessage: null,
    isFetching: false,
};

export default createReducer(initialState, {
    [CITIES_BY_COUNTRY_FETCH_FAILED]: (state, payload) =>
        Object.assign({}, state, {
            fetchError: true,
            fetchErrorMessage: payload,
            isFetching: false,
        }),
    [CITIES_BY_COUNTRY_FETCH_REQUEST]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
        }),
    [CITIES_BY_COUNTRY_RECEIVED]: (state, payload) =>
        Object.assign({}, state, {
            data: payload,
            isFetching: false,
        }),
});