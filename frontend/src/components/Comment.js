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

function mapStateToProps(state) {
    return {
        userPhoto: state.auth.userPhoto,
        userName: state.auth.userName,
        userId: state.auth.userId,
        comment: state.auth.comment,
        likes: state.auth.likes,
        dislikes: state.auth.dislikes,
        current: state.auth.current,
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
    componentWillMount() {
        this.props.getComment(this.props.id);
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
                    <Avatar src={this.props.userPhoto} />
                    <a href={"profile/" + this.props.userId}>{this.props.userName}</a>
                </Chip>
                <p style={styles.p}>{this.props.comment}</p>

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
