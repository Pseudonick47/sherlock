import {
    FETCH_COUNTRIES_REQUEST,
    FETCH_COUNTRIES_FAILED,
    RECEIVE_COUNTRIES,
    INSERT_CITY_SUCCEEDED,
    INSERT_CITY_FAILED,
    FETCH_CITIES_REQUEST,
    FETCH_CITIES_FAILED,
    RECEIVE_CITIES,
    FETCH_CITIES_BY_COUNTRY_REQUEST,
    FETCH_CITIES_BY_COUNTRY_FAILED,
    RECEIVE_CITIES_BY_COUNTRY,
    INSERT_LOCATION_SUCCEEDED,
    INSERT_LOCATION_FAILED,
} from '../constants/index';
import { 
    get_countries, 
    get_cities, 
    get_cities_by_country, 
    post_city, 
    post_location, 
} from '../utils/http_functions';


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

export function receiveCities(data) {
    return {
        type: RECEIVE_CITIES,
        payload: data,
    };
}

export function fetchCitiesFailed() {
    return {
        type: FETCH_CITIES_FAILED,
    };
}

export function fetchCitiesRequest() {
    return {
        type: FETCH_CITIES_REQUEST,
    };
}

export function fetchCities() {
    return (dispatch) => {
        dispatch(fetchCitiesRequest());
        get_cities()
            .then(response => {
                dispatch(receiveCities(response.data));
            })
            .catch(error => {
                dispatch(fetchCitiesFailed());
            });
    };
}

export function receiveCitiesByCountry(data) {
    return {
        type: RECEIVE_CITIES_BY_COUNTRY,
        payload: data,
    };
}

export function fetchCitiesByCountryFailed() {
    return {
        type: FETCH_CITIES_BY_COUNTRY_FAILED,
    };
}

export function fetchCitiesByCountryRequest() {
    return {
        type: FETCH_CITIES_BY_COUNTRY_REQUEST,
    };
}

export function fetchCitiesByCountry(country_id) {
    return (dispatch) => {
        dispatch(fetchCitiesByCountryRequest());
        get_cities_by_country(country_id)
            .then(response => {
                dispatch(receiveCitiesByCountry(response.data));
            })
            .catch(error => {
                dispatch(fetchCitiesByCountryFailed());
            });
    };
}

export function insertLocationSucceeded() {
    return {
        type: INSERT_LOCATION_SUCCEEDED,
    };
}

export function insertLocationFailed(message) {
    return {
        
        type: INSERT_LOCATION_FAILED,
        payload: {
            message: message,
        }
    };
}

export function insertLocation(name, description, city_id, country_id, price) {
    return (dispatch) => {
        post_location(name, description, city_id, country_id, price)
            .then(response => {
                if (response.status === 200) {
                    dispatch(insertLocationSucceeded());
                } else if (response.status === 409){
                    dispatch(insertLocationFailed('Location with that name already exists.'));
                }
            });
    };
}