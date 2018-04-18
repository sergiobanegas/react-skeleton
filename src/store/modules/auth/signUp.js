import {LOCATION_CHANGE} from 'react-router-redux';

import {post} from '../../../utils/http';
import {REDUCERS_GROUP_PREFIX, ENDPOINT_SIGN_UP} from './constants';

const REDUCER_NAME = `${REDUCERS_GROUP_PREFIX}/sign-up`;

const SIGN_UP_SUCCESS = `${REDUCER_NAME}/SIGN_UP_SUCCESS`;
const SIGN_UP_ERROR = `${REDUCER_NAME}/SIGN_UP_ERROR`;
const COMPLETED_SIGN_UP_FORM = `${REDUCER_NAME}/COMPLETED_SIGN_UP_FORM`;
const INCOMPLETE_SIGN_UP_FORM = `${REDUCER_NAME}/INCOMPLETE_SIGN_UP_FORM`;
const SET_SIGN_UP_FORM_FIELD = `${REDUCER_NAME}/SET_SIGN_UP_FORM_FIELD`;
const SIGN_UP_PASSWORDS_NOT_MATCHING_ERROR = `${REDUCER_NAME}/SIGN_UP_PASSWORDS_NOT_MATCHING_ERROR`;

const initState = {
    formData: {
        email: '',
        password: '',
        passwordConfirmation: '',
        name: '',
        gender: ''
    },
    passwordsNotMatching: false,
    error: null,
    incompleteForm: true,
    successMessage: null,
    errorMessage: null,
    errors: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case SIGN_UP_SUCCESS:
            return {...initState, successMessage: action.message};
        case SIGN_UP_ERROR:
            return {...state, errorMessage: action.error, errors: action.errors, passwordsNotMatching: false};
        case SET_SIGN_UP_FORM_FIELD:
            return {...state, formData: {...state.formData, [action.field]: action.value}};
        case COMPLETED_SIGN_UP_FORM:
            return {...state, incompleteForm: false};
        case INCOMPLETE_SIGN_UP_FORM:
            return {...state, incompleteForm: true};
        case SIGN_UP_PASSWORDS_NOT_MATCHING_ERROR:
            return {...state, passwordsNotMatching: true};
        case LOCATION_CHANGE:
            return initState;
        default:
            return {...state};
    }
};

export const signUp = fields => {
    if (fields.password !== fields.passwordConfirmation) {
        return {type: SIGN_UP_PASSWORDS_NOT_MATCHING_ERROR};
    }
    return dispatch => {
        post(ENDPOINT_SIGN_UP, {
            email: fields.email,
            password: fields.password,
            name: fields.name,
            gender: fields.gender
        }, null).then(response => {
            dispatch({type: SIGN_UP_SUCCESS, message: response.data.message});
        }).catch(response => {
            dispatch({type: SIGN_UP_ERROR, error: response.message, errors: response.errors});
        });

    }
};

export const setSignUpFormFieldValue = (field, value) => {
    return (dispatch, getState) => {
        dispatch({type: SET_SIGN_UP_FORM_FIELD, field: field, value: value});
        let reducer = getState().authReducers.signUpReducer;
        const {email, password, passwordConfirmation, name, gender} = reducer.formData;
        let completed = email && password && passwordConfirmation && name && gender;
        completed ? dispatch({type: COMPLETED_SIGN_UP_FORM}) : dispatch({type: INCOMPLETE_SIGN_UP_FORM});
    }
};
