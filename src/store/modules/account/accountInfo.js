import {get} from '../../../utils/http';
import {getLocale} from '../../../i18n/utils';
import {REDUCERS_GROUP_PREFIX, ENDPOINT_ACCOUNT} from './constants';

const REDUCER_NAME = `${REDUCERS_GROUP_PREFIX}/info`;

const GET_ACCOUNT_INFO_SUCCESS = `${REDUCER_NAME}/GET_ACCOUNT_INFO_SUCCESS`;
const GET_ACCOUNT_INFO_ERROR = `${REDUCER_NAME}/GET_ACCOUNT_INFO_ERROR`;

const initState = {
    info: {
        email: '',
        name: '',
        gender: '',
        avatar: '',
        createdAt: 0,
        updatedAt: 0
    },
    language: getLocale().toUpperCase(),
    loading: true
};

export default (state = initState, action) => {
    switch (action.type) {
        case GET_ACCOUNT_INFO_SUCCESS:
            return {...state, info: action.info, language: getLocale().toUpperCase(), loading: false};
        case GET_ACCOUNT_INFO_ERROR:
            return {...state, errorMessage: action.error, errors: action.errors, loading: false};
        default:
            return state;
    }
};

export const getAccountInfo = () => {
    return dispatch => {
        get(ENDPOINT_ACCOUNT).then(response => {
            dispatch({type: GET_ACCOUNT_INFO_SUCCESS, info: response});
        }).catch(response => {
            dispatch({type: GET_ACCOUNT_INFO_ERROR, error: response.data.message});
        });
    }
};
