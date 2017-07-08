import React from 'react';

import Tour from './Tour';

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

export default class Tours extends React.Component {
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
            <div style={style}>
                {tourList}
            </div>
        );
    }
}

Tours.PropTypes = {
    data: React.PropTypes.array,
}