import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import NumberInput from 'material-ui-number-input';

import FileUpload from '../FileUpload';

import * as actionCreators from '../../actions/data'

function mapStateToProps(state) {
    return {
        insertError: state.data.insertError,
        message: state.data.message,
        id: state.data.locationId,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class NewLocationDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name: '',
            nameError: '',
            description: '',
            price: 0.0,
            imageUrl: 'https://cdn2.iconfinder.com/data/icons/lightly-icons/30/location-map-480.png',
            uploadDialogOpen: false,
        };
    };

    componentWillMount() {
        this.setState({open: true});
    };

    componentWillReceiveProps(nextProps) {
        if(this.props.id != nextProps.id) {
            const {name, description, price} = this.state;
            const id = nextProps.id;
            this.props.submit({
                name, description, price, id,
            });
        }
    };

    componentWillUnmount() {
        this.setState({open: false});
    }

    handleCancel = () => {
        this.props.cancel();
    };

    handleSubmit = () => {
        const {name, description, price} = this.state;

        if(name.length === 0) {
            this.setState({
                name: null,
                nameError: 'Location name is required!',
            });
        } else {
            const {city, country} = this.props;

            this.props.insertLocation(name, description, city.id, country.id, price);

            if (this.props.insertError) {
                this.setState({location_name_error: this.props.message});
            }
        }
    };


    nameChanged = (event, value) => {
        if (this.state.nameError != '') {
            this.setState({
                name: value,
                nameError: ''
            });
        } else {
            this.setState({
                name: value,
            });
        }
    }

    descriptionChanged = (event, value) => {
        this.setState({
            description: value,
        });
    }

    priceChanged = (event, value) => {
        this.setState({
            price: parseFloat(value),
        });
    }

    setImage = (imageIds) => {
        var imageUrl = 'http://localhost:5000/api/images/'.concat(imageIds[0].toString())

        this.setState({
            uploadDialogOpen: false,
            imageUrl: imageUrl
        });
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                secondary
                onTouchTap={this.handleCancel}
            />,
            <FlatButton
                label="Submit"
                primary
                keyboardFocused
                onTouchTap={this.handleSubmit}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="New Location"
                    actions={actions}
                    modal
                    open={this.state.open}
                >
                    <div className="containerImage">
                        <img src={this.state.imageUrl} className="image" />
                        <div className="middle">
                            <RaisedButton 
                                label="Upload" 
                                onTouchTap={() => this.setState({uploadDialogOpen: true})}
                            />
                        </div>
                    </div>
                    <TextField
                        hintText="Location name"
                        errorText={this.state.nameError}
                        onChange={this.nameChanged}
                        fullWidth
                    />
                    <TextField
                        hintText="Description"
                        onChange={this.descriptionChanged}
                        rows={4}
                        rowsMax={10}
                        multiLine
                        fullWidth
                    />
                    <NumberInput
                        hintText="Price"
                        min={0}
                        strategy="warn"
                        onChange={this.priceChanged}
                    />
                    <Dialog
                        actions={[
                            <FlatButton 
                                label="Cancel"
                                onTouchTap={() => this.setState({uploadDialogOpen: false})}
                            />
                        ]}
                        open={this.state.uploadDialogOpen}
                    >
                        <FileUpload callback={this.setImage} />
                    </Dialog>
                </Dialog>
            </div>
        );
    };
}

NewLocationDialog.propTypes = {
    insertLocation: React.PropTypes.func,
    insertError: React.PropTypes.bool,
    message: React.PropTypes.string,
};
