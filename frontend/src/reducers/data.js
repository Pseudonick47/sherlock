import { 
    RECEIVE_PROTECTED_DATA, 
    FETCH_PROTECTED_DATA_REQUEST,
    RECEIVE_COUNTRIES,
    FETCH_COUNTRIES_REQUEST,
    FETCH_COUNTRIES_FAILED,
    INSERT_CITY_SUCCEEDED,
    INSERT_CITY_FAILED,
    RECEIVE_CITIES,
    FETCH_CITIES_REQUEST,
    FETCH_CITIES_FAILED,
    FETCH_CITIES_BY_COUNTRY_REQUEST,
    FETCH_CITIES_BY_COUNTRY_FAILED,
    RECEIVE_CITIES_BY_COUNTRY,
    INSERT_LOCATION_SUCCEEDED,
    INSERT_LOCATION_FAILED,
    RECEIVE_LOCATIONS_BY_CITY,
    FETCH_LOCATIONS_BY_CITY_REQUEST,
    FETCH_LOCATIONS_BY_CITY_FAILED,
    FILE_UPLOAD_SUCCESS,
    INSERT_TOUR_SUCCEEDED,
    INSERT_TOUR_FAILED,
    RECEIVE_TOURS,
    FETCH_TOURS_REQUEST,
    FETCH_TOURS_FAILED,
    INSERT_SPECIFIC_TOUR_SUCCEEDED,
    INSERT_SPECIFIC_TOUR_FAILED,
    RECEIVE_SPECIFIC_TOURS,
    FETCH_SPECIFIC_TOURS_REQUEST,
    FETCH_SPECIFIC_TOURS_FAILED,
} from '../constants';

import { createReducer } from '../utils/misc';

const initialState = {
    data: null,
    loaded: false,
    countries: [],
    countriesError: false,
    fetchingCountries: false,
    cities: [],
    citiesError: false,
    fetchingCities: false,
    cityId: null,
    citiesByCountry: [],
    citiesByCountryError: false,
    fetchingCitiesByCountry: false,
    locationId: null,
    locationsByCity: [],
    locationsByCityError: false,
    fetchingLocationsByCity: false,
    tourId: null,
    tours: [],
    toursError: false,
    fetchingTours: false,
    specificTourId: null,
    specificTours: [],
    specificToursError: false,
    fetchingSpecificTours: false,
    insertError: false,
    isUploaded: false,
    imageIds: [],
};

export default createReducer(initialState, {
    [RECEIVE_PROTECTED_DATA]: (state, payload) =>
        Object.assign({}, state, {
            data: payload.data,
            isFetching: false,
            loaded: true,
        }),
    [FETCH_PROTECTED_DATA_REQUEST]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
        }),
    [RECEIVE_COUNTRIES]: (state, payload) =>
        Object.assign({}, state, {
            countries: payload,
            fetchingCountries: false,
        }),
    [FETCH_COUNTRIES_REQUEST]: (state) =>
        Object.assign({}, state, {
            fetchingCountries: true,
        }),
    [FETCH_COUNTRIES_FAILED]: (state) =>
        Object.assign({}, state, {
            fetchingCountries: false,
            countriesError: true,
        }),
    [INSERT_CITY_SUCCEEDED]: (state, payload) =>
        Object.assign({}, state, {
            insertError: false,
            cityId: payload,
        }),
    [INSERT_CITY_FAILED]: (state, payload) =>
        Object.assign({}, state, {
            insertError: true,
            message: payload,
        }),
    [RECEIVE_CITIES]: (state, payload) =>
        Object.assign({}, state, {
            cities: payload,
            fetchingCities: false,
        }),
    [FETCH_CITIES_REQUEST]: (state) =>
        Object.assign({}, state, {
            fetchingCities: true,
        }),
    [FETCH_CITIES_FAILED]: (state) =>
        Object.assign({}, state, {
            fetchingCities: false,
            citiesError: true,
        }),
    [RECEIVE_CITIES_BY_COUNTRY]: (state, payload) =>
        Object.assign({}, state, {
            citiesByCountry: payload,
            fetchingCitiesByCountry: false,
        }),
    [FETCH_CITIES_BY_COUNTRY_REQUEST]: (state) =>
        Object.assign({}, state, {
            fetchingCitiesByCountry: true,
        }),
    [FETCH_CITIES_BY_COUNTRY_FAILED]: (state) =>
        Object.assign({}, state, {
            fetchingCitiesByCountry: false,
            citiesByCountryError: true,
        }),
    [INSERT_LOCATION_SUCCEEDED]: (state, payload) =>
        Object.assign({}, state, {
            insertError: false,
            locationId: payload
        }),
    [INSERT_LOCATION_FAILED]: (state, payload) =>
        Object.assign({}, state, {
            insertError: true,
            message: payload,
        }),
    [RECEIVE_LOCATIONS_BY_CITY]: (state, payload) =>
        Object.assign({}, state, {
            locationsByCity: payload,
            fetchingLocationsByCity: false,
        }),
    [FETCH_LOCATIONS_BY_CITY_REQUEST]: (state) =>
        Object.assign({}, state, {
            fetchingLocationsByCity: true,
        }),
    [FETCH_LOCATIONS_BY_CITY_FAILED]: (state) =>
        Object.assign({}, state, {
            fetchingLocationsByCity: false,
            locationsByCityError: true,
        }),
    [INSERT_TOUR_SUCCEEDED]: (state, payload) =>
        Object.assign({}, state, {
            insertError: false,
            tourId: payload
        }),
    [INSERT_TOUR_FAILED]: (state, payload) =>
        Object.assign({}, state, {
            insertError: true,
            message: payload,
        }),
    [RECEIVE_TOURS]: (state, payload) =>
        Object.assign({}, state, {
            tours: payload,
            fetchingTours: false,
        }),
    [FETCH_TOURS_REQUEST]: (state) =>
        Object.assign({}, state, {
            fetchingTours: true,
        }),
    [FETCH_TOURS_FAILED]: (state) =>
        Object.assign({}, state, {
            fetchingTours: false,
            toursError: true,
        }),
     [INSERT_SPECIFIC_TOUR_SUCCEEDED]: (state, payload) =>
        Object.assign({}, state, {
            insertError: false,
            specificTourId: payload
        }),
    [INSERT_SPECIFIC_TOUR_FAILED]: (state, payload) =>
        Object.assign({}, state, {
            insertError: true,
            message: payload,
        }),
    [RECEIVE_SPECIFIC_TOURS]: (state, payload) =>
        Object.assign({}, state, {
            specificTours: payload,
            fetchingSpecificTours: false,
        }),
    [FETCH_SPECIFIC_TOURS_REQUEST]: (state) =>
        Object.assign({}, state, {
            fetchingSpecificTours: true,
        }),
    [FETCH_SPECIFIC_TOURS_FAILED]: (state) =>
        Object.assign({}, state, {
            fetchingSpecificTours: false,
            specificToursError: true,
        }),
    [FILE_UPLOAD_SUCCESS]: (state, payload) =>
        Object.assign({}, state, {
            imageIds: payload.imageIds,
        }),    
});
