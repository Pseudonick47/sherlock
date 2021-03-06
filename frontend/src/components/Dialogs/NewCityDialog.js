import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import FileUpload from '../FileUpload';

import * as actionCreators from '../../actions/data/cities';

import './styles.scss'


function mapStateToProps(state) {
    return {
        id: state.data.cities.id,
        insertError: state.data.cities.insertError,
        insertErrorMessage: state.data.cities.insertErrorMessage,
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
            imageUrl: 'https://images.vexels.com/media/users/3/128414/isolated/lists/4532b23a286c2d6637b4ba65398360fd-philadelphia-city-skyline-silhouette.png',
            name: '',
            nameErrorMessage: '',
            open: false,
            uploadDialogOpen: false,
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
                nameErrorMessage: 'Name is required!',
                name: null,
            });
        } 
        else {
            const {country} = this.props;

            this.props.insertCity(name, country.id);

            if (this.props.insertError) {
                this.setState({
                    nameErrorMessage: this.props.insertErrorMessage
                });
            }
        }
    };

    nameChanged = (event, value) => {
        if (this.state.nameError != '') {
            this.setState({
                name: value,
                nameErrorMessage: ''
            });
        } 
        else {
            this.setState({
                name: value,
            });
        }
    }

    setImage = (images) => {
        this.setState({
            uploadDialogOpen: false,
            imageUrl: images[0].src,
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
                    hintText="City name"
                    errorText={this.state.nameErrorMessage}
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
    id: React.PropTypes.number,
    insertCity: React.PropTypes.func,
    insertError: React.PropTypes.bool,
    insertErrorMessage: React.PropTypes.string,
};
