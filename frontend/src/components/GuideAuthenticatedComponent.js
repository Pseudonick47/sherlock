import React from 'react';
import { browserHistory } from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/auth';


function mapStateToProps(state) {
    return {
        fetchingUser: state.auth.isFetching,
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export function requireGuideAuthentication(Component) {
    class GuideAuthenticatedComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                load: false,
            };
        }
        
        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            if (this.props.user != nextProps.user) {
                this.checkAuth();
            }
        }

        checkAuth(props = this.props) {
            if (!props.isAuthenticated) {
                const token = localStorage.getItem('token');
                if (!token) {
                    browserHistory.push('/home');
                } else {
                    fetch('/api/is_token_valid', {
                        method: 'post',
                        credentials: 'include',
                        headers: {
                            'Accept': 'application/json', // eslint-disable-line quote-props
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token }),
                    })
                        .then(res => {
                            if (res.status === 200) {
                                this.props.loginUserSuccess(token);
                                this.setState({
                                    load: this.props.user.role == 'guide',
                                });

                            } else {
                                browserHistory.push('/home');

                            }
                        });

                }
            } else {
                this.setState({
                    load: this.props.user.role == 'guide',
                });
            }
        }

        render() {
            return (
                <div>
                    {this.state.load ? <Component {...this.props} /> : ""}
                </div>
            );

        }
    }

    GuideAuthenticatedComponent.propTypes = {
        isAuthenticated: React.PropTypes.bool,
        user: React.PropTypes.object,
    };

    return connect(mapStateToProps, mapDispatchToProps)(GuideAuthenticatedComponent);
}

