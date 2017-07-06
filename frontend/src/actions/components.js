import { LEFT_NAV_OPEN, LEFT_NAV_CLOSE } from '../constants/index';

export function leftNavOpen() {
    return {
        type: LEFT_NAV_OPEN,
    };
}

export function leftNavClose() {
    return {
        type: LEFT_NAV_CLOSE,
    };
}

export function leftNavToggle(open) {
    return (dispatch) => {
        if(open) {
            dispatch(leftNavOpen());
        }
        else {
            dispatch(leftNavClose());
        }
    };
}