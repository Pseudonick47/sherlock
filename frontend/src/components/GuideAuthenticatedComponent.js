import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as actionCreators from '../actions/auth';

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        userName: state.auth.userName,
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


export function requireGuideAuthentication(Component) {
    class GuideAuthenticatedComponent extends React.Component {
        componentWillMount() {
            this.checkAuth();
        }

        checkAuth(props = this.props) {
            alert('pizda materina');
            if (props.isAuthenticated) {
                alert(JSON.stringify(user));
                this.setState({
                    is_guide: props.user.role == 'guide',
                });
            }
        }

        render() {
            return (
                <div>
                    {this.props.isAuthenticated && this.state.is_guide
                        ? <Component {...this.props} />
                        : <h1>nisi gajd</h1>
                    }
                </div>
            );

        }
    }

    GuideAuthenticatedComponent.propTypes = {
        loginUserSuccess: React.PropTypes.func,
        isAuthenticated: React.PropTypes.bool,
    };

    return connect(mapStateToProps, mapDispatchToProps)(GuideAuthenticatedComponent);
}
