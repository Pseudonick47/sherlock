import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import * as actionCreators from '../actions/auth';

export default class Tour extends Component {
   
    render() {
        const style = {
           padding: 20,
           margin: 10,
           height: 300,
           width: 300,  /* Or whatever */
           marginRight: "auto",
           marginBottom: 20,
           overflow: 'hidden',
           position: "relative",
        };

        var locations = [];
        for (var loc in this.props.data.locations) {
            locations.push(<a>{this.props.data.locations[loc]+", "}</a>);
        }

        return (
            <Paper style={style}>
                {/*id: <h2>{this.props.data.id}</h2>*/}
                <a href={"tour/" + this.props.data.id}><h3>{this.props.data.name}</h3></a>
                <p>{this.props.data.description.substring(0, 100) + "..."}</p>
                <b>Locations:</b>
                <ul>
                    {locations}
                </ul>
                <div style={{ height: 30, position: "absolute", bottom: 30, }} >
                    <h3>{this.props.data.guide_fee} $</h3>
                </div>
            </Paper>     
        );
    }
}