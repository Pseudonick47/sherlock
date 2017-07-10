import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import components from './components';
import data from './data/index';
import util from './util';

const rootReducer = combineReducers({
    routing: routerReducer,
    /* your reducers */
    auth,
    components,
    data,
    util,
});

export default rootReducer;
