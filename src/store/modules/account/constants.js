import {APP_NAME} from '../../../config';

export const REDUCERS_GROUP_PREFIX = `${APP_NAME}/account`;

export const ENDPOINT_ACCOUNT = '/account';
export const ENDPOINT_CHANGE_EMAIL =  `${ENDPOINT_ACCOUNT}/email`;
export const ENDPOINT_CHANGE_PASSWORD = `${ENDPOINT_ACCOUNT}/password`;
export const ENDPOINT_CONFIRM_ACCOUNT =  '/auth/confirmation';
export const ENDPOINT_AVATAR = '/avatar';
