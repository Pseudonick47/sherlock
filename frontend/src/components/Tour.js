import React from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Paper from 'material-ui/Paper';

import * as actionCreators from '../actions/auth';


function mapStateToProps(state) {
    return {
        user: state.auth.user,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const style = {
    padding: 20,
    paddingTop: 0,
    margin: 10,
    height: 410,
    width: 300,
    marginRight: "auto",
    marginBottom: 20,
    overflow: 'hidden',
    position: "relative",
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Tour extends React.Component {

    render() {

        var locations = [];
        for (var loc in this.props.data.locations) {
          locations.push(
              <text>{this.props.data.locations[loc].name + ", "}</text>
          );
        }

        return (
            <Paper style={style}>
                {/*id: <h2>{this.props.data.id}</h2>*/}
                <Link to={'/tour/' + this.props.data.id}><h3>{this.props.data.name}</h3></Link>
                <p>{this.props.data.description.substring(0, 100) + "..."}</p>
                {locations.length > 0 ?
                  <div>
                    <b>Locations:  </b>
                    {locations}
                  </div>
                : null }
                <div style={{ height: 30, position: "absolute", bottom: 30, }} >
                    <h3>{this.props.data.guide_fee} $</h3>
                </div>
                <img style={{maxHeigth: 70, maxWidth: "100%"}} src={this.props.data.thumbnail.src} />
            </Paper>
        );
    }
}

Tour.PropTypes = {
    data: React.PropTypes.object,
    user: React.PropTypes.object,
}
