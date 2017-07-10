import {
    CITIES_BY_COUNTRY_FETCH_FAILED,
    CITIES_BY_COUNTRY_FETCH_REQUEST,
    CITIES_BY_COUNTRY_RECEIVED,
} from '../../constants/index';

import { parseJSON } from '../../utils/misc';

import { 
    get_cities_by_country,
} from '../../utils/http_functions';

export function receiveCitiesByCountry(data) {
    return {
        type: CITIES_BY_COUNTRY_RECEIVED,
        payload: data,
    };
}

export function fetchCitiesByCountryFailed() {
    return {
        type: CITIES_BY_COUNTRY_FETCH_FAILED,
    };
}

export function fetchCitiesByCountryRequest() {
    return {
        type: CITIES_BY_COUNTRY_FETCH_REQUEST,
    };
}

export function fetchCitiesByCountry(countryId) {
    return (dispatch) => {
        dispatch(fetchCitiesByCountryRequest());
        get_cities_by_country(countryId)
            .then(response => {
                dispatch(receiveCitiesByCountry(response.data));
            })
            .catch(error => {
                dispatch(fetchCitiesByCountryFailed());
            });
    };
}