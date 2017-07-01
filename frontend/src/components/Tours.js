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

        const style = {
            paddingTop: 40,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            alignContent: "flex-start",
            width: 1000,
            maxWidth: "100%",

        };

        return (
            <div style={style}>
                {tourList}       
            </div>
        );
    }
}
