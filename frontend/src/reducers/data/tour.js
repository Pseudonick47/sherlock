import {
    TOUR_FETCH_FAILED,
    TOUR_FETCH_REQUEST,
    TOUR_RECEIVED,
} from '../../constants';

import { createReducer } from '../../utils/misc';

const initialState = {
    data: null,
    fetchError: false,
    fetchErrorMessage: null,
    isFetching: false,
};

export default createReducer(initialState, {
    [TOUR_FETCH_FAILED]: (state, payload) =>
        Object.assign({}, state, {
            fetchError: true,
            fetchErrorMessage: payload,
            isFetching: false,
        }),
    [TOUR_FETCH_REQUEST]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
        }),
    [TOUR_RECEIVED]: (state, payload) =>
        Object.assign({}, state, {
            data: payload,
            isFetching: false,
        }),
});