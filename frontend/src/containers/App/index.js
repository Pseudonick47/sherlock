import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/* application components */
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

/* global styles for app */
import './styles/app.scss';
import * as actionCreators from '../../actions/components';


function mapStateToProps(state) {
    return {
        leftNavDisplayed: state.components.isDisplayed,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        children: React.PropTypes.node,
        leftNavDisplayed: React.PropTypes.bool,
        leftNavToggle: React.PropTypes.func,
    };

    onClick = () => {
        if(this.props.leftNavDisplayed) {
            this.props.leftNavToggle(false);
        }
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <section>
                    <Header />
                    <div
                      className="container"
                      style={{ marginTop: 10, paddingBottom: 250 }}
                      onClick={this.onClick}
                    >
                        {this.props.children}
                    </div>
                    <div>
                        <Footer />
                    </div>
                </section>
            </MuiThemeProvider>
        );
    }
}

export { App };
