/* eslint camelcase: 0, no-underscore-dangle: 0 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/auth';
import { validateEmail } from '../utils/misc';
import Comments from './Comments'

import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import RaisedButton from 'material-ui/RaisedButton';


function mapStateToProps(state) {
    return {
        name: state.auth.name,
        description: state.auth.description,
        locations: state.auth.locations,
        photos: state.auth.photos,
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

    render() {
              
        const style = {
            margin: 12,
        };

        var locationList = [];        
        for (var i in this.props.locations) { 
            locationList.push(<a href={"/location/" + this.props.locations[i].id}>{this.props.locations[i].name}, </a>);
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
                        {locationList}
                        <Divider />
                        <RaisedButton label="Rate" style={style} />
                        <RaisedButton label="Book" primary={true} style={style} />
                        <RaisedButton label="Comment" secondary={true} style={style} />   
                        <Divider />
                        <h3>Comments</h3>
                        <Comments ids={this.props.commentIds} />

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
                        
                </div >
            </div >
        );

    }
}
