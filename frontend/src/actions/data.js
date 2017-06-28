import {
    FETCH_COUNTRIES_REQUEST,
    FETCH_COUNTRIES_FAILED,
    RECEIVE_COUNTRIES,
    INSERT_CITY_SUCCEEDED,
    INSERT_CITY_FAILED,
} from '../constants/index';
import { get_countries, post_city } from '../utils/http_functions';


export function receiveCountries(data) {
    return {
        type: RECEIVE_COUNTRIES,
        payload: data,
    };
}

export function fetchCountriesFailed() {
    return {
        type: FETCH_COUNTRIES_FAILED,
    };
}

export function fetchCountriesRequest() {
    return {
        type: FETCH_COUNTRIES_REQUEST,
    };
}

export function fetchCountries() {
    return (dispatch) => {
        dispatch(fetchCountriesRequest());
        get_countries()
            .then(response => {
                dispatch(receiveCountries(response.data));
            })
            .catch(error => {
                dispatch(fetchCountriesFailed());
            });
    };
}

export function insertCitySucceeded() {
    return {
        type: INSERT_CITY_SUCCEEDED,
    };
}

export function insertCityFailed(message) {
    return {
        type: INSERT_CITY_FAILED,
        payload: {
            message: message,
        }
    };
}

export function insertCity(name, country_id) {
    return (dispatch) => {
        alert(name);
        alert(country_id);
        post_city(name, country_id)
            .then(response => {
                if (response.status === 200) {
                    dispatch(insertCitySucceeded());
                } else if (response.status === 409){
                    dispatch(insertCityFailed('City with that name already exists.'));
                }
            });
    };
}