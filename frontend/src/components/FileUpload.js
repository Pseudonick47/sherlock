/* eslint camelcase: 0, no-underscore-dangle: 0 */

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dropzone from 'react-dropzone';
import FontIcon from 'material-ui/FontIcon';
import { blue500, red500, greenA200 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import * as actionCreators from '../actions/data'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
    return {
        isUploaded: state.data.isUploaded,
        imageIds: state.data.imageIds,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filesPreview: [],
            filesToBeSent: [],
            printcount: 10,
        };
    }

    onDrop(acceptedFiles, rejectedFiles) {
        var filesToBeSent = [];
        filesToBeSent.push(acceptedFiles[0]);
        this.setState({
            filesToBeSent: filesToBeSent,
        });
    }

    uploadFile() {
        this.props.fileUpload(this.state.filesToBeSent, this.props.callback);
    }    
    
    render() {

        return (
            <div className="App">
                <center>
                    <Dropzone onDrop={(files) => this.onDrop(files)}>
                        <div>Drop files here, or click to select files to upload.</div>
                    </Dropzone>
                    {/*<div>
                        Files to be printed are:
                        {this.state.filesPreview}
                    </div>*/}
                </center>
                <MuiThemeProvider>
                    <RaisedButton
                        label="Upload Files"
                        onClick={(e) => this.uploadFile(e)} />
                </MuiThemeProvider>
            </div>
        );
    }
}
