import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

export default class AddLocationDialog extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary
                keyboardFocused
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="Dialog With Actions"
                    actions={actions}
                    modal
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                <AutoComplete 
                    hintText="Country"
                    fullWidth
                    dataSource={[]}
                />
                <AutoComplete 
                    hintText="City"
                    dataSource={[]}
                />
                <FlatButton 
                    label="Add new city"
                />
                <Divider style={{ "margin-top": 10,}}/>
                <List>
                </List>
                </Dialog>
            </div>
        );
    }
}