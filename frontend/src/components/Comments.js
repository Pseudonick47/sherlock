import React from 'react';
import { Link } from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import Comment from './Comment';

import * as actionCreators from '../actions/data/commentsTour';


function mapStateToProps(state) {
    return {
      comments: state.data.commentsTour.data,
      user: state.auth.user,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const styles = {
    chip: {
        margin: 4,
    },
    p: {
        margin: 10,
    },
    wrapper: {
        padding: 10,
        margin: 10,
        width: "100%",
    },
};


@connect(mapStateToProps, mapDispatchToProps)
export default class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            tourId: props.id,
            newCommentText: "",
        };
    };

    componentWillMount(){
        this.props.fetchComments(this.state.tourId);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.comments != nextProps.comments) {
            var commentList = [];

            for (var i in nextProps.comments.com) {
                commentList.push(<Comment comment={nextProps.comments.com[i]} />);
            }
            this.setState({
                comments: commentList,
            });
        }
    }

    postComment = (e) => {
        e.preventDefault();
        this.props.postComment(this.state.newCommentText, this.state.tourId, this.props.user.id);
        this.props.fetchComments(this.state.tourId);
        
        this.setState({
            newCommentText: "",
        });
    }
  
    commentChanged = (e, text) => {
        this.setState({
            newCommentText: text,
        });
    }

    render() {
        return (
            <div>
                {this.state.comments}
                {this.props.user ?
                  <Paper style={styles.wrapper}>
                    <Chip style={styles.chip}>
                      <Avatar src={this.props.user.image} />
                        <Link to={"profile/" + this.props.user.id}>{this.props.user.name}</Link>
                    </Chip>
                    <TextField
                            hintText="Message Field"
                            floatingLabelText="Write your comment here"
                            multiLine={true}
                            rows={2}
                            onChange={this.commentChanged}
                            value={this.state.newCommentText}
                    />
                    <RaisedButton onClick={this.postComment}>
                      Comment
                    </RaisedButton>
                  </Paper> : "" 
                }
            </div>
        );
    }
}
