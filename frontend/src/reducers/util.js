import { 
    FILE_UPLOAD_FAILED,
    FILE_UPLOAD_REQUEST,
    FILE_UPLOAD_SUCCEEDED,

} from '../constants';

import { createReducer } from '../utils/misc';

const initialState = {
    data: [],
    isUploading: false,
    uploadError: false,
    uploadErrorMessage: null,
};

export default createReducer(initialState, {    
    [FILE_UPLOAD_FAILED]: (state, payload) =>
        Object.assign({}, state, {
            isUploading: false,
            uploadError: true,
            uploadErrorMessage: payload,
        }),
    [FILE_UPLOAD_REQUEST]: (state) =>
        Object.assign({}, state, {
            isUploading: true,
        }),
    [FILE_UPLOAD_SUCCEEDED]: (state, payload) =>
        Object.assign({}, state, {
            data: payload,
            isUploading: false,
        }),
});
