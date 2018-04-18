import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {Route} from '../../utils/router';
import {DELETE_TOKEN_URI, DELETE_URI, EDIT_EMAIL_TOKEN_URI, EDIT_PASSWORD_URI, EDIT_URI} from './routes';
import {changeTitle} from '../../store/modules/menu/index';
import {getAccountInfo} from '../../store/modules/account/accountInfo';
import AccountInfoContainer from './AccountInfo';
import EditAccountInfoContainer from './EditAccountInfo';
import EditPasswordContainer from './EditPassword';
import DeleteAccountContainer from './DeleteAccount';
import ConfirmDeleteAccountContainer from './ConfirmDeleteAccount';
import Title from '../../components/Title';
import Grid, {GridColumn} from '../../components/Grid';
import Container from '../../components/Container';
import ConfirmChangeEmailContainer from './ConfirmChangeEmail';

class AccountContainer extends Component {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(getAccountInfo());
        dispatch(changeTitle('account'));
    }

    render() {
        const {match} = this.props;
        return (
            <Grid centered>
                <GridColumn computer={8} tablet={12} mobile={14}>
                    <Title id='account'/>
                    <Container>
                        <Route exact match={match} path='/' component={AccountInfoContainer}/>
                        <Route exact match={match} path={EDIT_URI} component={EditAccountInfoContainer}/>
                        <Route exact match={match} path={EDIT_PASSWORD_URI} component={EditPasswordContainer}/>
                        <Route exact match={match} path={EDIT_EMAIL_TOKEN_URI} component={ConfirmChangeEmailContainer}/>
                        <Route exact match={match} path={DELETE_URI} component={DeleteAccountContainer}/>
                        <Route exact match={match} path={DELETE_TOKEN_URI} component={ConfirmDeleteAccountContainer}/>
                    </Container>
                </GridColumn>
            </Grid>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

export default withRouter(connect(
    mapDispatchToProps
)(AccountContainer));
