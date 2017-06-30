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
        var filesToBeSent = this.state.filesToBeSent;
        for (var f in acceptedFiles) {
            filesToBeSent.push(acceptedFiles[f]);            
        }
        this.setState({
            filesToBeSent: filesToBeSent,
        });
    }

    uploadFile() {
        this.props.fileUpload(this.state.filesToBeSent, this.props.callback);
    }    
    
    render() {

        const dropStyle = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 250,
            width: 250,
            margin: 5,
            padding: 10,
            border: "2px dashed #2323cf",
            borderRadius: 20,
        };

        const style = {

        }

        return (
            <div className="App">
                <Dropzone
                    style={dropStyle}
                    onDrop={(files) => this.onDrop(files)}
                >
                    <div style={{textAlign: "center",}}>Drop files here, or click to select files to upload.</div>
                </Dropzone>
                <MuiThemeProvider>
                    <RaisedButton
                        label="Upload Files"
                        style={{margin: 5,}}
                        onClick={(e) => this.uploadFile(e)} />
                </MuiThemeProvider>
            </div>
        );
    }
}