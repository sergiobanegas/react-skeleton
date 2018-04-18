import {APP_NAME} from '../../../config';

const REDUCER_NAME = `${APP_NAME}/menu`;

const CHANGE_TITLE = `${REDUCER_NAME}/CHANGE_TITLE`;

const initState = {
    title: 'home'
};

export default (state = initState, action) => {
    switch (action.type) {
        case CHANGE_TITLE:
            return {...state, title: action.title};
        default:
            return state
    }
};

export const changeTitle = title => {
    return {
        type: CHANGE_TITLE,
        title: title
    }
};
