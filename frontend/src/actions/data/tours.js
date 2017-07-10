import {
    TOURS_FETCH_FAILED,
    TOURS_FETCH_REQUEST,
    TOURS_INSERT_FAILED,
    TOURS_INSERT_SUCCEEDED,
    TOURS_RECEIVED,
} from '../../constants/index';

import { parseJSON } from '../../utils/misc';

import {
    post_tour,
    get_tours,
} from '../../utils/http_functions';

export function fetchToursFailed(message) {
    return {
        type: TOURS_FETCH_FAILED,
        payload: message,
    };
}

export function fetchToursRequest() {
    return {
        type: TOURS_FETCH_REQUEST,
    };
}

export function receiveTours(data) {
    return {
        type: TOURS_RECEIVED,
        payload: data,
    };
}

export function fetchTours() {
    return (dispatch) => {
        get_tours()
            .then(parseJSON)
            .then(data => {
                dispatch(receiveTours(data));
            })
            .catch(error => dispatch(fetchToursFailed('')));
    };
}

export function insertTourFailed(message) {
    return {
        type: TOURS_INSERT_FAILED,
        payload: message,
    };
}

export function insertTourSucceeded(id) {
    return {
        type: TOURS_INSERT_SUCCEEDED,
        payload: id,
    };
}

export function insertTour(name, description, guideFee, locations, thumbnail, photos) {
    return (dispatch) => {
        post_tour(name, description, guideFee, locations, thumbnail, photos)
            .then(parseJSON)
            .then(data => {
                dispatch(insertTourSucceeded(data.id));
            })
            .catch(error => dispatch(insertTourFailed('')));
    };
}