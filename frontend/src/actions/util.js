import {
    FILE_UPLOAD_FAILED,
    FILE_UPLOAD_REQUEST,
    FILE_UPLOAD_SUCCEEDED,
} from '../constants/index';

import { parseJSON } from '../utils/misc';

import { 
    upload_file,
} from '../utils/http_functions';

export function fileUploadFailed(message) {
    return {
        type: FILE_UPLOAD_FAILED,
        payload: message,
    };
}

export function fileUploadRequest() {
    return {
        type: FILE_UPLOAD_REQUEST,
    }
}

export function fileUploadSuccess(ids) {
    return {
        type: FILE_UPLOAD_SUCCEEDED,
        payload: ids,
    };
}

export function fileUpload(fileList, callback) { 
    return (dispatch) => {
        dispatch(fileUploadRequest());
        upload_file(fileList)    
            .then(parseJSON)
            .then(callback)
            .then(data => dispatch(fileUploadSuccess(data)))
            .catch(error => {
                alert('Error uploading file!')
            });
    };
}