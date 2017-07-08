import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import FileUpload from './FileUpload';

import * as actionCreators from '../actions/auth';

import { validateEmail } from '../utils/misc';


function mapStateToProps(state) {
    return {
        user: state.auth.user,
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
            biography: '',
            birthday: '',
            email: '',
            image: '',
            name: '',
            surname: '',
        };
    }

    componentWillMount() {
        const { name, surname, email, biography, birthday, image } = this.props.user;

        this.setState({
            biography: biography,
            birthday: birthday,
            email: email,
            image: image.src,
            name: name,
            surname: surname,
        })
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
        const { 
            biography,
            birthday,
            email,
            image,
            name,
            surname, 
        } = this.state;

        return (
            <div className="col-md-6 col-md-offset" onKeyPress={(e) => this._handleKeyPress(e)}>
                <div className="text-left">
                    <br></br>
                    <br></br>
                    <img src={image} alt="Profile picture" height="300" width="300" />
                </div>

                <div className="text-center">
                    <br></br>
                    <br></br>
                    <div className="text-left">
                        <b> Email: </b> {email}
                    </div>
                    <br></br>
                    <div className="text-left">
                        <b> Name: </b> {name}
                    </div>
                    <br></br>
                    <div className="text-left">
                        <b> Surname: </b> {surname}
                    </div>
                    <br></br>
                    <div className="text-left">
                        <b> Birthday: </b> {birthday}
                    </div>
                    <br></br>
                    <div className="text-left">
                        <b> Bio: </b> {biography}
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

ProfileView.PropTypes = {
    user: React.PropTypes.object,
}