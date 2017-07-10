/* eslint camelcase: 0, no-underscore-dangle: 0 */

import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { blue500, red500, greenA200 } from 'material-ui/styles/colors';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import Dropzone from 'react-dropzone';

import * as actionCreators from '../actions/util'


function mapStateToProps(state) {
    return {
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
            printCount: 10,
        };
    }

    onDrop(acceptedFiles, rejectedFiles) {
        var filesToBeSent = [];
        filesToBeSent.push(acceptedFiles[0]);
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

FileUpload.PropTypes = {
    fileUpload: React.PropTypes.func,
}
