import {
    CITIES_FETCH_FAILED,
    CITIES_FETCH_REQUEST,
    CITIES_INSERT_FAILED,
    CITIES_INSERT_SUCCEEDED,
    CITIES_RECEIVED,
} from '../../constants/index';

import { parseJSON } from '../../utils/misc';

import { 
    get_cities,
    post_city,
} from '../../utils/http_functions';


export function fetchCitiesFailed(message) {
    return {
        type: CITIES_FETCH_FAILED,
        payload: message,
    };
}

export function fetchCitiesRequest() {
    return {
        type: CITIES_FETCH_REQUEST,
    };
}

export function receiveCities(data) {
    return {
        type: RECEIVE_CITIES,
        payload: data,
    };
}

export function fetchCities() {
    return (dispatch) => {
        dispatch(fetchCitiesRequest());
        get_cities()
            .then(parseJSON)
            .then(data => {
                dispatch(receiveCities(data));
            })
            .catch(error => {
                dispatch(fetchCitiesFailed(''));
            });
    };
}

export function insertCityFailed(message) {
    return {
        type: CITIES_INSERT_FAILED,
        payload: message,
    };
}

export function insertCitySucceeded(id) {
    return {
        type: CITIES_INSERT_SUCCEEDED,
        payload: id,
    };
}

export function insertCity(name, countryId) {
    return (dispatch) => {
        post_city(name, countryId)
            .then(parseJSON)
            .then(data => {
                dispatch(insertCitySucceeded(data.id));
            })
            .catch(error => {
                dispatch(insertCityFailed(''))
            });
    };
}



