import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';

import * as actionCreators from '../../actions/data'

function mapStateToProps(state) {
    return {
        countries: state.data.data,
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
export default class AddNewCityDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            city_name: '',
            city_name_error: '',
            country_name: '',
            country_name_error: '',
            country_names: [],
        };
    };

    componentWillMount() {
        this.fetchData();
    };

    componentWillReceiveProps(nextProps) {
        if(this.props.countries != nextProps.countries) {
            var c = [];
            nextProps.countries.forEach(function(e) {
                c.push(e.name);
            });
            this.setState({country_names: c});
        }
    };

    handleCancel = () => {
        this.setState({open: false});
    };

    handleSubmit = () => {
        const { city_name, country_name} = this.state;
        const index = this.state.country_names.indexOf(country_name);

        if (city_name.length === 0) {
            console.log("name required");
            this.setState({
                city_name_error: 'Name is required!',
                city_name: null,
            });
        } else if (country_name === 0) {
            this.setState({
                country_name_error: 'Country is required!',
                country_name: null,
            });
        } else if (index == -1) {
            this.setState({
                country_name_error: 'Country does\'t exist, please try again!',
                country_name: null,
            });
        } else {
            const country = this.props.countries[index];
            this.props.insertCity(city_name, country.id);
            if (this.props.insert_error) {
                this.setState({name_error: this.props.message});
            } else {
                this.setState({open: false});
            }
        }
    };

    fetchData() {
        this.props.fetchCountries();
    };

    nameChanged(event, value) {
        if (this.state.city_name_error != '') {
            this.setState({
                city_name: value,
                city_name_error: ''
            });
        } else {
            this.state.city_name = value;
        }
    }

    countryChanged(value) {
        if (this.state.country_error != '') {
            this.setState({
                country_name: value,
                country_name_error: ''
            });
        } else {
            this.state.country_name = value;
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
                    title="Add New City"
                    actions={actions}
                    modal
                    open={this.state.open}
                >
                    <TextField
                        hintText="Name"
                        errorText={this.state.city_name_error}
                        onChange={(event, value) => this.nameChanged(event, value)}
                        fullWidth
                    />
                    <AutoComplete
                        hintText={isFetching ? "Loading countries.." : "Country"}
                        errorText={error ? "Oops, something went wrong!" : this.state.country_name_error}
                        disabled={error}
                        dataSource={this.state.country_names}
                        onUpdateInput={(value) => this.countryChanged(value)}
                        fullWidth
                    />
                </Dialog>
            </div>
        );
    };
}

AddNewCityDialog.propTypes = {
    fetchCountries: React.PropTypes.func,
    countries: React.PropTypes.array,
    isFetching: React.PropTypes.bool,
    error: React.PropTypes.bool,
    insert_error: React.PropTypes.bool,
    message: React.PropTypes.string,
};
