import React from 'react';
import {toast} from 'react-toastify';

import ToastContainer from '../containers/ToastContainer/Toast';
import Text from '../components/Text';

const TOAST_CONFIG = {
    autoClose: 5000,
    hideProgressBar: true,
    pauseOnHover: false,
    position: toast.POSITION.BOTTOM_RIGHT
};

export const addInfoToast = (message, config) => {
    toast.info(<ToastContainer icon='info' message={getMessage(message, config)}/>, TOAST_CONFIG);
};

export const addSuccessToast = (message, config) => {
    toast.success(<ToastContainer icon='info' message={getMessage(message, config)}/>, TOAST_CONFIG);
};

export const addWarningToast = (message, config) => {
    toast(<ToastContainer icon='warning sign' message={getMessage(message, config)}/>, TOAST_CONFIG);
};

export const addErrorToast = (message, config) => {
    toast.error(<ToastContainer icon='warning' message={getMessage(message, config)}/>, TOAST_CONFIG);
};


const getMessage = (message, config) => {
    return !config || !config.i18n ? message : <Text id={message}/>;
};
