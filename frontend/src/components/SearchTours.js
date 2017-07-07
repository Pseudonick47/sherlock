/* eslint camelcase: 0, no-underscore-dangle: 0 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import * as actionCreators from '../actions/auth';
import { validateEmail } from '../utils/misc';
import SearchBar from 'material-ui-search-bar'

import Tours from './Tours';

function mapStateToProps(state) {
    return {
        tours: state.auth.tours,
        isLoading: state.auth.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const style = {
    marginTop: 50,
    paddingBottom: 50,
    paddingTop: 25,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SearchTours extends React.Component {

    constructor(props) {
        super(props);
        const redirectRoute = '';
        this.state = {
            searchTerm: '',
        };
    }

    render() {
        return (
            <div>
                <SearchBar
                    onChange={this.props.searchTours}
                    onRequestSearch={this.props.searchTours}
                    style={{
                        margin: '0 auto',
                        maxWidth: 800,
                    }}
                />
                <Tours data={this.props.tours ? this.props.tours : []}/>
            </div>
        );

    }
}

SearchTours.propTypes = {
    tours: React.PropTypes.array,
    searchTerm: React.PropTypes.string,
    searchTours: React.PropTypes.func,
};
