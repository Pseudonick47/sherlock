import {
    LOCATIONS_FETCH_FAILED,
    LOCATIONS_FETCH_REQUEST,
    LOCATIONS_INSERT_FAILED,
    LOCATIONS_INSERT_SUCCEEDED,
    LOCATIONS_RECEIVED,
} from '../../constants/index';

import { parseJSON } from '../../utils/misc';

import { 
    get_locations_by_city,
    post_location,
} from '../../utils/http_functions';


export function fetchLocationsFailed(message) {
    return {
        type: LOCATIONS_FETCH_FAILED,
        payload: message,
    };
}

export function fetchLocationsRequest() {
    return {
        type: LOCATIONS_FETCH_REQUEST,
    };
}

export function receiveLocations(data) {
    return {
        type: LOCATIONS_RECEIVED,
        payload: data,
    };
}

export function fetchLocations(cityId) {
    return (dispatch) => {
        dispatch(fetchLocationsRequest());
        get_locations_by_city(cityId)
            .then(parseJSON)
            .then(data => {
                dispatch(receiveLocations(data));
            })
            .catch(error => dispatch(fetchLocationsFailed('')));
    };
}

export function insertLocationFailed(message) {
    return {
        type: LOCATIONS_INSERT_FAILED,
        payload: message,
    };
}

export function insertLocationSucceeded(id) {
    return {
        type: LOCATIONS_INSERT_SUCCEEDED,
        payload: id,
    };
}

export function insertLocation(name, description, cityId, countryId, price) {
    return (dispatch) => {
        post_location(name, description, cityId, countryId, price)
            .then(parseJSON)
            .then(data => {
                dispatch(insertLocationSucceeded(data.id));
            })
            .catch(error => dispatch(insertLocationFailed('')));
    };
}