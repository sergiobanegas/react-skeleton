import {LOCATION_CHANGE} from 'react-router-redux';

import {isUserLogged} from '../../../utils/user-info';
import {post} from '../../../utils/http';
import {REDUCERS_GROUP_PREFIX, ENDPOINT_LOGOUT, ENDPOINT_SIGN_IN} from './constants';
import {updateLocaleData} from '../locale';
import {addErrorToast, addInfoToast} from '../../../utils/notifications';

const REDUCER_NAME = `${REDUCERS_GROUP_PREFIX}/session`;

export const LOGOUT = `${REDUCER_NAME}/LOGOUT`;
const SIGN_IN_SUCCESS = `${REDUCER_NAME}/SIGN_IN_SUCCESS`;
const SIGN_IN_ERROR = `${REDUCER_NAME}/SIGN_IN_ERROR`;
const SET_SIGN_IN_FORM_FIELD = `${REDUCER_NAME}/SET_SIGN_IN_FORM_FIELD`;
const COMPLETED_SIGN_IN_FORM = `${REDUCER_NAME}/COMPLETED_SIGN_IN_FORM`;
const INCOMPLETE_SIGN_IN_FORM = `${REDUCER_NAME}/INCOMPLETE_SIGN_IN_FORM`;

const initState = {
    formData: {
        email: '',
        password: '',
        remember: false
    },
    message: '',
    errorMessage: null,
    logged: isUserLogged(),
    incompleteForm: true,
    errors: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
            return {...state, errorMessage: null, logged: true, errors: []};
        case SIGN_IN_ERROR:
            return {...state, errorMessage: action.error, logged: false, errors: action.errors};
        case LOGOUT:
            return {...state, errorMessage: null, logged: false};
        case SET_SIGN_IN_FORM_FIELD:
            return {...state, formData: {...state.formData, [action.field]: action.value}};
        case COMPLETED_SIGN_IN_FORM:
            return {...state, incompleteForm: false};
        case INCOMPLETE_SIGN_IN_FORM:
            return {...state, incompleteForm: true};
        case LOCATION_CHANGE:
        default:
            return {...initState, logged: isUserLogged()};
    }
};

export const signIn = credentials => {
    return dispatch => {
        post(ENDPOINT_SIGN_IN, credentials, null).then(response => {
            dispatch(updateLocaleData());
            dispatch({type: SIGN_IN_SUCCESS});
            addInfoToast(response.data.message);
        }).catch(response => {
            dispatch({type: SIGN_IN_ERROR, error: response.message});
            addErrorToast(response.message);
        });
    }
};

export const setSignInFormFieldValue = (field, value) => {
    return (dispatch, getState) => {
        dispatch({type: SET_SIGN_IN_FORM_FIELD, field: field, value: value});
        const {formData} = getState().authReducers.sessionReducer;
        const completed = formData.email && formData.password;
        completed ? dispatch({type: COMPLETED_SIGN_IN_FORM}) : dispatch({type: INCOMPLETE_SIGN_IN_FORM});
    }
};

export const logout = () => {
    return dispatch => {
        post(ENDPOINT_LOGOUT).then(response => {
            dispatch({type: LOGOUT});
            dispatch(updateLocaleData());
            addInfoToast(response.data.message);
        }).catch(() => {
            dispatch({type: LOGOUT});
        });
    }
};
