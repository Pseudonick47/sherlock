import React, { Component } from 'react';
import Tour from './Tour';

export default class Toures extends Component {
    constructor(props) {
        super(props);
        const redirectRoute = '';
        this.state = {
            data: [],
        };
    }
    
    render() {
        var tmp = [];

        
        for (var i = this.props.data.length - 1; i >= 0; i--) {
            tmp.push(<Tour data={this.props.data[i]} />);
        }

        return (
            <div>
                {tmp}       
            </div>
        );
    }
}
