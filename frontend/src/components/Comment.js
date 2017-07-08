import React from 'react';
import { Link } from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ArrowDown from 'material-ui/svg-icons/action/thumb-down';
import ArrowUp from 'material-ui/svg-icons/action/thumb-up';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Close from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import * as actionCreators from '../actions/data/commentsByTour';

//TODO: Verovatno ne radi, moram pogledati kako si slao
function mapStateToProps(state) {
    return {
        comment: state.auth.user.comment,
        current: state.auth.user.current,
        dislikes: state.auth.user.dislikes,
        likes: state.auth.user.likes,
        userId: state.auth.user.id,
        userImage: state.auth.user.image,
        userName: state.auth.userName,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Comment extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchComment(this.props.id);
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
                  <Avatar src={this.props.userImage} />
                    <Link to={"profile/" + this.props.userId}>{this.props.userName}</Link>
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

//TODO: PropTypes