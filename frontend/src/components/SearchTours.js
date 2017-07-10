import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import SearchBar from 'material-ui-search-bar' 

import Tours from './Tours';

import * as actionCreators from '../actions/data/tours';

import { validateEmail } from '../utils/misc';


function mapStateToProps(state) {
    return {
        isFetching: state.data.tours.isFetching,
        tours: state.data.tours.data,
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

    componentWillMount() {
        this.props.fetchTours();
    }

    render() {
        return (
            <div>
                <SearchBar
                    onChange={this.props.fetchTours}
                    onRequestSearch={this.props.fetchTours}
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
    fetchTours: React.PropTypes.func,
    searchTerm: React.PropTypes.string,
    tours: React.PropTypes.array,
};
