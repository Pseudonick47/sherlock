import {
    TOUR_FETCH_FAILED,
    TOUR_FETCH_REQUEST,
    TOUR_RECEIVED,
} from '../../constants/index';

import { parseJSON } from '../../utils/misc';

import { 
    get_tour,
} from '../../utils/http_functions';


export function fetchTourFailed(message) {
    return {
        type: TOUR_FETCH_FAILED,
        payload: message,
    };
}

export function fetchTourRequest() {
    return {
        type: TOUR_FETCH_REQUEST,
    };
}

export function receiveTour(data) {
    return {
        type: TOUR_RECEIVED,
        payload: data,
    };
}

export function fetchTour(id) {
    return function (dispatch) {
        dispatch(fetchTourRequest());
        get_tour(id)
            .then(parseJSON)
            .then(data => {
                try {
                    dispatch(receiveTour(data));
                } catch (e) {
                    alert(e);
                }
            })
            .catch(error => dispatch(fetchTourFailed('')));
    };
}