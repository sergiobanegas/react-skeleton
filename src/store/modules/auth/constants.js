import {APP_NAME} from '../../../config';

export const REDUCERS_GROUP_PREFIX = `${APP_NAME}/auth`;

const ENDPOINT_AUTH = '/auth';
export const ENDPOINT_SIGN_IN = ENDPOINT_AUTH + '/login';
export const ENDPOINT_LOGOUT = ENDPOINT_AUTH + '/logout';
export const ENDPOINT_SIGN_UP = ENDPOINT_AUTH + '/sign-up';
export const ENDPOINT_RESET_PASSWORD = '/auth/reset-password';
