import {
    COUNTRIES_FETCH_FAILED,
    COUNTRIES_FETCH_REQUEST,
    COUNTRIES_RECEIVED,
} from '../../constants/index';

import { parseJSON } from '../../utils/misc';

import { 
    get_countries,
} from '../../utils/http_functions';


export function fetchCountriesFailed(message) {
    return {
        type: COUNTRIES_FETCH_FAILED,
        payload: message,
    };
}

export function fetchCountriesRequest() {
    return {
        type: COUNTRIES_FETCH_REQUEST,
    };
}

export function receiveCountries(data) {
    return {
        type: COUNTRIES_RECEIVED,
        payload: data,
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
                dispatch(fetchCountriesFailed(''));
            });
    };
}