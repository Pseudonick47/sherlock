/* eslint camelcase: 0 */

import axios from 'axios';

const tokenConfig = (token) => ({
    headers: {
        'Authorization': token, // eslint-disable-line quote-props
    },
});

export function validate_token(token) {
    return axios.post('/api/is_token_valid', {
        token,
    });
}

export function get_github_access() {
    window.open(
        '/github-login',
        '_blank' // <- This is what makes it open in a new window.
    );
}

export function create_user(email, password) {
    return axios.post('api/create_user', {
        email,
        password,
    });
}

export function get_token(email, password) {
    return axios.post('api/get_token', {
        email,
        password,
    });
}

export function has_github_token(token) {
    return axios.get('api/has_github_token', tokenConfig(token));
}

export function data_about_user(token) {
    return axios.get('api/user', tokenConfig(token));
}

export function get_countries() {
    return axios.get('api/countries');
}


export function get_cities() {
    return axios.get('api/cities');
}

export function post_city(name, country_id) {
    return axios.post('api/cities', {
        name, country_id,
    });
}

export function get_cities_by_country(country_id) {
    return axios.get('api/country/' + country_id + '/cities');
}

export function get_locations_by_city(city_id) {
    return axios.get('api/city/' + city_id + '/locations');
}

export function post_location(name, description, city_id, country_id, price) {
    return axios.post('api/locations', {
        name, description, city_id, country_id, price,
    });
}

export function upload_file(file) {
    var data = new FormData();
    alert('axios  ' + file[0]);
    data.append('file', file[0]);
    return axios.get('api/tours');
}

export function upload_file(files) {
    var data = new FormData();
    for (var f in files) {
        data.append('file' + f, files[f]);        
    }
    const options = {
        headers: {
            'Content-Type': 'multipart/ form - data'
        }
    };
    return axios.post('api/upload', data, options);
}