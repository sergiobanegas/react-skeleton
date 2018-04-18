import React from 'react';
import {Route} from 'react-router-dom';

import {
    ACCOUNT_URI, ADMIN_PANEL_URI, CONFIRM_ACCOUNT_TOKEN_URI, RESET_PASSWORD_TOKEN_URI, RESET_PASSWORD_URI,
    WELCOME_URI
} from './routes';
import {ROLE_ADMIN, ROLE_USER} from '../../config';
import {WithAuth, WithoutAuth} from '../../utils/security';
import HomeContainer from '../Home';
import AdminPanelContainer from '../AdminPanel';
import AccountContainer from '../Account';
import WelcomeContainer from '../Welcome';
import ConfirmAccountContainer from '../ConfirmAccount';
import ResetPasswordContainer from '../ResetPassword';
import ConfirmResetPasswordContainer from '../ResetPassword/ConfirmResetPassword';

export default () => (
    <div>
        <Route exact path='/' component={WithAuth(HomeContainer, [ROLE_ADMIN, ROLE_USER])}/>
        <Route path={WELCOME_URI} component={WithoutAuth(WelcomeContainer)}/>
        <Route path={ADMIN_PANEL_URI} component={WithAuth(AdminPanelContainer, [ROLE_ADMIN])}/>
        <Route path={ACCOUNT_URI} component={WithAuth(AccountContainer, [ROLE_ADMIN, ROLE_USER])}/>
        <Route path={CONFIRM_ACCOUNT_TOKEN_URI} component={WithoutAuth(ConfirmAccountContainer)}/>
        <Route exact path={RESET_PASSWORD_URI} component={WithoutAuth(ResetPasswordContainer)}/>
        <Route path={RESET_PASSWORD_TOKEN_URI} component={WithoutAuth(ConfirmResetPasswordContainer)}/>
    </div>
);
