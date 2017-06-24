import { FETCH_PROTECTED_DATA_REQUEST, RECEIVE_PROTECTED_DATA, 
         FETCH_COUNTRIES_REQUEST, RECEIVE_COUNTRIES } from '../constants/index';
import { parseJSON } from '../utils/misc';
import { data_about_user, get_countries } from '../utils/http_functions';
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
        payload: {
            data,
        },
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
                alert(response.data);
                dispatch(receiveCountries(response.data))
            })
            .catch(error => {
            });
    };
}