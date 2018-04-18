import {put} from '../../../utils/http';
import {REDUCERS_GROUP_PREFIX, ENDPOINT_CHANGE_EMAIL} from './constants';

const REDUCER_NAME = `${REDUCERS_GROUP_PREFIX}/change-email`;

const CHANGE_EMAIL_SUCCESS = `${REDUCER_NAME}/CHANGE_EMAIL_SUCCESS`;
const CHANGE_EMAIL_ERROR = `${REDUCER_NAME}/CHANGE_EMAIL_ERROR`;

const initState = {
    confirmed: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case CHANGE_EMAIL_SUCCESS:
            return {...state, confirmed: true, successMessage: action.message};
        case CHANGE_EMAIL_ERROR:
            return {...state, errorMessage: action.error};
        default:
            return state;
    }
};

export const confirmChangeEmail = token => {
    return dispatch => {
        put(`${ENDPOINT_CHANGE_EMAIL}/${token}`, null, null).then(response => {
            dispatch({type: CHANGE_EMAIL_SUCCESS, message: response.data.message});
        }).catch(response => {
            dispatch({type: CHANGE_EMAIL_ERROR, error: response.message});
        });
    }
};
