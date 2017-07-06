import React, { Component } from 'react';
import Comment from './Comment';

export default class Comments extends Component {
    constructor(props) {
        super(props);
        const redirectRoute = '';
    }

    render() {
        var commentList = [];
        for (var i in this.props.ids) {
            commentList.push(<Comment id={this.props.ids[i]} />);
        }

        return (
            <div>
                {commentList}
            </div>
        );
    }
}
