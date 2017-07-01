import React, { Component } from 'react';
import Comment from './Comment';

export default class Comments extends Component {
    constructor(props) {
        super(props);
        const redirectRoute = '';
    }

    render() {
        var commentList = [];

        // for (var i = this.props.data.length - 1; i >= 0; i--) {
        //     commentList.push(<Comment data={this.props.data[i]} />);
        // }

        for (var i = 0; i < 5; i++) { 
            commentList.push(<Comment />)
        }

        return (
            <div>
                {commentList}
            </div>
        );
    }
}
