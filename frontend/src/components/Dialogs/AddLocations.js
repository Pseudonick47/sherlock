import React from 'react';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {Table, TableBody, TableRowColumn} from 'material-ui/Table';
import {Card, CardHeader, CardText} from 'material-ui/Card';

import FileUpload from '../FileUpload';

import * as actionCreators from '../../actions/data'

import NewCityDialog from './NewCityDialog';
import NewLocationDialog from './NewLocationDialog';
import Locations from '../Locations';

function mapStateToProps(state) {
    return {
        countries: state.data.countries,
        countriesError: state.data.countriesError,
        fetchingCountries: state.data.fetchingCountries,
        citiesByCountry: state.data.citiesByCountry,
        citiesByCountryError: state.data.citiesByCountryError,
        fetchingCitiesByCountry: state.data.fetchingCitiesByCountry,
        locationsByCity: state.data.locationsByCity,
        locationsByCityError: state.data.locationsByCityError,
        fetchingLocationsByCity: state.data.fetchingLocationsByCity,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AddLocations extends React.Component {

    constructor() {
        super();

        this.state = {
            open: false,
            country: null,
            countryNames: [],
            city: null,
            cities: [],
            cityNames: [],
            newCityName: null,
            locations: [],
            // locationsDisplay: [],
            newCityOpen: false,
            newLocationOpen: false,
            selectedLocations: [],
        }
    }

    componentWillMount() {
        this.setState({open: true});
    }

    componentDidMount() {
        this.fetchCountries();
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.countries != nextProps.countries) {
            var c = [];
            nextProps.countries.forEach((country) => {
                c.push(country.name);
            });
            this.setState({countryNames: c});
        }
        if (this.props.citiesByCountry != nextProps.citiesByCountry) {
            var c = [];
            nextProps.citiesByCountry.forEach((city) => {
                c.push(city.name);
            });
            this.setState({cityNames: c, cities: nextProps.citiesByCountry});
        }
        if(this.props.locationsByCity != nextProps.locationsByCity) {
            var locations = [];
            nextProps.locationsByCity.forEach((location) => {
                locations.push(location);
            });
            this.setState({locations: locations,});
        }
    }

    componentWillUnmount() {
        this.setState({open: false});
    }


    fetchCountries() {
        this.props.fetchCountries();
    };

    fetchCities(id) {
        this.props.fetchCitiesByCountry(id);
    }

    fetchLocations(id) {
        this.props.fetchLocationsByCity(id);
    }

    onCountryRequest = (value, index) => {
        const country = this.props.countries[index];
        this.setState({country: country});
        this.fetchCities(country.id);
    }

    onCityRequest = (value, index) => {
        const city = this.state.cities[index];
        this.setState({city: city});
        this.fetchLocations(city.id);
    }

    onNewCityCancel = () => {
        this.setState({
            newCityOpen: false,
        });
    }

    onNewCitySubmit = (city) => {
        var cityNames = this.state.cityNames;
        cityNames.push(city.name);

        var cities = this.state.cities;
        cities.push(city);

        this.setState({
            newCityOpen: false,
            city: city,
            cities: cities,
            cityNames: cityNames,
        });
    }

    onNewLocationCancel = () => {
        this.setState({
            newLocationOpen: false,
        });
    }

    onNewLocationSubmit = (location) => {
        var locations = this.state.locations;

        locations.push(location);

        this.setState({
            newLocationOpen: false,
            locations: locations,
        });
    }

    onCancel = () => this.props.cancel();

    onSubmit = () => this.props.submit(this.state.selectedLocations);

    render() {
        const { 
            fetchingCountries,
            countriesError,
            fetchingCities,
            citiesError,
        } = this.props;

        const {
            newCityOpen,
            newLocationOpen
        } = this.state;

        const actions = [
            <FlatButton
                label="Cancel"
                secondary
                onTouchTap={this.onCancel}
            />,
            <FlatButton
                label="Submit"
                primary
                keyboardFocused
                onTouchTap={this.onSubmit}
            />
        ]

        return (
            <Dialog
                actions={actions}
                modal
                open={this.state.open}
                style={{height: "100%"}}
            >
            <div style={{overflow: "auto"}}> 
                <h1 style={{padding: 40, marginTop: 20}}>What would you like them to visit?</h1>
                <p style={{padding: 20,}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed pretium lacus felis, ut condimentum massa ornare id. 
                    Vivamus laoreet tortor eu justo posuere dictum. 
                    Etiam risus diam, laoreet vel lacus sit amet, ultricies 
                    tincidunt ipsum. Pellentesque sodales enim ligula, quis 
                    iaculis ipsum eleifend et. Integer ornare tincidunt 
                    hendrerit. Curabitur ullamcorper ac eros sit amet euismod. 
                </p>
                <AutoComplete 
                    hintText={fetchingCountries ? "Loading countries.." : "Countries"}
                    errorText={countriesError ? "Oops, something went wrong! Please try reloading the page." : ""}
                    dataSource={this.state.countryNames}
                    style={{width: "80%", margin: "20 0 5 20",}}
                    onNewRequest={this.onCountryRequest}
                />
                <AutoComplete 
                    hintText={fetchingCities ? "Loading cities.." : "Cities"}
                    errorText={citiesError ? "Oops, something went wrong! Please try reloading the page." : ""}
                    disabled={this.state.cityNames.length ? false : true}
                    dataSource={this.state.cityNames}
                    style={{width: "60%", margin: "5 0 20 20",}}
                    onNewRequest={this.onCityRequest}
                    defaultValue={this.state.city ? this.state.city.name : ""}
                />
                <FlatButton 
                    label="Add new city"
                    style={{float: "right", margin: "5 20 20 0",}}
                    onTouchTap={() => this.setState({newCityOpen: true})}
                    disabled={this.state.country ? false : true}
                />
                <Divider />
                {this.state.locations.length ? "" : 
                    <h4 style={{padding: "5 20 0 20"}}>Please select country and city..</h4>
                }
                <Locations 
                    data={this.state.locations} 
                    selectionChanged={(selectedLocations) => this.setState({selectedLocations: selectedLocations})}
                />
                <Divider />
                <FlatButton 
                    label="Add new location"
                    style={{margin: "15 0 10 20"}}
                    onTouchTap={() => this.setState({newLocationOpen: true})}
                    disabled={this.state.city ? false : true}
                />
            </div>
            {newCityOpen ? 
                <NewCityDialog 
                    cancel={this.onNewCityCancel} 
                    submit={this.onNewCitySubmit} 
                    country={this.state.country} 
                />
            : "" }
            {newLocationOpen ?
                <NewLocationDialog 
                    cancel={this.onNewLocationCancel} 
                    submit={this.onNewLocationSubmit} 
                    country={this.state.country}
                    city={this.state.city} 
                />
            : ""}
            </Dialog>
        );
    }
}

AddLocations.propTypes = {
    cancel: React.PropTypes.func,
    submit: React.PropTypes.func,
    fetchCountries: React.PropTypes.func,
    fetchCitiesByCountry: React.PropTypes.func,
    fetchLocationsByCity: React.PropTypes.func,
    countries: React.PropTypes.array,
    countriesError: React.PropTypes.bool,
    fetchingCountries: React.PropTypes.bool,
    citiesByCountry: React.PropTypes.array,
    citiesByCountryError: React.PropTypes.bool,
    fetchingCitiesByCountry: React.PropTypes.bool,
}