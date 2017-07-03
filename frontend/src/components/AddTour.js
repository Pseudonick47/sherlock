import React from 'react';
import {browserHistory} from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Step, Stepper, StepLabel} from 'material-ui/Stepper';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import NumberInput from 'material-ui-number-input';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Locations from './Locations';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import PropTypes from 'prop-types';
import AddLocations from './Dialogs/AddLocations';
import FileUpload from './FileUpload';
import Dialog from 'material-ui/Dialog';

import * as actionCreators from '../actions/data'

function mapStateToProps(state) {
    return {
        insertError: state.data.insertError,
        message: state.data.message,
        id: state.data.tourId,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AddTour extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            titleError: null,
            description: '',
            finished: false,
            stepIndex: 0,
            locations: [],
            locationsError: 'To add some locations click on the button below..',
            locationDisplay: [],
            isLigthboxOpen: false,
            currentPhoto: 1,
            addLocationsDialogOpen: false,
            photos: [],
            thumbnail: null,
            uploadDialogOpen: false,
            thumbnailDialogOpen: false,
            fee: 0,
        };
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.tourId != nextProps.tourId) {
            browserHistory.push('/tour/'.concat(nextProps.tourId.toString()));
        }
    }

    handleNext = () => {
        const {stepIndex, title, locations} = this.state;
        if (stepIndex === 0) {
            if (title != '') {
                this.setState({
                    stepIndex: stepIndex + 1,
                    finished: false,
                });
            }
            else {
                this.setState({titleError: 'Tour title is required!'});
            }
        }
        /*else if (stepIndex === 1) {
            if (locations.length == 0) {
                this.setState({locationsError: <font color="red">At least one location should be added!</font>});
            } else {
                this.setState({
                    stepIndex: stepIndex + 1,
                    finished: false,
                });
            }
        }*/
        else if (stepIndex === 3) {
            this.setState({finished: true});
        }
        else {
            this.setState({
                stepIndex: stepIndex + 1,
                finished: false,
            });
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    getLocations() {
        var locations = [];
        this.state.locations.forEach(function(e) {
            locations.push(
                <ListItem>
                    <h3>{e.name}</h3>
                </ListItem>
            );
        });
    }

    openLightbox = (index, event) => {
        event.preventDefault();
        this.setState({ isLigthboxOpen: true, currentPhoto: index });
    }

    closeLightbox = () => this.setState({ 
        isLigthboxOpen: false 
    });
    
    nextPhoto = () => this.setState({ 
        currentPhoto: this.state.currentPhoto + 1 
    });
    
    prevPhoto = () => this.setState({ 
        currentPhoto: this.state.currentPhoto - 1 
    });

    onAddLocationsCancel = () => this.setState({addLocationsDialogOpen: false});
    onAddLocationsSubmit = (locations) => {
        var locs = this.state.locations;
        locations.forEach((e) => locs.push(e))
        this.setState({
            locations: locs,
            addLocationsDialogOpen: false
        });
    }
    thumbnailUploaded = (images) => this.setState({
        thumbnail: images[0],
        thumbnailDialogOpen: false,
    });

    imagesUploaded = (images) => {
        var photos = this.state.photos;
        images.forEach((image) => photos.push(image));
        this.setState({photos: photos, uploadDialogOpen: false});
    }

    sumPrice() {
        var sum = 0.0;
        this.state.locations.forEach((location) => sum+=location.price);
        sum += this.state.fee;
        return sum;
    }

    feeChanged = (value) => this.setState({fee: value});

    onCancel = () => this.setState({finished: false});

    onSubmit = () => {
        this.setState({finished: false});

        const {title, description, locations, photos, thumbnail, fee} = this.state;

        var locationIds = [];
        locations.forEach((e) => locationIds.push(e.id));
        var photoIds = [];
        photos.forEach((e) => photoIds.push(e.id));

        const tour = {
            name: title,
            description: description,
            locations: locationIds,
            guide_fee: fee,
            images: photoIds,
            thumbnail: thumbnail.id,
        }

        console.log(tour);
        this.props.insertTour(title, description, fee, locationIds, thumbnail.id, photoIds);
    }

    onTitleChanged = (event, value) => {
        if (value != '') {
            this.setState({title: value,titleError: ''});
        }
        else {
            this.setState({title: '', titleError: 'Tour title is required!'});
        }
        
    }

    onDescriptionChanged = (event, value) => this.setState({
        description: value,
    })

    getStepContent(stepIndex) {
        switch (stepIndex) {
        case 0:
            return (
                <div>
                    <h2 style={{textAlign: "center", padding: 30}}>Let's travel somewhere! Where should we go?</h2>
                    <div className="containerImage">
                        <img 
                            src={this.state.thumbnail ? this.state.thumbnail.src : "http://st2.depositphotos.com/2951317/6909/v/950/depositphotos_69095081-stock-illustration-travel-outline-icons-set.jpg"} 
                            className="image" />
                        <div className="middle">
                            <RaisedButton 
                                label="Upload" 
                                onTouchTap={() => this.setState({thumbnailDialogOpen: true})}
                            />
                        </div>
                    </div>
                    <p style={{marginTop: 40, padding: 10, textAlign: "center"}}>
                        It is important to choose a good title and a good thumbnail photo, because that is what people see first. Choose wisely!
                    </p>
                    <TextField 
                        hintText="Title"
                        fullWidth
                        style={{marginTop: 20}}
                        value={this.state.title}
                        errorText={this.state.titleError}
                        onChange={this.onTitleChanged}
                    />
                    <p style={{marginTop: 40, padding: 10, textAlign: "center"}}>
                        Now let's describe what you want to accomplish by organizing this tour, what can tourists expect from participating.
                        Express your passion and devotion and people will be interested in what you have to show them.
                    </p>
                    <TextField 
                        hintText="Description"
                        value={this.state.description}
                        fullWidth
                        multiLine
                        rows={4}
                        rowsMax={10}
                        style={{marginBottom: 20}}
                        onChange={this.onDescriptionChanged}
                    />
                    {this.state.thumbnailDialogOpen ?
                        <Dialog
                            title="Upload images"
                            actions={
                                <FlatButton 
                                    label="Cancel"
                                    onTouchTap={() => this.setState({thumbnailDialogOpen: false})}
                                />
                            }
                            open
                        >
                            <FileUpload callback={this.thumbnailUploaded}/>
                        </Dialog>
                    : ""}
                </div>
            );
        case 1:
            return (
                <div>
                    <h2 style={{textAlign: "center", padding: 30}}>Locations that you are going to take tourists to!</h2>
                    <p style={{textAlign: "center", padding: 10}}>Add some places that you feel that are important for travelers to visit.</p>
                    <Divider />
                    {this.state.locations.length ? "" : 
                        <h4 style={{padding: 10}} >{this.state.locationsError}</h4>
                    }
                    <Locations 
                        data={this.state.locations} 
                        select={function(){}} 
                        deselect={function(){}}
                    />
                    <Divider />
                    <FlatButton
                        style={{margin: "10 0 15 20"}}
                        label="Add locations"
                        onTouchTap={() => this.setState({addLocationsDialogOpen: true})}
                    />
                    {this.state.addLocationsDialogOpen ?
                        <AddLocations
                            cancel={this.onAddLocationsCancel}
                            submit={this.onAddLocationsSubmit}
                        />
                    : "" }
                </div>
            );
        case 2:
            return (
                <div>
                    <div style={{marginTop: 20, marginBottom: 20}}>
                        <Gallery 
                            photos={this.state.photos}
                            onClickPhoto={this.openLightbox}
                        />
                    </div>
                    <Lightbox
                        images={this.state.photos}
                        isOpen={this.state.isLigthboxOpen}
                        onClose={this.closeLightbox}
                        onClickNext={this.nextPhoto}
                        onClickPrev={this.prevPhoto}
                        currentImage={this.state.currentPhoto}
                    />
                    <Divider />
                    <FlatButton
                        style={{margin: "10 0 15 20"}}
                        label="Upload photos"
                        onTouchTap={() => this.setState({uploadDialogOpen: true})}
                    />
                    {this.state.uploadDialogOpen ?
                        <Dialog
                            title="Upload images"
                            actions={
                                <FlatButton 
                                    label="Cancel"
                                    onTouchTap={() => this.setState({uploadDialogOpen: false})}
                                />
                            }
                            open
                        >
                            <FileUpload callback={this.imagesUploaded}/>
                        </Dialog>
                    : ""}
                </div>
            );
        case 3:
            return (
                <div>
                    <p style={{marginRight: 10}}>Your fee is</p>
                    <NumberInput 
                        hintText="Your fee"
                        strategy="warn"
                        min={0}
                        defaultValue={0}
                        onValid={this.feeChanged}
                        onChange={(event, value) => {
                            if(value == '') {
                                this.setState({fee: 0});
                            } 
                        }}
                    />

                    <p>Total price is {this.sumPrice()} $.</p>
                </div>
            );
        default:
            return 'You\'re a long way from home sonny jim!';
        }
    }

    render() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px', padding: 10};

        return (
            <Paper>
                <Stepper activeStep={stepIndex}>
                    <Step>
                        <StepLabel>Tour information</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Locations</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Images</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Pricing</StepLabel>
                    </Step>
                </Stepper>
                <div style={contentStyle}>
                    {finished ? (
                        <Dialog
                            title={"Create new tour"}
                            actions={[
                                <FlatButton
                                    label="Cancel"
                                    onTouchTap={this.onCancel}
                                    secondary
                                />,
                                <FlatButton
                                    label="Submit"
                                    onTouchTap={this.onSubmit}
                                    primary
                                />
                            ]}
                            open
                        >
                            <p style={{padding: 5}}>Have you check all the information about your tour? If everything is alright click submit button.</p>
                        </Dialog>
                    ) : (
                        <div>
                            <div>{this.getStepContent(stepIndex)}</div>
                            <Divider />
                            <div style={{marginTop: 12}}>
                                <FlatButton
                                    label="Back"
                                    disabled={stepIndex === 0}
                                    onTouchTap={this.handlePrev}
                                    style={{marginRight: 12}}
                                />
                                <RaisedButton
                                    label={stepIndex === 3 ? 'Finish' : 'Next'}
                                    primary={true}
                                    onTouchTap={this.handleNext}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </Paper>
        );
    }
}

AddTour.propTypes = {
    insertTour: React.PropTypes.func,
    insertError: React.PropTypes.bool,
    message: React.PropTypes.string,
    id: React.PropTypes.number,
};