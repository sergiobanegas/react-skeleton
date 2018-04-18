import {LOCATION_CHANGE} from 'react-router-redux';

import {del, get} from '../../../utils/http';
import {REDUCERS_GROUP_PREFIX, ENDPOINT_USERS} from './constants';
import {addErrorToast, addSuccessToast} from '../../../utils/notifications';

const REDUCER_NAME = `${REDUCERS_GROUP_PREFIX}/user`;

const GET_USER_SUCCESS = `${REDUCER_NAME}/GET_USER_SUCCESS`;
const GET_USER_ERROR = `${REDUCER_NAME}/GET_USER_ERROR`;
const CHANGE_DELETE_USER_MODAL_VISIBILITY = `${REDUCER_NAME}/CHANGE_DELETE_USER_MODAL_VISIBILITY`;
const DELETE_USER_SUCCESS = `${REDUCER_NAME}/DELETE_USER_SUCCESS`;
const DELETE_USER_ERROR = `${REDUCER_NAME}/DELETE_USER_ERROR`;

const initState = {
    info: {
        email: '',
        name: '',
        gender: '',
        avatar: '',
        createdAt: 0,
        updatedAt: 0
    },
    error: null,
    errorCode: null,
    deleteUserModalOpened: false,
    deleted: false,
    errorDeleteUser: null,
    loading: true
};

export default (state = initState, action) => {
    switch (action.type) {
        case GET_USER_SUCCESS:
            return {...state, info: action.response, loading: false, deleted: false};
        case GET_USER_ERROR:
            return {...initState, error: action.error, loading: false};
        case CHANGE_DELETE_USER_MODAL_VISIBILITY:
            return {...state, deleteUserModalOpened: action.visible};
        case DELETE_USER_SUCCESS:
            return {...initState, deleted: true};
        case DELETE_USER_ERROR:
            return {...state, errorDeleteUser: action.error};
        case LOCATION_CHANGE:
            return initState;
        default:
            return state;
    }
};

export const getUser = id => {
    return dispatch => {
        get(`${ENDPOINT_USERS}/${id}`, null, null).then(response => {
            dispatch({type: GET_USER_SUCCESS, response: response});
        }).catch(response => {
            dispatch({type: GET_USER_ERROR, error: response.message});
        });
    }
};

export const openDeleteUserModal = () => {
    return {type: CHANGE_DELETE_USER_MODAL_VISIBILITY, visible: true};
};

export const closeDeleteUserModal = () => {
    return {type: CHANGE_DELETE_USER_MODAL_VISIBILITY, visible: false};
};

export const deleteUser = id => {
    return dispatch => {
        del(`${ENDPOINT_USERS}/${id}`, null, null).then(response => {
            dispatch({type: DELETE_USER_SUCCESS});
            addSuccessToast(response.message);
        }).catch(response => {
            dispatch({type: DELETE_USER_ERROR, error: response.message});
            addErrorToast(response.message);
        });
    }
};
