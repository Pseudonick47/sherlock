import React, { Component } from 'react';
import Tour from './Tour';

export default class Tours extends Component {
    constructor(props) {
        super(props);
        const redirectRoute = '';
    }
    
    render() {
        var tourList = [];
    
        for (var i = this.props.data.length - 1; i >= 0; i--) {
            tourList.push(<Tour data={this.props.data[i]} />);
        }

        return (
            <div>
                {tourList}       
            </div>
        );
    }
}
