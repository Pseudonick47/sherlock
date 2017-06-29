import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import NumberInput from 'material-ui-number-input';

import * as actionCreators from '../../actions/data'

function mapStateToProps(state) {
    return {
        countries: state.data.countries,
        cities: state.data.cities,
        isFetching: state.data.isFetching,
        error: state.data.error,
        insert_error: state.data.insert_error,
        message: state.data.message,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class NewLocationDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            location_name: '',
            location_name_error: '',
            location_description: '',
            city_name: '',
            city_name_error: '',
            city_names: [],
            country_name: '',
            country_name_error: '',
            country_names: [],
            price: 0.0,
        };
    };

    componentWillMount() {
        this.fetchCountries();
    };

    componentWillReceiveProps(nextProps) {
        if(this.props.countries != nextProps.countries) {
            var c = [];
            nextProps.countries.forEach(function(e) {
                c.push(e.name);
            });
            this.setState({country_names: c});
        }
        if(this.props.cities != nextProps.cities) {
            var c = [];
            nextProps.cities.forEach(function(e) {
                c.push(e.name);
            });
            this.setState({city_names: c});
        }
    };

    handleCancel = () => {
        this.setState({open: false});
    };

    handleSubmit = () => {
        const {location_name, location_description, city_name, country_name, price} = this.state;
        const country_index = this.state.country_names.indexOf(country_name);
        const city_index = this.state.city_names.indexOf(city_name);

        if(location_name.length === 0) {
            this.setState({
                location_name_error: 'Location name is required!',
                location_name: null,
            });
        } else if (country_name === 0) {
            this.setState({
                country_name_error: 'Country is required!',
                country_name: null,
            });
        } else if (country_index == -1) {
            this.setState({
                country_name_error: 'Country does\'t exist, please try again!',
                country_name: null,
            });
        } else if (city_name.length != 0 && city_index === -1) {
            this.setState({
                city_name_error: 'Entered city doe\'t exist, you can add it!',
                city_name: null,
            });
        } else {
            const country_id = this.props.countries[country_index].id;
            var city_id = null;
            if (city_name.length != 0 && city_index != -1) {
                city_id = this.props.cities[city_index].id;
            }

            this.props.insertLocation(location_name, location_description, city_id, country_id, price);
            if (this.props.insert_error) {
                this.setState({location_name_error: this.props.message});
            } else {
                this.setState({open: false});
            }
        }
    };

    fetchCountries() {
        this.props.fetchCountries();
    };

    fetchCitiesByCountry(country_id) {
        this.props.fetchCitiesByCountry(country_id);
    }

    locationNameChanged(event, value) {
        if (this.state.location_name_error != '') {
            this.setState({
                location_name: value,
                location_name_error: ''
            });
        } else {
            this.state.location_name = value;
        }
    }

    locationDescriptionChanged(event, value) {
        this.state.location_description = value;
    }

    cityNameChanged(value) {
        if (this.state.city_name_error != '') {
            this.setState({
                city_name: value,
                city_name_error: ''
            });
        } else {
            this.state.city_name = value;
        }
    }

    countryNameChanged(value) {
        if (this.state.country_error != '') {
            this.setState({
                country_name: value,
                country_name_error: ''
            });
        } else {
            this.state.country_name = value;
        }
    }

    priceChanged(event, value) {
        this.state.price = parseFloat(value);
    }

    requestCities(value, index) {
        if(index === -1) {
            const index2 = this.state.country_names.indexOf(value);
            if (index2 != -1) {
                const country_id = this.props.countries[index2].id;
                this.fetchCitiesByCountry(country_id);    
            }
        } else {
            const country_id = this.props.countries[index].id;
            this.fetchCitiesByCountry(country_id);
        }
    }

    render() {
        const actions = [
        <FlatButton
            label="Cancel"
            secondary
            onTouchTap={this.handleCancel}
        />,
        <FlatButton
            label="Submit"
            primary
            keyboardFocused
            onTouchTap={this.handleSubmit}
        />,
        ];

        const {isFetching, error} = this.props;

        return (
            <div>
                <Dialog
                    title="New Location"
                    actions={actions}
                    modal
                    open={this.state.open}
                >
                    <TextField
                        hintText="Location name"
                        errorText={this.state.city_name_error}
                        onChange={(event, value) => this.locationNameChanged(event, value)}
                        fullWidth
                    />
                    <AutoComplete
                        hintText={isFetching ? "Loading countries.." : "Country"}
                        errorText={error ? "Oops, something went wrong!" : this.state.country_name_error}
                        disabled={error}
                        dataSource={this.state.country_names}
                        onUpdateInput={(value) => this.countryNameChanged(value)}
                        onNewRequest={(value, index) => this.requestCities(value, index)}
                        fullWidth
                    />
                    <AutoComplete
                        hintText={isFetching ? "Loading cities.." : "Cities"}
                        errorText={error ? "Oops, something went wrong!" : this.state.city_name_error}
                        disabled={error || this.state.city_names.length == 0}
                        dataSource={this.state.city_names}
                        onUpdateInput={(value) => this.cityNameChanged(value)}
                        fullWidth
                    />
                    <TextField
                        hintText="Description"
                        onChange={(event, value) => this.locationDescriptionChanged(event, value)}
                        rows={4}
                        rowsMax={10}
                        multiLine
                        fullWidth
                    />
                    <NumberInput
                        hintText="Price"
                        min={0}
                        strategy="warn"
                        onChange={(event, value) => this.priceChanged(event, value)}
                    />
                </Dialog>
            </div>
        );
    };
}

NewLocationDialog.propTypes = {
    fetchCountries: React.PropTypes.func,
    fetchCitiesByCountry: React.PropTypes.func,
    insertLocation: React.PropTypes.func,
    countries: React.PropTypes.array,
    cities: React.PropTypes.array,
    isFetching: React.PropTypes.bool,
    error: React.PropTypes.bool,
    insert_error: React.PropTypes.bool,
    message: React.PropTypes.string,
};
