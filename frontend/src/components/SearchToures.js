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

import Toures from './Toures';

function mapStateToProps(state) {
    return {
        toures: state.auth.toures,
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
export default class SearchToures extends React.Component {

    constructor(props) {
        super(props);
        const redirectRoute = '';
        this.state = {
            isLoading: true,
            toures: [],
            searchTerm: '',
        };
    }

    componentWillMount() {
        this.props.searchToures(this.state.searchTerm);
    }

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <SearchBar
                    onRequestSearch={() => this.props.searchToures(this.state.searchTerm)}
                    style={{
                        margin: '0 auto',
                        maxWidth: 800,
                    }}
                />
                <Toures data={this.props.toures}/>
            </div>
        );

    }
}

SearchToures.propTypes = {
    toures: React.PropTypes.array,
    searchTerm: React.PropTypes.string,
    searchToures: React.PropTypes.func,
};
