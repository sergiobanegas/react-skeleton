import {getCookie} from './cookies';
import {ROLE_ADMIN} from '../config';

const USER_INFO_KEY = 'USER_INFO';
const ROLES_ATTRIBUTE = 'ROLES';
const LANGUAGE_ATTRIBUTE = 'LANGUAGE';

export const getUserLanguage = () => {
    return getAttributeFromUserInfoCookie(LANGUAGE_ATTRIBUTE);
};

export const isUserLogged = () => {
    return getUserInfo() !== null;
};

export const userHasRole = allowedRoles => {
    let userRoles = getUserRoles();
    if (userRoles) {
        return userRoles.filter(role => {
            return allowedRoles.indexOf(role) > -1;
        }).length > 0;
    }
    return false;
};

export const isAdmin = () => {
    return userHasRole(ROLE_ADMIN);
};

const getAttributeFromUserInfoCookie = attribute => {
    let userAuthData = getUserInfo();
    return userAuthData !== null ? JSON.parse(window.atob(userAuthData))[attribute] : null;
};

const getUserInfo = () => {
    return getCookie(USER_INFO_KEY);
};

const getUserRoles = () => {
    return getAttributeFromUserInfoCookie(ROLES_ATTRIBUTE);
};
