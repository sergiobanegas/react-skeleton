import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {ACCOUNT_URI} from '../App/routes';
import {deleteAccountRequest} from '../../store/modules/account/deleteAccount';
import Button from '../../components/Button';
import Message, {MessageHeader} from '../../components/Message';
import Icon from '../../components/Icon';
import Text from '../../components/Text';
import Divider from '../../components/Divider';

class DeleteAccountContainer extends Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onClickExitDeleteAccount = this.onClickExitDeleteAccount.bind(this);
    }

    onSubmit() {
        const {dispatch} = this.props;
        dispatch(deleteAccountRequest());
    }

    onClickExitDeleteAccount() {
        const {history} = this.props;
        history.push(ACCOUNT_URI);
    }

    render() {
        const {successMessage, errorMessage} = this.props;
        return (
            <div>
                {successMessage && <Message info>{successMessage}</Message>}
                {errorMessage && <Message error>{errorMessage}</Message>}
                <Message warning>
                    <MessageHeader><Icon name='warning'/><Text id='delete.account.warning.header'/></MessageHeader>
                    <p><Text id='delete.account.warning.content'/></p>
                </Message>
                <Divider/>
                <Button color='red' onClick={this.onSubmit}><Text id='delete'/></Button>
                <Button type='submit' onClick={this.onClickExitDeleteAccount}><Text id='cancel'/></Button>
            </div>
        );
    }
}

const mapStateToProps = ({accountReducers}) => {
    const {deleteAccountReducer} = accountReducers;
    return {
        successMessage: deleteAccountReducer.successMessage,
        errorMessage: deleteAccountReducer.errorMessage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

DeleteAccountContainer.propTypes = {
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteAccountContainer));
