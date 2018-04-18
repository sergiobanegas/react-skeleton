import sessionReducer from './session';
import signUpReducer from './signUp';
import {combineReducers} from 'redux';

export default combineReducers({
    sessionReducer,
    signUpReducer
});
