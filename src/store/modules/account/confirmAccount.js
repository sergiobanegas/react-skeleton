import {LOCATION_CHANGE} from 'react-router-redux';

import {post} from '../../../utils/http';
import {REDUCERS_GROUP_PREFIX, ENDPOINT_CONFIRM_ACCOUNT} from './constants';

const REDUCER_NAME = `${REDUCERS_GROUP_PREFIX}/confirm`;

const CONFIRM_SUCCESS = `${REDUCER_NAME}/CONFIRM_ACCOUNT_SUCCESS`;
const CONFIRM_ACCOUNT_ERROR = `${REDUCER_NAME}/CONFIRM_ACCOUNT_ERROR`;

const initState = {
    confirmed: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case CONFIRM_SUCCESS:
            return {...state, confirmed: true, successMessage: action.message};
        case CONFIRM_ACCOUNT_ERROR:
            return {...state, errorMessage: action.error};
        case LOCATION_CHANGE:
            return initState;
        default:
            return state
    }
};

export const confirmAccount = token => {
    return dispatch => {
        post(`${ENDPOINT_CONFIRM_ACCOUNT}/${token}`, null, null).then(response => {
            dispatch({type: CONFIRM_SUCCESS, message: response.data.message});
        }).catch(response => {
            dispatch({type: CONFIRM_ACCOUNT_ERROR, error: response.message});
        });
    }
};
