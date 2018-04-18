import {LOCATION_CHANGE} from 'react-router-redux';

import {get} from '../../../utils/http';
import {REDUCERS_GROUP_PREFIX, ENDPOINT_USERS} from './constants';

const REDUCER_NAME = `${REDUCERS_GROUP_PREFIX}/users`;

const GET_USERS_SUCCESS = `${REDUCER_NAME}/GET_USERS_SUCCESS`;
const GET_USERS_ERROR = `${REDUCER_NAME}/GET_USERS_ERROR`;
const SET_EMAIL_VALUE = `${REDUCER_NAME}/SET_EMAIL_VALUE`;
const CLEAN_FILTERS = `${REDUCER_NAME}/CLEAN_FILTERS`;


const initState = {
    users: [],
    page: 0,
    size: 20,
    isFirst: true,
    isLast: false,
    numberOfPages: 1,
    email: '',
    filtered: false,
    loading: true
};

export default (state = initState, action) => {
    switch (action.type) {
        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.page > 0 ? state.users.concat(action.response.content) : action.response.content,
                isFirst: action.response.first,
                isLast: action.response.last,
                numberOfPages: action.response.totalPages,
                filtered: state.email !== '',
                loading: false
            };
        case GET_USERS_ERROR:
            return {...state, error: action.error};
        case SET_EMAIL_VALUE:
            return {...state, email: action.value};
        case CLEAN_FILTERS:
            return {
                ...state, users: [],
                page: initState.page,
                size: initState.size,
                isFirst: true,
                isLast: false,
                numberOfPages: 1,
                email: '',
                filtered: false
            };
        case LOCATION_CHANGE:
            return initState;
        default:
            return state
    }
};

export const getUsers = (page, size, email) => {
    const params = {
        page: page,
        size: size,
        email: email
    };
    return dispatch => {
        get(`${ENDPOINT_USERS}`, params).then(response => {
            dispatch({type: GET_USERS_SUCCESS, response: response, page: page});
        }).catch(response => {
            dispatch({type: GET_USERS_ERROR, error: response.error});
        });
    }
};

export const setEmailValue = email => {
    return {type: SET_EMAIL_VALUE, value: email};
};

export const cleanFilters = () => {
    return dispatch => {
        dispatch({type: CLEAN_FILTERS});
        dispatch(getUsers(initState.page, initState.size, initState.email));
    };
};
