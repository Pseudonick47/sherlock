/* eslint camelcase: 0, no-underscore-dangle: 0 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import FileUpload from './FileUpload';
import * as actionCreators from '../actions/auth';

import { validateEmail } from '../utils/misc';

function mapStateToProps(state) {
    return {
        isRegistering: state.auth.isRegistering,
        user: state.auth.user,
        registerStatusText: state.auth.registerStatusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}



const style = {
    marginTop: 50,
    paddingBottom: 50,
    paddingTop: 25,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ProfileView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.userName,
	        profile_name: this.props.first_name,
	        profile_surname: '',
	        bio: '',
            birthday: '',
        };
    }

    _handleKeyPress(e) {
        if (e.key === 'Edit') {
            if (!this.state.disabled) {
                this.edit(e);
            }
        }
    }

    imageUploadCallback(imageIds) {
        alert(imageIds[0]);
    }

    edit(e) {
        var novo = window.prompt("Edit info","Name");
        this.setState({profile_name:novo});
        novo = window.prompt("Edit info","Surname");
        this.setState({profile_surname:novo});
        novo = window.prompt("Edit info","Birthday");
        this.setState({birthday:novo});
        novo = window.prompt("Edit info","Bio");
        this.setState({bio:novo});
    }

    render() {
        return (
            <div className="col-md-6 col-md-offset" onKeyPress={(e) => this._handleKeyPress(e)}>
                <div className="text-left">
		    <br></br>
		    <br></br>
                    <img src={this.props.user.userPhoto} alt="Profile picture" height="300" width="300" />
		</div>

		<div className="text-center">
		    <br></br>
		    <br></br>
		    <div className="text-left">
			<b> Email: </b> {this.props.user.email}
		    </div>
		    <br></br>
		    <div className="text-left">
		        <b> Name: </b> {this.props.user.first_name}
		    </div>
		    <br></br>
		    <div className="text-left">
		        <b> Surname: </b> {this.props.user.surname}

		    </div>
		    <br></br>
		    <div className="text-left">
		        <b> Birthday: </b> {this.props.user.birthday}
		    </div>
		    <br></br>
		    <div className="text-left">
		        <b> Bio: </b> {this.props.user.bio}
		    </div>
	        </div>
		<RaisedButton
                    style={{  marginTop:50 ,marginLeft: 40 }}
                    label="✎"
                    onClick={(e) => this.edit(e)}
                />
        <FileUpload callback={this.imageUploadCallback} />
	    </div>
        );

    }
}

