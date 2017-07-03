import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'

export default class Test extends React.Component {

    constructor() {
        super();
        this.state = {
            open: false,
        }
    }

    componentWillMount() {
        alert("mountirng");
        this.setState({open: true});
    }

    componentWillUnmount() {
        alert("unmounting");
        this.setState({open: true});
    }

    handleCancel = () => {
        this.props.cancel();
    }

    handleSubmit = () => {
        this.props.submit();
    }

    render() {
        const actions = [
            <FlatButton 
                label="Cancel"
                onTouchTap={this.handleCancel}
            />,
            <FlatButton 
                label="Submit"
                onTouchTap={this.handleSubmit}
            />,
        ]

        return (
            <Dialog
                title="Test Dialog"
                open={this.state.open}
                actions={actions}
            >
                <p> Hello </p>
            </Dialog>
        );
    }
}