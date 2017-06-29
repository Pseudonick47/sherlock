/* eslint camelcase: 0, no-underscore-dangle: 0 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/data'

import AddLocationDialog from './Dialogs/AddLocationDialog';

function mapStateToProps(state) {
    return {
        data: state.data.data,
        loaded: state.data.loaded,
        isFetching: state.data.isFetching,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class CountriesView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
             <div>
                <AddLocationDialog />
            </div>
        );

    }
}

CountriesView.propType = {
    fetchCountries: React.PropTypes.func,
    data: React.PropTypes.array,
    loaded: React.PropTypes.bool,
};
