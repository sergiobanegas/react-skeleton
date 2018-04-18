import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {Route} from '../../utils/router';
import {ADMIN_PANEL_URI} from '../App/routes';
import {ADMIN_USERS_URI, USER_URI, USERS_URI} from './routes';
import {changeTitle} from '../../store/modules/menu/index';
import MainPageContainer from './MainPage';
import UsersContainer from './Users';
import UserInfoContainer from './UserInfo';
import AdminMenu from './AdminMenu';
import Title from '../../components/Title';
import Grid, {GridColumn} from '../../components/Grid';
import Container from '../../components/Container';


class AdminPanelContainer extends Component {

    constructor() {
        super();
        this.onClickMainPageButton = this.onClickMainPageButton.bind(this);
        this.onClickUserMenuOption = this.onClickUserMenuOption.bind(this);
    }

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(changeTitle('admin.panel'));
    }

    onClickMainPageButton() {
        const {history} = this.props;
        history.push(ADMIN_PANEL_URI);
    }

    onClickUserMenuOption() {
        const {history} = this.props;
        history.push(ADMIN_USERS_URI);
    }

    render() {
        const {match} = this.props;
        return (
            <Grid centered>
                <GridColumn computer={8} tablet={12} mobile={14}>
                    <Title id='admin.panel'/>
                    <AdminMenu/>
                    <Container>
                        <Route exact match={match} path='/' component={MainPageContainer}/>
                        <Route exact match={match} path={USERS_URI} component={UsersContainer}/>
                        <Route exact match={match} path={USER_URI} component={UserInfoContainer}/>
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
)(AdminPanelContainer));
