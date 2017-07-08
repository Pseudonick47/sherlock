import React from 'react';
import { Link } from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import PropTypes from 'prop-types';

import Comments from './Comments'
import SpecificTour from './SpecificTour';
import SpecificTourDialog from './Dialogs/SpecificTourDialog';

import * as authActions from '../actions/auth';
import * as tourActions from '../actions/data/tour';
import * as specificToursActions from '../actions/data/specificTours';

import { validateEmail } from '../utils/misc';

const actionCreators = Object.assign({}, authActions, tourActions, specificToursActions);

//TODO: Verovatno ne radi
function mapStateToProps(state) {
    return {
        commentIds: state.data.commentsByTour.data,
        tour: state.data.tour.data,
        isFetchingComments: state.data.commentsByTour.isFetching,
        isFetchingSpecificTours: state.data.specificTours.isFetching,
        isFetchingTour: state.data.tour.isFetching,
        //rating: state.auth.rating,
        specificTours: state.data.specificTours.data,
        user: state.auth.user,
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
            currentPhoto: 1,
            description: '',
            id: this.props.routeParams.id,
            images: [],
            isLigthboxOpen: false,
            locations: [],
            name: '',
            specificTourDialog: false,
            specificTours: [],
        };
    }

    componentWillMount() {
        const {fetchTour, fetchSpecificTours} = this.props;
        const id = this.props.routeParams.id;
        
        fetchTour(id);
        fetchSpecificTours(id);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.specificTours != nextProps.specificTours) {
            var specificTours = this.state.specificTours;
            nextProps.specificTours.forEach((tour) =>
                specificTours.push(
                    <SpecificTour
                        startDate={tour.startDate}
                        endDate={tour.endDate}
                        select={function () { }}
                        booked={false}
                        showButton={this.props.user ? true : false}
                    />
                )
            );

            this.setState({specificTours: specificTours});
        }

        if(!nextProps.isFetchingTour) {
            const { tour } = nextProps;

            var locationList = [];
            for (var loc in tour.locations) {
                locationList.push(
                    <li>
                        <Link to={"/location/" + tour.locations[loc].id}>
                            {tour.locations[loc].name}
                        </Link>
                    </li>
                );
            }

            this.setState({
                description: tour.description,
                images: tour.images,
                locations: locationList,
                name: tour.name,
            })
        }
    }

    openLightbox = (index, event) => {
        event.preventDefault();
        this.setState({ isLigthboxOpen: true, currentPhoto: index });
    }

    closeLightbox = () => this.setState({ isLigthboxOpen: false });

    nextPhoto = () => this.setState({ currentPhoto: this.state.currentPhoto + 1 });

    prevPhoto = () => this.setState({ currentPhoto: this.state.currentPhoto - 1 });

    onSpecificTourCancel = () => this.setState({ specificTourDialog: false });
    
    onSpecificTourSubmit = (term) => {
        const { specificTours } = this.state;

        specificTours.push(
            <SpecificTour
                startDate={term.startDate.toLocaleString()}
                endDate={term.endDate.toLocaleString()}
                select={function () { }}
                booked={false}
                showButton={this.props.user ? true : false}
            />
        );

        this.setState({ specificTourDialog: false });
        this.props.insertSpecificTour({
            startDate: term.startDate,
            endDate: term.endDate,
            tourId: this.state.id,
        });
    }


    render() {

        const style = {
            margin: 12,
        };
        

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>{this.props.isFetchingTour ? "Loading tour data..." : this.state.name}</h1>
                        <Divider />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-7">
                        <h2>Description:</h2>
                        <p>{this.state.description}</p>
                        <Divider />
                        <h3>Locations:</h3>
                        <ul>{this.state.locations}</ul>
                        {this.props.user ?
                            <div>
                                <Divider />
                                {this.props.isFetchingSpecificTours ? "Loading specific tours..." : this.state.specificTours}
                            </div>
                            : ""}
                        {this.props.user ? this.props.user.role == "guide" ?
                            <RaisedButton label="Add new term" primary={true} style={style} onTouchTap={() => this.setState({ specificTourDialog: true })} />
                            : "" : ""}
                        <Divider />
                        <RaisedButton label="Rate" style={style} />
                        {(this.props.user && (this.props.user.role == 'guide')) ? <RaisedButton label="Guide this tour" primary={true} style={style} /> : null}
                        <RaisedButton label="Comment" secondary={true} style={style} />
                        <Divider />
                        <h3>Comments</h3>
                        {this.props.isFetchingComments ? "Loading comments..." : <Comments ids={this.props.commentIds} />}

                    </div>
                    {this.props.isFetchingTour ? "" :
                        <div className="col-md-4 col-md-offset-1">
                            <Gallery photos={this.state.images} onClickPhoto={this.openLightbox} />
                            <Lightbox
                                images={this.state.images}
                                isOpen={this.state.isLigthboxOpen}
                                onClose={this.closeLightbox}
                                onClickNext={this.nextPhoto}
                                onClickPrev={this.prevPhoto}
                                currentImage={this.state.currentPhoto}
                            />
                        </div>
                    }
                </div >
                {this.state.specificTourDialog ?
                    <SpecificTourDialog cancel={this.onSpecificTourCancel} submit={this.onSpecificTourSubmit} />
                    : ""}
            </div >
        );

    }
}

SingleTour.PropTypes = {
    insertSpecificTour: React.PropTypes.func,
    isFetchingComments: React.PropTypes.bool,
    isFetchingSpecificTours: React.PropTypes.bool,
    isFetchingTour: React.PropTypes.bool,
    fetchSpecificTours: React.PropTypes.func,
    fetchTour: React.PropTypes.func,
    user: React.PropTypes.object,
    //rating: React.PropTypes.number,
    commentIds: React.PropTypes.array,
    specificTours: React.PropTypes.array,
}