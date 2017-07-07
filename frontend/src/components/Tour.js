import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import * as actionCreators from '../actions/auth';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

function mapStateToProps(state) {
    return {
        user: state.auth.user,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Tour extends Component {

    render() {
        const style = {
           padding: 20,
           margin: 10,
           height: 300,
           width: 300,  /* Or whatever */
           marginRight: "auto",
           marginBottom: 20,
           overflow: 'hidden',
           position: "relative",
        };
        function klik(tourId){
          browserHistory.push('/tour/3');
        }
        var locations = [];
        for (var loc in this.props.data.locations) {
          locations.push(
            <li>
              <Link to={"/location/" + this.props.data.locations[loc].id}>{this.props.data.locations[loc].name}</Link>
            </li>
          );
        }

        return (
            <Paper style={style}>
                {/*id: <h2>{this.props.data.id}</h2>*/}
                <Link to={'/tour/' + this.props.data.id}><h3>{this.props.data.name}</h3></Link>
                <p>{this.props.data.description.substring(0, 100) + "..."}</p>
                <b>Locations:</b>
                <ul>
                    {locations}
                </ul>
                <div style={{ height: 30, position: "absolute", bottom: 30, }} >
                    <h3>{this.props.data.guide_fee} $</h3>
                </div>
                {this.props.user ? (this.props.user.role == 'guide' ? <h2>'hotdog'</h2> : <h2>no hotdog</h2>) : null}
            </Paper>
        );
    }
}
