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
            disabled: false,
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
                    <img src={this.props.user.image} alt="Profile picture" height="300" width="300" />
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
		        <b> Birthday: </b> {this.props.user.dateOfBirth}
		    </div>
		    <br></br>
		    <div className="text-left">
		        <b> Bio: </b> {this.props.user.biography}
		    </div>
		    <div className="text-left">
		        <b> Account type: </b> {this.props.user.role}
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

