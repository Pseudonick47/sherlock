import {
    COMMENTS_BY_TOUR_FETCH_FAILED,
    COMMENTS_BY_TOUR_FETCH_REQUEST,
    COMMENTS_BY_TOUR_RECEIVED,
} from '../../constants';

import { createReducer } from '../../utils/misc';

const initialState = {
    data: [],
    fetchError: false,
    fetchErrorMessage: null,
    isFetching: false,
};

export default createReducer(initialState, {
    [COMMENTS_BY_TOUR_FETCH_FAILED]: (state, payload) =>
        Object.assign({}, state, {
            fetchError: true,
            fetchErrorMessage: payload,
            isFetching: false,
        }),
    [COMMENTS_BY_TOUR_FETCH_REQUEST]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
        }),
    [COMMENTS_BY_TOUR_RECEIVED]: (state, payload) =>
        Object.assign({}, state, {
            data: payload,
            isFetching: false,
        }),
});