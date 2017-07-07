import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import LeftNav from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

import * as authActions from '../../actions/auth';
import * as componentActions from '../../actions/components';


const actionCreators = Object.assign({}, authActions, componentActions);


function mapStateToProps(state) {
    return {
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        leftNavDisplayed: state.components.leftNavDisplayed,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };

    }

    dispatchNewRoute(route) {
        browserHistory.push(route);
        this.props.leftNavToggle(false);

    }

    logout(e) {
        e.preventDefault();
        this.props.logoutAndRedirect();
        this.props.leftNavToggle(false);
    }

    openNav() {
        this.props.leftNavToggle(true);
    }

    render() {
        return (
            <header>
                <LeftNav open={this.props.leftNavDisplayed}>
                    {
                        !this.props.isAuthenticated ?
                            <div>
                                <MenuItem onClick={() => this.dispatchNewRoute('/login')}>
                                    Login
                                </MenuItem>
                                <MenuItem onClick={() => this.dispatchNewRoute('/register')}>
                                    Register
                                </MenuItem>
                            </div>
                            : ""
                    }
                    {
                        <div>
                            <MenuItem onClick={() => this.dispatchNewRoute('/tour/1')}>
                                Tour 1
                            </MenuItem>
                            <MenuItem onClick={() => this.dispatchNewRoute('/tours')}>
                                Search Tours
                            </MenuItem>
                        </div>
                    }
                    {
                            this.props.isAuthenticated ? this.props.user.role == "guide" ?
                            <div>
                                <MenuItem onClick={() => this.dispatchNewRoute('/new_tour')}>
                                    New Tour
                                </MenuItem>
                                <Divider />
	                              <MenuItem onClick={() => this.dispatchNewRoute('/profile')}>
                                    ProfileView
                                </MenuItem>
				                        <Divider />
                                <MenuItem onClick={(e) => this.logout(e)}>
                                    Logout
                                </MenuItem>
                            </div>
                            :
                            <div>
                                <Divider />
	                              <MenuItem onClick={() => this.dispatchNewRoute('/profile')}>
                                    ProfileView
                                </MenuItem>
				                        <Divider />
                                <MenuItem onClick={(e) => this.logout(e)}>
                                    Logout
                                </MenuItem>
                            </div>
                            : ""
                    }
                </LeftNav>
                <AppBar
                  title="Sherlock"
                  onLeftIconButtonTouchTap={() => this.openNav()}
                  iconElementRight={
                      <FlatButton label="Home" onClick={() => this.dispatchNewRoute('/')} />
                    }
                />
            </header>

        );
    }
}

Header.propTypes = {
    logoutAndRedirect: React.PropTypes.func,
    isAuthenticated: React.PropTypes.bool,
    leftNavDisplayed: React.PropTypes.bool,
    leftNavToggle: React.PropTypes.func,
};
