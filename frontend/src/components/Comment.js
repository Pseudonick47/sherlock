import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import ArrowUp from 'material-ui/svg-icons/action/thumb-up';
import ArrowDown from 'material-ui/svg-icons/action/thumb-down';
import Close from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';

import * as actionCreators from '../actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

function mapStateToProps(state) {
    return {
        user: {
            email: state.auth.email,
            first_name: state.auth.first_name,
            surname: state.auth.surname,
            biography: state.auth.biography,
            dateOfBirth: state.auth.dateOfBirth,
            role: state.auth.role,
            image: state.auth.image,
            id: state.auth.id,
        },
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Comment extends Component {
    constructor(props) {
        super(props);
    }
    clickLike = (e) => { };
    clickDislike = (e) => { };
    clickDelete = (e) => { };

    render() {
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
