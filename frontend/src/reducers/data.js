import { 
    RECEIVE_COUNTRIES,
    FETCH_COUNTRIES_REQUEST,
    FETCH_COUNTRIES_FAILED,
    INSERT_CITY_SUCCEEDED,
    INSERT_CITY_FAILED,
    RECEIVE_CITIES,
    FETCH_CITIES_REQUEST,
    FETCH_CITIES_FAILED,
    FETCH_CITIES_BY_COUNTRY_REQUEST,
    FETCH_CITIES_BY_COUNTRY_FAILED,
    RECEIVE_CITIES_BY_COUNTRY,
    INSERT_LOCATION_SUCCEEDED,
    INSERT_LOCATION_FAILED,
} from '../constants';

import { createReducer } from '../utils/misc';

const initialState = {
    countries: [],
    cities: [],
    isFetching: false,
    error: false,
    message: '',
    insert_error: false,
};

export default createReducer(initialState, {
    [RECEIVE_COUNTRIES]: (state, payload) =>
        Object.assign({}, state, {
            countries: payload,
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
    [RECEIVE_CITIES]: (state, payload) =>
        Object.assign({}, state, {
            cities: payload,
            isFetching: false,
        }),
    [FETCH_CITIES_REQUEST]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
        }),
    [FETCH_CITIES_FAILED]: (state) =>
        Object.assign({}, state, {
            isFetching: false,
            error: true,
        }),
    [RECEIVE_CITIES_BY_COUNTRY]: (state, payload) =>
        Object.assign({}, state, {
            cities: payload,
            isFetching: false,
        }),
    [FETCH_CITIES_BY_COUNTRY_REQUEST]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
        }),
    [FETCH_CITIES_BY_COUNTRY_FAILED]: (state) =>
        Object.assign({}, state, {
            isFetching: false,
            error: true,
        }),
    [INSERT_LOCATION_SUCCEEDED]: (state) =>
        Object.assign({}, state, {
            insert_error: false,
        }),
    [INSERT_LOCATION_FAILED]: (state, payload) =>
        Object.assign({}, state, {
            insert_error: true,
            message: payload.message,
        }),
});
