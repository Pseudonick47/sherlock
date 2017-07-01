import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import FileUpload from '../FileUpload';

import * as actionCreators from '../../actions/data'

import './styles.scss'

function mapStateToProps(state) {
    return {
        insertError: state.data.insertError,
        message: state.data.message,
        id: state.data.cityId,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class NewCityDialog extends React.Component {

    constructor() {
        super();

        this.state = {
            open: false,
            uploadDialogOpen: false,
            name: '',
            nameError: '',
            imageUrl: 'https://images.vexels.com/media/users/3/128414/isolated/lists/4532b23a286c2d6637b4ba65398360fd-philadelphia-city-skyline-silhouette.png',
        };
    };

    componentWillMount() {
        this.setState({open: true});
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.id != nextProps.id) {
            this.props.submit({
                name: this.state.name,
                id: nextProps.id,
            });
        }
    }

    componentWillUnmount() {
        this.setState({open: false});
    }

    handleCancel = () => {
        this.props.cancel();
    };

    handleSubmit = () => {
        const {name} = this.state;

        if (name.length === 0) {
            this.setState({
                nameError: 'Name is required!',
                name: null,
            });
        } 
        else {
            const {country} = this.props;

            this.props.insertCity(name, country.id);

            if (this.props.insertError) {
                this.setState({nameError: this.props.message});
            }
        }
    };

    nameChanged = (event, value) => {
        if (this.state.nameError != '') {
            this.setState({
                name: value,
                nameError: ''
            });
        } 
        else {
            this.setState({
                name: value,
            });
        }
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
                title="Add New City"
                actions={actions}
                modal
                open={this.state.open}
            >
                <div className="container">
                    <img src={this.state.imageUrl} className="image" />
                    <div className="middle">
                        <RaisedButton 
                            label="Upload" 
                            onTouchTap={() => this.setState({uploadDialogOpen: true})}
                        />
                    </div>
                </div>
                <TextField
                    hintText="City name"
                    errorText={this.state.nameError}
                    onChange={this.nameChanged}
                    fullWidth
                />

            </Dialog>
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
            </div>
        );
    };
}

NewCityDialog.propTypes = {
    insertCity: React.PropTypes.func,
    insertError: React.PropTypes.bool,
    message: React.PropTypes.string,
};
