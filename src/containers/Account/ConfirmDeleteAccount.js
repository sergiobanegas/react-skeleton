import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {WELCOME_URI} from '../App/routes';
import {REDIRECT_TIMEOUT} from '../../config';
import {deleteAccount} from '../../store/modules/account/deleteAccount';
import Grid, {GridColumn} from '../../components/Grid';
import Container from '../../components/Container';
import Message from '../../components/Message';
import Text from '../../components/Text';

class ConfirmDeleteAccountContainer extends Component {

    componentWillMount() {
        const {dispatch, match} = this.props;
        dispatch(deleteAccount(match.params.token));
    }

    componentDidMount() {
        const {history} = this.props;
        setTimeout(() => {
            history.push(WELCOME_URI);
        }, REDIRECT_TIMEOUT);
    }

    render() {
        const {successMessage, errorMessage} = this.props;
        return (
            <Grid centered>
                <GridColumn computer={14} tablet={14} mobile={14} textAlign='center'>
                    <Container>
                        {successMessage && <Message success>{successMessage}</Message>}
                        {errorMessage && <Message error>{errorMessage}</Message>}
                        <div><Text id='redirecting'/></div>
                    </Container>
                </GridColumn>
            </Grid>
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

ConfirmDeleteAccountContainer.propTypes = {
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmDeleteAccountContainer));
