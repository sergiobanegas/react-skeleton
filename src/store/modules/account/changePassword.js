import {LOCATION_CHANGE} from 'react-router-redux';

import {put} from '../../../utils/http';
import {REDUCERS_GROUP_PREFIX, ENDPOINT_CHANGE_PASSWORD} from './constants';
import {addSuccessToast} from '../../../utils/notifications';

const REDUCER_NAME = `${REDUCERS_GROUP_PREFIX}/change-password`;

const PASSWORD_FORM_COMPLETED = `${REDUCER_NAME}/PASSWORD_FORM_COMPLETED`;
const PASSWORD_FORM_INCOMPLETE = `${REDUCER_NAME}/PASSWORD_FORM_INCOMPLETE`;
const SET_PASSWORD_FORM_FIELD = `${REDUCER_NAME}/SET_PASSWORD_FORM_FIELD`;
const CHANGE_PASSWORD_SUCCESS = `${REDUCER_NAME}/CHANGE_PASSWORD_SUCCESS`;
const CHANGE_PASSWORD_ERROR = `${REDUCER_NAME}/CHANGE_PASSWORD_ERROR`;
const CHANGE_PASSWORD_PASSWORDS_NOT_MATCHING_ERROR = `${REDUCER_NAME}/CHANGE_PASSWORD_PASSWORDS_NOT_MATCHING_ERROR`;

const initState = {
    formData: {
        oldPassword: '',
        password: '',
        passwordConfirmation: ''
    },
    changingPassword: false,
    incompletePasswordForm: true,
    errorMessage: null,
    errors: [],
    passwordsNotMatching: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case PASSWORD_FORM_COMPLETED:
            return {...state, incompletePasswordForm: false};
        case PASSWORD_FORM_INCOMPLETE:
            return {...state, incompletePasswordForm: true};
        case SET_PASSWORD_FORM_FIELD:
            return {...state, formData: {...state.formData, [action.field]: action.value}};
        case CHANGE_PASSWORD_SUCCESS:
            return initState;
        case CHANGE_PASSWORD_ERROR:
            return {...state, errorMessage: action.error, errors: action.errors, passwordsNotMatching: false};
        case CHANGE_PASSWORD_PASSWORDS_NOT_MATCHING_ERROR:
            return {...state, passwordsNotMatching: true};
        case LOCATION_CHANGE:
            return initState;
        default:
            return state;
    }
};

export const setChangePasswordFormFieldValue = (field, value) => {
    return (dispatch, getState) => {
        dispatch({type: SET_PASSWORD_FORM_FIELD, field: field, value: value});
        let reducer = getState().accountReducers.changePasswordReducer;
        let completed = reducer.formData['oldPassword'] && reducer.formData['password'] && reducer.formData['passwordConfirmation'];
        completed ? dispatch({type: PASSWORD_FORM_COMPLETED}) : dispatch({type: PASSWORD_FORM_INCOMPLETE});
    }
};

export const changePassword = credentials => {
    return dispatch => {
        const {oldPassword, password, passwordConfirmation} = credentials;
        if (password !== passwordConfirmation) {
            dispatch({type: CHANGE_PASSWORD_PASSWORDS_NOT_MATCHING_ERROR});
        } else {
            put(ENDPOINT_CHANGE_PASSWORD, {
                oldPassword: oldPassword,
                password: password
            }, null).then(response => {
                dispatch({type: CHANGE_PASSWORD_SUCCESS});
                addSuccessToast(response.data.message);
            }).catch(response => {
                dispatch({type: CHANGE_PASSWORD_ERROR, error: response.message, errors: response.errors});
            });
        }
    }
};
