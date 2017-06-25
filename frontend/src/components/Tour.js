import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import * as actionCreators from '../actions/auth';

export default class Tour extends Component {
   
    render() {
        const style = {
           padding: 20,
           margin: 10,
        };

        return (
            <Paper style={style}>
                id: <h2>{this.props.data.id}</h2>
                name: <h3>{this.props.data.name}</h3>
                description: <h3>{this.props.data.description}</h3>
                fee: <h3>{this.props.data.guide_fee}</h3>
            </Paper>     
        );
    }
}