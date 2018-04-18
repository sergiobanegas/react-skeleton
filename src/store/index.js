import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {reducer as form} from 'redux-form';
import {routerReducer, routerMiddleware} from 'react-router-redux';

import localeReducer from './modules/locale';
import menuReducer from './modules/menu';
import adminReducers from './modules/administration';
import authReducers from './modules/auth';
import accountReducers from './modules/account';

export default history => {
    const reducer = combineReducers({
        adminReducers,
        authReducers,
        accountReducers,
        localeReducer,
        menuReducer,
        form,
        router: routerReducer
    });

    let middleware = [thunk, logger, routerMiddleware(history)];

    return createStore(
        reducer,
        applyMiddleware(...middleware)
    )
};
