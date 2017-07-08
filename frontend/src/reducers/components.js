import { createReducer } from '../utils/misc';
import { LEFT_NAV_OPEN, LEFT_NAV_CLOSE } from '../constants/index';

const initialState = {
    isDisplayed: false,
};

export default createReducer(initialState, {
    [LEFT_NAV_OPEN]: (state) => 
        Object.assign({}, state, {
            isDisplayed: true,
        }),
    [LEFT_NAV_CLOSE]: (state) => 
        Object.assign({}, state, {
            isDisplayed: false,
        }),
});