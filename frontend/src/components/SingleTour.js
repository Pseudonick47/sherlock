/* eslint camelcase: 0, no-underscore-dangle: 0 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actionCreators from '../actions/auth';
import { validateEmail } from '../utils/misc';
import Comments from './Comments'
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import RaisedButton from 'material-ui/RaisedButton';
import SpecificTourDialog from './Dialogs/SpecificTourDialog';


function mapStateToProps(state) {
    return {
        name: state.auth.name,
        description: state.auth.description,
        locations: state.auth.locations,
        photos: state.auth.photos,
      user: {
        email: state.auth.email,
        first_name: state.auth.first_name,
        surname: state.auth.surname,
        biography: state.auth.biography,
        dateOfBirth: state.auth.dateOfBirth,
        role: state.auth.role,
        image: state.auth.image,
        id: state.auth.id,
        },
        rating: state.auth.rating,
        commentIds: state.auth.commentIds,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class SingleTour extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.routeParams.id,
            isLigthboxOpen: false,
            currentPhoto: 1,
            specificTourDialog: false,
        };
    }

    componentWillMount() {
        this.props.getTour(this.props.routeParams.id,);
    }

    openLightbox = (index, event) => {
        event.preventDefault();
        this.setState({ isLigthboxOpen: true, currentPhoto: index });
    }
    closeLightbox = () => this.setState({ isLigthboxOpen: false });
    nextPhoto = () => this.setState({ currentPhoto: this.state.currentPhoto + 1 });
    prevPhoto = () => this.setState({ currentPhoto: this.state.currentPhoto - 1 });

    onSpecificTourCancel = () => this.setState({specificTourDialog: false});
    onSpecificTourSubmit = (term) => {
        console.log(term);
        this.setState({specificTourDialog: false});
    }

    render() {
        const style = {
            margin: 12,
        };
        var locationList = [];
        for (var loc in this.props.locations) {
          locationList.push(<li><Link to={"/location/" + this.props.locations[loc].id}>{this.props.locations[loc].name}</Link></li>);
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>{this.props.name}</h1>
                        <Divider />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-7">
                        <h2>Description:</h2>
                        <p>{this.props.description}</p>
                        <Divider />
                        <h3>Locations:</h3>
                        <ul>
                          {locationList}
                        </ul>
                        <Divider />
                        <RaisedButton label="Rate" style={style} />
                        {this.props.user ? this.props.user.role == "guide" ?
                          <RaisedButton
                            label="Add new term"
                            primary={true} style={style}
                            onTouchTap={() => this.setState({specificTourDialog: true})}
                          />
                        : null : null }
                        <RaisedButton label="Comment" secondary={true} style={style} />
                        <Divider />
                        <h3>Comments</h3>
                        <Comments id={this.state.id} />
                    </div>
                    <div className="col-md-4 col-md-offset-1">
                        <Gallery photos={this.props.photos}onClickPhoto={this.openLightbox} />
                        <Lightbox
                            images={this.props.photos}
                            isOpen={this.state.isLigthboxOpen}
                            onClose={this.closeLightbox}
                            onClickNext={this.nextPhoto}
                            onClickPrev={this.prevPhoto}
                            currentImage={this.state.currentPhoto}
                        />
                    </div>
                </div>
                {this.state.specificTourDialog ?
                    <SpecificTourDialog cancel={this.onSpecificTourCancel} submit={this.onSpecificTourSubmit} />
                : ""}
            </div>
        );

    }
}
