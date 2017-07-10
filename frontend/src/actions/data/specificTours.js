import {
    SPECIFIC_TOURS_FETCH_FAILED,
    SPECIFIC_TOURS_FETCH_REQUEST,
    SPECIFIC_TOURS_INSERT_FAILED,
    SPECIFIC_TOURS_INSERT_SUCCEEDED,
    SPECIFIC_TOURS_RECEIVED,
} from '../../constants/index';

import { parseJSON } from '../../utils/misc';

import { 
    get_specific_tours,
    post_specific_tour,
} from '../../utils/http_functions';


export function fetchSpecificToursFailed(message) {
    return {
        type: SPECIFIC_TOURS_FETCH_FAILED,
        payload: message,
    };
}

export function fetchSpecificToursRequest() {
    return {
        type: SPECIFIC_TOURS_FETCH_REQUEST,
    };
}

export function receiveSpecificTours(data) {
    return {
        type: SPECIFIC_TOURS_RECEIVED,
        payload: data,
    };
}

export function fetchSpecificTours(tourId) {
    return (dispatch) => {
        dispatch(fetchSpecificToursRequest());
        get_specific_tours(tourId)
            .then(parseJSON)
            .then(data => {
                dispatch(receiveSpecificTours(data));
            })
            .catch(error => dispatch(fetchSpecificToursFailed('')));
    };
}

export function insertSpecificTourFailed(message) {
    return {
        type: SPECIFIC_TOURS_INSERT_FAILED,
        payload: message,
    };
}

export function insertSpecificTourSucceeded(id) {
    return {
        type: SPECIFIC_TOURS_INSERT_SUCCEEDED,
        payload: id,
    };
}

export function insertSpecificTour(specificTour) {
    return (dispatch) => {
        post_specific_tour(specificTour)
            .then(parseJSON)
            .then(data => {
                dispatch(insertSpecificTourSucceeded(data.id));
            })
            .catch(error => dispatch(insertSpecificTourFailed('')));
    };
}