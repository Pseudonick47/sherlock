import React from 'react';
import { Link } from 'react-router';

import ArrowDown from 'material-ui/svg-icons/action/thumb-down';
import ArrowUp from 'material-ui/svg-icons/action/thumb-up';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Close from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        padding: 10,
        margin: 10,
        width: "100%",
    },
    p: {
        margin: 10,
    },
};

export default class Comment extends React.Component {

    constructor(props) {
        super(props);
    }

    clickLike = (e) => { };
    clickDislike = (e) => { };
    clickDelete = (e) => { };

    render() {
        console.log(this.props.comment.comment);
        return (
            <Paper style={styles.wrapper}>
                <Chip style={styles.chip}>
                    <Avatar src={this.props.comment.userPhoto} />
                    <Link to={"profile/" + this.props.comment.userId}>{this.props.comment.userName}</Link>
                </Chip>
                <p style={styles.p}>{this.props.comment.comment}</p>

                <IconButton tooltip="Like" onClick={this.clickLike}>
                    <ArrowUp />
                </IconButton>

                <IconButton tooltip="Disike" onClick={this.clickDislike}>
                    <ArrowDown />
                </IconButton>

                <IconButton tooltip="Delete" onClick={this.clickDelete}>
                    <Close />
                </IconButton>
            </Paper>
        );
    }
}

//TODO: PropTypes