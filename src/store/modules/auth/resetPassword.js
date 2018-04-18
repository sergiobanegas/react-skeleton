import {LOCATION_CHANGE} from 'react-router-redux';

import {post} from '../../../utils/http';
import {REDUCERS_GROUP_PREFIX, ENDPOINT_RESET_PASSWORD} from './constants';

const REDUCER_NAME = `${REDUCERS_GROUP_PREFIX}/reset-password`;

const RESET_PASSWORD_REQUEST_SUCCESS = `${REDUCER_NAME}/RESET_PASSWORD_REQUEST_SUCCESS`;
const RESET_PASSWORD_REQUEST_ERROR = `${REDUCER_NAME}/RESET_PASSWORD_REQUEST_ERROR`;

const SET_EMAIL_FIELD = `${REDUCER_NAME}/SET_EMAIL_FIELD`;
const SET_PASSWORD_FIELD = `${REDUCER_NAME}/SET_PASSWORD_FIELD`;

const RESET_PASSWORD_SUCCESS = `${REDUCER_NAME}/RESET_PASSWORD_SUCCESS`;
const RESET_PASSWORD_ERROR = `${REDUCER_NAME}/RESET_PASSWORD_ERROR`;
const PASSWORDS_NOT_MATCHING = `${REDUCER_NAME}/PASSWORDS_NOT_MATCHING`;

const initState = {
    email: '',
    formData: {
        password: '',
        passwordConfirmation: ''
    },
    successMessage: null,
    errors: [],
    isRequestFormIncomplete: true,
    isPasswordFormIncomplete: true,
    errorMessage: null,
    passwordsNotMatching: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST_SUCCESS:
            return {...initState, successMessage: action.message};
        case RESET_PASSWORD_REQUEST_ERROR:
            return {...state, errors: action.errors, errorMessage: action.error};
        case SET_EMAIL_FIELD:
            return {...state, email: action.value, isRequestFormIncomplete: action.isRequestFormIncomplete};
        case SET_PASSWORD_FIELD:
            return {
                ...state,
                passwordsNotMatching: false,
                formData: {...state.formData, [action.field]: action.value},
                isPasswordFormIncomplete: action.isPasswordFormIncomplete,
            };
        case RESET_PASSWORD_SUCCESS:
            return {...initState, successMessage: action.message};
        case RESET_PASSWORD_ERROR:
            return {...state, errorMessage: action.error, errors: action.errors, passwordsNotMatching: false};
        case PASSWORDS_NOT_MATCHING:
            return {...state, passwordsNotMatching: true};
        case LOCATION_CHANGE:
            return initState;
        default:
            return state
    }
};

export const onChangeResetPasswordEmailField = value => {
    return {
        type: SET_EMAIL_FIELD,
        value: value,
        isRequestFormIncomplete: value === null || value === ''
    };
};

export const requestResetPassword = email => {
    const body = {
        email: email
    };
    return dispatch => {
        post(`${ENDPOINT_RESET_PASSWORD}`, body, null).then(response => {
            dispatch({type: RESET_PASSWORD_REQUEST_SUCCESS, message: response.data.message});
        }).catch(response => {
            dispatch({type: RESET_PASSWORD_REQUEST_ERROR, error: response.message, errors: response.errors});
        });
    }
};

export const onChangeResetPasswordPasswordField = (field, value) => {
    return (dispatch, getState) => {
        const formData = getState().accountReducers.resetPasswordReducer.formData;
        const completed = formData.password && formData.passwordConfirmation;
        dispatch({
            type: SET_PASSWORD_FIELD,
            field: field,
            value: value,
            isPasswordFormIncomplete: !completed
        });
    }
};

export const resetPassword = (token, formData) => {
    const {password, passwordConfirmation} = formData;
    if (password !== passwordConfirmation) {
        return {
            type: PASSWORDS_NOT_MATCHING
        };
    }
    const body = {
        password: password,
        passwordConfirmation: passwordConfirmation
    };
    return dispatch => {
        post(`${ENDPOINT_RESET_PASSWORD}/${token}`, body, null).then(response => {
            dispatch({type: RESET_PASSWORD_REQUEST_SUCCESS, message: response.data.message});
        }).catch(response => {
            dispatch({type: RESET_PASSWORD_REQUEST_ERROR, error: response.message});
        });
    }
};
