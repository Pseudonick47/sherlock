import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import cities from './cities';
import citiesByCountry from './citiesByCountry';
import commentsTour from './commentsTour';
import countries from './countries';
import locations from './locations';
import specificTours from './specificTours';
import tour from './tour';
import tours from './tours';


const dataReducer = combineReducers({
    routing: dataReducer,
    /* your reducers */
    cities,
    citiesByCountry,
    commentsTour,
    countries,
    locations,
    specificTours,
    tour,
    tours,
});

export default dataReducer;