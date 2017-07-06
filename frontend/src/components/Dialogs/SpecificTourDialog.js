import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';


export default class SpecificTourDialog extends React.Component {

    constructor() {
        super();

        this.state = {
            open: false,
            endDateDisabled: true,
            minStartDate: new Date(),
            minEndDate: new Date(),
            startDate: null,
            endDate: null,
            submitDisabled: true,
        };
    };

    componentWillMount() {
        this.setState({open: true});
    }

    componentWillUnmount() {
        this.setState({open: false});
    }

    handleCancel = () => {
        this.props.cancel();
    };

    handleSubmit = () => {
        const {startDate, endDate} = this.state;
        this.props.submit({startDate, endDate});
    };

    onStartDateChanged = (event, date) => this.setState({
        startDate: date, 
        minEndDate: date, 
        endDateDisabled: false
    });

    onEndDateChanged = (event, date) => this.setState({
        endDate: date,
        submitDisabled: false,
    })

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                secondary
                keyboardFocused
                onTouchTap={this.handleCancel}
            />,
            <FlatButton
                label="Submit"
                primary
                onTouchTap={this.handleSubmit}
                disabled={this.state.submitDisabled}
            />,
        ];

        return (
            <Dialog
                title="Create new term"
                actions={actions}
                modal
                open={this.state.open}
            >
                <DatePicker 
                    hintText="Start Date" 
                    container="inline" 
                    mode="landscape" 
                    minDate={this.state.minStartDate}
                    onChange={this.onStartDateChanged}
                />
                <DatePicker 
                    hintText="End Date" 
                    container="inline" 
                    mode="landscape"
                    minDate={this.state.minEndDate}
                    disabled={this.state.endDateDisabled}
                    onChange={this.onEndDateChanged}
                />
            </Dialog>
        );
    };
}
