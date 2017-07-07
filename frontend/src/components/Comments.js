import React, { Component } from 'react';
import Comment from './Comment';

import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import * as actionCreators from '../actions/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

function mapStateToProps(state) {
    return {
      comments: state.auth.comments,
      user: {
        email: state.auth.email,
        first_name: state.auth.first_name,
        surname: state.auth.surname,
        biography: state.auth.biography,
        dateOfBirth: state.auth.dateOfBirth,
        role: state.auth.role,
        image: state.auth.image,
        id: state.auth.id,
     }
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Comments extends Component {
    constructor(props) {
        super(props);
        const redirectRoute = '';
      this.state = {
        tourId: props.id,
        newCommentText: "",
      };
    };

    componentWillMount(){
      this.props.getComment(this.state.tourId);
    }

  postComment = (e) => {
      e.preventDefault();
    this.props.postComment(this.state.newCommentText, this.state.tourId, this.props.user.id);
  }
  commentChanged = (e,text) => {
     this.setState({newCommentText: text});
  }

    render() {
        var commentList = [];
        for (var i in this.props.comments) {
            commentList.push(<Comment comment={this.props.comments[i]} />);
        }

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
            <div>
                {commentList}
                { this.props.user.first_name ?
                  <Paper style={styles.wrapper}>
                    <Chip style={styles.chip}>
                      <Avatar src={this.props.user.image} />
                        <Link to={"profile/" + this.props.user.id}>{this.props.user.first_name}</Link>
                    </Chip>
                    <TextField
                            hintText="Message Field"
                            floatingLabelText="Write your comment here"
                            multiLine={true}
                            rows={2}
                            onChange={this.commentChanged}
                    />
                    <RaisedButton onClick={this.postComment}>
                      Comment
                    </RaisedButton>
                  </Paper> : null }
              </div>
          );
    }
}
