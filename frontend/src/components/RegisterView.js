import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import RadioButton from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import * as actionCreators from '../actions/auth';

import { validateEmail } from '../utils/misc';


function mapStateToProps(state) {
    return {
        isRegistering: state.auth.isRegistering,
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
export default class RegisterView extends React.Component {

    constructor(props) {
        super(props);
        const redirectRoute = '/login';
        this.state = {
            disabled: true,
            email: '',
            emailErrorText: null,
            firstName: '',
            password: '',
            passwordErrorText: null,
            redirectTo: redirectRoute,
            role: '',
            roleErrorText: null,
            surname: '',
        };
    }

    isDisabled() {
        let isEmailValid = false;
        let isPasswordValid = false;
		let isRoleValid = false;

        if (this.state.email === '') {
            this.setState({
                email_error_text: null,
            });
        } else if (validateEmail(this.state.email)) {
            isEmailValid = true;
            this.setState({
                email_error_text: null,
            });

        } else {
            this.setState({
                email_error_text: 'Sorry, this is not a valid email',
            });
        }

		if (this.state.role === '') {
            this.setState({
                role_error_text: null,
            });
        } else if (this.state.role==="tourist" || this.state.role==="guide") {
            isRoleValid = true;
            this.setState({
                role_error_text: null,
            });

        } else {
            this.setState({
                role_error_text: 'Sorry, this is invalid role',
            });
        }

        if (this.state.password === '' || !this.state.password) {
            this.setState({
                password_error_text: null,
            });
        } else if (this.state.password.length >= 6) {
            isPasswordValid = true;
            this.setState({
                password_error_text: null,
            });
        } else {
            this.setState({
                password_error_text: 'Your password must be at least 6 characters',
            });

        }

        if (isEmailValid && isPasswordValid && isRoleValid) {
            this.setState({
                disabled: false,
            });
        }

    }

    changeValue(e, type) {
        const value = e.target.value;
        const nextState = {};
        nextState[type] = value;
        this.setState(nextState, () => {
            this.isDisabled();
        });
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (!this.state.disabled) {
                this.login(e);
            }
        }
    }

    login(e) {
        e.preventDefault();
        this.props.registerUser(this.state.email, this.state.password, this.state.firstName, this.state.surname, this.state.role, this.state.redirectTo);
    }

    render() {
        return (
            <div className="col-md-6 col-md-offset-3" onKeyPress={(e) => this._handleKeyPress(e)}>
                <Paper style={style}>
                    <div className="text-center">
                        <h2>Register to view protected content!</h2>
                        {
                            this.props.registerStatusText &&
                                <div className="alert alert-info">
                                    {this.props.registerStatusText}
                                </div>
                        }

                        <div className="col-md-12">
                            <TextField
                              hintText="example@domain.com"
                              floatingLabelText="Email"
                              type="email"
                              errorText={this.state.emailErrorText}
                              onChange={(e) => this.changeValue(e, 'email')}
                            />
                        </div>
                        <div className="col-md-12">
                            <TextField
                              hintText="Password"
                              floatingLabelText="Password"
                              type="password"
                              errorText={this.state.passwordErrorText}
                              onChange={(e) => this.changeValue(e, 'password')}
                            />
                        </div>
						<div className="col-md-12">
                            <TextField
                              hintText="Name"
                              floatingLabelText="Name"
                              type="firstName"
                              onChange={(e) => this.changeValue(e, 'firstName')}
                            />
                        </div>
						<div className="col-md-12">
                            <TextField
                              hintText="Surname"
                              floatingLabelText="Surname"
                              type="surname"
                              onChange={(e) => this.changeValue(e, 'surname')}
                            />
                        </div>

						<div className="col-md-12">
                            <TextField
                                hintText="tourist/guide"
                                floatingLabelText="Role"
                                type="role"
								errorText={this.state.roleErrorText}
                                onChange={(e) => this.changeValue(e, 'role')}
                            />
                        </div>

                        <RaisedButton
                          disabled={this.state.disabled}
                          style={{ marginTop: 50 }}
                          label="Submit"
                          onClick={(e) => this.login(e)}
                        />

                    </div>
                </Paper>

            </div>
        );

    }
}

RegisterView.propTypes = {
    registerUser: React.PropTypes.func,
    registerStatusText: React.PropTypes.string,
};
