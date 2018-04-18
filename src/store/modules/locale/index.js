import {getLocaleData} from '../../../i18n/utils';
import {APP_NAME} from '../../../config';

const REDUCER_NAME = `${APP_NAME}/locale`;

const CHANGE_LOCALE_DATA = `${REDUCER_NAME}/CHANGE_LOCALE_DATA`;

const initState = getLocaleData();

export default (state = initState, action) => {
    switch (action.type) {
        case CHANGE_LOCALE_DATA: {
            let newLocale = getLocaleData();
            return {...state, locale: newLocale.locale, key: newLocale.key, messages: newLocale.messages};
        }
        default:
            return state;
    }
};

export const updateLocaleData = () => {
    return {type: CHANGE_LOCALE_DATA}
};
