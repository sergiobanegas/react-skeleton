import adminMenuReducer from './adminMenu';
import adminUserReducer from './adminUser';
import adminUsersReducer from './adminUsers';
import {combineReducers} from 'redux';

export default combineReducers({
    adminMenuReducer,
    adminUserReducer,
    adminUsersReducer
});
