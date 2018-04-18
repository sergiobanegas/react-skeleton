import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {ACCOUNT_URI} from '../App/routes';
import {DELETE_URI, EDIT_PASSWORD_URI, EDIT_URI} from './routes';
import Button from '../../components/Button';
import Image from '../../components/Image';
import Divider from '../../components/Divider';
import {GridColumn} from '../../components/Grid';
import Grid from '../../components/Grid';
import Date from '../../components/Date';
import Header, {HeaderContent} from '../../components/Header';
import Flag from '../../components/Flag';
import Loader from '../../components/Loader';
import Icon from '../../components/Icon';
import GenderIcon from '../../components/GenderIcon';
import Text from '../../components/Text';
import Popup from '../../components/Popup';

const EditButtons = styled.div`
  @media only screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  @media only screen and (min-width: 601px) {
    position: absolute;
    right: 0px;
    top:10px;
  }
`;

class AccountInfoContainer extends Component {

    constructor() {
        super();
        this.onClickEditCredentialsButton = this.onClickEditCredentialsButton.bind(this);
        this.onClickChangePasswordButton = this.onClickChangePasswordButton.bind(this);
        this.onClickDeleteAccountButton = this.onClickDeleteAccountButton.bind(this);
        this.getFormattedGender = this.getFormattedGender.bind(this);
    }

    onClickEditCredentialsButton() {
        const {history} = this.props;
        history.push(ACCOUNT_URI + EDIT_URI);
    }

    onClickChangePasswordButton() {
        const {history} = this.props;
        history.push(ACCOUNT_URI + EDIT_PASSWORD_URI);
    }

    onClickDeleteAccountButton() {
        const {history} = this.props;
        history.push(ACCOUNT_URI + DELETE_URI);
    }

    getFormattedGender() {
        const {gender} = this.props.info;
        return gender.charAt(0) + gender.slice(1).toLowerCase();
    }

    render() {
        const {info, language, loading} = this.props;
        const gender = this.getFormattedGender();
        return loading
            ? <Loader active inline='centered'/>
            : (
                <div>
                    <EditButtons>
                        <Popup
                            trigger={<Button icon='edit' size='large' onClick={this.onClickEditCredentialsButton}
                                             circular primary/>}
                            content='edit.account.information'/>
                        <Popup
                            trigger={<Button icon='lock' size='large' onClick={this.onClickChangePasswordButton}
                                             circular primary/>}
                            content='change.password'/>
                        <Popup
                            trigger={<Button icon='remove user' size='large' onClick={this.onClickDeleteAccountButton}
                                             circular
                                             color='red'/>}
                            content='delete.account'/>
                    </EditButtons>
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
                            <p>
                                <b><Icon name='mail'/><Text id='email'/></b>: {info.email}
                            </p>
                            <b><Icon name='world'/><Text id='language'/></b>:&nbsp;
                            <Flag name={language}/>
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
                                                                                      year='numeric' month='long'
                                                                                      day='numeric' weekday='long'/>
                        </GridColumn>
                        <GridColumn computer={8} tablet={8} mobile={14}>
                            <b><Icon name='clock'/><Text id='updated.at'/></b>: <Date value={info.updatedAt}
                                                                                      year='numeric' month='long'
                                                                                      day='numeric' weekday='long'/>
                        </GridColumn>
                    </Grid>
                </div>
            );
    }
}

const mapStateToProps = ({accountReducers}) => {
    const {accountInfoReducer} = accountReducers;
    return {
        info: accountInfoReducer.info,
        language: accountInfoReducer.language,
        loading: accountInfoReducer.loading
    }
};

AccountInfoContainer.propTypes = {
    info: PropTypes.shape({
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        createdAt: PropTypes.number.isRequired,
        updatedAt: PropTypes.number.isRequired
    }),
    language: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired
};

export default withRouter(connect(
    mapStateToProps
)(AccountInfoContainer));
