/* eslint camelcase: 0, no-underscore-dangle: 0 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/data'

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

    componentDidMount() {
        this.fetchData();
        
    }

    fetchData() {
        this.props.fetchCountries();
    }

    render() {
        
        var countries = [];
        if(this.props.loaded) {
            this.props.data.forEach(function(e) {
                countries.push(<h3>{e.name}</h3>)
            });
        }

        return (
             <div>
                 {!this.props.loaded ? <h1>Loading data..</h1> : 
                 <h1>{countries}</h1>}
                
            </div>
        );

    }
}

CountriesView.propType = {
    fetchCountries: React.PropTypes.func,
    data: React.PropTypes.array,
    loaded: React.PropTypes.bool,
};
