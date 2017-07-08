import {
    COMMENTS_BY_TOUR_FETCH_FAILED,
    COMMENTS_BY_TOUR_FETCH_REQUEST,
    COMMENTS_BY_TOUR_RECEIVED,
} from '../../constants/index';

import { parseJSON } from '../../utils/misc';

import { 
    get_comment,
} from '../../utils/http_functions';


export function fetchCommentsFailed(message) {
    return {
        type: COMMENTS_BY_TOUR_FETCH_FAILED,
        payload: message,
    };
}

export function fetchCommentsRequest() {
    return {
        type: COMMENTS_BY_TOUR_FETCH_REQUEST,
    };
}

export function receiveComments(data) {
    localStorage.setItem('data', data);
    return {
        type: COMMENTS_BY_TOUR_RECEIVED,
        payload: data,
    };
}

export function fetchComments(tourId) {
    return function (dispatch) {
        dispatch(fetchCommentsRequest());
        get_comment(tourId)
            .then(parseJSON)
            .then(data => {
                try {
                    dispatch(receiveComments(data));
                } catch (e) {
                    alert(e);
                }
            })
            .catch(error => dispatch(fetchCommentsFailed('')));
    };
}