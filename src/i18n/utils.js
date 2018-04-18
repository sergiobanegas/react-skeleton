import {addLocaleData} from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import ja from 'react-intl/locale-data/ja';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

import {getUserLanguage} from '../utils/user-info';

export const registerLocales = () => {
    addLocaleData([...en, ...es, ...ja, ...fr]);
};


export const getLocale = () => {
    const locale = getUserLanguage() || (navigator.languages && navigator.languages[0]) ||
        navigator.language;
    return locale.toLowerCase().split(/[_-]+/)[0];
};

export const getMessages = locale => {
    try {
        return require(`./translations/${locale}.json`);
    } catch (ex) {
        return require(`./translations/en.json`);
    }
};


export const getLocaleData = () => {
    let locale = getLocale();
    return {
        locale: locale,
        key: locale,
        messages: getMessages(locale)
    };
};
