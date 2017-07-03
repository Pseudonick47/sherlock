import {
    FETCH_PROTECTED_DATA_REQUEST, 
    RECEIVE_PROTECTED_DATA,
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
    RECEIVE_LOCATIONS_BY_CITY,
    FETCH_LOCATIONS_BY_CITY_REQUEST,
    FETCH_LOCATIONS_BY_CITY_FAILED,
    FILE_UPLOAD_SUCCESS,
    INSERT_TOUR_SUCCEEDED,
    INSERT_TOUR_FAILED,
    RECEIVE_TOURS,
    FETCH_TOURS_REQUEST,
    FETCH_TOURS_FAILED
} from '../constants/index';
import { parseJSON } from '../utils/misc';
import { 
    data_about_user, 
    get_countries, 
    get_cities, 
    get_cities_by_country,
    get_locations_by_city,
    post_city, 
    post_location,
    upload_file,
    post_tour,
} from '../utils/http_functions';
import { logoutAndRedirect } from './auth';

export function receiveProtectedData(data) {
    return {
        type: RECEIVE_PROTECTED_DATA,
        payload: {
            data,
        },
    };
}

export function fetchProtectedDataRequest() {
    return {
        type: FETCH_PROTECTED_DATA_REQUEST,
    };
}

export function fetchProtectedData(token) {
    return (dispatch) => {
        dispatch(fetchProtectedDataRequest());
        data_about_user(token)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveProtectedData(response.result));
            })
            .catch(error => {
                if (error.status === 401) {
                    dispatch(logoutAndRedirect(error));
                }
            });
    };
}

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

export function insertCitySucceeded(id) {
    return {
        type: INSERT_CITY_SUCCEEDED,
        payload: id,
    };
}

export function insertCityFailed(message) {
    return {
        type: INSERT_CITY_FAILED,
        payload: message,
    };
}

export function insertCity(name, country_id) {
    return (dispatch) => {
        post_city(name, country_id)
            .then(response => {
                dispatch(insertCitySucceeded(response.data.id));
            })
            .catch(error => {
                dispatch(insertCityFailed(error))
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

export function receiveLocationsByCity(data) {
    return {
        type: RECEIVE_LOCATIONS_BY_CITY,
        payload: data,
    };
}

export function fetchLocationsByCityFailed() {
    return {
        type: FETCH_LOCATIONS_BY_CITY_FAILED,
    };
}

export function fetchLocationsByCityRequest() {
    return {
        type: FETCH_CITIES_BY_COUNTRY_REQUEST,
    };
}

export function fetchLocationsByCity(city_id) {
    return (dispatch) => {
        dispatch(fetchLocationsByCityRequest());
        get_locations_by_city(city_id)
            .then(response => {
                dispatch(receiveLocationsByCity(response.data));
            })
            .catch(error => {
                dispatch(fetchLocationsByCityFailed());
            });
    };
}

export function insertLocationSucceeded(id) {
    return {
        type: INSERT_LOCATION_SUCCEEDED,
        payload: id,
    };
}

export function insertLocationFailed(message) {
    return {
        type: INSERT_LOCATION_FAILED,
        payload: message,
    };
}

export function insertLocation(name, description, city_id, country_id, price) {
    return (dispatch) => {
        post_location(name, description, city_id, country_id, price)
            .then(response => {
                dispatch(insertLocationSucceeded(response.data.id));

            })
            .catch(error => {
                dispatch(insertLocationFailed('Location with that name already exists.'));
            });
    };
}

export function insertTourSucceeded(id) {
    return {
        type: INSERT_TOUR_SUCCEEDED,
        payload: id,
    };
}

export function insertTourFailed(message) {
    return {
        type: INSERT_TOUR_FAILED,
        payload: message,
    };
}

export function insertTour(name, description, guide_fee, locations, thumbnail, photos) {
    return (dispatch) => {
        post_tour(name, description, guide_fee, locations, thumbnail, photos)
            .then(response => {
                dispatch(insertTourSucceeded(response.data.id));

            })
            .catch(error => {
                dispatch(insertTourFailed('Tour with that title already exists.'));
            });
    };
}

export function fileUploadSuccess(response) {
    return {
        type: FILE_UPLOAD_SUCCESS,
        payload: {
            response,
        },
    };
}

export function fileUpload(fileList, callback) { 
    return (dispatch) => {
        upload_file(fileList)    
            .then(parseJSON)
            .then(callback)
            .catch(error => {
                alert('Error uploading file!')
            });
    };
}