import React from 'react';

import Comment from './Comment';


export default class Comments extends React.Component {
    constructor(props) {
        super(props);
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
