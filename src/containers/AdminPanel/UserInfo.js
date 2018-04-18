import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {ADMIN_PANEL_URI} from '../App/routes';
import {ADMIN_USERS_URI, USERS_URI} from './routes';
import {
    openDeleteUserModal,
    getUser,
    closeDeleteUserModal,
    deleteUser
} from '../../store/modules/administration/adminUser';
import Button from '../../components/Button';
import Image from '../../components/Image';
import Divider from '../../components/Divider';
import {GridColumn} from '../../components/Grid';
import Grid from '../../components/Grid';
import Date from '../../components/Date';
import Header, {HeaderContent} from '../../components/Header';
import ConfirmationModal from '../../components/ConfirmationModal';
import Loader from '../../components/Loader';
import Icon from '../../components/Icon';
import GenderIcon from '../../components/GenderIcon';
import Text from '../../components/Text';

class UserInfoContainer extends Component {

    constructor() {
        super();
        this.onClickDeleteAccountButton = this.onClickDeleteAccountButton.bind(this);
        this.getFormattedGender = this.getFormattedGender.bind(this);
        this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
        this.handleCancelDelete = this.handleCancelDelete.bind(this);
        this.onClickBackButton = this.onClickBackButton.bind(this);
    }

    componentWillMount() {
        const {dispatch, match} = this.props;
        dispatch(getUser(match.params.id));
    }

    componentWillReceiveProps(nextProps) {
        const {history, deleted, error} = nextProps;
        (deleted || error) && history.push(ADMIN_PANEL_URI + USERS_URI);
    }

    onClickDeleteAccountButton() {
        const {dispatch} = this.props;
        dispatch(openDeleteUserModal());
    }

    getFormattedGender() {
        const {gender} = this.props.info;
        return gender ? gender.charAt(0) + gender.slice(1).toLowerCase() : '';
    }

    handleConfirmDelete() {
        const {dispatch, match} = this.props;
        dispatch(deleteUser(match.params.id));
    }

    handleCancelDelete() {
        const {dispatch} = this.props;
        dispatch(closeDeleteUserModal());
    }

    onClickBackButton() {
        const {history} = this.props;
        history.push(ADMIN_USERS_URI);
    }

    render() {
        const {info, deleteUserModalOpened, loading, error} = this.props;
        const gender = this.getFormattedGender();
        return (loading || error)
            ? <Loader active inline='centered'/>
            : (
                <div>
                    <Header size='huge' textAlign='center'>
                        <HeaderContent>
                            <Image src={info.avatar} size='small' alt='avatar' avatar/>
                            <br/>
                            <b>{info.name}</b>
                        </HeaderContent>
                    </Header>
                    <Divider/>
                    <Grid>
                        <GridColumn computer={8} tablet={8} mobile={14}>
                            <b><Icon name='mail'/><Text id='email'/></b>: {info.email}
                        </GridColumn>
                        <GridColumn computer={8} tablet={8} mobile={14}>
                            <b><Icon name='intergender'/><Text id='gender'/></b>: <Text
                            id={gender.toLowerCase()}/><GenderIcon gender={gender}/>
                        </GridColumn>
                    </Grid>
                    <Divider/>
                    <Grid>
                        <GridColumn computer={8} tablet={8} mobile={14}>
                            <b><Icon name='clock'/><Text id='created.at'/></b>: <Date value={info.createdAt}
                                                                                      year='numeric'
                                                                                      month='long'
                                                                                      day='numeric' weekday='long'/>
                        </GridColumn>
                        <GridColumn computer={8} tablet={8} mobile={14}>

                            <b><Icon name='clock'/><Text id='updated.at'/></b>: <Date value={info.updatedAt}
                                                                                      year='numeric'
                                                                                      month='long'
                                                                                      day='numeric' weekday='long'/>
                        </GridColumn>
                    </Grid>
                    <Divider/>
                    <Button color='red' type='submit' onClick={this.onClickDeleteAccountButton}>
                        <Text id='delete.user'/>
                    </Button>
                    <Button type='submit' onClick={this.onClickBackButton}>
                        <Text id='cancel'/>
                    </Button>
                    <ConfirmationModal
                        open={deleteUserModalOpened}
                        content='delete.user.confirmation'
                        onCancel={this.handleCancelDelete}
                        onConfirm={this.handleConfirmDelete}
                        cancelButton='cancel'
                        confirmButton='confirm'
                    />
                </div>
            );
    }
}

const mapStateToProps = ({adminReducers}) => {
    const {adminUserReducer} = adminReducers;
    return {
        info: adminUserReducer.info,
        deleteUserModalOpened: adminUserReducer.deleteUserModalOpened,
        loading: adminUserReducer.loading,
        deleted: adminUserReducer.deleted,
        error: adminUserReducer.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

UserInfoContainer.propTypes = {
    info: PropTypes.shape({
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        createdAt: PropTypes.number.isRequired,
        updatedAt: PropTypes.number.isRequired
    }),
    deleteUserModalOpened: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    deleted: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfoContainer));
