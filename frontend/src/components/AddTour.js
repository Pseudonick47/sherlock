import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import NumberInput from 'material-ui-number-input';
import Divider from 'material-ui/Divider';

export default class AddTour extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            stepIndex: 0,
            locations: [],
        };
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
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

    getStepContent(stepIndex) {
        switch (stepIndex) {
        case 0:
            return (
                <div>
                    <TextField 
                        hintText="Name"
                        fullWidth
                    />
                    <TextField 
                        hintText="Description"
                        fullWidth
                        multiLine
                        rows={3}
                        rowsMax={10}
                    />
                    <NumberInput 
                        hintText="Your fee"
                        strategy="warn"
                        defaultValue={0}
                        min={0}
                    />
                </div>
            );
        case 1:
            return (
                <div>
                    <List>
                        {this.getLocations()}
                    </List>
                    <RaisedButton
                        label="Add location"
                    />
                </div>
            );
        case 2:
            return (<div>TODO</div>);
        default:
            return 'You\'re a long way from home sonny jim!';
        }
    }

    render() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};

        return (
            <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
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
                </Stepper>
                <div style={contentStyle}>
                    {finished ? (
                        <p>
                            <a
                                href="#"
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.setState({
                                        stepIndex: 0, 
                                        finished: false
                                    });
                                }}
                            >
                                Click here
                            </a> 
                            to reset the example.
                        </p>
                    ) : (
                        <div>
                            <p>{this.getStepContent(stepIndex)}</p>
                            <div style={{marginTop: 12}}>
                                <FlatButton
                                    label="Back"
                                    disabled={stepIndex === 0}
                                    onTouchTap={this.handlePrev}
                                    style={{marginRight: 12}}
                                />
                                <RaisedButton
                                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                                    primary={true}
                                    onTouchTap={this.handleNext}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}