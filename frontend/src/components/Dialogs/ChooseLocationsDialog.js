import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AutoComplete from 'material-ui/AutoComplete';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';

import FileUpload from '../FileUpload';
import Locations from '../Locations';
import NewCityDialog from './NewCityDialog';
import NewLocationDialog from './NewLocationDialog';

import * as citiesActions from '../../actions/data/citiesByCountry';
import * as countriesActions from '../../actions/data/countries';
import * as locationsActions from '../../actions/data/locations';

const actionCreators = Object.assign({}, citiesActions, countriesActions, locationsActions);


function mapStateToProps(state) {
    return {
        citiesByCountry: state.data.citiesByCountry.data,
        citiesByCountryError: state.data.citiesByCountry.fetchErrorMessage,
        countries: state.data.countries.data,
        countriesError: state.data.countries.fetchErrorMessage,
        fetchingCitiesByCountry: state.data.citiesByCountry.isFetching,
        fetchingCountries: state.data.countries.isFetching,
        fetchingLocations: state.data.locations.isFetching,
        locations: state.data.locations.data,
        locationsError: state.data.locations.fetchErrorMessage,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ChooseLocationsDialog extends React.Component {

    constructor() {
        super();

        this.state = {
            cities: [],
            city: null,
            cityError: '',
            cityNames: [],
            country: null,
            countryError: '',
            countryNames: [],
            locations: [],
            newCityName: null,
            newCityOpen: false,
            newLocationOpen: false,
            open: false,
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
        if(this.props.locations != nextProps.locations) {
            var locations = [];
            nextProps.locations.forEach((location) => {
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
        this.props.fetchLocations(id);
    }

    onCountryRequest = (value, index) => {
        if (index == -1) {
            index = this.state.countryNames.indexOf(value);
        }
        if (index != -1) {
            const country = this.props.countries[index];
            this.setState({
                country: country,
                cities: [],
                locations: [],
                countryError: '',
            });
            this.fetchCities(country.id);
        }
        else {
            this.setState({countryError: 'Country doesn\'t exist!'})
        }
    }

    onCityRequest = (value, index) => {
        if (index == -1) {
            index = this.state.cityNames.indexOf(value);
        }
            if (index != -1) {
            const city = this.state.cities[index];
            this.setState({
                city: city,
                cityError: '',
                locations: [],
            });
            this.fetchLocations(city.id);
        }
        else {
            this.setState({cityError: 'City doesn\'t exist!'})
        }
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
            />,
            <RaisedButton
                label="Add new location"
                style={{margin: "15 0 10 20"}}
                onTouchTap={() => this.setState({newLocationOpen: true})}
                disabled={this.state.city ? false : true}
            />
        ]

        return (
            <Dialog
                actions={actions}
                modal
                open={this.state.open}
            >
            <div style={{overflow: "auto"}}>
                <h1 style={{padding: 40, marginTop: 20}}>What would you like them to visit?</h1>
                <AutoComplete
                    hintText={fetchingCountries ? "Loading countries.." : "Countries"}
                    errorText={
                        countriesError ? "Oops, something went wrong! Please try reloading the page." :
                        this.state.countryError
                    }
                    dataSource={this.state.countryNames}
                    style={{width: "80%", margin: "20 0 5 20",}}
                    onNewRequest={this.onCountryRequest}
                />
                <AutoComplete
                    hintText={fetchingCities ? "Loading cities.." : "Cities"}
                    errorText={
                        citiesError ? "Oops, something went wrong! Please try reloading the page." :
                        this.state.cityError
                    }
                    disabled={this.state.cityNames.length ? false : true}
                    dataSource={this.state.cityNames}
                    style={{width: "60%", margin: "5 0 20 20",}}
                    onNewRequest={this.onCityRequest}
                    defaultValue={this.state.city ? this.state.city.name : ""}
                />
                <RaisedButton
                    label="Add new city"
                    style={{float: "right", margin: "5 20 20 0",}}
                    onTouchTap={() => this.setState({newCityOpen: true})}
                    disabled={this.state.country ? false : true}
                />
                <Divider />
                {this.state.locations.length ? "" :
                    <h4 style={{padding: "5 20 0 20"}}>Please select country and city..</h4>
                }
                <div style={{overflow: "hidden",  maxHeigth:"400",}}>
                    <Locations
                        data={this.state.locations}
                        selectionChanged={(selectedLocations) => this.setState({selectedLocations: selectedLocations})}
                        actionType="add"
                    />
                    <Divider />
                </div>
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

ChooseLocationsDialog.propTypes = {
    cancel: React.PropTypes.func,
    citiesByCountry: React.PropTypes.array,
    citiesByCountryError: React.PropTypes.bool,
    countries: React.PropTypes.array,
    countriesError: React.PropTypes.bool,
    fetchCitiesByCountry: React.PropTypes.func,
    fetchCountries: React.PropTypes.func,
    fetchLocations: React.PropTypes.func,
    locations: React.PropTypes.array,
    locationsError: React.PropTypes.bool,
    submit: React.PropTypes.func,
}
