import {REDUCERS_GROUP_PREFIX} from './constants';

const REDUCER_NAME = `${REDUCERS_GROUP_PREFIX}/menu`;

const CHANGE_ACTIVE_PAGE = `${REDUCER_NAME}/CHANGE_ACTIVE_PAGE`;

const initState = {
    active: 'home'
};

export default (state = initState, action) => {
    switch (action.type) {
        case CHANGE_ACTIVE_PAGE:
            return {...state, active: action.page};
        default:
            return state
    }
};

export const changeActivePage = page => {
    return {type: CHANGE_ACTIVE_PAGE, page: page}
};
